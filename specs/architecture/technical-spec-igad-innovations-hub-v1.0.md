# IGAD Innovations Hub - Technical Specification v1.0

## Document Information

| Field | Value |
|-------|-------|
| Document Version | 1.0 |
| Last Updated | October 2025 |
| Document Type | Technical Specification |
| Classification | Internal |

## 1. Overview & Goals

### 1.1 Executive Summary

The IGAD Innovations Hub is a comprehensive serverless web application designed to streamline innovation management processes across the Intergovernmental Authority on Development (IGAD) region. The platform provides integrated tools for proposal writing, newsletter generation, prompt management, web scraping, and AI-powered assistance through Amazon Q integration.

### 1.2 Business Objectives

- **Centralized Innovation Management**: Unified platform for all innovation-related activities
- **AI-Enhanced Productivity**: Leverage Amazon Q for intelligent content generation and assistance
- **Scalable Architecture**: Serverless design supporting regional growth
- **Cost Optimization**: Pay-per-use model with automatic scaling

### 1.3 Success Criteria

- Support 1000+ concurrent users across IGAD member states
- 99.9% availability with sub-2 second response times
- Seamless integration with existing IGAD systems
- Compliance with regional data protection requirements

## 2. System Architecture Summary

### 2.1 High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React SPA     │────│   Amazon CloudFront │────│   Amazon S3     │
│   (Frontend)    │    │   (CDN)          │    │   (Static Assets)│
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │
         │ HTTPS/API Gateway
         ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   API Gateway   │────│   AWS Lambda     │────│   NestJS App    │
│   (REST/GraphQL)│    │   (Runtime)      │    │   (Backend)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │
         │                       ▼
         │              ┌─────────────────┐
         │              │   Aurora        │
         │              │   Serverless v2 │
         │              │   (PostgreSQL)  │
         │              └─────────────────┘
         │
         ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Amazon        │    │   Amazon         │    │   Amazon Q      │
│   Cognito       │    │   OpenSearch     │    │   (AI Assistant)│
│   (Auth)        │    │   (Search)       │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### 2.2 Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | React | 18+ |
| Language | TypeScript | 5+ |
| Styling | TailwindCSS | 3+ |
| Backend | NestJS | 10+ |
| Runtime | Node.js | 20+ |
| Database | Aurora Serverless v2 | PostgreSQL 15+ |
| Search | Amazon OpenSearch | 2.x |
| Authentication | Amazon Cognito | - |
| Storage | Amazon S3 | - |
| CDN | Amazon CloudFront | - |
| API Gateway | AWS API Gateway | v2 |
| Compute | AWS Lambda | Node.js 20 |
| IaC | AWS SAM | 1.x |

## 3. Requirements

### 3.1 Functional Requirements

#### 3.1.1 Main Page Module
- **FR-MP-001**: Display dashboard with key metrics and recent activities
- **FR-MP-002**: Provide navigation to all system modules
- **FR-MP-003**: Show personalized content based on user role
- **FR-MP-004**: Support real-time notifications

#### 3.1.2 Proposal Writer Module
- **FR-PW-001**: Create, edit, and manage innovation proposals
- **FR-PW-002**: Template-based proposal generation
- **FR-PW-003**: Collaborative editing with version control
- **FR-PW-004**: Export proposals to PDF/Word formats
- **FR-PW-005**: Integration with Amazon Q for content suggestions

#### 3.1.3 Newsletter Generator Module
- **FR-NG-001**: Create newsletters using drag-and-drop editor
- **FR-NG-002**: Template library with IGAD branding
- **FR-NG-003**: Automated content aggregation from multiple sources
- **FR-NG-004**: Email distribution integration
- **FR-NG-005**: Analytics and engagement tracking

#### 3.1.4 Prompt Manager Module
- **FR-PM-001**: Create and manage AI prompts library
- **FR-PM-002**: Categorize prompts by use case and domain
- **FR-PM-003**: Version control for prompt iterations
- **FR-PM-004**: Performance analytics for prompt effectiveness
- **FR-PM-005**: Sharing and collaboration features

#### 3.1.5 Web Scraper Module
- **FR-WS-001**: Configure and schedule web scraping jobs
- **FR-WS-002**: Support multiple data sources and formats
- **FR-WS-003**: Data transformation and cleaning pipelines
- **FR-WS-004**: Real-time monitoring and alerting
- **FR-WS-005**: Integration with OpenSearch for indexing

#### 3.1.6 Amazon Q Integration
- **FR-AQ-001**: Natural language query interface
- **FR-AQ-002**: Context-aware responses based on IGAD data
- **FR-AQ-003**: Integration across all modules
- **FR-AQ-004**: Conversation history and context management
- **FR-AQ-005**: Custom knowledge base integration

