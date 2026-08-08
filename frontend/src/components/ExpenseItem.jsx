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

  return (
    <tr>
      <td>{formatDate(expense.expenseDate)}</td>
      <td>{expense.category}</td>
      <td>{expense.description}</td>
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
