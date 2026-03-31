import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  recipient?: string;
  date: string;
  status: 'completed' | 'pending';
}

export interface Card {
  id: string;
  last4: string;
  type: 'virtual' | 'physical';
  network: 'visa' | 'mastercard';
  isFrozen: boolean;
  color: string;
}

interface FinanceContextType {
  balance: number;
  transactions: Transaction[];
  cards: Card[];
  sendMoney: (amount: number, recipient: string) => Promise<void>;
  createVirtualCard: () => Promise<void>;
  toggleCardFreeze: (id: string) => Promise<void>;
  quickDeposit: (amount: number) => Promise<void>;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(14520.50);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'deposit', amount: 3200, date: new Date().toISOString(), status: 'completed' },
    { id: '2', type: 'transfer', amount: -150, recipient: 'Netflix Inc', date: new Date(Date.now() - 86400000).toISOString(), status: 'completed' },
    { id: '3', type: 'transfer', amount: -45, recipient: 'Uber Eats', date: new Date(Date.now() - 172800000).toISOString(), status: 'completed' },
  ]);
  const [cards, setCards] = useState<Card[]>([
    { id: 'c1', last4: '4242', type: 'physical', network: 'visa', isFrozen: false, color: 'linear-gradient(135deg, #10b981, #047857)' },
  ]);

  // Simulate network delay for API calls
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const sendMoney = async (amount: number, recipient: string) => {
    await delay(1200); // Fake API latency
    if (balance < amount) throw new Error('Insufficient funds');
    
    setBalance(prev => prev - amount);
    setTransactions(prev => [
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'transfer',
        amount: -amount,
        recipient,
        date: new Date().toISOString(),
        status: 'completed'
      },
      ...prev
    ]);
  };

  const createVirtualCard = async () => {
    await delay(1500);
    const newCard: Card = {
      id: Math.random().toString(36).substr(2, 9),
      last4: Math.floor(1000 + Math.random() * 9000).toString(),
      type: 'virtual',
      network: Math.random() > 0.5 ? 'visa' : 'mastercard',
      isFrozen: false,
      color: `linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16)}, #111827)`
    };
    setCards(prev => [...prev, newCard]);
  };

  const toggleCardFreeze = async (id: string) => {
    await delay(600);
    setCards(prev => prev.map(c => c.id === id ? { ...c, isFrozen: !c.isFrozen } : c));
  };

  const quickDeposit = async (amount: number) => {
    await delay(800);
    setBalance(prev => prev + amount);
    setTransactions(prev => [
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'deposit',
        amount: amount,
        date: new Date().toISOString(),
        status: 'completed'
      },
      ...prev
    ]);
  };

  return (
    <FinanceContext.Provider value={{ balance, transactions, cards, sendMoney, createVirtualCard, toggleCardFreeze, quickDeposit }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
