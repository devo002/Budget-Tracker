export type WeeklySummary = {
  weekNumber: number;
  spent: number;
  limit: number;
  difference: number;
  status: "UNDER" | "OVER" | "EXACT";
};