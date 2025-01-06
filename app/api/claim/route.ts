// app/api/claim/route.ts
import { NextResponse } from 'next/server';
import { createDecipheriv } from 'crypto';
import { privateKeyToAccount } from 'viem/accounts';
import Openfort from '@openfort/openfort-node';

// Initialize OpenFort client
const openfort = new Openfort(process.env.NEXT_PRIVATE_OPENFORT_SECRET_KEY!);

const ENCRYPTION_KEY = Buffer.from(process.env.NEXT_PRIVATE_ENCRYPTION_KEY || '', 'base64');
const MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours
const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID!;
const POLICY_ID = process.env.NEXT_PUBLIC_POLICY_ID!;
const CHAIN_ID = parseInt('28122024');

export async function POST(request: Request) {
  try {
    const { encryptedData, toAddress } = await request.json();
    const { iv, data, tag, timestamp } = encryptedData;

    // Check if the link has expired
    if (Date.now() - timestamp > MAX_AGE) {
      return NextResponse.json(
        { error: 'Link has expired' },
        { status: 400 }
      );
    }

    // Convert base64 strings back to buffers
    const ivBuffer = Buffer.from(iv, 'base64');
    const encryptedBuffer = Buffer.from(data, 'base64');
    const authTagBuffer = Buffer.from(tag, 'base64');

    // Create decipher
    const decipher = createDecipheriv('aes-256-gcm', ENCRYPTION_KEY, ivBuffer);
    decipher.setAuthTag(authTagBuffer);

    // Decrypt the data
    const decrypted = Buffer.concat([
      decipher.update(encryptedBuffer),
      decipher.final()
    ]);

    const { privateKey, assetId, permissionsContext, address } = JSON.parse(decrypted.toString());
    console.log('YO', privateKey, assetId, permissionsContext, address)
    const fromAddress = address;

    // Get the session
    const session = await openfort.sessions.get({
      id: permissionsContext,
      expandTransactionIntent: true
    });

    if (!session || !session.transactionIntents || !session.transactionIntents[0]?.player?.id) {
      return NextResponse.json(
        { error: 'Session or transaction intents are undefined' },
        { status: 500 }
      );
    }

    const playerId = session.transactionIntents[0].player.id;

    // Create the safe transfer interaction
    const interaction_transfer = {
      contract: CONTRACT_ID,
      functionName: 'safeTransferFrom',
      functionArgs: [fromAddress, toAddress, assetId, '1', '0x'],
    };

    // Create transaction intent
    const transactionIntent = await openfort.transactionIntents.create({
      player: playerId,
      policy: POLICY_ID,
      chainId: CHAIN_ID,
      optimistic: true,
      interactions: [interaction_transfer],
    });

    const sessionWallet = privateKeyToAccount(privateKey);
    const signature = await sessionWallet.signMessage({ message: { raw: transactionIntent.nextAction?.payload.signableHash as `0x${string}` } });

    // Sign the transaction
    const response = await openfort.transactionIntents.signature({
      id: transactionIntent.id,
      signature: signature
    });

    return NextResponse.json({
      success: true,
      transactionIntent: transactionIntent.id,
      hash: response.response?.transactionHash
    });

  } catch (error) {
    console.error('Claim error:', error);
    return NextResponse.json(
      { error: 'Failed to process claim' },
      { status: 500 }
    );
  }
}