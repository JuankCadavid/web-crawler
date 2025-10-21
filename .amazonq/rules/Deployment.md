# Deployment Rules

## AWS Profile

- **Always use profile**: `IBD-DEV`
- **Configuration source**: `infrastructure/` folder

## Deployment Commands

All deployment commands must use:

```bash
--profile IBD-DEV --tags Project=IGAD-Innovations-Hub Environment=${STAGE} Owner=IBD-Delivery CostCenter=IGAD
```

### Stack Naming

Use consistent stack names:

```bash
# SAM
sam deploy --stack-name igad-${STAGE} --profile IBD-DEV

# CDK
cdk deploy IgadStack-${STAGE} --profile IBD-DEV
```

## Configuration Context

- Use context and configuration from the `infrastructure/` folder
- Reference infrastructure-specific parameters and settings

## Resource Naming Stability

**CRITICAL**: Resource names must remain consistent across deployments.

### Naming Convention

All resources must use deterministic names with this pattern:

```
igad-{resource-type}-{stage}
```

### Examples

```yaml
# S3 Buckets
BucketName: !Sub 'igad-frontend-${Stage}-${AWS::AccountId}'
BucketName: !Sub 'igad-private-${Stage}-${AWS::AccountId}'

# DynamoDB Tables
TableName: !Sub 'igad-prompts-${Stage}'
TableName: !Sub 'igad-scraper-jobs-${Stage}'

# SQS Queues
QueueName: !Sub 'igad-scraper-${Stage}'
QueueName: !Sub 'igad-scraper-dlq-${Stage}'

# Cognito
UserPoolName: !Sub 'igad-users-${Stage}'
ClientName: !Sub 'igad-client-${Stage}'
```

### Rules

- **Never use auto-generated names** (no `!Ref AWS::StackName` in resource names)
- **Always include `${Stage}`** to separate test/prod environments
- **Include `${AWS::AccountId}`** for globally unique resources (S3 buckets)
- **Use explicit names** in CloudFormation/SAM templates
- Redeployments must reuse existing resources, not create new ones

## Cost Management

- **Cost specifications**: Reference `specs/cost/` folder for budget constraints
- **Annual budget target**: ≤ $1,000 USD
- **Monthly budget**: $85 USD (with 20% buffer)

### Required Tags for All Resources

All infrastructure resources **MUST** be tagged in **ALL environments** (test, prod):

```yaml
Tags:
  Project: IGAD-Innovations-Hub
  Environment: ${STAGE}  # test | prod
  Owner: IBD-Delivery
  CostCenter: IGAD
  ManagedBy: SAM  # or CDK
```

### Cost Optimization Requirements

- Aurora Serverless: 0.5-1 ACU with auto-pause in test
- Lambda: 256-512MB memory, 30s timeout
- CloudWatch Logs: 14-day retention
- S3 Lifecycle: IA @ 30d, Glacier @ 90d
- HTTP API (not REST API)
- Use pgvector instead of OpenSearch