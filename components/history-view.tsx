"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Copy, X } from 'lucide-react';
import Link from 'next/link';
import { toast } from "sonner";

export function HistoryView() {
  const [links] = useState([
    { id: 1, gift: 'Master Sword', value: 15, claimed: false, link: 'https://pixelpresents.app/claim/abc123' },
    { id: 2, gift: 'Pokédex', value: 10, claimed: true, link: 'https://pixelpresents.app/claim/def456' },
  ]);

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard');
  };

  const cancelGift = (id: number) => {
    toast.success('Gift cancelled and returned to your inventory');
  };

  return (
    <Card className="bg-[#ffffff20] border-none p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#ffffff20]">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl">Gift History</h1>
        <div className="w-10" />
      </div>

      <div className="space-y-4">
        <p className="text-sm">
          Below are claim links you've created. Tap the link to copy, then send to a friend. 
          Anyone with the link can claim. You can also reclaim at any time by tapping cancel.
        </p>

        {links.map((item) => (
          <div key={item.id} className="bg-[#ffffff30] rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold">{item.gift}</span>
              <span>${item.value}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="flex-1 bg-[#ffffff20] rounded p-2 text-sm truncate cursor-pointer"
                onClick={() => copyLink(item.link)}
              >
                {item.link}
              </div>
              {!item.claimed && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-[#ffffff30]"
                  onClick={() => cancelGift(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="text-sm">
              Status: {item.claimed ? 'Claimed' : 'Unclaimed'}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}