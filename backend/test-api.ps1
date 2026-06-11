# Quick API Testing Script for WEC Backend with Neon PostgreSQL (Windows PowerShell)

$API_URL = "http://localhost:5000/api"

Write-Host "🔄 Testing WEC Backend API..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "1️⃣  Testing Health Check..." -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$API_URL/health" -Method Get -ContentType "application/json"
$response | ConvertTo-Json
Write-Host ""

# Test 2: Get Services (Public)
Write-Host "2️⃣  Testing Get Services (Public)..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$API_URL/services" -Method Get -ContentType "application/json"
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 3: Get Gallery (Public)
Write-Host "3️⃣  Testing Get Gallery (Public)..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$API_URL/gallery" -Method Get -ContentType "application/json"
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 4: Create Message (Public)
Write-Host "4️⃣  Testing Create Message (Public)..." -ForegroundColor Yellow
try {
    $body = @{
        name = "Test User"
        email = "test@example.com"
        phone = "1234567890"
        subject = "Test Message"
        message = "This is a test message"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$API_URL/messages" -Method Post -Body $body -ContentType "application/json"
    $response | ConvertTo-Json
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "✅ API Testing Complete!" -ForegroundColor Green
