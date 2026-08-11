import { useState, useEffect } from 'react';
import expenseService from '../services/expenseService';

const CATEGORY_CLASSES = {
  FOOD: 'cat-food',
  TRAVEL: 'cat-travel',
  SHOPPING: 'cat-shopping',
  BILLS: 'cat-bills',
  ENTERTAINMENT: 'cat-entertainment',
  HEALTH: 'cat-health',
  OTHER: 'cat-other',
};

function Dashboard({ onNavigate }) {
  const [summary, setSummary] = useState({
    totalExpenses: 0,
    monthlyExpenses: 0,
    numberOfExpenses: 0,
    highestExpense: 0,
    averageExpense: 0,
    categoryExpenses: {},
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
    }).format(amount || 0);
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

  const categoryEntries = Object.entries(summary.categoryExpenses || {});

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
        <div className="summary-card">
          <span className="summary-label">Highest Expense</span>
          <span className="summary-value">{formatAmount(summary.highestExpense)}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Average Expense</span>
          <span className="summary-value">{formatAmount(summary.averageExpense)}</span>
        </div>
      </div>

      {categoryEntries.length > 0 && (
        <div className="category-breakdown" style={{ marginBottom: '24px' }}>
          <h3>Category Breakdown</h3>
          <table className="expense-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {categoryEntries.map(([cat, amount]) => (
                <tr key={cat}>
                  <td>
                    <span className={`category-badge ${CATEGORY_CLASSES[cat] || 'cat-other'}`}>
                      {cat}
                    </span>
                  </td>
                  <td className="amount">{formatAmount(amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="recent-expenses">
        <h3>Recent Expenses</h3>
        {recentExpenses.length === 0 ? (
          <div className="empty-state">
            <span>💸</span>
            <p>No expenses yet. Add your first one!</p>
          </div>
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
                  <td>
                    <span className={`category-badge ${CATEGORY_CLASSES[expense.category] || 'cat-other'}`}>
                      {expense.category}
                    </span>
                  </td>
                  <td>{expense.description || <span style={{ color: '#bbb' }}>—</span>}</td>
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
