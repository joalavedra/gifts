"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { GIFTS } from '@/lib/constants/gifts';
import { useAccount } from 'wagmi';

export default function ClaimPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [giftInfo, setGiftInfo] = useState<{ assetId: string } | null>(null);

  useEffect(() => {
    async function fetchGiftInfo() {
      try {
        const encryptedData = JSON.parse(decodeURIComponent(params.id));
        const response = await fetch('/api/decrypt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(encryptedData)
        });

        if (!response.ok) {
          throw new Error('Failed to load stables info');
        }

        const { decryptedData } = await response.json();
        setGiftInfo(decryptedData);
      } catch (error) {
        toast.error('Invalid stable link');
        router.push('/invalid');
      } finally {
        setIsInitialLoading(false);
      }
    }

    fetchGiftInfo();
  }, [params.id, router]);

  const handleClaim = async () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsClaimLoading(true);
    try {
      const response = await fetch('/api/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          encryptedData: JSON.parse(decodeURIComponent(params.id)),
          toAddress: address
        })
      });

      if (!response.ok) {
        throw new Error('Failed to claim stable');
      }

      toast.success("Stable claimed successfully!");
      const { hash } = await response.json();
      router.push(`/claim/${params.id}/claimed?hash=${hash}`);
    } catch (error) {
      toast.error('Failed to claim stable');
      setIsClaimLoading(false);
    }
  };

  if (isInitialLoading) {
    return (
      <main className="min-h-screen bg-[#E60012] text-white p-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-[#ffffff20] border-none p-8 text-center">
            <div className="animate-pulse">Loading stablecoins details...</div>
          </Card>
        </div>
      </main>
    );
  }

  if (!giftInfo) return null;

  const gift = GIFTS.find(g => g.id === Number(giftInfo.assetId));
  if (!gift) return null;

  return (
    <main className="min-h-screen bg-[#E60012] text-white p-4">
      <div className="max-w-md mx-auto">
        <Card className="bg-[#ffffff20] border-none p-8 text-center space-y-6">
          <h1 className="text-xl mb-4">You got 1 {gift.name}!</h1>
          
          <div className="text-lg">
            {gift.emoji} 1 = ${gift.price}
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
            className="w-full bg-white text-[#E60012] hover:bg-white/90 transition-all duration-200"
            onClick={handleClaim}
            disabled={isClaimLoading}
          >
            {isClaimLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Claiming...
              </span>
            ) : (
              'Claim to enjoy'
            )}
          </Button>

          <div className="text-xs opacity-80">
            <Link href="/" className="hover:opacity-100 transition-opacity">
              Want to send stables? Click here
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}