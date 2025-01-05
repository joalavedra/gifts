"use client";

import { WagmiProvider, createConfig, http } from 'wagmi';
import { base, polygonAmoy } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected } from 'wagmi/connectors'

const config = createConfig({
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http()
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