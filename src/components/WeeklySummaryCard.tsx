import { WeeklySummary } from "@/types/WeeklySummary";

type WeeklySummaryCardProps = {
  week: WeeklySummary;
};

export default function WeeklySummaryCard({
  week,
}: WeeklySummaryCardProps) {
  return (
    <div className="border p-4 rounded-lg">
      <p><strong>Week:</strong> {week.weekNumber}</p>
      <p><strong>Spent:</strong> ${week.spent}</p>
      <p><strong>Limit:</strong> ${week.limit}</p>
      <p><strong>Difference:</strong> ${week.difference}</p>
      <p><strong>Status:</strong> {week.status}</p>
    </div>
  );
}