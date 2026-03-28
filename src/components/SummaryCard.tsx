type SummaryCardProps = {
  label: string;
  value: number;
};

export default function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-lg font-semibold">{label}</p>
      <p className="text-2xl font-bold">${value}</p>
    </div>
  );
}