#!/bin/bash
set -euo pipefail

# IGAD SAM Build Script
# Usage: ./build.sh

# Set AWS Profile for laptop deployment
export AWS_PROFILE=IBD-DEV

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_ROOT="$(dirname "$INFRA_DIR")"

echo "🏗️  Building IGAD Innovations Hub..."
echo "📁 Project root: $PROJECT_ROOT"
echo "📁 Infrastructure: $INFRA_DIR"

# Change to infrastructure directory
cd "$INFRA_DIR"

# Validate SAM template
echo "✅ Validating SAM template..."
sam validate --template template.yaml

# Build backend first
echo "🔨 Building backend..."
cd "$PROJECT_ROOT/backend"
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm ci
fi

echo "🏗️  Compiling TypeScript..."
npm run build

# Return to infrastructure directory
cd "$INFRA_DIR"

# Build SAM application
echo "🚀 Building SAM application..."
sam build \
    --template template.yaml \
    --use-container \
    --cached \
    --parallel

echo "✅ Build completed successfully!"
echo ""
echo "Next steps:"
echo "  • Deploy to test: ./scripts/deploy.sh test"
echo "  • Deploy to prod: ./scripts/deploy.sh prod"
echo "  • Local testing: sam local start-api"
