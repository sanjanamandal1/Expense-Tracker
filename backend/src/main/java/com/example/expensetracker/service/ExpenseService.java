package com.example.expensetracker.service;

import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.exception.ResourceNotFoundException;
import com.example.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    // Constructor-based dependency injection
    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAllByOrderByExpenseDateDesc();
    }

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
    }

    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Long id, Expense expenseDetails) {
        Expense expense = getExpenseById(id);
        expense.setAmount(expenseDetails.getAmount());
        expense.setCategory(expenseDetails.getCategory());
        expense.setDescription(expenseDetails.getDescription());
        expense.setExpenseDate(expenseDetails.getExpenseDate());
        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id) {
        Expense expense = getExpenseById(id);
        expenseRepository.delete(expense);
    }

    public List<Expense> getExpensesByCategory(String category) {
        return expenseRepository.findByCategory(category);
    }

    public List<Expense> filterExpenses(String category, LocalDate startDate, LocalDate endDate) {
        if (category != null && !category.isEmpty() && startDate != null && endDate != null) {
            return expenseRepository.findByCategoryAndExpenseDateBetween(category, startDate, endDate);
        } else if (category != null && !category.isEmpty()) {
            return expenseRepository.findByCategory(category);
        } else if (startDate != null && endDate != null) {
            return expenseRepository.findByExpenseDateBetween(startDate, endDate);
        }
        return expenseRepository.findAllByOrderByExpenseDateDesc();
    }

    public Map<String, Object> getSummary() {
        List<Expense> allExpenses = expenseRepository.findAll();

        BigDecimal totalExpenses = allExpenses.stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        LocalDate now = LocalDate.now();
        LocalDate startOfMonth = now.withDayOfMonth(1);
        LocalDate endOfMonth = now.withDayOfMonth(now.lengthOfMonth());

        BigDecimal monthlyExpenses = allExpenses.stream()
                .filter(e -> !e.getExpenseDate().isBefore(startOfMonth) && !e.getExpenseDate().isAfter(endOfMonth))
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal highestExpense = allExpenses.stream()
                .map(Expense::getAmount)
                .max(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);

        BigDecimal averageExpense = allExpenses.isEmpty() ? BigDecimal.ZERO :
                totalExpenses.divide(BigDecimal.valueOf(allExpenses.size()), 2, RoundingMode.HALF_UP);

        Map<String, BigDecimal> categoryExpenses = new HashMap<>();
        for (Expense e : allExpenses) {
            categoryExpenses.put(
                e.getCategory(),
                categoryExpenses.getOrDefault(e.getCategory(), BigDecimal.ZERO).add(e.getAmount())
            );
        }

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalExpenses", totalExpenses);
        summary.put("monthlyExpenses", monthlyExpenses);
        summary.put("numberOfExpenses", allExpenses.size());
        summary.put("highestExpense", highestExpense);
        summary.put("averageExpense", averageExpense);
        summary.put("categoryExpenses", categoryExpenses);

        return summary;
    }
}
