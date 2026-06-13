# 🚀 Deployment Guide - Netlify + Railway

## Step 1: Prepare Your Code for Deployment

### Frontend Configuration (Vite)

Ensure `vite.config.js` is production-ready:

```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
};
```

Add `.env.production` for production API URL:

```
VITE_API_URL=https://your-backend-url.railway.app/api
```

### Update Frontend API calls

In `src/utils/api.js`, use environment variable:

```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

### Backend Configuration

Ensure `backend/.env` has production variables.

---

## Step 2: Deploy Backend on Railway (Free Tier)

### 2.1 Push code to GitHub

```powershell
# In root directory
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/wmc-project.git
git push -u origin main
```

### 2.2 Sign up on Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Select your repository

### 2.3 Configure Backend Environment Variables

1. In Railway dashboard, go to your project
2. Click on backend service
3. Go to "Variables" tab
4. Add these variables:

```
MONGO_URI=mongodb+srv://sageerthana:sageerthana2003@cluster0.qbxzlx1.mongodb.net/wecnew-db?retryWrites=true&w=majority
JWT_SECRET=your_strong_secret_key_here
PORT=5000
CLIENT_URL=https://your-netlify-domain.netlify.app
NODE_ENV=production
```

### 2.4 Add Procfile for Railway

Create `backend/Procfile`:

```
web: node server.js
```

### 2.5 Deploy

Railway will auto-deploy when you push to GitHub. Your backend URL will be like:

```
https://your-project-railway.app
```

---

## Step 3: Deploy Frontend on Netlify

### 3.1 Build Frontend

```powershell
npm run build
```

This creates `dist/` folder.

### 3.2 Sign up on Netlify

1. Go to https://app.netlify.com
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your GitHub repository

### 3.3 Configure Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Base directory**: `.` (root)

### 3.4 Set Environment Variables

In Netlify dashboard → Settings → Build & Deploy → Environment:

```
VITE_API_URL=https://your-backend-url.railway.app/api
```

### 3.5 Deploy

Netlify will auto-deploy. Your site URL will be like:

```
https://your-site-name.netlify.app
```

---

## Step 4: Configure CORS

Update `backend/server.js` to allow your Netlify domain:

```javascript
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-site-name.netlify.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
```

---

## Step 5: Fix MongoDB Atlas IP Whitelist

1. Go to MongoDB Atlas dashboard
2. Click "Network Access" → "IP Whitelist"
3. Add Railway's IP: `0.0.0.0/0` (allows all IPs for simplicity)

---

## Troubleshooting

### Backend not deploying?

- Check Railway build logs
- Ensure `package.json` has correct entry point
- Verify `MONGO_URI` is correct

### Frontend build fails?

- Clear node_modules: `rm -r node_modules && npm install`
- Check for TypeScript errors: `npm run build`

### API connection issues?

- Verify backend URL in `VITE_API_URL`
- Check CORS settings in backend
- Open browser DevTools → Network tab to see requests

### MongoDB connection fails?

- Verify credentials in `MONGO_URI`
- Check IP whitelist in Atlas
- Ensure database exists

---

## Quick Links

- Railway: https://railway.app
- Netlify: https://netlify.com
- MongoDB Atlas: https://cloud.mongodb.com
