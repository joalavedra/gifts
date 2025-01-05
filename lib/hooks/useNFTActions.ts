"use client";

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS } from '@/lib/contracts/config';
import { toast } from 'sonner';
import { Gift } from './useGifts';

export function useNFTActions() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { writeContract, data: hash, error: writeError, isPending: isWritePending } = useWriteContract();
  const {
    data: receipt,
    error: waitError,
    isLoading: isWaitLoading
  } = useWaitForTransactionReceipt({
    hash,
  });

  // Handle transaction status and errors
  useEffect(() => {
    if (writeError) {
      setIsLoading(false);
      toast.error(writeError.message || 'Transaction failed');

    }
  }, [writeError]);

  useEffect(() => {
    if (waitError) {
      setIsLoading(false);
      toast.error(waitError.message || 'Transaction failed');
    }
  }, [waitError]);

  useEffect(() => {
    if (receipt?.status === 'success') {
      setIsLoading(false);
      toast.success('Transaction successful!');
    } else if (receipt?.status === 'reverted') {
      setIsLoading(false);
      toast.error('Transaction failed');
    }
  }, [receipt]);

  useEffect(() => {
    setIsLoading(isWritePending || isWaitLoading);
  }, [isWritePending, isWaitLoading]);

  const handleTransaction = async (
    functionName: string,
    args: unknown[],
    value?: bigint
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      writeContract({
        ...CONTRACTS.GIFT_TOKEN,
        // @ts-ignore
        functionName,
        // @ts-ignore
        args,
        value
      });

      // Return true if we get here without error
      return true;
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message || 'Transaction failed');
      return false;
    }
  };

  const buyGift = async (gift: Gift, quantity: number) => {
    if (!address) {
      toast.error('Please connect your wallet');
      return false;
    }

    const value = BigInt(gift.price * quantity * 10 ** 6); // Convert to USDC decimals
    return handleTransaction('mint', [
      address,
      BigInt(gift.id),
      BigInt(quantity),
      '0x'
    ], value);
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
    isLoading,
    transactionHash: hash,
    receipt
  };
}