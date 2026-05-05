import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { WagmiProviders } from "@/components/providers/WagmiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AetherInvest • Crypto Investments",
  description: "Beautiful crypto investment platform with USDT, BTC & ETH",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased`}>
        <WagmiProviders>
          {children}
        </WagmiProviders>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}