"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Copy, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';

export default function DepositPage() {
  const { address } = useAccount();
  const [isCopying, setIsCopying] = useState(false);

  const copyAddress = async () => {
    if (!address) return;
    
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy address');
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <main className="min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <Card className="glass-card border-none p-8 space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-mono text-orange-500">Deposit USDC</h1>
            <div className="w-10" />
          </div>

          <div className="text-center space-y-2">
            <div className="text-4xl font-mono">$50</div>
            <div className="text-sm font-mono text-white/60">Current Balance</div>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full glass-button hover:bg-white/20 text-white py-6 font-mono"
              onClick={() => toast.error("Payment integration not implemented")}
            >
              Deposit with Card
            </Button>

            <div className="text-center text-sm font-mono text-white/60">OR</div>

            <div className="space-y-2">
              <div className="text-sm font-mono">Send USDC (BASE ONLY) to this address:</div>
              <div className="flex gap-2">
                <div className="flex-1 glass-button rounded-lg p-3 text-sm font-mono truncate">
                  {address}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                  onClick={copyAddress}
                  disabled={!address || isCopying}
                >
                  {isCopying ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}