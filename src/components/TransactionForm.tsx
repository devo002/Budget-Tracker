type TransactionFormProps = {
  amount: string;
  date: string;
  category: string;
  note: string;
  onAmountChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function TransactionForm({
  amount,
  date,
  category,
  note,
  onAmountChange,
  onDateChange,
  onCategoryChange,
  onNoteChange,
  onSubmit,
}: TransactionFormProps) {
  return (
    <form onSubmit={onSubmit} className="border rounded-lg p-4 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Add Transaction</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="w-full p-2 rounded border bg-white text-black"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full p-2 rounded border bg-white text-black"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full p-2 rounded border bg-white text-black"
            required
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Note</label>
          <input
            type="text"
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            className="w-full p-2 rounded border bg-white text-black"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 rounded bg-white text-black font-semibold"
      >
        Add Transaction
      </button>
    </form>
  );
}