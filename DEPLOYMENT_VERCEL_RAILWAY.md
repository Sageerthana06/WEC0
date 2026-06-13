# Deployment Guide: Vercel (Frontend) + Railway (Backend)

## 1. Backend Deployment (Railway)

### Step 1: Prepare Railway

1. Go to https://railway.app and sign in
2. Create a new project → Click "Deploy from GitHub"
3. Connect your GitHub repo and select this project
4. Railway will auto-detect `package.json` in `/backend`

### Step 2: Set Environment Variables on Railway

In Railway project dashboard, go to **Variables** and add:

```
DATABASE_URL=postgresql://neondb_owner:npg_xxxxx@ep-xxxxx.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=wec_super_secret_jwt_key_change_me_2026
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-vercel-frontend.vercel.app
```

> Get `DATABASE_URL` from Neon console
> Replace `CLIENT_URL` with your actual Vercel frontend URL

### Step 3: Deploy

Railway auto-deploys on push to main. Your backend URL will be:

```
https://wec0-production-7007.up.railway.app
```

---

## 2. Frontend Deployment (Vercel)

### Step 1: Create Vercel Project

1. Go to https://vercel.com and sign in
2. Click "Add New" → "Project"
3. Import from GitHub (select your WMC0 repo)
4. Select "Frontend" as the root directory

### Step 2: Set Environment Variables

In Vercel project settings → **Environment Variables**:

```
VITE_API_URL=https://wec0-production-7007.up.railway.app
VITE_EMAILJS_PUBLIC_KEY=your_key
VITE_EMAILJS_SERVICE_ID=your_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

> Use the Railway backend URL from Step 1

### Step 3: Configure Frontend Package

Ensure `frontend/package.json` has:

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Step 4: Deploy

Vercel auto-deploys on push. Your frontend URL will be:

```
https://your-project.vercel.app
```

---

## 3. Fix Backend CORS for Deployed Frontend

Update `backend/server.js` to accept your Vercel URL:

```javascript
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
```

---

## 4. Fix Database Tables for Admin Login

Connect to Neon and run:

```sql
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create first admin
INSERT INTO admins (username, email, password_hash, role, is_active)
VALUES ('admin', 'admin@wec.com', '$2a$10$...', 'admin', TRUE);
```

---

## 5. Test Login Connection

1. Open deployed frontend: `https://your-project.vercel.app/admin/login`
2. Try demo credentials: `admin@wec.com` / `admin123`
3. Check browser console for API errors (F12 → Network tab)

---

## Troubleshooting

### "Invalid credentials" error

- Check admin table exists in Neon
- Verify `VITE_API_URL` is set on Vercel
- Check Railway logs for connection errors

### CORS errors

- Update `CLIENT_URL` on Railway to match Vercel frontend URL
- Restart Railway deployment

### API not responding

- Verify Railway deployment status is "Running"
- Check Railway logs for errors
- Test backend directly: `curl https://your-railway-url/api/gallery`
