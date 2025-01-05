"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Gift } from '@/app/page';


const GIFTS: Omit<Gift, 'quantity'>[] = [
  { id: 1, name: 'Master Sword', price: 15, emoji: '⚔️', owned: 2 },
  { id: 2, name: 'Potion', price: 5, emoji: '🧪', owned: 0 },
  { id: 3, name: 'Shield', price: 10, emoji: '🛡️', owned: 1 },
  { id: 4, name: 'Bow', price: 8, emoji: '🏹', owned: 3 },
  { id: 5, name: 'Magic Scroll', price: 12, emoji: '📜', owned: 0 },
  { id: 6, name: 'Crystal', price: 7, emoji: '💎', owned: 0 },
  { id: 7, name: 'Crown', price: 20, emoji: '👑', owned: 0 },
  { id: 8, name: 'Key', price: 3, emoji: '🗝️', owned: 0 },
  { id: 9, name: 'Map', price: 2, emoji: '🗺️', owned: 0 },
  { id: 10, name: 'Chest', price: 15, emoji: '🎁', owned: 0 }
];

interface GiftDisplayProps {
  onGiftChange: (gift: Gift) => void;
  inventory: Record<number, number>;
}

export function GiftDisplay({ onGiftChange, inventory }: GiftDisplayProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const currentGift = {
    ...GIFTS[currentIndex],
    owned: inventory[GIFTS[currentIndex].id] || 0
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + GIFTS.length) % GIFTS.length);
    setQuantity(1);
    const newGift = GIFTS[(currentIndex - 1 + GIFTS.length) % GIFTS.length];
    onGiftChange({ 
      ...newGift, 
      quantity: 1,
      owned: inventory[newGift.id] || 0
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GIFTS.length);
    setQuantity(1);
    const newGift = GIFTS[(currentIndex + 1) % GIFTS.length];
    onGiftChange({ 
      ...newGift, 
      quantity: 1,
      owned: inventory[newGift.id] || 0
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(1, newQuantity);
    setQuantity(validQuantity);
    onGiftChange({ ...currentGift, quantity: validQuantity });
  };

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
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
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