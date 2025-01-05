"use client";

import { WagmiProvider, createConfig, http } from 'wagmi';
import { ancient8Sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected } from 'wagmi/connectors'

const config = createConfig({
  chains: [ancient8Sepolia],
  transports: {
    [ancient8Sepolia.id]: http()
  },
  connectors: [
    injected()]
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