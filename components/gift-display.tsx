"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Gift } from '@/app/page';

const GIFTS: Omit<Gift, 'quantity'>[] = [
  { id: 0, name: 'Master Sword', price: 1, emoji: '⚔️', owned: 0 },
  { id: 1, name: 'Potion', price: 2, emoji: '🧪', owned: 0 },
];

interface GiftDisplayProps {
  onGiftChange: (gift: Gift) => void;
  inventory: Record<number, number>;
}

export function GiftDisplay({ onGiftChange, inventory }: GiftDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Update the current gift with the correct inventory amount
  const getCurrentGift = (index: number): Gift => {
    const baseGift = GIFTS[index];
    return {
      ...baseGift,
      owned: inventory[baseGift.id] || 0,
      quantity: quantity
    };
  };

  // Effect to sync gift changes with parent
  useEffect(() => {
    onGiftChange(getCurrentGift(currentIndex));
  }, [currentIndex, quantity, inventory]);

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
        <div className="text-sm font-mono mb-6 text-orange-500">
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
              className="w-20 text-center bg-white/10 border-white/20 text-white text-xl h-14 font-mono"
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

        <div className="mt-6 text-xs font-mono text-white/60">
          You have: {currentGift.owned}
        </div>
      </Card>
    </div>
  );
}