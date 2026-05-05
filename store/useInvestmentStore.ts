// store/useInvestmentStore.ts
import { create } from 'zustand';

type Investment = {
  id: string;
  planName: string;
  amount: number;
  currency: string;
  roi: string;
  startDate: string;
  maturityDate: string;
  status: "Active" | "Matured" | "Cancelled";
};

type Transaction = {
  id: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  description?: string;
};

type InvestmentStore = {
  balance: number;
  investments: Investment[];
  transactions: Transaction[];
  
  addInvestment: (investment: Omit<Investment, 'id' | 'startDate' | 'maturityDate' | 'status'>) => void;
  addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void;
  updateBalance: (amount: number, type: 'deposit' | 'withdraw' | 'investment') => void;
};

export const useInvestmentStore = create<InvestmentStore>((set, get) => ({
  balance: 24892.45,
  investments: [],
  transactions: [],

  addInvestment: (investmentData) => {
    const newInvestment: Investment = {
      ...investmentData,
      id: `INV${Date.now()}`,
      startDate: new Date().toISOString().slice(0, 10),
      maturityDate: "2026-05-15",
      status: "Active",
    };

    const newTransaction: Transaction = {
      id: `TXN${Date.now()}`,
      type: "Investment",
      amount: investmentData.amount,
      currency: investmentData.currency,
      status: "Completed",
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      description: investmentData.planName,
    };

    set((state) => ({
      investments: [...state.investments, newInvestment],
      transactions: [newTransaction, ...state.transactions],
      balance: state.balance - investmentData.amount,
    }));
  },

  addTransaction: (tx) => {
    const newTx: Transaction = {
      ...tx,
      id: `TXN${Date.now()}`,
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
    };

    set((state) => ({
      transactions: [newTx, ...state.transactions],
    }));
  },

  updateBalance: (amount, type) => {
    set((state) => ({
      balance: type === 'deposit' 
        ? state.balance + amount 
        : Math.max(0, state.balance - amount),
    }));
  },
}));