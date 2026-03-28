type BudgetFormProps = {
  monthlyIncome: number;
  weeklyLimit: number;
  onMonthlyIncomeChange: (value: number) => void;
  onWeeklyLimitChange: (value: number) => void;
};

export default function BudgetForm({
  monthlyIncome,
  weeklyLimit,
  onMonthlyIncomeChange,
  onWeeklyLimitChange,
}: BudgetFormProps) {
  return (
    <div className="border rounded-lg p-4 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Set Your Budget</h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">Monthly Income</label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => onMonthlyIncomeChange(Number(e.target.value))}
            className="w-full p-2 rounded border bg-white text-black"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Weekly Limit</label>
          <input
            type="number"
            value={weeklyLimit}
            onChange={(e) => onWeeklyLimitChange(Number(e.target.value))}
            className="w-full p-2 rounded border bg-white text-black"
          />
        </div>
      </div>
    </div>
  );
}
