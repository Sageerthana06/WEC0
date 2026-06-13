# Neon PostgreSQL Full Backend Setup

Complete guide to set up and run the WEC Backend with Neon PostgreSQL.

## Prerequisites

- Node.js 18+ installed
- A Neon PostgreSQL database (free tier available at neon.tech)
- Git configured

## Step 1: Neon Database Setup

1. **Create a Neon Account**
   - Visit [neon.tech](https://neon.tech)
   - Sign up with GitHub or email
   - Create a new project

2. **Get Connection String**
   - Go to your Neon Dashboard
   - Select your project → "Connection string"
   - Copy the PostgreSQL connection string
   - Should look like: `postgresql://user:password@host/dbname?sslmode=require`

3. **Store in .env**
   ```bash
   DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
   ```

## Step 2: Initialize Backend Project

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your Neon credentials
```

## Step 3: Initialize Database Schema

### Option A: Using SQL Command Line (psql)

```bash
# Connect to your Neon database
psql "your_database_url"

# Paste contents of config/init.sql
```

### Option B: Using Node Script (Recommended)

The database will auto-initialize on first server startup if tables don't exist.

## Step 4: Environment Variables

Create `.env` in the `backend` directory:

```env
# Neon PostgreSQL Connection
DATABASE_URL=postgresql://neondb_owner:your_password@ep-xxxx.us-east-1.neon.tech/neondb?sslmode=require

# JWT Secret (change this!)
JWT_SECRET=your_super_secret_jwt_key_change_me_2026

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

## Step 5: Run the Backend

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Expected output:
```
✅ PostgreSQL Connected
🕒 Server Time: 2026-06-11T...

🚀 WEC Backend running on http://localhost:5000
📡 API available at http://localhost:5000/api
💾 Database: Neon PostgreSQL
🏥 Health check: http://localhost:5000/api/health
```

## Step 6: Test the API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Get Services
```bash
curl http://localhost:5000/api/services
```

### Add a Service
```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Service",
    "description": "A test service",
    "category": "test",
    "price": 99.99
  }'
```

## Database Schema

The following tables are created automatically:

- **services** - Service offerings
- **gallery** - Gallery images and content
- **messages** - Contact form messages
- **admins** - Admin user accounts
- **locations** - Business locations

## API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (Admin)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)

### Gallery
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get gallery item by ID
- `POST /api/gallery` - Create gallery item (Admin)
- `PUT /api/gallery/:id` - Update gallery item (Admin)
- `DELETE /api/gallery/:id` - Delete gallery item (Admin)

### Messages
- `GET /api/messages` - Get all messages
- `POST /api/messages` - Create message (Public)

### Locations
- `GET /api/locations` - Get all locations
- `GET /api/locations/:id` - Get location by ID
- `POST /api/locations` - Create location (Admin)
- `PUT /api/locations/:id` - Update location (Admin)
- `DELETE /api/locations/:id` - Delete location (Admin)

### Admin
- `POST /api/admin/login` - Login (returns JWT token)
- `POST /api/admin/register` - Register new admin

## Troubleshooting

### Connection Error: "ECONNREFUSED"
- Verify DATABASE_URL is correct
- Check firewall settings allow Neon connection
- Ensure IP whitelist allows your IP (Neon allows all by default)

### "Table does not exist" error
- Run the database schema: `psql < backend/config/init.sql`
- Or restart the server (auto-initialization will attempt to create tables)

### SSL Certificate Error
- Neon requires SSL - ensure `sslmode=require` is in DATABASE_URL
- Connection string should end with `?sslmode=require`

## Deployment

### Heroku
1. Add buildpack: `heroku buildpacks:add heroku/nodejs`
2. Set config vars: `heroku config:set DATABASE_URL=your_neon_url`
3. Deploy: `git push heroku main`

### Railway/Render
- Add Neon DATABASE_URL as environment variable
- Point to backend directory
- Set start command: `npm start`

### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY backend .

EXPOSE 5000

CMD ["npm", "start"]
```

## File Structure

```
backend/
├── config/
│   ├── db.js           # PostgreSQL connection pool
│   ├── init.sql        # Database schema
│   └── postgres.js     # (Legacy Supabase - can be removed)
├── controllers/        # Route handlers
├── middleware/         # Auth & validation
├── routes/            # API routes
├── server.js          # Express server
├── package.json       # Dependencies
└── .env              # Environment variables (local only)
```

## Performance Tips

1. **Connection Pooling** - Already configured in `config/db.js`
2. **Indexes** - Database schema includes indexes for common queries
3. **Caching** - Add Redis for session/data caching
4. **Pagination** - Implement for large result sets

## Security

- JWT tokens for admin authentication
- Password hashing with bcryptjs
- CORS configured for frontend only
- SQL injection protection via parameterized queries
- Environment variables for sensitive data

## Next Steps

1. Create admin user via `/api/admin/register`
2. Add test data via admin endpoints
3. Deploy frontend connected to this API
4. Monitor Neon dashboard for performance

---

For more info: [Neon Documentation](https://neon.tech/docs)
