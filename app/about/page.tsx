"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <Card className="glass-card border-none p-8 space-y-8">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-mono text-orange-500">About GiftQuest</h1>
            <div className="w-10" />
          </div>

          <section>
            <h2 className="text-xl font-mono text-orange-500 mb-4">Send Your Friends a Gift! 🎁</h2>
            <p className="text-sm font-mono text-white/80">
              GiftQuest transforms everyday payments into gifts. Send tokens representing real-world gaming items to your friends!
            </p>
          </section>

          <section>
            <h2 className="text-lg font-mono text-orange-500 mb-3">How it works:</h2>
            <ol className="space-y-2 text-sm font-mono text-white/80">
              <li>1. Deposit USDC on Ancient8 Sepolia via the Deposit page</li>
              <li>2. Buy a token and hit send</li>
              <li>3. Share the generated claim link with a friend</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-mono text-orange-500 mb-3">Important Notes:</h2>
            <ul className="space-y-2 text-sm font-mono text-white/80">
              <li>• Anyone with the link can claim the gift, so share privately</li>
              <li>• Unclaimed gifts can be reclaimed from your Send History</li>
              <li>• All tokens can always be redeemed for the underlying USDC</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-mono text-orange-500 mb-3">Why Share?</h2>
            <p className="text-sm font-mono text-white/80">
              Sharing tokens is a fun way to connect and spread joy. Every token sent helps grow the GiftQuest community!
            </p>
          </section>
        </Card>
      </motion.div>
    </main>
  );
}