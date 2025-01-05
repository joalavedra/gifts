'use client';

import { motion } from 'framer-motion';
import { useAccount, useReadContract } from 'wagmi';
import { useState } from 'react';
import { USDCabi } from '@/app/utils/abi';
import { GiftDisplay } from '@/components/gift-display';
import { MainActions } from '@/components/main-actions';
import { UserBalance } from '@/components/user-balance';
import { Navigation } from '@/components/navigation';

export type Gift = {
  id: number;
  name: string;
  price: number;
  emoji: string;
  owned: number;
  quantity: number;
};

export default function WelcomePage() {
  const { address } = useAccount();
  
  const { data: balance } = useReadContract({
    address: "0x42847D8FAff45c72A92Cce9458Fe622001463dF0",
    functionName: "balanceOf",
    abi: USDCabi,
    args: [address],
  });

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
    if ((balance as number ?? 0) >= totalCost) {
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
          <UserBalance balance={balance as bigint ?? 0} />
        </header>

        <div className="space-y-6">
          <GiftDisplay 
            onGiftChange={handleGiftChange} 
            inventory={inventory}
          />
          <MainActions 
            currentGift={currentGift}
            balance={balance as bigint ?? 0}
            onPurchase={handlePurchase}
          />
        </div>
      </motion.div>
    </main>
  );
}