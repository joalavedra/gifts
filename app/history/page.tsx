"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/layout/page-header';
import { Copy, X } from 'lucide-react';
import { toast } from "sonner";
import { motion } from 'framer-motion';

interface ClaimLink {
  link: string;
  asset: string;
  timestamp: number;
  emoji?: string;
}

function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(new Date(timestamp));
}

export default function HistoryPage() {
  const [links, setLinks] = useState<ClaimLink[]>([]);

  useEffect(() => {
    const storedLinks = localStorage.getItem('giftLinks');
    if (storedLinks) {
      const parsedLinks = JSON.parse(storedLinks);
      // Sort by timestamp, most recent first
      const sortedLinks = parsedLinks.sort((a: ClaimLink, b: ClaimLink) => 
        b.timestamp - a.timestamp
      );
      setLinks(sortedLinks);
    }
  }, []);

  const copyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success('Link copied!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const removeLink = (link: string) => {
    const updatedLinks = links.filter(item => item.link !== link);
    localStorage.setItem('giftLinks', JSON.stringify(updatedLinks));
    setLinks(updatedLinks);
    toast.success('Link removed from history');
  };

  return (
    <main className="min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <Card className="glass-card border-none p-8 space-y-6">
          <PageHeader title="Transfer History" />

          <p className="text-sm font-inter text-white/80">
            Below are claim links you've created. Tap the link to copy, then send to a friend. 
            Anyone with the link can claim. You can also remove links from history.
          </p>

          <div className="space-y-4">
            {links.length === 0 ? (
              <div className="text-center text-white/60 py-8 font-inter">
                No stables sent yet
              </div>
            ) : (
              links.map((item, index) => (
                <div 
                  key={index}
                  className="glass-button rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center gap-2 text-white/80 font-inter">
                    <button 
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      onClick={() => copyLink(item.link)}
                    >
                      <Copy className="h-4 w-4 text-emerald-500" />
                    </button>
                    <span>{item.asset}</span>
                    <span className="text-sm opacity-60">{formatDate(item.timestamp)}</span>
                    <button 
                      className="ml-auto p-2 hover:bg-white/10 rounded-lg transition-colors"
                      onClick={() => removeLink(item.link)}
                    >
                      <X className="h-4 w-4 text-emerald-500" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {links.length > 0 && (
            <p className="text-xs text-center text-white/60 font-inter">
              Links expire after 24 hours
            </p>
          )}
        </Card>
      </motion.div>
    </main>
  );
}