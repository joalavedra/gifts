// app/api/encrypt/route.ts
import { NextResponse } from 'next/server';
import { randomBytes, createCipheriv } from 'crypto';

// In a real app, this should be an environment variable
// Must be a 32-byte key in base64 format
const ENCRYPTION_KEY = Buffer.from(process.env.NEXT_PRIVATE_ENCRYPTION_KEY || '', 'base64');

export async function POST(request: Request) {
    try {
        const { privateKey, permissionsContext, assetId, address } = await request.json();

        // Generate a random IV
        const iv = randomBytes(16);

        // Create cipher
        const cipher = createCipheriv('aes-256-gcm', ENCRYPTION_KEY, iv);

        // Encrypt the data
        const encryptedData = Buffer.concat([
            cipher.update(JSON.stringify({ privateKey, permissionsContext, assetId, address }), 'utf8'),
            cipher.final()
        ]);

        // Get the auth tag
        const authTag = cipher.getAuthTag();

        // Create the final encrypted object
        const encrypted = {
            iv: iv.toString('base64'),
            data: encryptedData.toString('base64'),
            tag: authTag.toString('base64'),
            timestamp: Date.now()
        };

        return NextResponse.json({ encryptedData: encrypted });
    } catch (error) {
        console.error('Encryption error:', error);
        return NextResponse.json(
            { error: 'Failed to encrypt data' },
            { status: 500 }
        );
    }
}