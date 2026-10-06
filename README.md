

# 🛍️ Full Stack E-commerce Web Application

A full-stack **E-commerce application** using **Spring Boot** (Java) for the backend and **ReactJS with Vite** for the frontend. This application demonstrates the integration of RESTful APIs with a modern frontend stack, ideal for learning and demonstration purposes.

---

## 📁 Project Structure

```
SpringBoot-Reactjs-Ecommerce-main/
├── Ecommerce-Backend/       # Spring Boot REST API backend
├── Ecommerce-Frontend/      # React + Vite frontend application
```

---

## 🧩 Backend - Spring Boot

### 🔧 Technologies Used

* Java 17+
* Spring Boot
* Spring Data JPA
* MySQL (can be adapted)
* Maven

### 📂 Backend Directory Structure

```
BACKEND ADMIN + BRANCH IMPLEMENTATION

Replace the matching files in:
Ecommerce-Backend/src/main/java/com/srilakshmigoldbuyers/

Files included:
controller/AdminController.java
controller/BranchController.java
model/Admin.java
model/Branch.java
repository/AdminRepository.java
repository/BranchRepository.java
service/AdminService.java
service/BranchService.java
config/CorsConfig.java
config/DataIntilizer.java

Default admin created automatically when the database has no admin named 'admin':
username: admin
password: Admin@123

Default branch created automatically only when the branches table is empty:
11, 1st Cross, Lingadhiranahalli, Andrahalli Main Road, Near Royal Mart
Bengaluru, Karnataka - 560091
Phone: 9542568978

IMPORTANT:
This is a simple project-level authentication implementation using a database password field.
Before production deployment, replace this with Spring Security + BCrypt/Argon2 + token/session authentication.

API endpoints:
ADMIN
POST   /api/admin/login
GET    /api/admin
GET    /api/admin/{id}
POST   /api/admin
PUT    /api/admin/{id}
PUT    /api/admin/{id}/status
DELETE /api/admin/{id}

BRANCH
GET    /api/branches
GET    /api/branches/active
GET    /api/branches/{id}
POST   /api/branches
PUT    /api/branches/{id}
PUT    /api/branches/{id}/status
DELETE /api/branches/{id}


### ⚙️ Setup Instructions

1. **Database Setup:**

   * Create a MySQL database, e.g., `ecomdb`.
   * Update `application.properties`:

     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/ecomdb
     spring.datasource.username=root
     spring.datasource.password=yourpassword
     spring.jpa.hibernate.ddl-auto=update
     ```

2. **Run the App:**

   ```bash
   cd Ecommerce-Backend
   mvn spring-boot:run
   ```

3. **Data Initialization:**

   On first run, `data1.sql` inserts seed product data into your DB.

### 📡 REST API Endpoints

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| GET    | `/products`      | Fetch all products |
| GET    | `/products/{id}` | Get product by ID  |
| POST   | `/products`      | Add new product    |
| PUT    | `/products/{id}` | Update product     |
| DELETE | `/products/{id}` | Delete product     |

---

## 💻 Frontend - React + Vite

### 🔧 Technologies Used

* ReactJS
* Vite (bundler)
* Axios (API calls)
* Bootstrap (UI)
* JavaScript (ES6+)

### 📂 Frontend Directory Structure

```
Ecommerce-Frontend/
├── public/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Page-level components
│   ├── App.jsx          # App layout
│   └── main.jsx         # Entry point
├── package.json
└── vite.config.js
```

### ▶️ Getting Started

1. **Install dependencies:**

   ```bash
   cd Ecommerce-Frontend
   npm install
   ```

2. **Run the app:**

   ```bash
   npm run dev
   ```

   This will launch the frontend at `http://localhost:5173`.

3. **Connect to Backend:**

   Update the backend URL in API service files (usually inside `src/` or `src/services/`) if needed:

   ```js
   axios.get('http://localhost:8080/products')
   ```

### 🧩 Features

* Product List (from Spring Boot backend)
* Dynamic rendering using React components
* Fully responsive UI
* Easy integration with further features (cart, checkout, login)