### 3.2 Non-Functional Requirements

| Category | Requirement | Target Metric |
|----------|-------------|---------------|
| Performance | Response Time | < 2 seconds (95th percentile) |
| Performance | Throughput | 1000 concurrent users |
| Availability | Uptime | 99.9% |
| Scalability | Auto-scaling | 0-1000 users in < 5 minutes |
| Security | Authentication | Multi-factor authentication |
| Security | Data Encryption | AES-256 at rest, TLS 1.3 in transit |
| Compliance | Data Residency | African Union data protection |
| Usability | Mobile Support | Responsive design (320px+) |
| Reliability | Error Rate | < 0.1% |
| Backup | Recovery Time | RTO: 4 hours, RPO: 1 hour |

## 4. Detailed Solution Components

### 4.1 Frontend Architecture (React)

#### 4.1.1 Component Structure
```
src/
├── components/
│   ├── common/
│   ├── layout/
│   ├── modules/
│   │   ├── main-page/
│   │   ├── proposal-writer/
│   │   ├── newsletter-generator/
│   │   ├── prompt-manager/
│   │   ├── web-scraper/
│   │   └── amazon-q/
│   └── ui/
├── hooks/
├── services/
├── store/
├── types/
└── utils/
```

#### 4.1.2 Key Dependencies
```json
{
  "react": "^18.2.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.3.0",
  "@tanstack/react-query": "^4.29.0",
  "react-router-dom": "^6.11.0",
  "zustand": "^4.3.0",
  "@aws-amplify/ui-react": "^5.0.0"
}
```

#### 4.1.3 State Management
- **Global State**: Zustand for user authentication and app-wide settings
- **Server State**: TanStack Query for API data caching and synchronization
- **Local State**: React hooks for component-specific state

### 4.2 Backend Architecture (NestJS)

#### 4.2.1 Module Structure
```
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── proposals/
│   ├── newsletters/
│   ├── prompts/
│   ├── scraper/
│   └── amazon-q/
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── config/
└── database/
    ├── entities/
    ├── migrations/
    └── seeds/
```

#### 4.2.2 Core Services

##### Authentication Service
```typescript
@Injectable()
export class AuthService {
  async validateCognitoToken(token: string): Promise<User> {
    // Cognito JWT validation
  }
  
  async getUserPermissions(userId: string): Promise<Permission[]> {
    // Role-based access control
  }
}
```

##### Proposal Service
```typescript
@Injectable()
export class ProposalService {
  async createProposal(data: CreateProposalDto): Promise<Proposal> {
    // Proposal creation with Amazon Q integration
  }
  
  async generateContent(prompt: string): Promise<string> {
    // Amazon Q content generation
  }
}
```

### 4.3 Database Schema (Aurora Serverless v2)

#### 4.3.1 Core Entities

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cognito_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL,
  organization VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Proposals table
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  content JSONB NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  author_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletters table
CREATE TABLE newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  content JSONB NOT NULL,
  template_id UUID,
  status VARCHAR(50) DEFAULT 'draft',
  author_id UUID REFERENCES users(id),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prompts table
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  category VARCHAR(100),
  tags TEXT[],
  author_id UUID REFERENCES users(id),
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scraper jobs table
CREATE TABLE scraper_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  schedule VARCHAR(100),
  config JSONB NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  last_run TIMESTAMP,
  next_run TIMESTAMP,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 5. Deployment Overview with AWS Services

### 5.1 AWS SAM Template Structure

