#!/bin/bash

# IGAD Hub Deployment Script
# This script builds and deploys the IGAD Hub infrastructure

set -e

echo "🚀 Starting IGAD Hub deployment..."

# Change to infrastructure directory
cd "$(dirname "$0")"

# Build the SAM application
echo "📦 Building SAM application..."
sam build

# Deploy the application
echo "🌐 Deploying to AWS..."
sam deploy

echo "✅ Deployment completed successfully!"
echo "📋 Check AWS Console for stack outputs and resources."
