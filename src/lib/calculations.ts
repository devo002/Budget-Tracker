import { Transaction } from "../types/transaction";
import { WeeklySummary } from "../types/WeeklySummary";
import { MonthlySummary } from "../types/MonthlySummary";

export function getWeekOfMonth(dateString: string): number {
  const date = new Date(dateString);
  const dayOfMonth = date.getDate();
  return Math.ceil(dayOfMonth / 7);
}

export function groupTransactionsByWeek(transactions: Transaction[]) {
  const weeklyTotals: Record<number, number> = {};

  for (const transaction of transactions) {
    const week = getWeekOfMonth(transaction.date);

    if (!weeklyTotals[week]) {
      weeklyTotals[week] = 0;
    }

    weeklyTotals[week] += transaction.amount;
  }

  return weeklyTotals;
}

export function calculateWeeklySummary(
  transactions: Transaction[],
  weeklyLimit: number
): WeeklySummary[] {
  const weeklyTotals = groupTransactionsByWeek(transactions);
  const weeklySummary: WeeklySummary[] = [];

  for (const week in weeklyTotals) {
    const spent = weeklyTotals[Number(week)];
    const difference = Math.abs(weeklyLimit - spent);

    let status: "UNDER" | "OVER" | "EXACT";

    if (spent < weeklyLimit) {
      status = "UNDER";
    } else if (spent > weeklyLimit) {
      status = "OVER";
    } else {
      status = "EXACT";
    }

    weeklySummary.push({
      weekNumber: Number(week),
      spent,
      limit: weeklyLimit,
      difference,
      status,
    });
  }

  return weeklySummary;
}


export function calculateMonthlySummary(
  monthlyIncome: number,
  transactions: Transaction[],
  weeklyLimit: number
): MonthlySummary {

  let totalExpenses = 0;

  for (const transaction of transactions) {
    totalExpenses += transaction.amount;
  }

  const savings = monthlyIncome - totalExpenses;

  const weeklySummaries = calculateWeeklySummary(
    transactions,
    weeklyLimit
  );

  return {
    income: monthlyIncome,
    totalExpenses,
    savings,
    weeklySummaries
  };
}