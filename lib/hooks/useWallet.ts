"use client";

import { useState, useEffect } from 'react';
import { getProvider } from '@/lib/wallet/config';
import { getWalletErrorMessage } from '@/lib/wallet/errors';
import { toast } from 'sonner';

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getWalletAddress() {
      try {
        const provider = getProvider();
        const [walletAddress] = await provider.request({
          method: 'eth_requestAccounts',
        });
        setAddress(walletAddress);
      } catch (error: any) {
        toast.error(getWalletErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    getWalletAddress();
  }, []);

  return { address, isLoading };
}