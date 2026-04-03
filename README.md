# 🚀 Finance Dashboard Backend

A production-ready backend system for a **Finance Dashboard Application** built using Node.js, Express, and MongoDB.

This API handles secure authentication, financial record management, and real-time analytics with role-based access control.

---

## 📌 Overview

This backend provides APIs for:

- User authentication and authorization (JWT-based)
- Financial record management (income and expenses)
- Dashboard analytics (summary, trends, category breakdown)
- User profile and password management
- Role-based access control (ADMIN, ANALYST, VIEWER)

---

## ⚡ Key Highlights

- 🔐 Secure JWT authentication system
- 🧱 Clean architecture (Controller -> Service -> Model)
- 📊 Aggregation pipelines for analytics (MongoDB)
- 🛡️ Role-based access control (RBAC)
- ⚡ Optimized queries with filtering and sorting
- 📄 Swagger API documentation
- 🔄 Password reset workflow with token system

---

## 📈 Impact

- Designed to scale with modular layers (controllers, services, models, middleware)
- Mirrors real-world backend workflows: auth, role checks, data ownership, analytics
- Demonstrates practical engineering decisions for maintainability and security
- Ready to extend with email, pagination, testing, and reporting features

---

## 🛠️ Tech Stack

- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB
- ODM: Mongoose
- Authentication: JWT + bcryptjs
- API Docs: Swagger (swagger-jsdoc + swagger-ui-express)

---

## 👥 Roles & Permissions

| Action | ADMIN | ANALYST | VIEWER |
|---------------------|-------|---------|--------|
| View Records | ✅ | ✅ | ✅ |
| Create Records | ✅ | ❌ | ❌ |
| Update Records | ✅ | ✅ | ❌ |
| Delete Records | ✅ | ❌ | ❌ |
| View Users | ✅ | ❌ | ❌ |
| Dashboard Access | ✅ | ✅ | ✅ |

---

## 🌐 API Base URL

`http://localhost:5000`

---

## 🔑 Authentication APIs

- `POST /api/auth/register`
- `POST /api/auth/login`

---

## 👤 User APIs

- `GET /api/users` (Admin only)
- `GET /api/users/me`
- `PUT /api/users/me`
- `PUT /api/users/change-password`
- `POST /api/users/forgot-password`
- `PUT /api/users/reset-password/:token`

---

## 💰 Records APIs

- `POST /api/records`
- `GET /api/records`
- `PATCH /api/records/:id`
- `DELETE /api/records/:id`

### Query Filters

- `type` -> INCOME / EXPENSE
- `category` -> string
- `startDate`, `endDate` -> date range

Default sorting: **latest first**

---

## 📊 Dashboard APIs

- `GET /api/dashboard/summary`
- `GET /api/dashboard/category`
- `GET /api/dashboard/recent`
- `GET /api/dashboard/trends`

---

## 📦 Example Request

```json
{
    "amount": 5000,
    "type": "INCOME",
    "category": "Salary",
    "date": "2026-04-03",
    "notes": "Freelance work"
}
```

## 📈 Example Response

```json
{
    "totalIncome": 26000,
    "totalExpenses": 12000,
    "netBalance": 14000
}
```

---

## ⚙️ Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/finance-dashboard
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

---

## ▶️ Run Locally

```bash
npm install
npm run dev
```

Production:

```bash
npm start
```

---

## 📄 API Documentation

Swagger UI available at:

`http://localhost:5000/api-docs`

---

## 🧱 Architecture

Controller -> Service -> Model

- Controllers handle request/response flow
- Services contain business logic and aggregations
- Models define schema and database interactions
- Middleware handles auth, role checks, and centralized errors

---

## 🔒 Security Notes

- Passwords hashed using bcrypt (Mongoose pre-save hook)
- JWT-based authentication with protected routes
- Sensitive fields excluded from responses
- Password reset token currently returned via API (email integration pending)

---

## 🚀 Future Improvements

- Email integration for password reset
- Pagination for records API
- Automated testing (Jest)
- Export reports (CSV/PDF)
- Rate limiting and security hardening

---

## 👨‍💻 Author

Akash Gite

---

## 📜 License

ISC
