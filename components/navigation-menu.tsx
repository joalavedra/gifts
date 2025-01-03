"use client";

import { Button } from '@/components/ui/button';
import { 
  Send, 
  Wallet,
  ArrowUpRight, 
  History, 
  Info, 
  LogOut 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function NavigationMenu() {
  const router = useRouter();

  const menuItems = [
    { icon: Send, label: 'Send Gift', href: '/app' },
    { icon: Wallet, label: 'Deposit', href: '/deposit' },
    { icon: ArrowUpRight, label: 'Withdraw', href: '/withdraw' },
    { icon: History, label: 'History', href: '/history' },
    { icon: Info, label: 'About', href: '/about' },
    { icon: LogOut, label: 'Logout', onClick: () => router.push('/') },
  ];

  return (
    <nav className="mt-8">
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.onClick ? (
              <Button
                variant="ghost"
                className="w-full justify-start gap-4 text-white hover:bg-[#ffffff20]"
                onClick={item.onClick}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            ) : (
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-4 text-white hover:bg-[#ffffff20]"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}