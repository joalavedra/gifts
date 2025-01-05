"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function AboutView() {
  return (
    <Card className="bg-[#ffffff20] border-none p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#ffffff20]">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl">About PixelPresents</h1>
        <div className="w-10" />
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl mb-4">Send Your Friends a Gift! 🎁</h2>
          <p className="text-sm opacity-80">
            PixelPresents transforms everyday payments into gifts. Send tokens representing real-world gaming items to your friends!
          </p>
        </section>

        <section>
          <h2 className="text-lg mb-3">How it works:</h2>
          <ol className="space-y-2 text-sm opacity-80">
            <li>1. Deposit USDC on Ancient8 Sepolia via the Deposit page</li>
            <li>2. Buy a token and hit send</li>
            <li>3. Share the generated claim link with a friend</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg mb-3">Important Notes:</h2>
          <ul className="space-y-2 text-sm opacity-80">
            <li>• Anyone with the link can claim the gift, so share privately</li>
            <li>• Unclaimed gifts can be reclaimed from your Send History</li>
            <li>• All tokens can always be redeemed for the underlying USDC</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg mb-3">Why Share?</h2>
          <p className="text-sm opacity-80">
            Sharing tokens is a fun way to connect and spread joy. Every token sent helps grow the PixelPresents community!
          </p>
        </section>
      </div>
    </Card>
  );
}