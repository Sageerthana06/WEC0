# Complete Database & Frontend-Backend Setup Guide

## 📋 Overview

This guide sets up the WMC application with full PostgreSQL database integration, complete frontend pages, and backend APIs.

## ✅ What Has Been Completed

### Frontend Updates

- ✅ **Home Page** - Full stats display and featured services
- ✅ **About Page** - Company history, mission, vision, and team members
- ✅ **Services Page** - All 6 services with full details
- ✅ **Gallery Page** - Complete with category filtering and lightbox
- ✅ **Contact Page** - Message form with database integration
- ✅ **Data Context** - Integrated with initialData as fallback

### Backend API Routes

- ✅ `GET /api/services` - Fetch all services
- ✅ `POST /api/services` - Add new service
- ✅ `DELETE /api/services/:id` - Delete service
- ✅ `GET /api/gallery` - Fetch all gallery items
- ✅ `POST /api/gallery` - Add new gallery item
- ✅ `DELETE /api/gallery/:id` - Delete gallery item
- ✅ `GET /api/messages` - Fetch contact messages
- ✅ `POST /api/messages` - Submit new message
- ✅ `DELETE /api/messages/:id` - Delete message
- ✅ `GET /api/health` - Health check endpoint

### Database Tables

- ✅ **services** - Service listings
- ✅ **gallery** - Gallery images and videos
- ✅ **messages** - Contact form submissions
- ✅ **locations** - Branch locations
- ✅ **admins** - Admin users

## 🚀 Setup Instructions

### Step 1: Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/wmc_db
NODE_ENV=development
PORT=5000
```

For PostgreSQL with SSL (Neon, Railway, etc.):

```env
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```

### Step 2: Install Dependencies

**Frontend:**

```bash
npm install
```

**Backend:**

```bash
cd backend
npm install
```

### Step 3: Create Database Tables

**Option A - Using seed script (Recommended):**

```bash
cd backend
npm run seed
```

**Option B - Using init SQL file:**

```bash
psql -U your_user -d wmc_db -f config/init_postgres.sql
```

### Step 4: Seed Sample Data

The seed script automatically populates:

- 6 Services (Promotion, Business, Money Management, etc.)
- 12 Gallery items (Photos and images)

```bash
cd backend
npm run seed
```

### Step 5: Start Backend Server

```bash
cd backend
npm start
```

Expected output:

```
✅ Server running on port 5000
📡 API Base: http://localhost:5000/api
```

### Step 6: Start Frontend

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔗 Frontend-Backend Connection

### Current Configuration

```javascript
// src/context/DataContext.jsx
const API_URL = "http://localhost:5000/api";
```

### Fallback Data

- If backend is down, app uses initialData.js
- Services, gallery, and settings load from local state
- No errors displayed - seamless fallback

### Data Flow

```
Frontend (React)
    ↓
DataContext (state management)
    ↓
API calls to Backend
    ↓
PostgreSQL Database
```

## 📊 Database Schema

### Services Table

```sql
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  image TEXT,
  featured BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Gallery Table

```sql
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  image TEXT NOT NULL,
  type TEXT DEFAULT 'image',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Messages Table

```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🧪 Testing the Setup

### 1. Health Check

```bash
curl http://localhost:5000/api/health
# Should return: {"status":"ok","message":"Server is running"}
```

### 2. Get Services

```bash
curl http://localhost:5000/api/services
# Should return array of services
```

### 3. Get Gallery

```bash
curl http://localhost:5000/api/gallery
# Should return array of gallery items
```

### 4. Submit Message

```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Test message"
  }'
```

## 📱 Pages & Features

### Home Page

- Hero section with company info
- Featured services (4 items)
- Statistics counter (7+ years, 250+ staff, 8+ branches, 99% retention)
- Call-to-action for contact

### About Page

- Company hero with name and description
- Company history
- Mission & Vision statements
- Team members (4 team leads)
- Achievements section

### Services Page

- Search functionality
- All 6 services with filter
- Featured badges
- Service cards with descriptions

### Gallery Page

- 6 category tabs (All, Promotion, New Branch, Promotion#, events, Videos)
- Grid layout (responsive)
- Lightbox for image viewing
- Video support

### Contact Page

- Contact form with validation
- Location section with embedded map
- Social media links
- WhatsApp integration

## 🛠️ Common Issues

### Issue: "Cannot GET /api/services"

**Solution:** Backend server is not running

```bash
cd backend && npm start
```

### Issue: Database connection fails

**Solution:** Check DATABASE_URL in .env

```bash
# Test connection
psql $DATABASE_URL
```

### Issue: CORS errors

**Solution:** Backend already has CORS enabled, but check if server is running

### Issue: Images not loading

**Solution:** Place images in `public/` folder:

```
public/
  ├── images/
  │   ├── promotion.jpg
  │   └── ...
  └── photo/
      ├── chairman.jpg
      └── ...
```

## 📝 Notes

- **Initial Data**: All pages use fallback data from `initialData.js`
- **Database Optional**: Backend is optional; app works with frontend data
- **Image Paths**: Use relative paths like `/photo/image.jpg`
- **Categories**: Predefined gallery categories are used for filtering

## 🎯 Next Steps

1. Upload images to `public/images/` and `public/photo/`
2. Update company info in `src/data/initialData.js`
3. Add real team member images
4. Configure email notifications for messages
5. Add authentication for admin panel
6. Deploy to production

## 🚀 Production Deployment

### Environment Variables for Production

```env
DATABASE_URL=postgresql://...production_url...
NODE_ENV=production
PORT=5000
```

### Deploy Backend

```bash
# Using Railway, Heroku, Render, or similar
npm start
```

### Deploy Frontend

```bash
# Build
npm run build

# Deploy dist/ folder to Vercel, Netlify, etc.
```

## 📞 Support

For issues, check:

1. Console logs in browser DevTools
2. Backend terminal output
3. Database connection string
4. CORS configuration

---

**Last Updated:** 2024
**Version:** 1.0
