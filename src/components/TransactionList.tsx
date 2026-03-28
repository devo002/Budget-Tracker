import { Transaction } from "@/types/transaction";

type TransactionListProps = {
  transactions: Transaction[];
  onDelete: (id: string) => void;
};

export default function TransactionList({
  transactions,
  onDelete,
}: TransactionListProps) {
  return (
    <div className="border rounded-lg p-4 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Transactions</h2>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <p><strong>Amount:</strong> ${transaction.amount}</p>
                <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
                <p><strong>Category:</strong> {transaction.category}</p>
                <p><strong>Note:</strong> {transaction.note || "-"}</p>
              </div>

              <button
                onClick={() => onDelete(transaction.id)}
                className="px-4 py-2 rounded bg-red-500 text-white font-semibold"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}