"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, Share2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function SendPage() {
  const [giftLink] = useState('https://pixelpresents.app/claim/abc123');
  const [loading, setLoading] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(giftLink);
    toast.success('Gift link copied to clipboard!');
  };

  const shareLink = async () => {
    setLoading(true);
    try {
      await navigator.share({
        title: 'GiftQuest Gift',
        text: 'I sent you a gift! Click to claim:',
        url: giftLink,
      });
    } catch (err) {
      copyLink();
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-xl font-mono text-orange-500">Send Gift</h1>
            <div className="w-10" />
          </div>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
              className="text-6xl mb-4"
            >
              🎁
            </motion.div>
            <p className="text-lg font-mono mb-2">Your gift is ready to send!</p>
            <p className="text-sm font-mono text-white/60">Share this link with anyone to claim the gift</p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 glass-button rounded-lg p-3 text-sm font-mono truncate">
                {giftLink}
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10"
                onClick={copyLink}
              >
                <Copy className="h-5 w-5" />
              </Button>
            </div>

            <Button 
              className="w-full glass-button hover:bg-white/20 text-white py-6 font-mono gap-3 disabled:opacity-50"
              onClick={shareLink}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Share2 className="h-5 w-5" />
                  Share Gift Link
                </>
              )}
            </Button>
          </div>

          <div className="text-sm font-mono text-center text-white/60">
            The recipient will be able to claim this gift using the link
          </div>
        </Card>
      </motion.div>
    </main>
  );
}