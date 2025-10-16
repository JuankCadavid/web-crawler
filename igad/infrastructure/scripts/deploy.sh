#!/bin/bash

# IGAD Hub - Deploy Script
# Deploys infrastructure using AWS SAM

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Default values
ENVIRONMENT="test"
REGION="us-east-1"
CONFIRM="true"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_header() {
    echo -e "${BLUE}[DEPLOY]${NC} $1"
}

# Usage function
usage() {
    echo "Usage: $0 [ENVIRONMENT] [OPTIONS]"
    echo ""
    echo "ENVIRONMENT:"
    echo "  test    Deploy to test environment (default)"
    echo "  prod    Deploy to production environment"
    echo ""
    echo "OPTIONS:"
    echo "  --region REGION     AWS region (default: us-east-1)"
    echo "  --no-confirm        Skip deployment confirmation"
    echo "  --help             Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 test"
    echo "  $0 prod --region us-west-2"
    echo "  $0 test --no-confirm"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        test|prod)
            ENVIRONMENT="$1"
            shift
            ;;
        --region)
            REGION="$2"
            shift 2
            ;;
        --no-confirm)
            CONFIRM="false"
            shift
            ;;
        --help)
            usage
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            usage
            exit 1
            ;;
    esac
done

print_header "IGAD Innovations Hub Deployment"
echo "Environment: $ENVIRONMENT"
echo "Region: $REGION"
echo "Confirm: $CONFIRM"
echo ""

# Validate environment
if [[ "$ENVIRONMENT" != "test" && "$ENVIRONMENT" != "prod" ]]; then
    print_error "Invalid environment: $ENVIRONMENT. Must be 'test' or 'prod'."
    exit 1
fi

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    print_error "AWS CLI is not configured or credentials are invalid."
    print_error "Please run 'aws configure' or set up AWS credentials."
    exit 1
fi

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
print_status "AWS Account ID: $ACCOUNT_ID"
print_status "AWS Region: $REGION"

# Check if SAM CLI is installed
if ! command -v sam &> /dev/null; then
    print_error "AWS SAM CLI is not installed. Please install SAM CLI and try again."
    exit 1
fi

print_status "SAM CLI version: $(sam --version)"

# Change to infrastructure directory
cd "$PROJECT_ROOT/infrastructure"

# Check if build exists
if [ ! -d ".aws-sam" ]; then
    print_warning "SAM build not found. Running build first..."
    ./scripts/build.sh
fi

# Validate parameters file exists
PARAMS_FILE="params/${ENVIRONMENT}.json"
if [ ! -f "$PARAMS_FILE" ]; then
    print_error "Parameters file not found: $PARAMS_FILE"
    exit 1
fi

print_status "Using parameters file: $PARAMS_FILE"

# Generate stack name
STACK_NAME="igad-hub-${ENVIRONMENT}"
print_status "Stack name: $STACK_NAME"

# Deployment confirmation
if [[ "$CONFIRM" == "true" ]]; then
    echo ""
    print_warning "You are about to deploy to the $ENVIRONMENT environment."
    print_warning "Stack: $STACK_NAME"
    print_warning "Region: $REGION"
    echo ""
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Deployment cancelled."
        exit 0
    fi
fi

# Deploy with SAM
print_status "Starting SAM deployment..."

sam deploy \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --parameter-overrides file://"$PARAMS_FILE" \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --no-fail-on-empty-changeset \
    --resolve-s3 \
    --s3-prefix "$STACK_NAME" \
    --tags Project=IGAD-Hub Environment="$ENVIRONMENT"

if [ $? -eq 0 ]; then
    print_status "✅ SAM deployment completed successfully!"
else
    print_error "❌ SAM deployment failed!"
    exit 1
fi

# Get stack outputs
print_status "Retrieving stack outputs..."

API_URL=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query 'Stacks[0].Outputs[?OutputKey==`ApiBaseUrl`].OutputValue' \
    --output text)

CLOUDFRONT_URL=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontUrl`].OutputValue' \
    --output text)

STATIC_BUCKET=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query 'Stacks[0].Outputs[?OutputKey==`StaticAssetsBucket`].OutputValue' \
    --output text)

CLOUDFRONT_ID=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' \
    --output text)

USER_POOL_ID=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query 'Stacks[0].Outputs[?OutputKey==`UserPoolId`].OutputValue' \
    --output text)

USER_POOL_CLIENT_ID=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query 'Stacks[0].Outputs[?OutputKey==`UserPoolClientId`].OutputValue' \
    --output text)

# Display deployment information
echo ""
print_header "🎉 Deployment Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Environment:           $ENVIRONMENT"
echo "Stack Name:            $STACK_NAME"
echo "Region:                $REGION"
echo ""
echo "🌐 URLs:"
echo "  API Base URL:        $API_URL"
echo "  CloudFront URL:      $CLOUDFRONT_URL"
echo ""
echo "🔧 Resources:"
echo "  Static Assets Bucket: $STATIC_BUCKET"
echo "  CloudFront ID:       $CLOUDFRONT_ID"
echo "  User Pool ID:        $USER_POOL_ID"
echo "  User Pool Client ID: $USER_POOL_CLIENT_ID"
echo ""
echo "📋 Next Steps:"
echo "  1. Upload frontend assets:"
echo "     aws s3 sync ../frontend/dist s3://$STATIC_BUCKET --delete"
echo ""
echo "  2. Invalidate CloudFront cache:"
echo "     aws cloudfront create-invalidation --distribution-id $STATIC_BUCKET --paths '/*'"
echo ""
echo "  3. Test the API:"
echo "     curl $API_URL/health"
echo ""
echo "  4. Access the application:"
echo "     $CLOUDFRONT_URL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Save outputs to file for CI/CD
OUTPUT_FILE="outputs/${ENVIRONMENT}.json"
mkdir -p outputs
cat > "$OUTPUT_FILE" << EOF
{
  "environment": "$ENVIRONMENT",
  "stackName": "$STACK_NAME",
  "region": "$REGION",
  "apiUrl": "$API_URL",
  "cloudfrontUrl": "$CLOUDFRONT_URL",
  "staticBucket": "$STATIC_BUCKET",
  "cloudfrontId": "$CLOUDFRONT_ID",
  "userPoolId": "$USER_POOL_ID",
  "userPoolClientId": "$USER_POOL_CLIENT_ID",
  "deployedAt": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF

print_status "Deployment outputs saved to: $OUTPUT_FILE"

# Health check
print_status "Performing health check..."
sleep 10  # Wait for deployment to stabilize

if curl -f -s "$API_URL/health" > /dev/null; then
    print_status "✅ Health check passed!"
else
    print_warning "⚠️  Health check failed. The API might still be starting up."
fi

print_status "🚀 Deployment completed successfully!"
