"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Copy, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from "sonner";
import { motion } from 'framer-motion';

export default function HistoryPage() {
  const [links] = useState([
    { id: 1, gift: 'Master Sword', value: 15, claimed: false, link: 'https://pixelpresents.app/claim/abc123' },
    { id: 2, gift: 'Pokédex', value: 10, claimed: true, link: 'https://pixelpresents.app/claim/def456' },
  ]);
  const [cancelingId, setCancelingId] = useState<number | null>(null);

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard');
  };

  const cancelGift = async (id: number) => {
    setCancelingId(id);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate cancellation
    toast.success('Gift cancelled and returned to your inventory');
    setCancelingId(null);
  };

  return (
    <main className="min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <Card className="glass-card border-none p-8 space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/app">
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-mono text-orange-500">Gift History</h1>
            <div className="w-10" />
          </div>

          <p className="text-sm font-mono text-white/60">
            Below are claim links you've created. Tap the link to copy, then send to a friend. 
            Anyone with the link can claim. You can also reclaim at any time by tapping cancel.
          </p>

          <div className="space-y-4">
            {links.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-button rounded-lg p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-orange-500">{item.gift}</span>
                  <span className="font-mono">${item.value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="flex-1 glass-button rounded p-2 text-sm font-mono truncate cursor-pointer"
                    onClick={() => copyLink(item.link)}
                  >
                    {item.link}
                  </div>
                  {!item.claimed && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-50"
                      onClick={() => cancelGift(item.id)}
                      disabled={cancelingId !== null}
                    >
                      {cancelingId === item.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
                <div className="text-sm font-mono text-white/60">
                  Status: {item.claimed ? 'Claimed' : 'Unclaimed'}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </main>
  );
}