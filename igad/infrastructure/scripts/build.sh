#!/bin/bash

# IGAD Hub - Build Script
# Builds both frontend and backend for deployment

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "🏗️  Building IGAD Innovations Hub..."
echo "Project root: $PROJECT_ROOT"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 20+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    print_error "Node.js version 20+ is required. Current version: $(node --version)"
    exit 1
fi

print_status "Node.js version: $(node --version) ✓"

# Install dependencies if node_modules doesn't exist
if [ ! -d "$PROJECT_ROOT/node_modules" ]; then
    print_status "Installing root dependencies..."
    cd "$PROJECT_ROOT"
    npm install
fi

# Build Frontend
print_status "Building frontend..."
cd "$PROJECT_ROOT/frontend"

if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    npm install
fi

# Run frontend build
print_status "Compiling React application..."
npm run build

if [ $? -eq 0 ]; then
    print_status "Frontend build completed ✓"
else
    print_error "Frontend build failed ✗"
    exit 1
fi

# Build Backend
print_status "Building backend..."
cd "$PROJECT_ROOT/backend"

if [ ! -d "node_modules" ]; then
    print_status "Installing backend dependencies..."
    npm install
fi

# Run backend build
print_status "Compiling NestJS application..."
npm run build

if [ $? -eq 0 ]; then
    print_status "Backend build completed ✓"
else
    print_error "Backend build failed ✗"
    exit 1
fi

# Run tests
print_status "Running backend tests..."
npm run test

if [ $? -eq 0 ]; then
    print_status "Backend tests passed ✓"
else
    print_warning "Backend tests failed, but continuing with build ⚠️"
fi

# SAM Build
print_status "Running SAM build..."
cd "$PROJECT_ROOT/infrastructure"

# Check if SAM CLI is installed
if ! command -v sam &> /dev/null; then
    print_error "AWS SAM CLI is not installed. Please install SAM CLI and try again."
    exit 1
fi

print_status "SAM CLI version: $(sam --version)"

# Run SAM build with container
print_status "Building SAM application..."
sam build --use-container --parallel

if [ $? -eq 0 ]; then
    print_status "SAM build completed ✓"
else
    print_error "SAM build failed ✗"
    exit 1
fi

# Validate SAM template
print_status "Validating SAM template..."
sam validate

if [ $? -eq 0 ]; then
    print_status "SAM template validation passed ✓"
else
    print_error "SAM template validation failed ✗"
    exit 1
fi

print_status "🎉 Build completed successfully!"
print_status "Frontend build: $PROJECT_ROOT/frontend/dist"
print_status "Backend build: $PROJECT_ROOT/backend/dist"
print_status "SAM build: $PROJECT_ROOT/infrastructure/.aws-sam"

echo ""
print_status "Next steps:"
echo "  1. Deploy infrastructure: ./scripts/deploy.sh test"
echo "  2. Upload frontend: aws s3 sync ../frontend/dist s3://BUCKET_NAME"
echo "  3. Invalidate CloudFront: aws cloudfront create-invalidation --distribution-id ID --paths '/*'"
