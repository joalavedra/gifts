"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from "sonner";
import { useAccount, useReadContract } from 'wagmi';
import { USDCabi } from '@/app/utils/abi';
import { formatUnits } from 'viem';

export function WithdrawForm() {
  const [address, setAddress] = useState('');
  const { address: walletAddress } = useAccount();


    const { data: balance } = useReadContract({
      address: "0x42847D8FAff45c72A92Cce9458Fe622001463dF0",
      functionName: "balanceOf",
      abi: USDCabi,
      args: [walletAddress],
    })
  
  const handleWithdraw = () => {
    if (!address) {
      toast.error('Please enter a withdrawal address');
      return;
    }
    toast.success('Withdrawal initiated');
  };

  return (
    <Card className="bg-[#ffffff20] border-none p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#ffffff20]">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl">Withdraw USDC</h1>
        <div className="w-10" />
      </div>

      <div className="text-center space-y-2">
      <div className="text-4xl font-mono">{`$ ${balance ? formatUnits(balance as bigint, 6):0}`}</div>
      <div className="text-sm opacity-80">Available Balance</div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm">USDC Address (SEPOLIA ANCIENT8)</label>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your USDC address"
            className="bg-[#ffffff30] border-none text-white placeholder:text-white/50"
          />
        </div>

        <Button 
          className="w-full bg-white text-[#E60012] hover:bg-white/90"
          onClick={handleWithdraw}
        >
          Withdraw
        </Button>
      </div>
    </Card>
  );
}