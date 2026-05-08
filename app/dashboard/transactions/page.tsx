// app/(dashboard)/transactions/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";
import { useInvestmentStore } from "@/store/useInvestmentStore";

export default function TransactionsPage() {
  const { transactions } = useInvestmentStore();

  const [filterType, setFilterType] = useState<"All" | "Deposit" | "Withdrawal" | "Investment" | "ROI Payout">("All");
  const [filterStatus, setFilterStatus] = useState<"All" | "Completed" | "Pending" | "Failed">("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        const matchesType = filterType === "All" || tx.type === filterType;
        const matchesStatus = filterStatus === "All" || tx.status === filterStatus;
        const matchesSearch = 
          tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tx.description && tx.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          tx.currency.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesType && matchesStatus && matchesSearch;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filterType, filterStatus, searchTerm]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Transaction History</h1>
        <p className="text-zinc-400 mt-2">All your deposits, withdrawals, investments and ROI payouts</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-zinc-950 border-zinc-700"
        />
        
        <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
          <SelectTrigger className="bg-zinc-950 border-zinc-700 w-full md:w-52">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Deposit">Deposit</SelectItem>
            <SelectItem value="Withdrawal">Withdrawal</SelectItem>
            <SelectItem value="Investment">Investment</SelectItem>
            <SelectItem value="ROI Payout">ROI Payout</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
          <SelectTrigger className="bg-zinc-950 border-zinc-700 w-full md:w-52">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Recent Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-16 text-zinc-400">
              No transactions found. Make an investment or deposit to see activity here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-sm text-zinc-400">
                    <th className="py-4 px-6">TX ID</th>
                    <th className="py-4 px-6">Type</th>
                    <th className="py-4 px-6">Amount</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-zinc-950/50">
                      <td className="py-5 px-6 font-mono text-sm">{tx.id}</td>
                      <td className="py-5 px-6 font-medium">{tx.type}</td>
                      <td className="py-5 px-6">
                        <span className={tx.type === "Withdrawal" ? "text-red-500" : "text-emerald-500"}>
                          {tx.type === "Withdrawal" ? "-" : "+"}
                          {tx.amount} {tx.currency}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <Badge variant={tx.status === "Completed" ? "default" : "secondary"}>
                          {tx.status}
                        </Badge>
                      </td>
                      <td className="py-5 px-6 text-sm text-zinc-400">{tx.date}</td>
                      <td className="py-5 px-6 text-sm text-zinc-400 max-w-xs truncate">
                        {tx.description || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}