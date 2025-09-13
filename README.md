# 📌 Task Manager API

A simple and secure **Task Management API**.  
Users can sign up, log in, and manage their own tasks with full **JWT authentication**.  

---

## 🚀 Features

### 🔑 User Management
- **Sign Up** → Register a new user  
- **Login** → Authenticate and receive a JWT token  
- **JWT Authentication** → All task operations require authentication  

### ✅ Task Management
- **Create Task** → Add a new task with title, description, and category  
- **Get Tasks** → Retrieve all tasks for the authenticated user  
- **Filter** → Filter tasks by status (completed/pending) or category  
- **Get Task by ID** → Fetch a single task by ID  
- **Update Task** → Modify task details or mark as completed/pending  
- **Delete Task** → Delete a task by ID  

---

## 🛠 Tech Stack
- **Node.js** → Backend framework  
- **Express.js** → RESTful API design  
- **SQLite** → Lightweight database  
- **JWT** → Authentication and authorization  

---

## 📂 Project Structure

```bash
src/
│── config/
│   └── db.ts          # Database connection & schema setup
│── routes/
│   ├── auth.ts        # Authentication routes
│   └── tasks.ts       # Task CRUD routes
│── middleware/
│   └── auth.ts        # JWT middleware
│── app.ts             # Express app
│── server.ts          # Server startup
│── package.json
│── README.md
