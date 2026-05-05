// app/(dashboard)/withdraw/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useInvestmentStore } from "@/store/useInvestmentStore";
import { useState } from "react";

export default function WithdrawPage() {
  const { balance, updateBalance, addTransaction } = useInvestmentStore();
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [currency, setCurrency] = useState("USDT");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWithdraw = () => {
    if (!amount || !address) {
      toast.error("Please fill amount and address");
      return;
    }

    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > balance) {
      toast.error("Insufficient balance");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      updateBalance(withdrawAmount, 'withdraw');
      addTransaction({
        type: "Withdrawal",
        amount: withdrawAmount,
        currency,
        status: "Pending",
        description: `To ${address.slice(0, 8)}...`,
      });

      toast.success("Withdrawal request submitted successfully!");
      setAmount("");
      setAddress("");
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Withdraw Funds</h1>
        <p className="text-zinc-400 mt-2">Send crypto to an external wallet</p>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Withdraw {currency}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex gap-3">
            {["USDT", "BTC", "ETH"].map((c) => (
              <Button
                key={c}
                variant={currency === c ? "default" : "outline"}
                onClick={() => setCurrency(c)}
              >
                {c}
              </Button>
            ))}
          </div>

          <div>
            <Label>Amount</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-3xl h-16 bg-zinc-950 border-zinc-700"
            />
            <p className="text-xs text-zinc-500 mt-1">Available: ${balance.toFixed(2)}</p>
          </div>

          <div>
            <Label>Destination Address</Label>
            <Input
              placeholder="Enter wallet address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="font-mono h-14 bg-zinc-950 border-zinc-700"
            />
          </div>

          <Button 
            onClick={handleWithdraw} 
            disabled={isSubmitting || !amount || !address}
            className="w-full py-7 text-lg bg-gradient-to-r from-red-600 to-rose-600"
          >
            {isSubmitting ? "Submitting Request..." : "Request Withdrawal"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}