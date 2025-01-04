"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const GIFT_DATA = {
  'test': {
    name: "Bow",
    quantity: 1,
    price: 8,
    emoji: "🏹"
  },
  'abc123': {
    name: "Master Sword",
    quantity: 1,
    price: 15,
    emoji: "⚔️"
  }
};

export default function ClaimPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const giftData = GIFT_DATA[params.id as keyof typeof GIFT_DATA] || GIFT_DATA.test;

  const handleClaim = () => {
    toast.success("Gift claimed successfully!");
    // Simulate a brief delay before redirecting
    setTimeout(() => {
      router.push(`/claim/${params.id}/claimed`);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#E60012] text-white p-4">
      <div className="max-w-md mx-auto">
        <Card className="bg-[#ffffff20] border-none p-8 text-center space-y-6">
          <h1 className="text-xl mb-4">You got {giftData.quantity} {giftData.name}!</h1>
          
          <div className="text-lg">
            {giftData.emoji} {giftData.quantity} = ${giftData.price.toFixed(2)}
          </div>

          <div className="text-6xl animate-bounce my-6">
            🎁
          </div>

          <div className="space-y-4">
            <h2 className="text-lg">What can you do with your tokens?</h2>
            
            <div className="space-y-3 text-left text-sm">
              <div className="flex items-center gap-3">
                <Gift className="h-4 w-4" />
                <span>Share the love by sending to a friend</span>
              </div>
              <div className="flex items-center gap-3">
                <span>🔄</span>
                <span>Redeem and shop other options</span>
              </div>
              <div className="flex items-center gap-3">
                <span>💰</span>
                <span>Cash out and withdraw to any wallet</span>
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-white text-[#E60012] hover:bg-white/90"
            onClick={handleClaim}
          >
            Claim to enjoy
          </Button>

          <div className="text-xs opacity-80">
            <Link href="/app">
              Want to send your own gifts? Click here
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}