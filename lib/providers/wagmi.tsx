"use client";

import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected } from 'wagmi/connectors'

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http()
  },
  connectors: [
    injected({
      target: 'com.rapidfire.id'  // This targets your specific wallet
    })
  ]
});

const queryClient = new QueryClient();

export function WagmiConfig({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}