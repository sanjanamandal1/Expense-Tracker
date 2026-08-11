import { useState, useEffect, useCallback, useMemo } from 'react';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import FilterBar from './components/FilterBar';
import expenseService from './services/expenseService';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    month: '',
    search: '',
    sortBy: 'date-desc',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const params = {};
      if (filters.category) {
        params.category = filters.category;
      }
      if (filters.month) {
        const [year, month] = filters.month.split('-');
        const startDate = `${year}-${month}-01`;
        const lastDay = new Date(year, month, 0).getDate();
        const endDate = `${year}-${month}-${String(lastDay).padStart(2, '0')}`;
        params.startDate = startDate;
        params.endDate = endDate;
      }

      let response;
      if (Object.keys(params).length > 0) {
        response = await expenseService.filterExpenses(params);
      } else {
        response = await expenseService.getExpenses();
      }
      setExpenses(response.data);
    } catch (err) {
      setError('Failed to load expenses. Make sure the backend is running.');
      console.error('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  }, [filters.category, filters.month]);

  useEffect(() => {
    if (activeTab === 'expenses') {
      fetchExpenses();
    }
  }, [activeTab, fetchExpenses]);

  const handleAddExpense = async (expense) => {
    try {
      setError('');
      await expenseService.addExpense(expense);
      fetchExpenses();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.messages) {
        const messages = Object.values(err.response.data.messages).join(', ');
        setError(messages);
      } else {
        setError('Failed to add expense.');
      }
    }
  };

  const handleUpdateExpense = async (expense) => {
    try {
      setError('');
      await expenseService.updateExpense(editingExpense.id, expense);
      setEditingExpense(null);
      fetchExpenses();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.messages) {
        const messages = Object.values(err.response.data.messages).join(', ');
        setError(messages);
      } else {
        setError('Failed to update expense.');
      }
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      setError('');
      await expenseService.deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      setError('Failed to delete expense.');
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ category: '', month: '', search: '', sortBy: 'date-desc' });
  };

  // Process Search & Sorting client-side for dynamic reactivity
  const processedExpenses = useMemo(() => {
    let result = [...expenses];

    // Filter by description keyword
    if (filters.search && filters.search.trim() !== '') {
      const keyword = filters.search.toLowerCase().trim();
      result = result.filter((e) =>
        (e.description || '').toLowerCase().includes(keyword)
      );
    }

    // Apply Sorting
    result.sort((a, b) => {
      if (filters.sortBy === 'date-asc') {
        return new Date(a.expenseDate) - new Date(b.expenseDate);
      }
      if (filters.sortBy === 'amount-desc') {
        return parseFloat(b.amount) - parseFloat(a.amount);
      }
      if (filters.sortBy === 'amount-asc') {
        return parseFloat(a.amount) - parseFloat(b.amount);
      }
      // Default: date-desc
      return new Date(b.expenseDate) - new Date(a.expenseDate);
    });

    return result;
  }, [expenses, filters.search, filters.sortBy]);

  // Export visible filtered expenses as CSV
  const handleExportCsv = () => {
    if (processedExpenses.length === 0) {
      alert('No expenses to export');
      return;
    }
    const headers = ['ID', 'Date', 'Category', 'Description', 'Amount'];
    const rows = processedExpenses.map((e) => [
      e.id,
      e.expenseDate,
      `"${e.category}"`,
      `"${(e.description || '').replace(/"/g, '""')}"`,
      e.amount,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalAmount = processedExpenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <nav className="app-nav">
          <button
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`nav-btn ${activeTab === 'expenses' ? 'active' : ''}`}
            onClick={() => setActiveTab('expenses')}
          >
            Expenses
          </button>
        </nav>
      </header>

      <main className="app-main">
        {error && <div className="error-banner">{error}</div>}

        {activeTab === 'dashboard' && (
          <Dashboard onNavigate={setActiveTab} />
        )}

        {activeTab === 'expenses' && (
          <>
            <ExpenseForm
              onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
              editingExpense={editingExpense}
              onCancelEdit={handleCancelEdit}
            />

            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              onExportCsv={handleExportCsv}
            />

            {loading ? (
              <p className="loading">Loading expenses...</p>
            ) : (
              <ExpenseList
                expenses={processedExpenses}
                onEdit={handleEdit}
                onDelete={handleDeleteExpense}
                totalAmount={totalAmount}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
