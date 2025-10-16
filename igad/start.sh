#!/bin/bash

echo "🚀 Starting IGAD Innovations Hub..."

# Kill any existing processes on these ports
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

echo "📦 Installing dependencies if needed..."
cd backend && npm install --silent 2>/dev/null || true
cd ../frontend && npm install --silent 2>/dev/null || true
cd ..

echo "🏗️ Building backend..."
cd backend && npm run build
cd ..

echo "🌐 Starting backend on port 3001..."
cd backend && npm run start:dev &
BACKEND_PID=$!

echo "⏳ Waiting for backend to start..."
sleep 5

echo "🎨 Starting frontend on port 3000..."
cd frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both applications are starting!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:3001"
echo "📚 API Docs: http://localhost:3001/api/docs"
echo "🔍 Health Check: http://localhost:3001/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
