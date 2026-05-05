// components/LivePrices.tsx
"use client";

import { useEffect, useState } from "react";

type Prices = {
  bitcoin: number;
  ethereum: number;
  tether: number;
};

export default function LivePrices() {
  const [prices, setPrices] = useState<Prices>({
    bitcoin: 0,
    ethereum: 0,
    tether: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd",
          { 
            method: "GET",
            headers: { "Accept": "application/json" },
            cache: "no-store"
          }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        setPrices({
          bitcoin: data.bitcoin?.usd || 0,
          ethereum: data.ethereum?.usd || 0,
          tether: data.tether?.usd || 1,
        });
        setError(false);
      } catch (err) {
        console.error("Price fetch failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();

    // Refresh every 45 seconds
    const interval = setInterval(fetchPrices, 45000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-zinc-500 text-sm">Loading prices...</div>;
  if (error) {
    return (
      <div className="text-amber-500 text-sm">
        Prices unavailable • Using last known values
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
      <span>BTC: <span className="font-mono text-emerald-400">${prices.bitcoin.toLocaleString()}</span></span>
      <span>ETH: <span className="font-mono text-emerald-400">${prices.ethereum.toLocaleString()}</span></span>
      <span>USDT: <span className="font-mono text-emerald-400">${prices.tether}</span></span>
    </div>
  );
}