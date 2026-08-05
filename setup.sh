#!/bin/bash
# Quick Start Script for PB Photography
# Run this file to get everything up and running

echo "🚀 PB Photography - Quick Start Setup"
echo "===================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
node --version || echo "❌ Node.js not found. Please install it."

echo ""
echo "Step 1: Choose your MongoDB option"
echo "===================================="
echo "a) MongoDB Atlas (Cloud) - Recommended"
echo "b) Local MongoDB (brew)"
echo "c) Docker MongoDB"
echo "d) Skip for now (demo mode)"
echo ""
read -p "Enter your choice (a/b/c/d): " choice

if [ "$choice" = "a" ]; then
    echo ""
    echo "📋 MongoDB Atlas Setup:"
    echo "1. Go to https://www.mongodb.com/cloud/atlas"
    echo "2. Create a free account"
    echo "3. Create a cluster"
    echo "4. Copy your connection string"
    echo "5. Update backend/.env with your connection string"
    echo ""
    read -p "Press Enter after updating backend/.env..."
    
elif [ "$choice" = "b" ]; then
    echo ""
    echo "🍺 Starting MongoDB via Homebrew..."
    brew services start mongodb-community 2>/dev/null || echo "MongoDB already running or not installed"
    sleep 2
    
elif [ "$choice" = "c" ]; then
    echo ""
    echo "🐳 Starting MongoDB via Docker..."
    docker run -d -p 27017:27017 --name pb-mongodb mongo 2>/dev/null || echo "Starting existing MongoDB container..."
    docker start pb-mongodb 2>/dev/null || true
    sleep 2
fi

echo ""
echo "Step 2: Install dependencies"
echo "============================"

echo "📦 Installing backend dependencies..."
cd backend
npm install
echo "✓ Backend dependencies installed"

echo ""
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
echo "✓ Frontend dependencies installed"

echo ""
echo "Step 3: Seed sample data"
echo "========================"
read -p "Do you want to seed sample data? (y/n): " seed_choice

if [ "$seed_choice" = "y" ] || [ "$seed_choice" = "Y" ]; then
    cd ../backend
    npm run seed
    if [ $? -eq 0 ]; then
        echo "✓ Database seeded successfully!"
    else
        echo "⚠️  Seeding failed. Make sure MongoDB is running."
    fi
fi

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Start your servers:"
echo ""
echo "Terminal 1 - Backend (http://localhost:5000):"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 - Frontend (http://localhost:3000):"
echo "  cd frontend && npm run dev"
echo ""
echo "Then visit: http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "- STATUS_REPORT.md - Current status and what to fix"
echo "- MONGODB_SETUP.md - MongoDB installation guide"
echo "- GETTING_STARTED.md - Complete getting started guide"
echo "- DEPLOYMENT.md - How to deploy"
echo ""
