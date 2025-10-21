#!/bin/bash

echo "🚀 Starting IGAD Hub Frontend - Development Mode..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ and try again."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
fi

echo "🌐 Starting frontend development server..."
echo "Frontend will be available at: http://localhost:3000"
echo "Backend API (when ready) will be at: http://localhost:3001"
echo "Press Ctrl+C to stop the server"

npm run dev
