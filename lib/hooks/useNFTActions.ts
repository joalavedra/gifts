"use client";

import { useState, useEffect } from 'react';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useWriteContracts } from 'wagmi/experimental'
import { CONTRACTS } from '@/lib/contracts/config';
import { toast } from 'sonner';
import { Gift } from './useGifts';
import { parseUnits } from 'viem';

export function useNFTActions() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { data: hash, isPending: isWritePending, error: writeError, writeContracts } = useWriteContracts();
  console.log('writeError', writeError);
  const {
    data: receipt,
    error: waitError,
    isLoading: isWaitLoading
  } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}`,
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

  const handleTransaction = async (interactions: {
    functionName: string,
    args: unknown[],
    value?: bigint,
    contract: typeof CONTRACTS.GIFT_TOKEN | typeof CONTRACTS.USDC
  }[]): Promise<boolean> => {
    try {
      writeContracts({
        contracts: interactions.map(({ functionName, args, value, contract }) => ({
          address: contract.address,
          abi: contract.abi,
          functionName,
          args,
          value
        }))
      });

      // Return true if we get here without error
      return !writeError;
    } catch (error: any) {
      toast.error(error.message || 'Transaction failed');
      return false;
    }
  };

  const buyGift = async (gift: Gift, quantity: number) => {
    if (!address) {
      toast.error('Please connect your wallet');
      return false;
    }

    const value = parseUnits(String(gift.price * quantity), 6);
    const giftPrice = parseUnits(String(gift.price), 6);
    console.log('gift', gift);
    const proof = [
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    ];
    const quantityLimitPerWallet = 1
    const allowlistProof = [
      proof,
      quantityLimitPerWallet,
      giftPrice,
      CONTRACTS.USDC.address,
    ];
    return handleTransaction([
      { contract: CONTRACTS.USDC, args: [CONTRACTS.GIFT_TOKEN.address, value], functionName: 'approve' },
      { contract: CONTRACTS.GIFT_TOKEN, args: [address, gift.id, quantity, CONTRACTS.USDC.address, giftPrice, allowlistProof, '0x'], functionName: 'claim' }
    ]);
  };

  const sendGift = async (gift: Gift, quantity: number, toAddress: string) => {
    if (!address) {
      toast.error('Please connect your wallet');
      return false;
    }

    return handleTransaction([{ contract: CONTRACTS.GIFT_TOKEN, args: [address, toAddress, BigInt(gift.id), BigInt(quantity), '0x'], functionName: 'safeTransferFrom' }]);
  };

  const redeemGift = async (gift: Gift, quantity: number) => {
    if (!address) {
      toast.error('Please connect your wallet');
      return false;
    }

    return handleTransaction([{ args: [address, BigInt(gift.id), BigInt(quantity)], functionName: 'burn', contract: CONTRACTS.GIFT_TOKEN }]);
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