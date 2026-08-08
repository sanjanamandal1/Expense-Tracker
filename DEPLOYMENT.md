# Deployment Guide — Full-Stack Expense Tracker

This document provides complete instructions for deploying the **Expense Tracker** application to free cloud hosting services (**Render**, **Vercel**, **Railway**) as well as using **Docker**.

---

## Option 1: Free Cloud Deployment (Render + Vercel) — Recommended

This approach deploys the **Database & Spring Boot Backend on Render** (or Railway) and the **React Frontend on Vercel** (or Render).

### 1. Database & Backend Deployment (Render)

1. **Sign up / Log in** to [Render.com](https://render.com).
2. **Create a MySQL Database:**
   - Click **New +** → **PostgreSQL** or **MySQL** (or use a free MySQL service like [Aiven.io](https://aiven.io) / [Railway.app](https://railway.app)).
   - Copy your database connection URL, Username, and Password.
3. **Deploy Backend Web Service:**
   - Click **New +** → **Web Service**.
   - Connect your GitHub repository: `https://github.com/sanjanamandal1/Expense-Tracker`.
   - Set **Root Directory**: `backend`
   - Set **Runtime**: `Java` (or `Docker`).
   - Set **Build Command**: `./mvnw clean package -DskipTests`
   - Set **Start Command**: `java -jar target/expense-tracker-1.0.0.jar`
   - Add **Environment Variables**:
     - `SPRING_DATASOURCE_URL`: `jdbc:mysql://<db-host>:3306/expense_tracker?useSSL=false&serverTimezone=UTC`
     - `SPRING_DATASOURCE_USERNAME`: `<db-user>`
     - `SPRING_DATASOURCE_PASSWORD`: `<db-password>`
   - Click **Create Web Service**.
   - Copy your backend deployed URL (e.g., `https://expense-tracker-backend.onrender.com`).

---

### 2. Frontend Deployment (Vercel)

1. **Sign up / Log in** to [Vercel.com](https://vercel.com).
2. **Import Project:**
   - Click **Add New...** → **Project**.
   - Import your GitHub repo: `https://github.com/sanjanamandal1/Expense-Tracker`.
3. **Configure Project Settings:**
   - Set **Root Directory**: `frontend`
   - Framework Preset: **Vite**
   - Expand **Environment Variables**:
     - Key: `VITE_API_BASE_URL`
     - Value: `https://expense-tracker-backend.onrender.com/api/expenses` (your live backend URL)
4. Click **Deploy**.
   - Your frontend will be live on a custom URL (e.g., `https://expense-tracker-frontend.vercel.app`).

---

## Option 2: Docker Local / Server Deployment

You can containerize and run the entire stack (MySQL + Backend + Frontend) using Docker Desktop or any Linux VPS with one command.

### Prerequisites
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Run Full-Stack with Docker Compose

1. Clone the repository:
   ```bash
   git clone https://github.com/sanjanamandal1/Expense-Tracker.git
   cd Expense-Tracker
   ```

2. Start all services:
   ```bash
   docker compose up --build -d
   ```

3. Access the application:
   - **Frontend:** `http://localhost`
   - **Backend API:** `http://localhost:8080/api/expenses`
   - **MySQL Database:** `localhost:3306`

4. Stop all services:
   ```bash
   docker compose down
   ```

---

## Summary of Environment Variables

### Backend (`application.properties` / Environment)

| Variable | Description | Example |
| -------- | ----------- | ------- |
| `SPRING_DATASOURCE_URL` | Database JDBC URL | `jdbc:mysql://localhost:3306/expense_tracker` |
| `SPRING_DATASOURCE_USERNAME` | Database User | `root` |
| `SPRING_DATASOURCE_PASSWORD` | Database Password | `sanjana001` |

### Frontend (`.env` / Environment)

| Variable | Description | Example |
| -------- | ----------- | ------- |
| `VITE_API_BASE_URL` | Deployed Spring Boot API URL | `https://expense-tracker-backend.onrender.com/api/expenses` |
