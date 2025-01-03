"use client";

import { Coins } from 'lucide-react';
import Link from 'next/link';

interface UserBalanceProps {
  balance: number;
}

export function UserBalance({ balance }: UserBalanceProps) {
  return (
    <Link href="/deposit">
      <div className="glass-button flex items-center gap-2 rounded-full px-4 py-2">
        <Coins className="h-4 w-4 text-orange-500" />
        <span className="text-sm font-mono">${balance}</span>
      </div>
    </Link>
  );
}