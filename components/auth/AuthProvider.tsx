'use client';

import { useAccount, useConnect } from 'wagmi';
import { useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { RapidFireLogo } from '@/components/ui/rapid-fire-logo';
import { ecosystemWalletInstance } from '@/lib/ecosystemWallet';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  
  useEffect(() => {
    ecosystemWalletInstance.getEthereumProvider({
      policy: process.env.NEXT_PUBLIC_POLICY_ID,
    });
  }, []);

  const { connectors, connect } = useConnect();
  
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
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">Pay any email. Anywhere.</h1>
          <p className="text-lg text-white/80">Send and receive payments from your email.</p>
        </div>
        <Button
          onClick={connectWallet}
          className="mx-auto flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
        >
          <RapidFireLogo className="w-4 h-4" /> Send money globally now
        </Button>
      </main>
    );
  }

  return children;
}