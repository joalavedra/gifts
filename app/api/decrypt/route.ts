// app/api/decrypt/route.ts
import { NextResponse } from 'next/server';
import { createDecipheriv } from 'crypto';

const ENCRYPTION_KEY = Buffer.from(process.env.NEXT_PRIVATE_ENCRYPTION_KEY || '', 'base64');
const MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function POST(request: Request) {
    try {
        const { iv, data, tag, timestamp } = await request.json();

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

        const decryptedData = JSON.parse(decrypted.toString());

        return NextResponse.json({ decryptedData });
    } catch (error) {
        console.error('Decryption error:', error);
        return NextResponse.json(
            { error: 'Failed to decrypt data' },
            { status: 500 }
        );
    }
}