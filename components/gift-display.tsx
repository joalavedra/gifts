"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Gift } from '@/app/page';
import { useAccount, useReadContract } from 'wagmi';
import { CONTRACTS } from '@/lib/contracts/config';

const GIFTS: Omit<Gift, 'quantity'>[] = [
  { id: 0, name: 'Banknote', price: 1, emoji: '💵', owned: 0 },
  { id: 1, name: 'Money with winds', price: 2, emoji: '💸', owned: 0 },
];

interface GiftDisplayProps {
  onGiftChange: (gift: Gift) => void;
}

export function GiftDisplay({ onGiftChange }: GiftDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { address } = useAccount();
  const [quantity, setQuantity] = useState(1);
  
  const { data: onchainInventory, isSuccess } = useReadContract({
    abi: CONTRACTS.GIFT_TOKEN.abi,
    address: CONTRACTS.GIFT_TOKEN.address,
    functionName: "balanceOfBatch",
    args: [[address!, address!], [BigInt(0), BigInt(1)]],
    query: { refetchInterval: 1000 },
  });

  // Get current gift with updated inventory from both props and onchain data
  const getCurrentGift = (index: number): Gift => {
    const baseGift = GIFTS[index];
    let ownedAmount = 0;

    // Update owned amount if onchain data is available
    if (isSuccess && onchainInventory) {
      const onchainAmount = Number(onchainInventory[baseGift.id]);
      ownedAmount = onchainAmount;
    }

    return {
      ...baseGift,
      owned: ownedAmount,
      quantity: quantity
    };
  };

  // Effect to sync gift changes with parent
  useEffect(() => {
    onGiftChange(getCurrentGift(currentIndex));
  }, [currentIndex, quantity, onchainInventory, isSuccess]);

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + GIFTS.length) % GIFTS.length;
    setCurrentIndex(newIndex);
    setQuantity(1);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % GIFTS.length;
    setCurrentIndex(newIndex);
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(1, newQuantity);
    setQuantity(validQuantity);
  };

  const currentGift = getCurrentGift(currentIndex);

  return (
    <div className="relative">
      <Card className="glass-card border-none p-8">
        <div className="text-sm font-inter mb-6 text-emerald-500">
          {currentGift.name} = ${currentGift.price}
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="flex items-center justify-center gap-6">
            <div className="text-6xl">{currentGift.emoji}</div>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value) || 1;
                handleQuantityChange(newQuantity);
              }}
              className="w-20 text-center bg-white/10 border-white/20 text-white text-xl h-14 font-inter"
              min="1"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="mt-6 text-xs font-inter text-white/60">
          You have: {currentGift.owned}
        </div>
      </Card>
    </div>
  );
}