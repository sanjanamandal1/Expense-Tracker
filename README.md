# Expense Tracker

A simple full-stack expense tracker application built with **React**, **Spring Boot**, and **MySQL**.

## 🌐 Live Demo

- **Frontend Web Application:** [https://expense-tracker-navy-one-12.vercel.app/](https://expense-tracker-navy-one-12.vercel.app/)
- **Backend REST API:** [https://expense-tracker-production-fea6.up.railway.app/api/expenses/summary](https://expense-tracker-production-fea6.up.railway.app/api/expenses/summary)

## Features

- **CRUD Operations:** Add, edit, and delete expenses with validation.
- **Categorization:** Categorize expenses (Food, Travel, Shopping, Bills, Entertainment, Health, Other).
- **Search & Filter:** Search expenses by description keywords, or filter by category and month.
- **Sorting:** Sort expenses by Date (Newest/Oldest) or Amount (Highest/Lowest).
- **Export to CSV:** One-click CSV spreadsheet export of filtered expenses.
- **Analytics Dashboard:**
  - Total Spending
  - Current Month Spending
  - Expense Counter
  - Highest Single Expense
  - Average Expense Amount
  - Category Breakdown Table (spending per category)
  - 5 Recent Transactions Table

## Tech Stack

| Layer      | Technology            |
| ---------- | --------------------- |
| Frontend   | React 18 + Vite       |
| Backend    | Java 21 + Spring Boot |
| Database   | MySQL                 |
| ORM        | Spring Data JPA       |
| HTTP       | Axios                 |
| Build Tool | Maven                 |
| Validation | Jakarta Bean Validation |

## Architecture

```
React (Frontend)
      ↓ Axios (HTTP)
REST API (Spring Boot)
      ↓
Controller → Service → Repository
      ↓
JPA / Hibernate
      ↓
MySQL Database
```

### Backend Package Structure

```
com.example.expensetracker
├── controller/
│   └── ExpenseController.java
├── service/
│   └── ExpenseService.java
├── repository/
│   └── ExpenseRepository.java
├── entity/
│   └── Expense.java
├── exception/
│   ├── ResourceNotFoundException.java
│   └── GlobalExceptionHandler.java
├── config/
│   └── CorsConfig.java
└── ExpenseTrackerApplication.java
```

### Frontend Structure

```
src/
├── components/
│   ├── Dashboard.jsx
│   ├── ExpenseForm.jsx
│   ├── ExpenseList.jsx
│   ├── ExpenseItem.jsx
│   └── FilterBar.jsx
├── services/
│   └── expenseService.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Database Schema

### Table: `expenses`

| Column       | Type          | Constraints               |
| ------------ | ------------- | ------------------------- |
| id           | BIGINT        | PRIMARY KEY, AUTO_INCREMENT |
| amount       | DECIMAL(10,2) | NOT NULL                  |
| category     | VARCHAR(50)   | NOT NULL                  |
| description  | VARCHAR(255)  |                           |
| expense_date | DATE          | NOT NULL                  |
| created_at   | DATETIME      |                           |

## API Endpoints

| Method | Endpoint                          | Description             |
| ------ | --------------------------------- | ----------------------- |
| GET    | `/api/expenses`                   | Get all expenses        |
| GET    | `/api/expenses/{id}`              | Get expense by ID       |
| POST   | `/api/expenses`                   | Create expense          |
| PUT    | `/api/expenses/{id}`              | Update expense          |
| DELETE | `/api/expenses/{id}`              | Delete expense          |
| GET    | `/api/expenses/category/{name}`   | Filter by category      |
| GET    | `/api/expenses/filter`            | Filter by category/date |
| GET    | `/api/expenses/summary`           | Analytics summary       |

### Example Summary Response

```json
{
  "totalExpenses": 4700.00,
  "monthlyExpenses": 4700.00,
  "numberOfExpenses": 5,
  "highestExpense": 2000.00,
  "averageExpense": 940.00,
  "categoryExpenses": {
    "FOOD": 550.00,
    "TRAVEL": 150.00,
    "SHOPPING": 2000.00,
    "BILLS": 800.00,
    "HEALTH": 1200.00
  }
}
```

## How to Run

### Prerequisites

- Java 21
- Node.js 18+
- MySQL 8+

### 1. MySQL Setup

```sql
-- Create the database
CREATE DATABASE expense_tracker;
```

Update `backend/src/main/resources/application.properties` with your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
spring.datasource.username=root
spring.datasource.password=your_password
```

### 2. Run Backend

```bash
cd backend
./mvnw spring-boot:run
```

The backend starts on **http://localhost:8080**.

### 3. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Run with Docker Compose (Optional)

```bash
docker compose up --build -d
```

For complete cloud deployment instructions (Render, Vercel, Railway, Docker), refer to [DEPLOYMENT.md](DEPLOYMENT.md).

## Categories

- FOOD
- TRAVEL
- SHOPPING
- BILLS
- ENTERTAINMENT
- HEALTH
- OTHER

## Future Improvements

- User authentication (JWT)
- Graphical charts (Recharts / Chart.js)
- Budget limits and alerts
- Pagination
- Unit and integration tests