```yaml
# template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Parameters:
  Environment:
    Type: String
    Default: dev
    AllowedValues: [dev, staging, prod]

Globals:
  Function:
    Runtime: nodejs20.x
    Timeout: 30
    MemorySize: 512
    Environment:
      Variables:
        NODE_ENV: !Ref Environment

Resources:
  # API Gateway
  ApiGateway:
    Type: AWS::Serverless::Api
    Properties:
      StageName: !Ref Environment
      Cors:
        AllowMethods: "'*'"
        AllowHeaders: "'*'"
        AllowOrigin: "'*'"
      Auth:
        DefaultAuthorizer: CognitoAuthorizer
        Authorizers:
          CognitoAuthorizer:
            UserPoolArn: !GetAtt UserPool.Arn

  # Lambda Functions
  MainFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: dist/
      Handler: lambda.handler
      Events:
        ApiEvent:
          Type: Api
          Properties:
            RestApiId: !Ref ApiGateway
            Path: /{proxy+}
            Method: ANY

  # Aurora Serverless v2
  DatabaseCluster:
    Type: AWS::RDS::DBCluster
    Properties:
      Engine: aurora-postgresql
      EngineMode: provisioned
      ServerlessV2ScalingConfiguration:
        MinCapacity: 0.5
        MaxCapacity: 16
      DatabaseName: igad_hub
      MasterUsername: !Ref DBUsername
      MasterUserPassword: !Ref DBPassword

  # Cognito User Pool
  UserPool:
    Type: AWS::Cognito::UserPool
    Properties:
      UserPoolName: !Sub "${AWS::StackName}-users"
      AutoVerifiedAttributes:
        - email
      Policies:
        PasswordPolicy:
          MinimumLength: 8
          RequireUppercase: true
          RequireLowercase: true
          RequireNumbers: true
          RequireSymbols: true

  # S3 Bucket for static assets
  StaticAssetsBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub "${AWS::StackName}-static-assets"
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true

  # CloudFront Distribution
  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Origins:
          - Id: S3Origin
            DomainName: !GetAtt StaticAssetsBucket.DomainName
            S3OriginConfig:
              OriginAccessIdentity: !Sub "origin-access-identity/cloudfront/${OriginAccessIdentity}"
        DefaultCacheBehavior:
          TargetOriginId: S3Origin
          ViewerProtocolPolicy: redirect-to-https
          CachePolicyId: 658327ea-f89d-4fab-a63d-7e88639e58f6

  # OpenSearch Domain
  OpenSearchDomain:
    Type: AWS::OpenSearch::Domain
    Properties:
      DomainName: !Sub "${AWS::StackName}-search"
      EngineVersion: "OpenSearch_2.3"
      ClusterConfig:
        InstanceType: t3.small.search
        InstanceCount: 1
      EBSOptions:
        EBSEnabled: true
        VolumeType: gp3
        VolumeSize: 20
```

### 5.2 Deployment Environments

| Environment | Purpose | Configuration |
|-------------|---------|---------------|
| Development | Local development and testing | Single AZ, minimal resources |
| Staging | Pre-production testing | Production-like, reduced capacity |
| Production | Live system | Multi-AZ, full capacity, monitoring |

### 5.3 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy IGAD Hub

on:
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: aws-actions/setup-sam@v2
      - uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - run: sam build
      - run: sam deploy --no-confirm-changeset --no-fail-on-empty-changeset
```

## 6. Security & Compliance

### 6.1 Authentication & Authorization

#### 6.1.1 Amazon Cognito Configuration
- **Multi-Factor Authentication**: SMS and TOTP support
- **Password Policy**: Minimum 8 characters with complexity requirements
- **Session Management**: JWT tokens with 1-hour expiration
- **Social Login**: Optional integration with Google/Microsoft

#### 6.1.2 Role-Based Access Control (RBAC)

| Role | Permissions |
|------|-------------|
| Admin | Full system access, user management |
| Manager | Module management, team oversight |
| Editor | Content creation and editing |
| Viewer | Read-only access to assigned content |

### 6.2 Data Protection

#### 6.2.1 Encryption
- **At Rest**: AES-256 encryption for all data stores
- **In Transit**: TLS 1.3 for all communications
- **Key Management**: AWS KMS with automatic key rotation

#### 6.2.2 Data Classification

| Classification | Examples | Protection Level |
|----------------|----------|------------------|
| Public | Marketing materials | Standard encryption |
| Internal | Proposals, newsletters | Enhanced encryption + access controls |
| Confidential | User data, analytics | Full encryption + audit logging |
| Restricted | Admin credentials | Maximum security + MFA |

### 6.3 Compliance Framework

#### 6.3.1 African Union Data Protection
- Data residency within AU member states
- Consent management for personal data
- Right to erasure implementation
- Data processing transparency

#### 6.3.2 Security Controls

| Control | Implementation |
|---------|----------------|
| Access Logging | CloudTrail + CloudWatch |
| Vulnerability Scanning | AWS Inspector |
| Network Security | VPC + Security Groups |
| DDoS Protection | AWS Shield Standard |
| WAF | AWS WAF with OWASP rules |

## 7. CI/CD and Observability

### 7.1 Continuous Integration

#### 7.1.1 Build Pipeline
```yaml
stages:
  - lint: ESLint + Prettier
  - test: Jest unit tests + Cypress e2e
  - security: SAST with SonarQube
  - build: TypeScript compilation + bundling
  - package: Docker image creation
