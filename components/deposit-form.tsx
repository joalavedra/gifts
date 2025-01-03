"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Copy } from 'lucide-react';
import Link from 'next/link';
import { toast } from "sonner";

export function DepositForm() {
  const [depositAddress] = useState('0x1e2cbD72d20B18464B5ccA70...');

  const copyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
    toast.success('Address copied to clipboard');
  };

  return (
    <Card className="bg-[#ffffff20] border-none p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/app">
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#ffffff20]">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl">Deposit USDC</h1>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      <div className="text-center space-y-2">
        <div className="text-4xl font-bold">$50</div>
        <div className="text-sm opacity-80">Current Balance</div>
      </div>

      <div className="space-y-4">
        <Button 
          className="w-full bg-white text-[#E60012] hover:bg-white/90"
          onClick={() => toast.error("Payment integration not implemented")}
        >
          Deposit with Card
        </Button>

        <div className="text-center text-sm opacity-80">OR</div>

        <div className="space-y-2">
          <div className="text-sm">Send USDC (BASE ONLY) to this address:</div>
          <div className="flex gap-2">
            <div className="flex-1 bg-[#ffffff30] rounded-lg p-3 text-sm truncate">
              {depositAddress}
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-[#ffffff20]"
              onClick={copyAddress}
            >
              <Copy className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}