// app/(dashboard)/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useInvestmentStore } from "@/store/useInvestmentStore";
import LivePrices from "@/components/LivePrices";

const performanceData = [
  { day: "Apr 5", balance: 18500 },
  { day: "Apr 8", balance: 19200 },
  { day: "Apr 11", balance: 20150 },
  { day: "Apr 14", balance: 19800 },
  { day: "Apr 17", balance: 21500 },
  { day: "Apr 20", balance: 22800 },
  { day: "Apr 23", balance: 24100 },
  { day: "Apr 26", balance: 24892 },
];

export default function DashboardPage() {
  const { balance, investments } = useInvestmentStore();

  const totalActiveInvestments = investments.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-zinc-400 mt-2">Here's what's happening with your portfolio today.</p>
      </div>

      <LivePrices />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Balance</CardTitle>
            <DollarSign className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tracking-tighter">
              ${balance.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-emerald-500 text-sm mt-3">
              <TrendingUp className="h-4 w-4" /> +12.4% this month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Active Investments</CardTitle>
            <Clock className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tracking-tighter">{totalActiveInvestments}</div>
            <p className="text-zinc-500 text-sm mt-1">Across plans</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total ROI</CardTitle>
            <TrendingUp className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tracking-tighter text-emerald-500">18.7%</div>
            <p className="text-zinc-500 text-sm mt-1">+$4,652.30 earned</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Next Maturity</CardTitle>
            <Clock className="h-5 w-5 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tracking-tighter">3 days</div>
            <p className="text-zinc-500 text-sm mt-1">$8,450 maturing</p>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="lg:col-span-3 bg-zinc-900 border-zinc-800">
          <CardHeader><CardTitle>Portfolio Breakdown</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {[
              { coin: "USDT", amount: "18,240.00", percent: "73.3%", color: "#26A17B" },
              { coin: "BTC", amount: "4,120.50", percent: "16.6%", color: "#F7931A" },
              { coin: "ETH", amount: "2,531.95", percent: "10.1%", color: "#627EEA" },
            ].map((item) => (
              <div key={item.coin} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.coin}</span>
                </div>
                <div className="text-right">
                  <div>${item.amount}</div>
                  <div className="text-xs text-zinc-500">{item.percent}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Portfolio Performance (30 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="day" stroke="#52525b" />
                  <YAxis stroke="#52525b" />
                  <Tooltip />
                  <Line 
                    type="natural" 
                    dataKey="balance" 
                    stroke="#a855f7" 
                    strokeWidth={3}
                    dot={{ fill: "#a855f7", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}