# Expense Tracker

A simple full-stack expense tracker application built with **React**, **Spring Boot**, and **MySQL**.

## Features

- Add, edit, and delete expenses
- Categorize expenses (Food, Travel, Shopping, Bills, Entertainment, Health, Other)
- Filter expenses by category and month
- Dashboard with total spending, monthly spending, and expense count
- View recent expenses
- Form validation
- Error handling

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
| GET    | `/api/expenses/summary`           | Dashboard summary       |

### Filter Parameters

```
GET /api/expenses/filter?category=FOOD&startDate=2026-08-01&endDate=2026-08-31
```

### Example Request Body (POST / PUT)

```json
{
  "amount": 500,
  "category": "FOOD",
  "description": "Lunch",
  "expenseDate": "2026-08-08"
}
```

### Example Error Response

```json
{
  "timestamp": "2026-08-08T12:00:00",
  "status": 400,
  "error": "Validation Failed",
  "messages": {
    "amount": "Amount must be greater than 0",
    "category": "Category is required"
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

On Windows, use `mvnw.cmd` instead:

```bash
mvnw.cmd spring-boot:run
```

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
- Export expenses to CSV/PDF
- Monthly/category-wise charts
- Budget limits and alerts
- Search by description
- Pagination
- Unit and integration tests

