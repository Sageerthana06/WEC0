# Quick Deployment Guide: Vercel + Railway + Fix Login

## Current Status

- ❌ Frontend: Not deployed (local only)
- ❌ Backend: Deployed to Railway but login not working
- ❌ Connection: API URL not configured on Vercel

---

## Step 1: Fix Backend CORS Configuration

Update `backend/server.js`:

```javascript
import cors from "cors";

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
```

---

## Step 2: Set Railway Backend Environment Variables

Go to Railway Dashboard → Your Project → Variables:

```
DATABASE_URL=postgresql://neondb_owner:npg_olFkX3wU7gsc@ep-soft-resonance-aqewgagg.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=wec_super_secret_jwt_key_change_me_2026
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-vercel-app.vercel.app
```

---

## Step 3: Deploy Frontend to Vercel

1. **Create Vercel Project:**
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import your GitHub repo
   - Select "frontend" as root directory

2. **Set Environment Variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add these:

   ```
   VITE_API_URL=https://wec0-production-7007.up.railway.app
   VITE_EMAILJS_PUBLIC_KEY=your_key
   VITE_EMAILJS_SERVICE_ID=your_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   ```

3. **Deploy:**
   - Vercel auto-deploys on git push
   - Your URL will be: `https://your-project.vercel.app`

---

## Step 4: Create Admin User in Database

Connect to Neon console and run:

```sql
-- Check if admins table exists
SELECT * FROM admins LIMIT 1;

-- If table doesn't exist, create it:
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin user (password: admin123)
INSERT INTO admins (username, email, password_hash, role, is_active)
VALUES (
  'admin',
  'admin@wec.com',
  '$2a$10$YOgSzCjjmXX5jGxDvXyPseW5xpZ3mN0.zX0Y.rN2qKxZ9mZ8x2zYC',
  'admin',
  true
);
```

---

## Step 5: Test the Login

1. Open: `https://your-vercel-app.vercel.app/admin/login`
2. Enter credentials:
   - Email: `admin@wec.com`
   - Password: `admin123`
3. Click Login

---

## Troubleshooting

### ❌ "Invalid credentials" error

- [ ] Check admin table exists in Neon
- [ ] Verify password hash is correct
- [ ] Check browser console for API errors (F12)

### ❌ CORS errors

- [ ] Update `CLIENT_URL` on Railway
- [ ] Restart Railway deployment
- [ ] Check that Vercel URL matches

### ❌ API not responding

- [ ] Check Railway deployment status
- [ ] View Railway logs for errors
- [ ] Test API directly: `curl https://wec0-production-7007.up.railway.app/api/gallery`

---

## Your Current URLs

After deployment:

```
Frontend:  https://your-project.vercel.app
Backend:   https://wec0-production-7007.up.railway.app
Database:  Neon (ep-soft-resonance-aqewgagg.c-8.us-east-1.aws.neon.tech)
```
