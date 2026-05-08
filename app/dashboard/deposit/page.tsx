// app/(dashboard)/deposit/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";   // ← Added
import { Badge } from "@/components/ui/badge";
import { Copy, QrCode } from "lucide-react";
import { toast } from "sonner";
import { useInvestmentStore } from "@/store/useInvestmentStore";
import { useState } from "react";

const depositOptions = [
  { currency: "USDT", network: "TRC20 (Recommended)", address: "TC6zjFNqWtdyqp9jvMBL7ekeqE9RMAmzXz", qrColor: "emerald" },
  { currency: "USDT", network: "ERC20", address: "0xc412da975b8e47756334aebd584080273667b33d", qrColor: "emerald" },
  { currency: "BTC", network: "Bitcoin", address: "1abCr2n5aCV3ejf5xP3eejveygx2xWrvh", qrColor: "orange" },
  { currency: "ETH", network: "Ethereum", address: "0xc412da975b8e47756334aebd584080273667b33d", qrColor: "blue" },
];

export default function DepositPage() {
  const { updateBalance, addTransaction } = useInvestmentStore();
  const [selectedOption, setSelectedOption] = useState(depositOptions[0]);
  const [amount, setAmount] = useState("");

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied!", { description: "Paste it in your wallet." });
  };

  const simulateDeposit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const depositAmount = parseFloat(amount);

    updateBalance(depositAmount, 'deposit');
    addTransaction({
      type: "Deposit",
      amount: depositAmount,
      currency: selectedOption.currency,
      status: "Completed",
      description: `${selectedOption.network} Deposit`,
    });

    toast.success(`$${depositAmount} ${selectedOption.currency} deposited!`);
    setAmount("");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Deposit Funds</h1>
        <p className="text-zinc-400 mt-2">Send crypto to your personal address.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Select Cryptocurrency</h2>
          {depositOptions.map((option, i) => (
            <Card 
              key={i}
              className={`cursor-pointer transition-all ${selectedOption === option ? 'border-violet-500 bg-zinc-900' : 'border-zinc-800'}`}
              onClick={() => setSelectedOption(option)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-2xl bg-${option.qrColor}-500/10 flex items-center justify-center text-xl font-bold`}>
                      {option.currency}
                    </div>
                    <div>
                      <p className="font-semibold">{option.currency}</p>
                      <p className="text-sm text-zinc-400">{option.network}</p>
                    </div>
                  </div>
                  <Badge>Deposit</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-7">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Deposit {selectedOption.currency} ({selectedOption.network})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col items-center py-10 border border-dashed border-zinc-700 rounded-3xl">
                <QrCode className="w-48 h-48 text-zinc-600 mb-6" />
                <p className="text-zinc-400">Scan or copy address below</p>
              </div>

              <div>
                <Label>Deposit Address</Label>
                <div className="flex gap-3 mt-2">
                  <code className="flex-1 bg-zinc-950 border border-zinc-800 p-4 rounded-2xl font-mono text-sm break-all">
                    {selectedOption.address}
                  </code>
                  <Button onClick={() => copyAddress(selectedOption.address)} variant="outline">
                    <Copy className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Simulate Deposit Amount (for testing)</Label>
                <div className="flex gap-3 mt-2">
                  <Input
                    type="number"
                    placeholder="1000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-zinc-950 border-zinc-700 text-xl"
                  />
                  <Button onClick={simulateDeposit} className="px-8">Simulate Deposit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}