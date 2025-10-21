#!/bin/bash

echo "🚀 Starting IGAD Hub - Development Mode..."

# Kill any existing processes on these ports
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

echo "📦 Installing dependencies..."

# Install backend dependencies
cd backend
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

# Install frontend dependencies (serve built version)
if ! command -v http-server &> /dev/null; then
    echo "📦 Installing http-server globally..."
    npm install -g http-server
fi

echo "🏗️ Building backend..."
cd backend && npm run build
cd ..

echo "🌐 Starting backend on port 3001..."
cd backend && npm run start:dev &
BACKEND_PID=$!

echo "⏳ Waiting for backend to start..."
sleep 3

echo "🎨 Starting frontend on port 3000..."
cd frontend/dist && http-server -p 3000 -c-1 &
FRONTEND_PID=$!

echo ""
echo "✅ Both applications are running!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:3001"
echo "📚 API Docs: http://localhost:3001/api/docs"
echo "🔍 Health Check: http://localhost:3001/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
