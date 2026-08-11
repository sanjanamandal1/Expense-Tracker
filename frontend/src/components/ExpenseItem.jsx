const CATEGORY_CLASSES = {
  FOOD: 'cat-food',
  TRAVEL: 'cat-travel',
  SHOPPING: 'cat-shopping',
  BILLS: 'cat-bills',
  ENTERTAINMENT: 'cat-entertainment',
  HEALTH: 'cat-health',
  OTHER: 'cat-other',
};

function ExpenseItem({ expense, onEdit, onDelete }) {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      onDelete(expense.id);
    }
  };

  const catClass = CATEGORY_CLASSES[expense.category] || 'cat-other';

  return (
    <tr>
      <td>{formatDate(expense.expenseDate)}</td>
      <td>
        <span className={`category-badge ${catClass}`}>
          {expense.category}
        </span>
      </td>
      <td>{expense.description || <span style={{ color: '#bbb' }}>—</span>}</td>
      <td className="amount">{formatAmount(expense.amount)}</td>
      <td className="actions">
        <button className="btn btn-sm btn-edit" onClick={() => onEdit(expense)}>
          Edit
        </button>
        <button className="btn btn-sm btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ExpenseItem;
