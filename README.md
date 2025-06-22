# Task Manager App

A full-stack task management application built with **Java Spring Boot** (backend) and **React.js + Tailwind CSS** (frontend).  
Users can create, edit, delete, and view tasks through a clean and responsive UI.

---

### Backend

- Java 17
- Spring Boot
- Spring Data JPA (Hibernate)
- MySQL
- Bean Validation
- Global Exception Handling (REST)

### Frontend

- React.js (Vite)
- React Router DOM
- Axios
- Tailwind CSS

### Database

- MySQL
- Initial schema provided in `schema.sql`

## Project Structure

```
task-manager/
├── backend/
│   └── Spring Boot REST API (Task CRUD)
├── frontend/
│   └── React App (with Tailwind)
└── schema.sql
```

---

## Getting Started

### Backend Setup (Spring Boot)

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Configure your database in `application.properties`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/task_db
   spring.datasource.username=your_mysql_user
   spring.datasource.password=your_mysql_password
   ```

3. Create database:

   ```sql
   CREATE DATABASE task_db;
   ```

4. Run the Spring Boot app:
   ```bash
   ./mvnw spring-boot:run
   ```

---

### Frontend Setup (React + Vite)

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app:

   ```bash
   npm run dev
   ```

4. App should be available at:  
   [http://localhost:5173](http://localhost:5173)

---

## Features

- Create, edit, delete tasks
- Input validation (title, description, status)
- Graceful error handling
- Responsive layout with Tailwind CSS
- Scrollable task list with clean scrollbar
- Simple and clean routing between pages

---

## Author

- **Aimad Imara**
- GitHub: [@Aimad-IMARA](https://github.com/Aimad-IMARA)
