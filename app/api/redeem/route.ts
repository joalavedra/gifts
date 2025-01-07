// app/api/redeem/route.ts
import { NextResponse } from 'next/server';
import { createPublicClient, decodeEventLog, http, parseAbiItem, parseUnits } from 'viem';
import { ancient8Sepolia } from 'viem/chains';
import Openfort from '@openfort/openfort-node';
import { GIFTS } from '@/lib/constants/gifts';
import { CONTRACTS } from '@/lib/contracts/config';

// Initialize OpenFort client
const openfort = new Openfort(process.env.NEXT_PRIVATE_OPENFORT_SECRET_KEY!);

// Environment variables
const CONTRACT_ID = process.env.NEXT_PUBLIC_USDC_CONTRACT_ID!;
const POLICY_ID = process.env.NEXT_PUBLIC_POLICY_ID!;
const CHAIN_ID = parseInt('28122024');
const PLAYER_USDC_ID = process.env.NEXT_PUBLIC_PLAYER_ID!;

// TransferBatch event ABI - this is the event emitted on burn
const transferBatchEventAbi = parseAbiItem(
    'event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)'
);

const publicClient = createPublicClient({
    chain: ancient8Sepolia,
    transport: http()
});

export async function POST(request: Request) {
    try {
        const { transactionHash } = await request.json();

        // Get transaction receipt
        const receipt = await publicClient.getTransactionReceipt({
            hash: transactionHash as `0x${string}`
        });
        // Find the TransferBatch event
        const transferEvent = receipt.logs.find(log => log.address.toLowerCase() === CONTRACTS.GIFT_TOKEN.address.toLowerCase())

        if (!transferEvent) {
            return NextResponse.json({ error: 'Burn event not found' }, { status: 400 });
        }

        // Decode the event
        const decodedLog = decodeEventLog({
            abi: [transferBatchEventAbi],
            data: transferEvent.data,
            topics: transferEvent.topics,
        });

        // Calculate total value to transfer in USDC
        const { ids, from } = decodedLog.args;
        const price = GIFTS[Number(ids[0])].price;
        // Create USDC transfer transaction
        const interaction_transfer = {
            contract: CONTRACT_ID,
            functionName: 'transfer',
            functionArgs: [
                from,
                String(parseUnits(String(price), 6))
            ],
        };

        // Create transaction intent
        const transactionIntent = await openfort.transactionIntents.create({
            player: PLAYER_USDC_ID,
            policy: POLICY_ID,
            chainId: CHAIN_ID,
            optimistic: false,
            interactions: [interaction_transfer],
        });

        return NextResponse.json({
            success: true,
            transactionIntent: transactionIntent.id,
            hash: transactionIntent.response?.transactionHash,
        });

    } catch (error) {
        console.error('Error processing redemption:', error);
        return NextResponse.json(
            { error: 'Failed to process redemption' },
            { status: 500 }
        );
    }
}