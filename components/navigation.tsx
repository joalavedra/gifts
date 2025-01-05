"use client";

import { Button } from '@/components/ui/button';
import { 
  Send, 
  Wallet,
  ArrowUpRight, 
  History, 
  Info, 
  LogOut,
  Menu
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAccount, useDisconnect } from 'wagmi';
import { useCallback } from 'react';

export function Navigation() {
  const { disconnect } = useDisconnect();
  const { connector } = useAccount();

  const handleDisconnectWallet = useCallback(async() => {
    disconnect();
    const provider = await connector?.getProvider();
    (provider as any).disconnect(); // this is needed because wagmi isn't calling the providers disconnect method
    location.reload();
  }, [disconnect]);

  const menuItems = [
    { icon: Send, label: 'Send Gift', href: '/send' },
    { icon: Wallet, label: 'Deposit', href: '/deposit' },
    { icon: ArrowUpRight, label: 'Withdraw', href: '/withdraw' },
    { icon: History, label: 'History', href: '/history' },
    { icon: Info, label: 'About', href: '/about' },
    { icon: LogOut, label: 'Logout', onClick: () => handleDisconnectWallet() },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start"
        className="w-56 glass-card border-none text-white"
      >
        {menuItems.map((item, index) => (
          item.onClick ? (
            <DropdownMenuItem
              key={index}
              onClick={item.onClick}
              className="flex items-center gap-3 py-3 hover:bg-white/10 cursor-pointer"
            >
              <item.icon className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-mono">{item.label}</span>
            </DropdownMenuItem>
          ) : (
            <Link key={index} href={item.href}>
              <DropdownMenuItem className="flex items-center gap-3 py-3 hover:bg-white/10 cursor-pointer">
                <item.icon className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-mono">{item.label}</span>
              </DropdownMenuItem>
            </Link>
          )
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}