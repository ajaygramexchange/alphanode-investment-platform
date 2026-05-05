// app/(dashboard)/admin/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useInvestmentStore } from "@/store/useInvestmentStore";
import { toast } from "sonner";
import { useState } from "react";

export default function AdminPage() {
  const { transactions, addTransaction } = useInvestmentStore(); // You can expand this
  const [pending, setPending] = useState(transactions.filter(t => t.status === "Pending"));

  const approve = (tx: any) => {
    toast.success(`Approved withdrawal of ${tx.amount} ${tx.currency}`);
    // In real app: update DB + update store
    setPending(prev => prev.filter(p => p.id !== tx.id));
  };

  const reject = (tx: any) => {
    toast.error(`Rejected withdrawal of ${tx.amount} ${tx.currency}`);
    setPending(prev => prev.filter(p => p.id !== tx.id));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Admin Control Panel</h1>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Pending Withdrawals ({pending.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {pending.length === 0 ? (
            <p className="py-12 text-center text-zinc-400">No pending requests</p>
          ) : (
            pending.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center py-6 border-b last:border-none">
                <div>
                  <p className="font-medium">{tx.amount} {tx.currency}</p>
                  <p className="text-sm text-zinc-500">{tx.description}</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="destructive" onClick={() => reject(tx)}>Reject</Button>
                  <Button onClick={() => approve(tx)}>Approve & Release</Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total Users • Total Volume • Active Plans (expand as needed)</p>
        </CardContent>
      </Card>
    </div>
  );
}