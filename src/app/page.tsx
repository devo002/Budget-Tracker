"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@/types/transaction";
import { calculateMonthlySummary } from "@/lib/calculations";
import SummaryCard from "@/components/SummaryCard";
import WeeklySummaryCard from "@/components/WeeklySummaryCard";
import TransactionForm from "@/components/TransactionForm";
import Link from "next/link";


type Budget = {
  id: string;
  monthlyIncome: number;
  weeklyLimit: number;
  createdAt: string;
  updatedAt: string;
};

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [loading, setLoading] = useState(true);

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  async function fetchDashboardData() {
    try {
      const [transactionsRes, budgetRes] = await Promise.all([
        fetch("/api/transactions"),
        fetch("/api/budget"),
      ]);

      const transactionsData = await transactionsRes.json();
      const budgetData = await budgetRes.json();

      setTransactions(transactionsData);
      setBudget(budgetData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTransaction(id: string) {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      await fetchDashboardData();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function handleTransactionSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
          date,
          category,
          note,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }

      setAmount("");
      setDate("");
      setCategory("");
      setNote("");

      await fetchDashboardData();
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  }

  if (loading) {
    return <main className="p-8">Loading...</main>;
  }

  if (!budget) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">
          Weekly Budget & Monthly Savings Tracker
        </h1>
        <p>No budget found in the database yet.</p>

      </main>
    );
  }

  const summary = calculateMonthlySummary(
    budget.monthlyIncome,
    transactions,
    budget.weeklyLimit
  );

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Weekly Budget & Monthly Savings Tracker
      </h1>
      <Link
          href="/transactions"
          className="inline-block px-4 py-2 bg-white text-black rounded mb-6">
          View All Transactions
        </Link>

      <TransactionForm
        amount={amount}
        date={date}
        category={category}
        note={note}
        onAmountChange={setAmount}
        onDateChange={setDate}
        onCategoryChange={setCategory}
        onNoteChange={setNote}
        onSubmit={handleTransactionSubmit}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SummaryCard label="Monthly Income" value={summary.income} />
        <SummaryCard label="Total Expenses" value={summary.totalExpenses} />
        <SummaryCard label="Savings" value={summary.savings} />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Weekly Summary</h2>

      <div className="space-y-4">
        {summary.weeklySummaries.map((week) => (
          <WeeklySummaryCard key={week.weekNumber} week={week} />
        ))}
      </div>

    </main>
  );
}