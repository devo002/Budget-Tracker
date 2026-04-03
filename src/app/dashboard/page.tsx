"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { Transaction } from "@/types/transaction";

type Budget = {
  id: string;
  monthlyIncome: number;
  weeklyLimit: number;
  createdAt: string;
  updatedAt: string;
};

type WeeklyChartData = {
  week: string;
  spent: number;
  limit: number;
  exceeded: boolean;
  difference: number;
};

function getWeekNumber(dateString: string) {
  const date = new Date(dateString);
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfMonth = date.getDate();
  return Math.ceil((dayOfMonth + firstDayOfMonth.getDay()) / 7);
}

function buildWeeklyChartData(
  transactions: Transaction[],
  weeklyLimit: number
): WeeklyChartData[] {
  const weeklyTotals: Record<number, number> = {};

  for (const transaction of transactions) {
    const weekNumber = getWeekNumber(transaction.date);
    weeklyTotals[weekNumber] = (weeklyTotals[weekNumber] || 0) + transaction.amount;
  }

  return Object.entries(weeklyTotals).map(([weekNumber, spent]) => ({
    week: `Week ${weekNumber}`,
    spent,
    limit: weeklyLimit,
    exceeded: spent > weeklyLimit,
    difference: spent - weeklyLimit,
  }));
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
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
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <main className="p-8">Loading dashboard...</main>;
  }

  if (!budget) {
    return <main className="p-8">No budget data found.</main>;
  }

  const weeklyData = buildWeeklyChartData(transactions, budget.weeklyLimit);
  const overLimitWeeks = weeklyData.filter((week) => week.exceeded);

  return (
    <main className="p-8">
      <div className="flex gap-4 mb-6">
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-white text-black rounded"
        >
          Back to Home
        </Link>

        <Link
          href="/transactions"
          className="inline-block px-4 py-2 bg-white text-black rounded"
        >
          View Transactions
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Spending Dashboard</h1>

      <div className="border rounded-xl p-4 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Weekly Spending vs Limit</h2>

        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  `$${Number(value).toFixed(2)}`,
                  name === "spent" ? "Spent" : "Limit",
                ]}
              />
              <ReferenceLine
                y={budget.weeklyLimit}
                stroke="red"
                strokeDasharray="5 5"
                label="Weekly Limit"
              />
              <Bar dataKey="spent">
                {weeklyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.exceeded ? "#ef4444" : "#22c55e"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="border rounded-xl p-4">
        <h2 className="text-2xl font-semibold mb-4">Limit Alerts</h2>

        {overLimitWeeks.length === 0 ? (
          <p>Great — no weekly limit was exceeded.</p>
        ) : (
          <div className="space-y-3">
            {overLimitWeeks.map((week) => (
              <div key={week.week} className="border rounded-lg p-3">
                <p><strong>{week.week}</strong></p>
                <p>Spent: ${week.spent.toFixed(2)}</p>
                <p>Limit: ${week.limit.toFixed(2)}</p>
                <p>Exceeded by: ${week.difference.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}