"use client";

import { Button } from '@/components/ui/button';
import { ShoppingCart, Send, Gift, Loader2 } from 'lucide-react';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNFTActions } from '@/lib/hooks/useNFTActions';
import { Gift as GiftType } from '@/app/page';

interface MainActionsProps {
  currentGift: GiftType;
  balance: bigint;
  onPurchase: (gift: GiftType, quantity: number) => boolean;
}

export function MainActions({ currentGift, balance, onPurchase }: MainActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const { buyGift, sendGift, redeemGift, isContractLoading } = useNFTActions();

  const handleAction = async (action: string) => {
    if (isContractLoading) return;
    
    setLoading(action);
    
    try {
      switch (action) {
        case 'buy': {
          const totalCost = currentGift.price * currentGift.quantity;
          if (balance < totalCost) {
            toast.error(`Insufficient balance. Need $${totalCost} but only have $${balance}`);
            return;
          }

          const success = await buyGift(currentGift, currentGift.quantity);
          if (success && onPurchase(currentGift, currentGift.quantity)) {
            toast.success(`Purchased ${currentGift.quantity} ${currentGift.name} for $${totalCost}`);
          }
          break;
        }

        case 'send': {
          if (currentGift.owned <= 0) {
            toast.error("You don't own any of this item to send");
            return;
          }

          if (currentGift.owned < currentGift.quantity) {
            toast.error(`You only have ${currentGift.owned} ${currentGift.name} available`);
            return;
          }

          // Encode the gift data and navigate to send page
          const giftParam = encodeURIComponent(JSON.stringify(currentGift));
          router.push(`/send?asset=${giftParam}`);
          break;
        }

        case 'redeem': {
          if (currentGift.owned <= 0) {
            toast.error("You don't own any of this item to redeem");
            return;
          }
          const success = await redeemGift(currentGift, currentGift.owned);
          if (success) {
            const redeemValue = currentGift.price * currentGift.owned;
            toast.success(`Redeemed successfully! $${redeemValue} added to your balance`);
          }
          break;
        }
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {['buy', 'send', 'redeem'].map((action) => (
          <motion.div
            key={action}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <Button 
              variant="secondary" 
              className="glass-button flex flex-col items-center gap-2 h-auto py-4 w-full disabled:opacity-50"
              onClick={() => handleAction(action)}
              disabled={loading !== null || isContractLoading}
            >
              {loading === action ? (
                <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
              ) : (
                <>
                  {action === 'buy' && <ShoppingCart className="h-5 w-5 text-orange-500" />}
                  {action === 'send' && <Send className="h-5 w-5 text-orange-500" />}
                  {action === 'redeem' && <Gift className="h-5 w-5 text-orange-500" />}
                </>
              )}
              <span className="text-xs font-mono capitalize">{action}</span>
            </Button>
          </motion.div>
        ))}
      </div>

      <Link 
        href="/claim/test" 
        className="block text-center text-xs font-mono text-white/60 hover:text-orange-500 transition-colors"
      >
        Test Claim Page
      </Link>
    </div>
  );
}