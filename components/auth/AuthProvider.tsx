'use client';

import { useAccount, useConnect } from 'wagmi';
import { useEffect, useCallback } from 'react';
import { ecosystemWalletInstance } from '@/app/utils/ecosystemWallet';
import { Button } from '@/components/ui/button';
import { RapidFireLogo } from '@/components/ui/rapid-fire-logo';

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
      <main className="min-h-screen flex items-center justify-center p-4">
        <Button
          onClick={connectWallet}
          className="mx-auto flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
        >
          <RapidFireLogo className="w-4 h-4" /> Sign in with Rapid Fire
        </Button>
      </main>
    );
  }

  return children;
}