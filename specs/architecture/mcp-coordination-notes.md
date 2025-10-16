# MCP Coordination Notes — SAM & CDK

## Purpose

Make SAM (app layer) and CDK (platform/core infra) interoperable with one set of names, parameters, and outputs, while keeping cost guardrails and your Figma-driven UI consistent.

## 1) Ownership & Deployment Order

### CDK (platform/core infra) FIRST

- Cognito (User Pool + App Client)
- S3 Buckets (public hosting & private artifacts)
- CloudFront Distribution
- Aurora Serverless v2 (PostgreSQL) + Secrets Manager
- (Optional) OpenSearch Serverless
- HTTP API (if you want CDK to own it) or let SAM create it—pick one (see Strategy A vs B)

### SAM (app layer) SECOND

- Lambda functions (NestJS handlers)
- API routes (if SAM owns API)
- Eventing (SQS/SNS) for scraping
- App-specific IAM and policies

### ✅ Recommendation: Strategy A (preferred for simplicity)

- CDK owns core infra: Cognito, S3, CloudFront, Aurora, and HTTP API.
- SAM attaches Lambdas to the CDK-created HTTP API via exported values (ApiId/ApiEndpoint).
- **Strategy B**: SAM creates HTTP API and Lambdas; CDK creates the rest. (Slightly simpler for SAM, but you'll reference the API from CDK resources if needed.)

## 2) Shared Tagging & Naming

### Global tags (apply in CDK & SAM)

```
Project = IGAD-Innovations-Hub
Environment = ${STAGE}          # test | prod
Owner = IBD-Delivery
CostCenter = IGAD
```

### Logical name prefixes (stack/resource names)

```
igad-${STAGE}-cognito
igad-${STAGE}-public-bucket
igad-${STAGE}-private-bucket
igad-${STAGE}-cloudfront
igad-${STAGE}-aurora
igad-${STAGE}-httpapi
igad-${STAGE}-lambdas-*
```

## 3) Outputs & Parameter Handoff

### CDK → SAM Outputs (exported by CDK stack)

| Output Key | Meaning | Used by SAM Env/Params |
|------------|---------|------------------------|
| CloudFrontUrl | CDN URL for frontend | For README, smoke tests |
| PublicBucket | S3 bucket for frontend | FRONTEND_BUCKET |
| PrivateBucket | S3 bucket for drafts/artifacts | PRIVATE_BUCKET |
| UserPoolId | Cognito pool id | COGNITO_USER_POOL_ID |
| UserPoolClientId | Cognito app client id | COGNITO_CLIENT_ID |
| HttpApiId | API Gateway HTTP API id (Strategy A) | HTTP_API_ID |
| HttpApiEndpoint | Base URL (Strategy A) | API_BASE_URL |
| AuroraClusterArn | RDS cluster ARN | AURORA_CLUSTER_ARN |
| AuroraSecretArn | Secrets Manager secret ARN | AURORA_SECRET_ARN |
| AuroraDbName | Database name | AURORA_DB_NAME |

In CDK (`igad/infrastructure-cdk/lib/igad-stack.ts`) ensure these are exported via CfnOutput.

### How SAM reads CDK outputs

Pick one:

- **SSM Parameter Store**: CDK writes outputs into well-known SSM paths, SAM reads via Parameters/Mappings.
- **CloudFormation exports**: Read with a pre-step script and pass as `--parameter-overrides` to sam deploy.
- **aws cloudformation describe-stacks** in CI to inject env vars.

### Recommended SSM Paths

```
/igad/${STAGE}/cognito/user_pool_id
/igad/${STAGE}/cognito/app_client_id
/igad/${STAGE}/buckets/public
/igad/${STAGE}/buckets/private
/igad/${STAGE}/api/http_id
/igad/${STAGE}/api/base_url
/igad/${STAGE}/aurora/cluster_arn
/igad/${STAGE}/aurora/secret_arn
/igad/${STAGE}/aurora/db_name
```

## 4) Environment Variables (identical across SAM & CDK)

### .env.example

```bash
STAGE=test
REGION=us-east-1

# Cognito
COGNITO_USER_POOL_ID=
COGNITO_CLIENT_ID=

# API
API_BASE_URL=
HTTP_API_ID=            # only if SAM attaches to CDK api

# Storage
FRONTEND_BUCKET=
PRIVATE_BUCKET=

# Database
AURORA_CLUSTER_ARN=
AURORA_SECRET_ARN=
AURORA_DB_NAME=igad

# Search
SEARCH_BACKEND=pgvector  # pgvector | opensearch
OPENSEARCH_COLLECTION_NAME=igad-search  # used only when SEARCH_BACKEND=opensearch

# AI
AMAZON_Q_APP_ID=

# Observability
LOG_LEVEL=info
```

The AWS Serverless MCP (SAM) should inject these from SSM or CI pipeline parameter overrides.

## 5) CI/CD Orchestration (GitHub Actions + OIDC)

### Order of jobs (same for test & prod)

1. **CDK Deploy (platform)**: synth → deploy → publish outputs to SSM/stack outputs.
2. **SAM Deploy (app)**: build → test → read params from SSM → sam deploy.
3. **Frontend Publish**: vite build → aws s3 sync → CloudFront invalidation.
4. **Smoke Tests**: curl $API_BASE_URL/health.

### Reading CDK outputs in CI (option using stack outputs)

```bash
STACK=IgadStack
REGION=${{ env.AWS_REGION }}

CFN_JSON=$(aws cloudformation describe-stacks --stack-name $STACK --region $REGION)
export API_BASE_URL=$(echo "$CFN_JSON" | jq -r '.Stacks[0].Outputs[] | select(.OutputKey=="HttpApiEndpoint") | .OutputValue')
export FRONTEND_BUCKET=$(echo "$CFN_JSON" | jq -r '.Stacks[0].Outputs[] | select(.OutputKey=="PublicBucket") | .OutputValue')
# ...repeat for others

sam build --use-container
sam deploy --stack-name igad-${{ env.STAGE }} \
  --parameter-overrides \
    ApiBaseUrl=$API_BASE_URL \
    FrontendBucket=$FRONTEND_BUCKET \
    # ...
  --capabilities CAPABILITY_IAM
```

### Alternative: SSM Parameter Store (preferred for clarity)

CDK writes:

```typescript
new ssm.StringParameter(this, 'ParamApiBaseUrl', { 
  parameterName: '/igad/test/api/base_url', 
  stringValue: api.url 
});
```

In CI, pull them:

```bash
get_param () { aws ssm get-parameter --with-decryption --name "$1" --query 'Parameter.Value' --output text; }
export API_BASE_URL=$(get_param /igad/${{ env.STAGE }}/api/base_url)
export COGNITO_USER_POOL_ID=$(get_param /igad/${{ env.STAGE }}/cognito/user_pool_id)
# ...
```

## 6) API Ownership Decision

### Strategy A (CDK owns HTTP API)

- **CDK**: creates HTTP API & outputs HttpApiId, HttpApiEndpoint.
- **SAM**: uses HttpApiId and attaches routes via AWS::Serverless::HttpApi Ref or AWS::ApiGatewayV2::Api import + AWS::Serverless::Function Events -> HttpApi with ApiId.

### Strategy B (SAM owns HTTP API)

- **SAM**: creates HTTP API & all routes.
- **CDK**: references API only if needed; otherwise no coupling.

**Pick Strategy A** if you want one place (CDK) to manage cross-cutting concerns on the API (custom domains, WAF associations later). It keeps the SAM templates simpler.

## 7) Cost Guardrails (enforced in both stacks)

- **HTTP API** (not REST)
- **Lambda**: 256–512MB, no Provisioned Concurrency, Reserved Concurrency caps per function
- **CloudWatch Logs**: retention 14 days
- **S3 Lifecycle**: IA @ 30d, Glacier @ 90d (drafts/, scrape-results/)
- **Aurora v2**: min ACU; allow pause/schedule in TEST
- **Search**: default to pgvector-in-Aurora; enable OpenSearch only if justified by query patterns/scale
- **CloudFront**: long TTL for immutable assets; compression enabled
- **Budgets**: alerts at 80%/100% (Sprint 5)

## 8) Security & IAM Alignment

Least-privilege IAM everywhere:

- Lambda → S3 limited to prefixes (drafts/*, scrape-results/*)
- Lambda → Secrets Manager (read specific secret ARN)
- Lambda → RDS Data API (if used) or SG access to Aurora
- Cognito JWT validation in API layer
- KMS encryption at rest (S3, Aurora, OpenSearch if used)
- Robots/Allowlist checks for scraper

## 9) Frontend (Figma) Fidelity Sync

- **Single source of truth**: `igad/frontend/src/styles/tokens.css`
- **Tokens** = color, spacing, typography; map 1:1 with Figma variable names
- **Tailwind config** consumes tokens—no hardcoded hex in components
- **Layouts**: Header/Sidebar/Card paddings & typography per mockup
- **Accessibility**: AA contrast, focus states, aria labels

## 10) Promotion, Testing & Rollback

- **Test → Prod** promotion via tag (v*.*.*) or manual dispatch.
- **Playwright** smoke after every deploy; full suite nightly or on-demand.

### Rollback

- **SAM**: redeploy previous change set (`sam deploy --guided history`)
- **CDK**: `cdk deploy` previous synth; maintain change control in PRs
- **Data**: Aurora snapshots; S3 versioning on drafts/ and scrape-results/.

## 11) Quick Checklist

- [ ] Decide Strategy A/B for HTTP API ownership (recommend A: CDK).
- [ ] CDK exports all required outputs and writes SSM parameters.
- [ ] SAM parameter files (infrastructure/params/test.json, prod.json) reference SSM/outputs consistently.
- [ ] GitHub Actions runs CDK first, then SAM, then frontend publish, then smoke tests.
- [ ] Env var names match in .env.example, SAM, and backend code.
- [ ] Tokens from Figma pasted into tokens.css; Tailwind configured.
- [ ] Budgets & alerts configured by Sprint 5.
