"use client";

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { WalletLogo } from './WalletLogo';
import { getProvider } from '@/lib/wallet/config';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function ConnectButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const connectWallet = useCallback(async () => {
    setIsLoading(true);
    try {
      const provider = getProvider();
      const [address] = await provider.request({
        method: 'eth_requestAccounts',
      });
      
      if (address) {
        router.push('/app');
      }
    } catch (error) {
      toast.error('Failed to connect wallet');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <Button 
      onClick={connectWallet}
      disabled={isLoading}
      className="w-full py-4 glass-button hover:bg-orange-500/20 text-white rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
    >
      <WalletLogo />
      {isLoading ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
}