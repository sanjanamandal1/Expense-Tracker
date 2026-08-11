import ExpenseItem from './ExpenseItem';

function ExpenseList({ expenses, onEdit, onDelete, totalAmount }) {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="expense-list">
      <div className="expense-list-header">
        <h3>Expenses</h3>
        <span className="total-badge">Total: {formatAmount(totalAmount)}</span>
      </div>

      {expenses.length === 0 ? (
        <div className="empty-state">
          <span>🗂️</span>
          <p>No expenses match your filters.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
