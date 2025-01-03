"use client";

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS } from '@/lib/contracts/config';
import { toast } from 'sonner';
import type { Gift } from '@/lib/types/gift';
import { getProvider } from '@/lib/wallet/config';

export function useNFTActions() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { writeContract } = useWriteContract();

  const handleTransaction = async (
    functionName: string,
    args: unknown[],
    value?: bigint
  ) => {
    try {
      setIsLoading(true);
      
      // Get the provider to trigger RapidFire popup
      const provider = getProvider();
      
      // Request account access to ensure wallet is connected
      await provider.request({ method: 'eth_requestAccounts' });

      const { hash } = await writeContract({
        ...CONTRACTS.GIFT_TOKEN,
        functionName,
        args,
        value
      });

      const receipt = await useWaitForTransactionReceipt({ hash });
      
      if (receipt.status === 'success') {
        toast.success('Transaction successful!');
        return true;
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error: any) {
      if (error.code === 4001) {
        toast.error('Transaction rejected. Please try again.');
      } else {
        toast.error(error.message || 'Transaction failed');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const buyGift = async (gift: Gift, quantity: number) => {
    if (!address) {
      toast.error('Please connect your wallet');
      return false;
    }

    const value = BigInt(gift.price * quantity * 10**6); // Convert to USDC decimals
    return handleTransaction('mint', [address, BigInt(gift.id), BigInt(quantity), '0x'], value);
  };

  const sendGift = async (gift: Gift, quantity: number, toAddress: string) => {
    if (!address) {
      toast.error('Please connect your wallet');
      return false;
    }

    return handleTransaction('safeTransferFrom', [
      address,
      toAddress,
      BigInt(gift.id),
      BigInt(quantity),
      '0x'
    ]);
  };

  const redeemGift = async (gift: Gift, quantity: number) => {
    if (!address) {
      toast.error('Please connect your wallet');
      return false;
    }

    return handleTransaction('burn', [
      address,
      BigInt(gift.id),
      BigInt(quantity)
    ]);
  };

  return {
    buyGift,
    sendGift,
    redeemGift,
    isLoading
  };
}