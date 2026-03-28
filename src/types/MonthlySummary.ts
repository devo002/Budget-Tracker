import { WeeklySummary } from "./WeeklySummary";

export type MonthlySummary = {
  income: number;
  totalExpenses: number;
  savings: number;
  weeklySummaries: WeeklySummary[];
};