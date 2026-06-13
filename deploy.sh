#!/bin/bash

# Deploy script for WEC0 - Frontend (Vercel) + Backend (Railway)

echo "🚀 WEC0 Deployment Helper"
echo "========================"
echo ""

# Step 1: Stage changes
echo "📝 Staging deployment configuration files..."
git add backend/server.js
git add backend/.env
git add frontend/.env.example
git add frontend/vercel.json
git add .env.local
git add DEPLOYMENT_CHECKLIST.md
git add VERCEL_RAILWAY_SETUP.md

echo "✅ Files staged"
echo ""

# Step 2: Commit
echo "💾 Committing changes..."
git commit -m "chore: add vercel + railway deployment configuration

- Fix backend CORS for Vercel frontend
- Add environment variable templates
- Add comprehensive deployment checklist
- Add Vercel configuration (vercel.json)
- Configure Railway backend for production"

echo "✅ Changes committed"
echo ""

# Step 3: Push
echo "🌍 Pushing to GitHub..."
git push origin main

echo "✅ Pushed to GitHub"
echo ""
echo "📋 Next Steps:"
echo "1. Open DEPLOYMENT_CHECKLIST.md for detailed instructions"
echo "2. Go to Railway Dashboard and update CLIENT_URL environment variable"
echo "3. Deploy frontend to Vercel (import from GitHub)"
echo "4. Update Railway CLIENT_URL with your Vercel URL after deployment"
echo "5. Create admin user in Neon database"
echo "6. Test login: yourdomain/admin/login"
echo ""
