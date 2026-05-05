// app/(dashboard)/investments/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useInvestmentStore } from "@/store/useInvestmentStore";

const investmentPlans = [
  { id: 1, name: "7-Day Fixed Yield", roi: "10%", duration: "7 days", minAmount: 500, risk: "Low", color: "emerald" },
  { id: 2, name: "14-Day Growth Plan", roi: "18%", duration: "14 days", minAmount: 1000, risk: "Medium", color: "violet" },
  { id: 3, name: "30-Day Premium", roi: "35%", duration: "30 days", minAmount: 2500, risk: "High", color: "amber" },
  { id: 4, name: "Flexible Savings", roi: "8-12%", duration: "Anytime", minAmount: 100, risk: "Low", color: "sky" },
];

export default function InvestmentsPage() {
  const { addInvestment, updateBalance } = useInvestmentStore();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [amount, setAmount] = useState("");

  const handleInvest = () => {
    if (!selectedPlan || !amount) return;
    const investAmount = parseFloat(amount);

    if (investAmount < selectedPlan.minAmount) {
      toast.error(`Minimum investment is $${selectedPlan.minAmount}`);
      return;
    }

    // Add investment and update balance
    addInvestment({
      planName: selectedPlan.name,
      amount: investAmount,
      currency: "USDT",
      roi: selectedPlan.roi,
    });

    toast.success(`Investment of $${investAmount} in ${selectedPlan.name} successful!`);
    setSelectedPlan(null);
    setAmount("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Investment Plans</h1>
        <p className="text-zinc-400 mt-2">Choose a plan and start growing your crypto today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {investmentPlans.map((plan) => (
          <Card key={plan.id} className="bg-zinc-900 border-zinc-800 hover:border-violet-500/50 transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{plan.name}</CardTitle>
                <Badge>{plan.risk} Risk</Badge>
              </div>
              <p className="text-sm text-zinc-400">{plan.duration}</p>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold tracking-tighter text-white">{plan.roi}</div>
              <p className="text-zinc-400">Expected ROI</p>

              <Button 
                className="w-full mt-6 py-6"
                onClick={() => setSelectedPlan(plan)}
              >
                Invest Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Investment Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-zinc-900">
            <CardHeader>
              <CardTitle>Invest in {selectedPlan.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Amount (USDT)</Label>
                <Input
                  type="number"
                  placeholder={`Min $${selectedPlan.minAmount}`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-2 text-3xl h-16"
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setSelectedPlan(null)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleInvest}>
                  Confirm Investment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}