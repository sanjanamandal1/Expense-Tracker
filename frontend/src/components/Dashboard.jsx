import { useState, useEffect } from 'react';
import expenseService from '../services/expenseService';

function Dashboard({ onNavigate }) {
  const [summary, setSummary] = useState({
    totalExpenses: 0,
    monthlyExpenses: 0,
    numberOfExpenses: 0,
  });
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [summaryRes, expensesRes] = await Promise.all([
        expenseService.getSummary(),
        expenseService.getExpenses(),
      ]);
      setSummary(summaryRes.data);
      setRecentExpenses(expensesRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return <p className="loading">Loading dashboard...</p>;
  }

  return (
    <div className="dashboard">
      <div className="summary-cards">
        <div className="summary-card">
          <span className="summary-label">Total Expenses</span>
          <span className="summary-value">{formatAmount(summary.totalExpenses)}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">This Month</span>
          <span className="summary-value">{formatAmount(summary.monthlyExpenses)}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Number of Expenses</span>
          <span className="summary-value">{summary.numberOfExpenses}</span>
        </div>
      </div>

      <div className="recent-expenses">
        <h3>Recent Expenses</h3>
        {recentExpenses.length === 0 ? (
          <p className="no-data">No expenses yet. Add your first expense!</p>
        ) : (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{formatDate(expense.expenseDate)}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td className="amount">{formatAmount(expense.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {recentExpenses.length > 0 && (
          <button className="btn btn-link" onClick={() => onNavigate('expenses')}>
            View All Expenses →
          </button>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
