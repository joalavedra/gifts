"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

const EMOJIS = ['🎮', '⭐', '🎁', '🏆', '💫', '✨', '🌟', '🎯', '🎪', '🎨'];

const GIFTS = [
  {
    id: 1,
    name: 'Master Sword',
    price: 15,
    image: '/master-sword.png',
    game: 'The Legend of Zelda',
    owned: 0
  },
  // ... rest of the gifts remain the same
];

export function GiftCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const currentGift = GIFTS[currentIndex];
  const randomEmoji = EMOJIS[currentIndex % EMOJIS.length];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % GIFTS.length);
    setQuantity(1);
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + GIFTS.length) % GIFTS.length);
    setQuantity(1);
  };

  return (
    <div className="relative">
      <Card className="bg-[#ffffff20] border-none text-center p-8">
        <div className="text-2xl mb-6">
          ${(currentGift.price * quantity).toFixed(2)} {randomEmoji}
        </div>

        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={previous}
            className="text-white hover:bg-[#ffffff20]"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          
          <div className="flex-1 px-4">
            <h2 className="text-xl mb-2">{currentGift.name}</h2>
            <p className="text-sm opacity-80">{currentGift.game}</p>
            
            <div className="flex items-center justify-center mt-4">
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center bg-[#ffffff30] border-none text-white"
                min="1"
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            className="text-white hover:bg-[#ffffff20]"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>

        <div className="relative h-48 w-48 mx-auto">
          <Image
            src={currentGift.image}
            alt={currentGift.name}
            fill
            className="object-contain"
          />
        </div>

        <div className="mt-4 text-sm">
          Owned: {currentGift.owned}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {GIFTS.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-[#ffffff40]'
              }`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}