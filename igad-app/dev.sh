#!/bin/bash

# IGAD Hub Development Script
# Quick access to common development tasks

case "$1" in
    "start"|"")
        echo "🚀 Starting full development environment..."
        ./scripts/dev/start-dev.sh
        ;;
    "frontend"|"fe")
        echo "🎨 Starting frontend only..."
        ./scripts/dev/start-frontend.sh
        ;;
    "serve")
        echo "📦 Serving built files..."
        ./scripts/dev/serve-local.sh
        ;;
    "build")
        echo "🏗️ Building all components..."
        ./scripts/build/build-all.sh
        ;;
    "build-fe")
        echo "🎨 Building frontend only..."
        ./scripts/build/build-frontend.sh
        ;;
    "build-be")
        echo "🔧 Building backend only..."
        ./scripts/build/build-backend.sh
        ;;
    "help"|"-h"|"--help")
        echo "IGAD Hub Development Commands:"
        echo ""
        echo "  ./dev.sh start     - Start full development environment (default)"
        echo "  ./dev.sh frontend  - Start frontend development server only"
        echo "  ./dev.sh serve     - Serve built files locally"
        echo "  ./dev.sh build     - Build both frontend and backend"
        echo "  ./dev.sh build-fe  - Build frontend only"
        echo "  ./dev.sh build-be  - Build backend only"
        echo "  ./dev.sh help      - Show this help message"
        echo ""
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo "Run './dev.sh help' for available commands"
        exit 1
        ;;
esac
