✅ DEPLOYMENT CHECKLIST: Vercel Frontend + Railway Backend + Login Fix

## PART 1: Backend (Railway) - Already Deployed

Status: ✅ Running at https://wec0-production-7007.up.railway.app

### To Fix Login on Railway:

1. **Go to Railway Dashboard:**
   - https://railway.app
   - Select your WEC0 project

2. **Update Environment Variables:**
   - Click "Variables" tab
   - Update these values:

   ```
   DATABASE_URL=postgresql://neondb_owner:npg_olFkX3wU7gsc@ep-soft-resonance-aqewgagg.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require
   JWT_SECRET=wec_super_secret_jwt_key_change_me_2026
   NODE_ENV=production
   PORT=5000
   CLIENT_URL=https://YOUR-VERCEL-URL.vercel.app  ← UPDATE THIS AFTER FRONTEND DEPLOY
   ```

3. **Redeploy:**
   - Click "Deployments" tab
   - Select latest deployment
   - Click "Redeploy" button
   - Wait for status to show "✓ Running"

---

## PART 2: Database Setup - Create Admin User

1. **Open Neon Console:**
   - https://console.neon.tech
   - Select neondb
   - Click "SQL Editor"

2. **Create Admin Table (if not exists):**

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
   ```

3. **Insert Admin User:**

   ```sql
   INSERT INTO admins (username, email, password_hash, role, is_active)
   VALUES (
     'admin',
     'admin@wec.com',
     -- Password: admin123
     '$2a$10$YOgSzCjjmXX5jGxDvXyPseW5xpZ3mN0.zX0Y.rN2qKxZ9mZ8x2zYC',
     'admin',
     true
   );
   ```

4. **Verify:**
   ```sql
   SELECT * FROM admins;
   ```

---

## PART 3: Frontend Deployment (Vercel)

### 3A: Create Vercel Project

1. **Go to Vercel:**
   - https://vercel.com
   - Click "Add New"
   - Select "Project"

2. **Import Repository:**
   - Select your GitHub repo (WMC0)
   - Choose "frontend" as root directory

3. **Build Settings:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3B: Set Environment Variables in Vercel

1. **Go to Project Settings → Environment Variables**

2. **Add these variables:**

   ```
   VITE_API_URL = https://wec0-production-7007.up.railway.app
   VITE_EMAILJS_PUBLIC_KEY = your_emailjs_public_key
   VITE_EMAILJS_SERVICE_ID = your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID = your_emailjs_template_id
   ```

3. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your frontend URL: `https://wec0-xxxxx.vercel.app`
   - Copy this URL!

---

## PART 4: Final Configuration

### 4A: Update Railway Backend with Vercel URL

1. **Back to Railway Dashboard:**
   - Go to Variables
   - Update `CLIENT_URL` to your new Vercel URL:
     ```
     CLIENT_URL=https://wec0-xxxxx.vercel.app
     ```
   - Save & Redeploy

### 4B: Push Code Changes

```bash
cd C:\Users\HP\Downloads\WMC0
git add .
git commit -m "feat: deploy to vercel + railway with cors fix"
git push origin main
```

---

## PART 5: Test Login

1. **Open your deployed frontend:**

   ```
   https://wec0-xxxxx.vercel.app/admin/login
   ```

2. **Try logging in with:**
   - Email: `admin@wec.com`
   - Password: `admin123`

3. **If login fails, check:**
   - [ ] Vercel environment variables are set
   - [ ] Railway environment variables updated
   - [ ] Admin user exists in Neon database
   - [ ] Browser F12 → Network tab → check API response
   - [ ] Railway logs show no errors

---

## API Endpoints to Test

```bash
# Test backend health
curl https://wec0-production-7007.up.railway.app/api/health

# Get gallery
curl https://wec0-production-7007.up.railway.app/api/gallery

# Login (will work once admin user is created)
curl -X POST https://wec0-production-7007.up.railway.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@wec.com","password":"admin123"}'
```

---

## Your Deployment Summary

```
🌐 Frontend:  https://wec0-xxxxx.vercel.app
🔌 Backend:   https://wec0-production-7007.up.railway.app
💾 Database:  ep-soft-resonance-aqewgagg.c-8.us-east-1.aws.neon.tech
📧 EmailJS:   [configure in Vercel env vars]
```

---

## Common Issues

| Issue                 | Solution                                          |
| --------------------- | ------------------------------------------------- |
| "Invalid credentials" | Verify admin user exists in Neon DB               |
| CORS error            | Update CLIENT_URL on Railway to match Vercel URL  |
| API not responding    | Check Railway deployment status in dashboard      |
| "Cannot find module"  | Check Package.json scripts are correct            |
| Page blank/404        | Ensure Vercel root directory is set to "frontend" |

---

## Need Help?

- **Railway Logs:** Railway Dashboard → Your Project → Logs tab
- **Vercel Logs:** Vercel Dashboard → Your Project → Deployments → View logs
- **Neon Database:** https://console.neon.tech → SQL Editor
