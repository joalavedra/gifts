import { useState } from 'react';
import { GIFTS } from '@/lib/constants/gifts';

export type Gift = {
  id: number;
  name: string;
  price: number;
  emoji: string;
  owned: number;
  quantity: number;
};

export function useGifts() {
  const [currentGift, setCurrentGift] = useState<Gift>({ 
    ...GIFTS[0],
    owned: 0,
    quantity: 1
  });
  
  const [inventory, setInventory] = useState<Record<number, number>>({});

  const handleGiftChange = (gift: Gift) => {
    setCurrentGift({ ...gift, quantity: 1 });
  };

  const handlePurchase = (gift: Gift, quantity: number, balance: number) => {
    const totalCost = gift.price * quantity;
    if (balance >= totalCost) {
      setInventory(prev => ({
        ...prev,
        [gift.id]: (prev[gift.id] || 0) + quantity
      }));
      setCurrentGift(prev => ({
        ...prev,
        owned: (inventory[gift.id] || 0) + quantity
      }));
      return totalCost;
    }
    return 0;
  };

  return {
    currentGift,
    inventory,
    handleGiftChange,
    handlePurchase
  };
}