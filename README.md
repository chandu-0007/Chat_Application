# 💬 Real-Time Chat Application

A full-stack **real-time chat application** built with modern technologies.
It features secure authentication, live messaging using WebSockets, and a clean modern UI.

---

## 🚀 Tech Stack

### 🖥️ Frontend

* Next.js
* Tailwind CSS
* TypeScript

### ⚙️ Backend

* Node.js
* Express.js
* Socket.IO

### 🗄️ Database & Auth

* Neon Database (PostgreSQL)
* Prisma ORM
* JWT Authentication

---

## ✨ Features

* 💬 Real-time messaging with Socket.IO
* 🔐 Secure authentication using JWT
* 🧑‍🤝‍🧑 One-to-one chat support
* ⚡ Fast and responsive UI
* 🎨 Modern design with Tailwind CSS
* 🔄 Live updates without refresh
* 📱 Fully responsive (mobile + desktop)

---
 ## Landing Page 
 
<img width="1920" height="1080" alt="Screenshot (2)" src="https://github.com/user-attachments/assets/c193c620-ab41-49bc-add3-73c178e0acc2" />

<img width="1920" height="1080" alt="Screenshot (3)" src="https://github.com/user-attachments/assets/4491905a-bb20-4cd4-942b-709285c139ec" />

## login page 
## 📂 Project Structure

```
project-root/
│── Frontend/      # Next.js client
│── server/       # Node.js + Express server
```

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone 
cd project-root
```

---

## ▶️ Run Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:3001
```

---

## ▶️ Run Backend

```bash
cd server
npm install
npm run test
```

Server will run on:

```
http://localhost:3003
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **Backend** folder:

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret_key
PORT=3003
```

---

## 🗄️ Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev
```

---

## 🔌 WebSocket (Socket.IO)

* Real-time communication between client & server
* Handles live chat messages and updates instantly

---

## 📌 Notes

* Ensure Node.js is installed
* Neon DB should be configured correctly
* Prisma schema must match your database

---
