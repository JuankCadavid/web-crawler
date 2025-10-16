#!/bin/bash

echo "🚀 Starting IGAD Innovations Hub locally..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js version 20+ is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

echo "🏗️  Building backend..."
cd backend && npm run build && cd ..

echo "🌐 Starting both frontend and backend..."
echo "Frontend will be available at: http://localhost:3000"
echo "Backend API will be available at: http://localhost:3001"
echo "API Health check: http://localhost:3001/health"
echo ""
echo "Press Ctrl+C to stop both servers"

npm run dev
