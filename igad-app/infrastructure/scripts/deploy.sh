#!/bin/bash
set -euo pipefail

# IGAD SAM Deploy Script
# Usage: ./deploy.sh <environment>
# Example: ./deploy.sh test

# Set AWS Profile for laptop deployment
export AWS_PROFILE=IBD-DEV

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(dirname "$SCRIPT_DIR")"

# Check arguments
if [ $# -ne 1 ]; then
    echo "❌ Usage: $0 <environment>"
    echo "   Available environments: test, prod"
    exit 1
fi

ENV="$1"

# Validate environment
if [[ "$ENV" != "test" && "$ENV" != "prod" ]]; then
    echo "❌ Invalid environment: $ENV"
    echo "   Available environments: test, prod"
    exit 1
fi

echo "🚀 Deploying IGAD Innovations Hub to $ENV environment..."
echo "📁 Infrastructure directory: $INFRA_DIR"

# Change to infrastructure directory
cd "$INFRA_DIR"

# Check if build exists
if [ ! -d ".aws-sam" ]; then
    echo "❌ No build found. Please run ./scripts/build.sh first"
    exit 1
fi

# Deploy using SAM
echo "📦 Deploying to $ENV..."
sam deploy \
    --config-file samconfig.toml \
    --config-env "$ENV" \
    --no-fail-on-empty-changeset

# Get stack outputs
STACK_NAME="igad-$ENV"
echo ""
echo "📋 Stack Outputs:"
aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --query 'Stacks[0].Outputs[*].[OutputKey,OutputValue]' \
    --output table

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "🔗 Quick Links:"

# Extract key URLs from outputs
API_ENDPOINT=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --query 'Stacks[0].Outputs[?OutputKey==`ApiEndpoint`].OutputValue' \
    --output text 2>/dev/null || echo "Not available")

CLOUDFRONT_URL=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontUrl`].OutputValue' \
    --output text 2>/dev/null || echo "Not available")

FRONTEND_BUCKET=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --query 'Stacks[0].Outputs[?OutputKey==`FrontendBucketName`].OutputValue' \
    --output text 2>/dev/null || echo "Not available")

echo "  • API Endpoint: $API_ENDPOINT"
echo "  • Frontend URL: $CLOUDFRONT_URL"
echo "  • Frontend Bucket: $FRONTEND_BUCKET"
echo ""
echo "📝 Next steps:"
echo "  • Test API health: curl $API_ENDPOINT/health"
echo "  • Deploy frontend: aws s3 sync ../frontend/dist/ s3://$FRONTEND_BUCKET/"
echo "  • Invalidate CloudFront: aws cloudfront create-invalidation --distribution-id <ID> --paths '/*'"
echo ""
echo "🔍 Monitor logs:"
echo "  • sam logs --stack-name $STACK_NAME --tail"
