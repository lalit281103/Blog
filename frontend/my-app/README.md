# 📝 RBAC Blog Platform

A full-stack **blog platform** built with **React**, **Node.js/Express**, and **MongoDB**, featuring **role-based access control (RBAC)** for users and admins.

---

## 🚀 Features

- 🔐 **User Authentication** (JWT-based)
- 🧑‍💼 **Role-based Authorization** (`admin`, `user`)
- 📰 **Admin-only CRUD** for blog posts
- 🌐 **Public blog viewing**
- 🔑 **Secure password hashing** with bcrypt
- ⚛️ **React SPA** with protected routes
- 📦 Backend API using Express and MongoDB
- 🌈 Responsive UI (with clean layout)

---

## 🗂️ Project Structure

```
rbac-blog-platform/
├── backend/        ← Node.js + Express + MongoDB
├── frontend/       ← React app (SPA)
```

---

## 🛠️ Backend Setup

### 📁 Navigate to backend folder:
```bash
cd backend
```

### 📦 Install dependencies:
```bash
npm install
```

### ⚙️ Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/rbac-blog
JWT_SECRET=your-secret-key
PORT=5000
```

### ▶️ Run the server:
```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

---

## ⚛️ Frontend Setup

### 📁 Navigate to frontend folder:
```bash
cd ../frontend
```

### 📦 Install dependencies:
```bash
npm install
```

### ▶️ Start the frontend:
```bash
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 📋 Pages & Routes

| Path         | Access   | Description               |
|--------------|----------|---------------------------|
| `/`          | Public   | View all blog posts       |
| `/signup`    | Public   | Register (user/admin)     |
| `/login`     | Public   | Login                     |
| `/admin`     | Admin    | Create/Edit/Delete posts  |

---

## 🔐 Role-Based Access

- **Admin** can:
  - Create, edit, delete blog posts
  - Access `/admin` dashboard
- **User** can:
  - View blog posts only

---

## 🧪 Testing

You can:
- Signup as `admin` or `user`
- Login and get JWT token (stored in localStorage)
- View/create/edit/delete posts based on role

---

## 🧰 Tech Stack

### 🖥 Frontend:
- React
- React Router DOM
- Axios

### ⚙️ Backend:
- Node.js
- Express
- Mongoose
- JWT
- bcrypt
- dotenv
- cors

### 🛢 Database:
- MongoDB (local or Atlas)

---

## 📸 Screenshots (optional)

> You can paste UI images here

---

## 📌 Future Improvements
- ✅ Form validations
- 🌐 Multi-language support (i18n)
- 🎨 Improved UI with Tailwind or ShadCN
- 🔒 Email verification or MFA
- 📁 File upload for posts

---

## 📄 License

This project is open-source and free to use.