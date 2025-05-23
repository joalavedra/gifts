"use client";

import { WagmiProvider, createConfig, http } from 'wagmi';
import { ancient8Sepolia, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected } from 'wagmi/connectors'

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http()
  },
  ssr: true,
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