#!/bin/bash
# Quick API Testing Script for WEC Backend with Neon PostgreSQL

API_URL="http://localhost:5000/api"

echo "🔄 Testing WEC Backend API..."
echo ""

# Test 1: Health Check
echo "1️⃣  Testing Health Check..."
curl -X GET "$API_URL/health" -H "Content-Type: application/json"
echo -e "\n"

# Test 2: Get Services (Public)
echo "2️⃣  Testing Get Services (Public)..."
curl -X GET "$API_URL/services" -H "Content-Type: application/json"
echo -e "\n"

# Test 3: Get Gallery (Public)
echo "3️⃣  Testing Get Gallery (Public)..."
curl -X GET "$API_URL/gallery" -H "Content-Type: application/json"
echo -e "\n"

# Test 4: Create Message (Public)
echo "4️⃣  Testing Create Message (Public)..."
curl -X POST "$API_URL/messages" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
echo -e "\n"

echo "✅ API Testing Complete!"