```

#### 7.1.2 Quality Gates
- Code coverage > 80%
- Zero critical security vulnerabilities
- Performance budget compliance
- Accessibility standards (WCAG 2.1 AA)

### 7.2 Monitoring & Observability

#### 7.2.1 Application Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Response Time | < 2s | > 5s |
| Error Rate | < 0.1% | > 1% |
| Availability | 99.9% | < 99% |
| Memory Usage | < 80% | > 90% |
| CPU Usage | < 70% | > 85% |

#### 7.2.2 Logging Strategy
```typescript
// Structured logging with Winston
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.CloudWatchLogs({
      logGroupName: '/aws/lambda/igad-hub',
      logStreamName: 'application-logs'
    })
  ]
});
```

#### 7.2.3 Alerting Configuration
- **Critical**: Page operations team immediately
- **Warning**: Slack notification to dev team
- **Info**: Dashboard notification only

### 7.3 Performance Monitoring

#### 7.3.1 AWS X-Ray Integration
```typescript
import AWSXRay from 'aws-xray-sdk-core';

// Instrument HTTP requests
const http = AWSXRay.captureHTTPs(require('http'));

// Custom subsegments
app.use((req, res, next) => {
  const segment = AWSXRay.getSegment();
  const subsegment = segment.addNewSubsegment('custom-operation');
  // ... operation logic
  subsegment.close();
  next();
});
```

## 8. Appendices

### Appendix A: OpenAPI Specification

```yaml
openapi: 3.0.3
info:
  title: IGAD Innovations Hub API
  version: 1.0.0
  description: RESTful API for the IGAD Innovations Hub platform

paths:
  /api/v1/proposals:
    get:
      summary: List proposals
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Proposal'
                  meta:
                    $ref: '#/components/schemas/PaginationMeta'

    post:
      summary: Create proposal
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateProposalDto'
      responses:
        '201':
          description: Proposal created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Proposal'

components:
  schemas:
    Proposal:
      type: object
      properties:
        id:
          type: string
          format: uuid
        title:
          type: string
        content:
          type: object
        status:
          type: string
          enum: [draft, review, approved, rejected]
        authorId:
          type: string
          format: uuid
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    CreateProposalDto:
      type: object
      required:
        - title
        - content
      properties:
        title:
          type: string
          minLength: 1
          maxLength: 500
        content:
          type: object
        templateId:
          type: string
          format: uuid

    PaginationMeta:
      type: object
      properties:
        page:
          type: integer
        limit:
          type: integer
        total:
          type: integer
        totalPages:
          type: integer

  securitySchemes:
    CognitoAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

security:
  - CognitoAuth: []
```

### Appendix B: IAM Roles and Policies

#### B.1 Lambda Execution Role
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "rds-data:BatchExecuteStatement",
        "rds-data:BeginTransaction",
        "rds-data:CommitTransaction",
        "rds-data:ExecuteStatement",
        "rds-data:RollbackTransaction"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "es:ESHttpGet",
        "es:ESHttpPost",
        "es:ESHttpPut",
        "es:ESHttpDelete"
      ],
      "Resource": "*"
    }
  ]
}
```

#### B.2 Cognito User Pool Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cognito-idp:AdminCreateUser",
        "cognito-idp:AdminDeleteUser",
        "cognito-idp:AdminGetUser",
        "cognito-idp:AdminListGroupsForUser",
        "cognito-idp:AdminAddUserToGroup",
        "cognito-idp:AdminRemoveUserFromGroup"
      ],
      "Resource": "*"
    }
  ]
}
```

### Appendix C: Non-Functional Requirements Metrics

| Category | Metric | Measurement Method | Target | Monitoring Tool |
|----------|--------|-------------------|--------|-----------------|
| Performance | API Response Time | P95 latency | < 2000ms | CloudWatch |
| Performance | Page Load Time | First Contentful Paint | < 1500ms | Real User Monitoring |
| Performance | Database Query Time | Average execution time | < 500ms | Aurora Performance Insights |
| Scalability | Concurrent Users | Active sessions | 1000+ | CloudWatch Custom Metrics |
| Scalability | Auto-scaling Time | Cold start to ready | < 5 minutes | Lambda Metrics |
| Availability | System Uptime | Service availability | 99.9% | CloudWatch Synthetics |
| Availability | Error Rate | 4xx/5xx responses | < 0.1% | API Gateway Metrics |
| Security | Failed Login Attempts | Authentication failures | < 1% | Cognito Metrics |
| Security | Vulnerability Scan | Critical/High findings | 0 | AWS Inspector |
| Usability | Mobile Performance | Lighthouse Score | > 90 | Automated Testing |
| Reliability | Data Backup Success | Backup completion rate | 100% | RDS Backup Metrics |

---

**Document Control**
- **Author**: AWS Solution Architect Team
- **Reviewers**: IGAD Technical Committee
- **Approval**: IGAD Innovation Director
- **Next Review**: Quarterly
- **Distribution**: Internal IGAD Teams, AWS Account Team
