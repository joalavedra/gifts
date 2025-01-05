"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/page-header';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Copy, Link as LinkIcon, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function SendPage() {
  const [isCopying, setIsCopying] = useState(false);
  const claimLink = 'https://giftquest.app/claim/abc123';

  const copyLink = async () => {
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(claimLink);
      toast.success('Gift link copied!');
    } catch (error) {
      toast.error('Failed to copy link');
    } finally {
      setIsCopying(false);
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
          <PageHeader title="Send Gift" />

          <div className="flex justify-center">
            <motion.div 
              className="relative w-32 h-32"
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img
                src="https://www.outletbebe.es/media/catalog/product/cache/1/image/350x350/9df78eab33525d08d6e5fb8d27136e95/r/e/regalo.jpg"
                alt="Flying Gift"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>

          <div className="space-y-4 text-white/80 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-orange-500" />
              <p className="text-sm">1 good morning sunshine is now claimable</p>
            </div>
            <div className="flex items-center gap-2">
              <Copy className="h-4 w-4 text-orange-500" />
              <p className="text-sm">Copy link and send to a friend</p>
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-orange-500" />
              <p className="text-sm">View all your claim links</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={copyLink}
              className="glass-button hover:bg-white/20 text-white font-mono"
            >
              {isCopying ? 'Copied ✓' : 'Copy link'}
            </Button>
            <Link href="/history">
              <Button
                className="w-full glass-button hover:bg-white/20 text-white font-mono"
              >
                View links
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}