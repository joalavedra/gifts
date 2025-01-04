"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Copy } from 'lucide-react';
import Link from 'next/link';
import { toast } from "sonner";
import { motion } from 'framer-motion';

export default function DepositPage() {
  const depositAddress = '0x1e2cbD72d20B18464B5ccA70...';

  const copyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
    toast.success('Address copied to clipboard');
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
                  {depositAddress}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                  onClick={copyAddress}
                >
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}