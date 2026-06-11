# Verification Script - Check if everything is set up correctly (Windows PowerShell)

Write-Host "🔍 WMC Application Setup Verification" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "1. Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = & node --version 2>$null
    Write-Host "   ✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Node.js not found" -ForegroundColor Red
}

# Check npm
Write-Host ""
Write-Host "2. Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = & npm --version 2>$null
    Write-Host "   ✅ npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ npm not found" -ForegroundColor Red
}

# Check PostgreSQL
Write-Host ""
Write-Host "3. Checking PostgreSQL..." -ForegroundColor Yellow
try {
    $psqlVersion = & psql --version 2>$null
    Write-Host "   ✅ $psqlVersion" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️  PostgreSQL CLI not found (but may still work with remote DB)" -ForegroundColor Yellow
}

# Check .env file
Write-Host ""
Write-Host "4. Checking .env file..." -ForegroundColor Yellow
if (Test-Path ".\.env") {
    Write-Host "   ✅ .env file exists" -ForegroundColor Green
    $envContent = Get-Content ".\.env"
    if ($envContent -match "DATABASE_URL") {
        Write-Host "   ✅ DATABASE_URL is set" -ForegroundColor Green
    } else {
        Write-Host "   ❌ DATABASE_URL not found in .env" -ForegroundColor Red
    }
} else {
    Write-Host "   ⚠️  .env file not found" -ForegroundColor Yellow
}

# Check frontend dependencies
Write-Host ""
Write-Host "5. Checking frontend setup..." -ForegroundColor Yellow
if (Test-Path ".\node_modules") {
    Write-Host "   ✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Frontend dependencies not installed (run: npm install)" -ForegroundColor Yellow
}

# Check backend dependencies
Write-Host ""
Write-Host "6. Checking backend setup..." -ForegroundColor Yellow
if (Test-Path ".\backend\node_modules") {
    Write-Host "   ✅ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Backend dependencies not installed (run: cd backend && npm install)" -ForegroundColor Yellow
}

# Check key files
Write-Host ""
Write-Host "7. Checking key files..." -ForegroundColor Yellow
$files = @(
    "src\context\DataContext.jsx",
    "src\pages\Home.jsx",
    "src\pages\About.jsx",
    "src\pages\Services.jsx",
    "src\pages\Gallery.jsx",
    "src\pages\Contact.jsx",
    "backend\server.js",
    "backend\seed-postgres.js",
    "backend\config\init_postgres.sql",
    "src\data\initialData.js"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file (missing)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "✅ Verification Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Set up .env with DATABASE_URL"
Write-Host "2. Run: npm install && cd backend && npm install"
Write-Host "3. Run: npm run seed (in backend folder)"
Write-Host "4. Start backend: cd backend && npm start"
Write-Host "5. Start frontend: npm run dev"
Write-Host ""
