'use client';

import { motion } from 'framer-motion';
import { useAccount, useReadContract } from 'wagmi';
import { useState } from 'react';
import { GiftDisplay } from '@/components/gift-display';
import { MainActions } from '@/components/main-actions';
import { UserBalance } from '@/components/user-balance';
import { Navigation } from '@/components/navigation';
import { CONTRACTS } from '@/lib/contracts/config';

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
    address: CONTRACTS.USDC.address ,
    functionName: "balanceOf",
    abi: CONTRACTS.USDC.abi,
    args: [address!],
    query: { refetchInterval: 1000 }
  });

  const [currentGift, setCurrentGift] = useState<Gift>({ 
    id: 0,
    name: 'Candy Cane',
    price: 1,
    emoji: '🍬',
    owned: 0,
    quantity: 0
  });

  const handleGiftChange = (gift: Gift) => {
    setCurrentGift({ ...gift });
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
          <h1 className="text-sm font-inter text-emerald-500">Email to Stables</h1>
          <UserBalance balance={balance as bigint ?? 0} />
        </header>

        <div className="space-y-6">
          <GiftDisplay 
            onGiftChange={handleGiftChange} 
          />
          <MainActions 
            currentGift={currentGift}
            balance={balance as bigint ?? 0}
          />
        </div>
      </motion.div>
    </main>
  );
}