// components/common/WalletConnect.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Wallet, Copy, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  const connectWallet = () => {
    // Simulate real wallet connection for development
    const fakeAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
    
    setAddress(fakeAddress);
    setIsConnected(true);
    
    toast.success("Wallet Connected Successfully!", {
      description: "Demo Mode: Using simulated wallet",
    });
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress("");
    toast.info("Wallet Disconnected");
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard");
    }
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          onClick={copyAddress}
          className="font-mono text-sm flex items-center gap-2 hover:bg-zinc-800"
        >
          {address.slice(0, 6)}...{address.slice(-4)}
          <Copy className="w-4 h-4" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon"
          onClick={disconnectWallet}
          className="hover:bg-zinc-800"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={connectWallet}
      className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500"
    >
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </Button>
  );
}