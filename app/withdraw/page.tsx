"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from "sonner";
import { motion } from 'framer-motion';

export default function WithdrawPage() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!address) {
      toast.error('Please enter a withdrawal address');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate transaction
    toast.success('Withdrawal initiated');
    setLoading(false);
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
            <Link href="/app">
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-mono text-orange-500">Withdraw USDC</h1>
            <div className="w-10" />
          </div>

          <div className="text-center space-y-2">
            <div className="text-4xl font-mono">$50</div>
            <div className="text-sm font-mono text-white/60">Available Balance</div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-mono">USDC Address (BASE)</label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your USDC address"
                className="glass-button border-white/20 text-white font-mono placeholder:text-white/40"
              />
            </div>

            <Button 
              className="w-full glass-button hover:bg-white/20 text-white py-6 font-mono disabled:opacity-50"
              onClick={handleWithdraw}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Withdraw'
              )}
            </Button>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}