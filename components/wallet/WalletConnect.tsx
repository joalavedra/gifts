"use client";

import { RapidFireLogo } from "../ui/rapid-fire-logo";
import { Button } from "../ui/button";
import { useAccount, useConnect } from "wagmi";
import { useCallback, useEffect, useState } from "react";
import { ecosystemWalletInstance } from "../../app/utils/ecosystemWallet";

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

export function WalletConnect() {
  useEffect(() => {
    ecosystemWalletInstance.getEthereumProvider({
      policy: process.env.NEXT_PUBLIC_POLICY_ID,
    });
  }, []);
  
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  
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

  const connectWallet = useCallback(() => {
    const injectedConnector = connectors.find(
      (connector) => connector.id === 'com.rapidfire.id'
    );
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  }, [connectors, connect]);

  if (!isConnected) {
    return (
      <Button
        onClick={connectWallet}
        className="mx-auto flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
      >
        <RapidFireLogo className="w-4 h-4" /> Sign in with Rapid Fire
      </Button>
    );
  }

  return (
    <div className='space-y-6'>
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
    </div>
  );
}