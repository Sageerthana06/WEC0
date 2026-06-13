# 🚀 World Entrepreneurs Export & Import (PVT) LTD — WMC Project

Welcome to the restructured WMC project! To keep the project clean, organized, and easy to maintain, the **Frontend** and **Backend** have been separated into their own dedicated directories.

---

## 📁 Directory Structure

```text
WMC0/
├── frontend/               # React (Vite + Tailwind CSS v4) Frontend
│   ├── src/                # Frontend source code
│   ├── public/             # Static assets (images, icons, etc.)
│   ├── package.json        # Frontend dependencies & scripts
│   └── .env.local          # Frontend local environment configuration
│
├── backend/                # Node.js + Express + PostgreSQL Backend
│   ├── config/             # Database connection setup
│   ├── controllers/        # Request handlers
│   ├── routes/             # API routes
│   ├── package.json        # Backend dependencies & scripts
│   └── .env                # Backend environment configuration
│
└── docs/                   # Developer documentation & setup guides
```

---

## ⚡ Quick Start (Run from Root)

You can run commands directly from the root directory using the root-level scripts:

### 1. Install all dependencies
```bash
npm run install:all
```

### 2. Start the Backend API (runs on http://localhost:5000)
```bash
npm run dev:backend
```

### 3. Start the Frontend Dev Server (runs on http://localhost:5173)
```bash
npm run dev:frontend
```

---

## 🛠️ Running Individually (Alternative Method)

If you prefer to navigate into each folder manually, you can use these standard commands:

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev     # Starts backend with hot-reload (node --watch)
```

---

## 📚 Reference Guides & Documentation

All setup and detailed guides have been organized under the `docs/` folder:

*   **[Quick Start Guide](file:///c:/Users/HP/Downloads/WMC0/docs/QUICK_START.md)** — Step-by-step setup overview.
*   **[Database Setup Guide](file:///c:/Users/HP/Downloads/WMC0/docs/DATABASE_SETUP_GUIDE.md)** — Setting up and running PostgreSQL/Neon database.
*   **[EmailJS Setup Guide](file:///c:/Users/HP/Downloads/WMC0/docs/EMAILJS_SETUP.md)** — Integrating contact forms with EmailJS.
*   **[Deployment Guide](file:///c:/Users/HP/Downloads/WMC0/docs/DEPLOYMENT_GUIDE.md)** — Deploying frontend and backend to production.
*   **[Animation Guide](file:///c:/Users/HP/Downloads/WMC0/docs/ANIMATION_GUIDE.md)** — Understanding Framer Motion setup.
