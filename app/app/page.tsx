"use client";

import { GiftDisplay } from '@/components/gift-display';
import { MainActions } from '@/components/main-actions';
import { UserBalance } from '@/components/user-balance';
import { Navigation } from '@/components/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

export type Gift = {
  id: number;
  name: string;
  price: number;
  emoji: string;
  owned: number;
  quantity: number;
};

export default function AppPage() {
  const [balance, setBalance] = useState(50);
  const [currentGift, setCurrentGift] = useState<Gift>({ 
    id: 1,
    name: 'Master Sword',
    price: 15,
    emoji: '⚔️',
    owned: 2,
    quantity: 1
  });
  const [inventory, setInventory] = useState<Record<number, number>>({
    1: 2, // Master Sword: 2
    3: 1, // Shield: 1
    4: 3  // Bow: 3
  });

  const handleGiftChange = (gift: Gift) => {
    setCurrentGift({ ...gift, quantity: 1 });
  };

  const handlePurchase = (gift: Gift, quantity: number) => {
    const totalCost = gift.price * quantity;
    if (balance >= totalCost) {
      setBalance(prev => prev - totalCost);
      setInventory(prev => ({
        ...prev,
        [gift.id]: (prev[gift.id] || 0) + quantity
      }));
      setCurrentGift(prev => ({
        ...prev,
        owned: (inventory[gift.id] || 0) + quantity
      }));
      return true;
    }
    return false;
  };

  return (
    <main className="min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-6"
      >
        <header className="flex items-center justify-between p-3 glass-card rounded-2xl">
          <Navigation />
          <h1 className="text-sm font-mono text-orange-500">GiftQuest</h1>
          <UserBalance balance={balance} />
        </header>

        <div className="space-y-6">
          <GiftDisplay 
            onGiftChange={handleGiftChange} 
            inventory={inventory}
          />
          <MainActions 
            currentGift={currentGift}
            balance={balance}
            onPurchase={handlePurchase}
          />
        </div>
      </motion.div>
    </main>
  );
}