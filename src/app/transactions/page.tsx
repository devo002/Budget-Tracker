"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@/types/transaction";
import TransactionList from "@/components/TransactionList";
import Link from "next/link";


export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTransactions() {
    try {
      const response = await fetch("/api/transactions");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function handleDeleteTransaction(id: string) {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      await fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  }

  if (loading) {
    return <main className="p-8">Loading transactions...</main>;
  }

  return (
    <main className="p-8">
       <Link
          href="/"
          className="inline-block px-4 py-2 bg-white text-black rounded mb-6">
          Back to Dashboard
    </Link>
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>

      <TransactionList
        transactions={transactions}
        onDelete={handleDeleteTransaction}
      />
    </main>
  );
}