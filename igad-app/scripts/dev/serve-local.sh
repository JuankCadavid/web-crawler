#!/bin/bash

echo "🚀 Serving IGAD Hub locally from built files..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ and try again."
    exit 1
fi

# Check if http-server is installed globally
if ! command -v http-server &> /dev/null; then
    echo "📦 Installing http-server globally..."
    npm install -g http-server
fi

echo "🌐 Starting local server..."
echo "Application will be available at: http://localhost:3000"
echo "Press Ctrl+C to stop the server"

cd frontend/dist && http-server -p 3000 -c-1
