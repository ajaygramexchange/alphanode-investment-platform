// components/providers/WagmiProvider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia, polygon } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";
import { ReactNode } from "react";

const config = createConfig({
  chains: [mainnet, sepolia, polygon],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
  connectors: [
    injected(),     // For any injected wallet (including MetaMask)
    metaMask(),     // Specific MetaMask connector
  ],
  ssr: true,
});

const queryClient = new QueryClient();

export function WagmiProviders({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}