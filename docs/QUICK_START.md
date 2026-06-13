# 🚀 Quick Start Guide - Complete Setup (5 minutes)

## 📦 Installation

### Step 1: Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend opens at `http://localhost:5173`

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with DATABASE_URL
echo 'DATABASE_URL=your_postgresql_connection_string' > .env

# Start the backend server
npm start
```

Backend runs on `http://localhost:5000`

### Step 3: Seed Database (Recommended)

```bash
cd backend
npm run seed:postgres
```

Populates database with:

- 6 Services
- 12 Gallery items

## ✨ What's Included

### Frontend Pages (✅ 100% Complete)

- **Home** - Hero section + Featured services (4) + Statistics
- **About** - Company story + Mission + Vision + Team (4 members)
- **Services** - All 6 services with search functionality
- **Gallery** - 12+ images with category filtering & lightbox
- **Contact** - Message form + Embedded map + Social links

### Backend APIs (✅ 100% Complete)

- `GET /api/services` - Fetch all services
- `POST /api/services` - Add new service
- `DELETE /api/services/:id` - Delete service
- `GET /api/gallery` - Fetch all gallery items
- `POST /api/gallery` - Add new gallery item
- `DELETE /api/gallery/:id` - Delete gallery item
- `GET /api/messages` - Fetch contact messages
- `POST /api/messages` - Submit contact form
- `DELETE /api/messages/:id` - Delete message
- `GET /api/health` - Health check

### Database (✅ 100% Complete)

- Services table
- Gallery table
- Messages table
- Locations table
- Admins table (for future use)

## 🔌 Frontend-Backend Connection

**Smart Fallback System:**

- If backend is offline → App uses local data
- If backend is online → Fetches from database
- **Zero errors**, seamless user experience

## 🎨 Data Loaded

### Services

1. Promotion (Manager)
2. Owen Business
3. Money Management
4. Business Management
5. Human Resource Management
6. Skill Development

### Gallery

- 23 promotion photos
- 2 event photos
- 3 branch photos

### Home Page Stats

- 7+ years experience
- 250+ staff
- 8+ branches
- 99% retention rate

### Team (About Page)

- Mr. Thilak Gunasekara - Founder & CEO
- Ms. Harini De Silva - Operations Manager
- Mr. Arjun Perera - Business Development
- Ms. Fathima Ahmed - HR & Admin Manager

## 🔧 Configuration

### Get PostgreSQL URL

**Local PostgreSQL:**

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/wmc_db
```

**Neon (Free cloud - Recommended):**

1. Visit https://console.neon.tech
2. Create project
3. Copy connection string
4. Paste in .env

**Railway (Free cloud):**

1. Visit https://railway.app
2. Create PostgreSQL project
3. Copy DATABASE_URL

**Render:**

1. Visit https://render.com
2. Create PostgreSQL database
3. Copy external connection string

### .env File

```env
# Database connection
DATABASE_URL=postgresql://user:password@host:port/database

# Server
NODE_ENV=development
PORT=5000
```

## 🧪 Test Everything

### Check Backend is Running

```bash
curl http://localhost:5000/api/health
```

Response: `{"status":"ok","message":"Server is running"}`

### Fetch Services

```bash
curl http://localhost:5000/api/services
```

### Submit Message

```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Hello"}'
```

## 🎯 Customize Your Site

### Update Company Info

File: `src/data/initialData.js`

```javascript
export const COMPANY = {
  name: "Your Company",
  shortName: "YC",
  email: "your@email.com",
  phone: "+94xxx",
  address: "Your address",
};
```

### Update Descriptions

File: `src/data/initialData.js`

```javascript
export const INITIAL_SITE_SETTINGS = {
  home: {
    heroTagline: "Your tagline",
    heroSubtitle: "Your description",
  },
  about: {
    history: "Company history...",
    mission: "Our mission...",
    vision: "Our vision...",
  },
};
```

### Add Your Images

Place in `public/` folder:

```
public/
├── images/
│   ├── promotion.jpg
│   ├── service1.jpg
│   └── ...
└── photo/
    ├── chairman.jpg
    ├── team.jpg
    └── ...
```

## 🚨 Troubleshooting

### Frontend Won't Load

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend Connection Error

```bash
# Check if backend is running
curl http://localhost:5000/api/health

# If not, restart backend
cd backend
npm start
```

### Database Connection Fails

```bash
# Verify DATABASE_URL
# Try connecting directly:
psql $DATABASE_URL

# Or on Windows:
psql "postgresql://user:password@host:port/db"
```

### Port Already in Use

```bash
# Use different port
PORT=3000 npm start
```

## ✅ Verification Checklist

- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Dependencies installed (`npm install && cd backend && npm install`)
- [ ] .env file created with DATABASE_URL
- [ ] Backend started (`npm start` in backend folder)
- [ ] Database seeded (`npm run seed:postgres`)
- [ ] Frontend running (`npm run dev`)
- [ ] Can access http://localhost:5173
- [ ] Can access http://localhost:5000/api/health

## 📱 View Your Site

**Frontend:** http://localhost:5173

- Home page with stats
- Services with search
- Gallery with lightbox
- Contact form
- About page with team

**Backend API:** http://localhost:5000/api

- Services, Gallery, Messages endpoints
- Health check endpoint

## 🌐 Ready to Deploy?

### Frontend (Vercel/Netlify)

```bash
# Build
npm run build

# Upload dist/ folder
```

### Backend (Railway/Render/Heroku)

```bash
# Push code
git push
```

## 🎉 You're All Set!

Your WMC application is now:

- ✅ Fully functional frontend
- ✅ Working backend API
- ✅ PostgreSQL database connected
- ✅ Sample data loaded
- ✅ Ready for customization

**Next Steps:**

1. Add your company logo and images
2. Update company information
3. Customize colors and text
4. Add real team photos
5. Deploy to production

---

**Need Help?**

- Check terminal output for errors
- Open browser console (F12) for frontend errors
- See DATABASE_SETUP_GUIDE.md for detailed documentation
