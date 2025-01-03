"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/layout/page-header';
import { Copy, X } from 'lucide-react';
import { toast } from "sonner";
import { motion } from 'framer-motion';

interface ClaimLink {
  id: string;
  emoji: string;
  quantity: number;
  timestamp: string;
  link: string;
}

export default function HistoryPage() {
  const [links] = useState<ClaimLink[]>([
    { 
      id: '1', 
      emoji: '😊',
      quantity: 1, 
      timestamp: 'Dec 23, 07:13pm',
      link: 'https://giftquest.app/claim/abc123' 
    }
  ]);

  const copyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success('Link copied!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const cancelClaim = async (id: string) => {
    toast.success('Gift reclaimed successfully');
  };

  return (
    <main className="min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <Card className="glass-card border-none p-8 space-y-6">
          <PageHeader title="Gift History" />

          <p className="text-sm font-mono text-white/80">
            Below are claim links you've created. Tap the link to copy, then send to a friend. 
            Anyone with the link can claim. You can also reclaim at any time by tapping cancel.
          </p>

          <div className="space-y-4">
            {links.map((item) => (
              <div 
                key={item.id}
                className="glass-button rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center gap-2 text-white/80 font-mono">
                  <button 
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => copyLink(item.link)}
                  >
                    <Copy className="h-4 w-4 text-orange-500" />
                  </button>
                  <span>{item.emoji}</span>
                  <span>{item.quantity}</span>
                  <span className="text-sm opacity-60">{item.timestamp}</span>
                  <button 
                    className="ml-auto p-2 hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => cancelClaim(item.id)}
                  >
                    <X className="h-4 w-4 text-orange-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </main>
  );
}