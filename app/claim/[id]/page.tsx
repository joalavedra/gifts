"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import type { GiftClaim } from '@/lib/types/gift-claim';
import { GIFTS } from '@/lib/constants/gifts';

export default function ClaimPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [claim, setClaim] = useState<GiftClaim | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchClaim() {
      try {
        const response = await fetch(`/api/claims?id=${params.id}`);
        const data = await response.json();
        
        if (data.success) {
          setClaim(data.data);
        } else {
          router.push(`/claim/${params.id}/claimed`);
        }
      } catch (error) {
        toast.error('Failed to load gift details');
      } finally {
        setIsLoading(false);
      }
    }

    fetchClaim();
  }, [params.id, router]);

  const handleClaim = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/claims/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: params.id,
          claimedBy: 'user-address' // Replace with actual user address
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success("Gift claimed successfully!");
        setTimeout(() => {
          router.push(`/claim/${params.id}/claimed`);
        }, 1500);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error('Failed to claim gift');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#E60012] text-white p-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-[#ffffff20] border-none p-8 text-center">
            <div className="animate-pulse">Loading gift details...</div>
          </Card>
        </div>
      </main>
    );
  }

  if (!claim) {
    return router.push(`/claim/${params.id}/claimed`);
  }

  const gift = GIFTS.find(g => g.id === claim.giftId);

  return (
    <main className="min-h-screen bg-[#E60012] text-white p-4">
      <div className="max-w-md mx-auto">
        <Card className="bg-[#ffffff20] border-none p-8 text-center space-y-6">
          <h1 className="text-xl mb-4">You got {claim.quantity} {gift?.name}!</h1>
          
          <div className="text-lg">
            {gift?.emoji} {claim.quantity} = ${(gift?.price ?? 0) * claim.quantity}
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
            disabled={isLoading}
          >
            {isLoading ? 'Claiming...' : 'Claim to enjoy'}
          </Button>

          <div className="text-xs opacity-80">
            <Link href="/">
              Want to send your own gifts? Click here
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}