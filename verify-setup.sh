#!/bin/bash
# Verification Script - Check if everything is set up correctly

echo "🔍 WMC Application Setup Verification"
echo "======================================"
echo ""

# Check Node.js
echo "1. Checking Node.js..."
if command -v node &> /dev/null; then
    echo "   ✅ Node.js: $(node -v)"
else
    echo "   ❌ Node.js not found"
fi

# Check npm
echo ""
echo "2. Checking npm..."
if command -v npm &> /dev/null; then
    echo "   ✅ npm: $(npm -v)"
else
    echo "   ❌ npm not found"
fi

# Check PostgreSQL
echo ""
echo "3. Checking PostgreSQL..."
if command -v psql &> /dev/null; then
    echo "   ✅ PostgreSQL: $(psql --version)"
else
    echo "   ⚠️  PostgreSQL CLI not found (but may still work with remote DB)"
fi

# Check .env file
echo ""
echo "4. Checking .env file..."
if [ -f ".env" ]; then
    echo "   ✅ .env file exists"
    if grep -q "DATABASE_URL" .env; then
        echo "   ✅ DATABASE_URL is set"
    else
        echo "   ❌ DATABASE_URL not found in .env"
    fi
else
    echo "   ⚠️  .env file not found"
fi

# Check frontend dependencies
echo ""
echo "5. Checking frontend setup..."
if [ -d "node_modules" ]; then
    echo "   ✅ Frontend dependencies installed"
else
    echo "   ⚠️  Frontend dependencies not installed (run: npm install)"
fi

# Check backend dependencies
echo ""
echo "6. Checking backend setup..."
if [ -d "backend/node_modules" ]; then
    echo "   ✅ Backend dependencies installed"
else
    echo "   ⚠️  Backend dependencies not installed (run: cd backend && npm install)"
fi

# Check key files
echo ""
echo "7. Checking key files..."
files=(
    "src/context/DataContext.jsx"
    "src/pages/Home.jsx"
    "src/pages/About.jsx"
    "src/pages/Services.jsx"
    "src/pages/Gallery.jsx"
    "src/pages/Contact.jsx"
    "backend/server.js"
    "backend/seed-postgres.js"
    "backend/config/init_postgres.sql"
    "src/data/initialData.js"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ $file (missing)"
    fi
done

echo ""
echo "======================================"
echo "✅ Verification Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Set up .env with DATABASE_URL"
echo "2. Run: npm install && cd backend && npm install"
echo "3. Run: npm run seed (in backend folder)"
echo "4. Start backend: cd backend && npm start"
echo "5. Start frontend: npm run dev"
echo ""
