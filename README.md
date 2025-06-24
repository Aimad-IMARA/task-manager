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

### Authentication & Security

- Users can register and log in securely
- JWT-based authentication with protected routes
- Authenticated users can only manage their own tasks
- Logout and session handling via React Context API
- Passwords must be strong: min 8 characters, including uppercase, lowercase, number, and special character
- All validation errors are clearly shown in the frontend form

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
   [http://localhost:5174](http://localhost:5174)

---

## Features

- Create, edit, delete tasks
- Input validation (title, description, status)
- Graceful error handling
- Responsive layout with Tailwind CSS
- Scrollable task list with clean scrollbar
- Simple and clean routing between pages
- Real-time registration feedback with validation messages

---

### API Endpoints

#### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate and receive a JWT

#### Tasks (requires authentication)

- `GET /api/tasks` - List tasks for the logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update an existing task
- `DELETE /api/tasks/{id}` - Delete a task

## Author

- **Aimad Imara**
- GitHub: [@Aimad-IMARA](https://github.com/Aimad-IMARA)
