import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/expenses';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const expenseService = {
  getExpenses: () => {
    return api.get('');
  },

  getExpenseById: (id) => {
    return api.get(`/${id}`);
  },

  addExpense: (expense) => {
    return api.post('', expense);
  },

  updateExpense: (id, expense) => {
    return api.put(`/${id}`, expense);
  },

  deleteExpense: (id) => {
    return api.delete(`/${id}`);
  },

  getExpensesByCategory: (category) => {
    return api.get(`/category/${category}`);
  },

  filterExpenses: (params) => {
    return api.get('/filter', { params });
  },

  getSummary: () => {
    return api.get('/summary');
  },
};

export default expenseService;
