# IGAD Innovations Hub

A serverless innovation management platform for IGAD member states, built with React, NestJS, and AWS SAM.

## Architecture

- **Frontend**: React 18 + TypeScript + TailwindCSS (S3 + CloudFront)
- **Backend**: NestJS on AWS Lambda (Node.js 20)
- **API**: Amazon API Gateway (HTTP API for cost optimization)
- **Database**: Aurora Serverless v2 (PostgreSQL)
- **Authentication**: Amazon Cognito
- **AI Services**: Amazon Q + Bedrock
- **Infrastructure**: AWS SAM
- **CI/CD**: GitHub Actions with AWS OIDC

## Cost Optimization

- HTTP API Gateway (70% cheaper than REST API)
- Lambda 256-512MB, reserved concurrency caps
- CloudWatch logs 14-day retention
- S3 lifecycle policies (IA@30d, Glacier@90d)
- Aurora Serverless v2 with auto-pause in test environment
- Target: ≤$1,000/year total infrastructure cost

## Repository Structure

```
igad/
├── frontend/          # React SPA with TailwindCSS
├── backend/           # NestJS API on Lambda
├── infrastructure/    # AWS SAM templates
└── .github/workflows/ # CI/CD pipelines
```

## Prerequisites

- Node.js 20+
- AWS CLI v2
- AWS SAM CLI
- Docker (for SAM local testing)

## Local Development

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd igad
npm install --workspaces
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env with your local configuration
```

### 3. Start Development Servers

```bash
# Terminal 1: Start backend locally
cd backend
npm run start:dev

# Terminal 2: Start frontend
cd frontend
npm run dev

# Terminal 3: Start SAM local (optional)
cd infrastructure
sam local start-api --port 3001
```

### 4. Database Setup (Local)

```bash
# Use Docker for local PostgreSQL
docker run --name igad-postgres \
  -e POSTGRES_DB=igad_hub \
  -e POSTGRES_USER=igad \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 -d postgres:15

# Run migrations
cd backend
npm run migration:run
```

## AWS OIDC Setup for CI/CD

### 1. Create OIDC Identity Provider

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

### 2. Create IAM Role for GitHub Actions

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::ACCOUNT-ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR-ORG/igad:*"
        }
      }
    }
  ]
}
```

### 3. Attach Policies to Role

Required policies:
- `AWSCloudFormationFullAccess`
- `IAMFullAccess`
- `AmazonS3FullAccess`
- `CloudFrontFullAccess`
- `AWSLambda_FullAccess`
- `AmazonAPIGatewayAdministrator`
- `AmazonRDSFullAccess`
- `AmazonCognitoPowerUser`

### 4. Update GitHub Secrets

Add these repository secrets:
- `AWS_ROLE_ARN`: The ARN of the OIDC role created above
- `TEST_S3_BUCKET`: S3 bucket for test environment static assets
- `PROD_S3_BUCKET`: S3 bucket for production static assets
- `TEST_CLOUDFRONT_ID`: CloudFront distribution ID for test
- `PROD_CLOUDFRONT_ID`: CloudFront distribution ID for production

## Deployment

### Test Environment

Deploys automatically on push to `main` branch:

```bash
git push origin main
```

### Production Environment

Deploy via GitHub release or manual trigger:

```bash
# Create release tag
git tag v1.0.0
git push origin v1.0.0

# Or trigger manually via GitHub Actions UI
```

## Monitoring & Operations

### Cost Monitoring

- AWS Budgets configured for $85/month limit
- Cost alerts at 50%, 80%, 100% thresholds
- Monthly cost reports via CloudWatch

### Health Checks

- API health endpoint: `GET /health`
- CloudWatch Synthetics for uptime monitoring
- Custom metrics for business KPIs

### Troubleshooting

1. **Lambda Cold Starts**: Check reserved concurrency settings
2. **Aurora Connection Issues**: Verify RDS Proxy configuration
3. **Cost Overruns**: Review CloudWatch logs retention and Lambda memory
4. **Frontend Issues**: Check CloudFront cache invalidation

## Development Workflow

1. Create feature branch from `main`
2. Develop and test locally
3. Create pull request
4. Automated tests run on PR
5. Merge to `main` triggers test deployment
6. Create release tag for production deployment

## Security

- All secrets managed via AWS Systems Manager Parameter Store
- WAF rules protect CloudFront distribution
- Cognito handles authentication with MFA support
- VPC endpoints for private subnet communication
- Encryption at rest for all data stores

## Support

For issues and questions:
- Technical: Create GitHub issue
- Operations: Check `/infrastructure/docs/ops-notes.md`
- Business: Contact IGAD Innovation Team
