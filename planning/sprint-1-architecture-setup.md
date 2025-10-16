# Sprint 1 – Architecture Setup

**Duration:** Weeks 1–2  
**Goal:** Establish foundational infrastructure, CI/CD pipeline, and core serverless architecture  
**Status:** Planned  
**Sprint Length:** 2 weeks

## 1. Sprint Goal

By the end of Sprint 1, we will have:
- **Technical Foundation**: Complete CI/CD pipeline with automated deployments to Test and Production environments
- **Core Infrastructure**: Working serverless backend with API Gateway, Lambda, Aurora Serverless, and Cognito authentication
- **Frontend Shell**: React application deployed to S3 + CloudFront with basic routing and authentication flow
- **Development Workflow**: Established branching strategy, code review process, and automated testing pipeline

Success criteria: A "Hello World" application accessible via HTTPS with user authentication, deployed through automated pipeline.

## 2. Epics

| Epic ID | Epic Name | Description |
|----------|------------|-------------|
| E1 | CI/CD Pipeline Setup | Create repositories, Jenkins pipeline, and SAM deployment automation |
| E2 | Serverless Backend Foundation | Initialize AWS Lambda, API Gateway, Aurora Serverless, and Cognito |
| E3 | Frontend Application Shell | Deploy React SPA with routing, authentication, and CloudFront distribution |
| E4 | Development Environment | Configure local development tools, testing framework, and documentation |

## 3. User Stories

| Story ID | Description | Acceptance Criteria | Story Points |
|-----------|--------------|--------------------|---------------|
| US1.1 | As a DevOps engineer, I want to set up automated CI/CD pipeline so that code changes are automatically tested and deployed | Pipeline triggers on PR/merge, runs tests, deploys to Test env, requires approval for Prod | 8 |
| US1.2 | As a Backend developer, I want to create serverless API foundation so that frontend can authenticate users and make API calls | API Gateway + Lambda responds to /health endpoint, Cognito user pool configured, JWT validation working | 5 |
| US1.3 | As a Frontend developer, I want to deploy React application shell so that users can access the application and authenticate | React app accessible via CloudFront HTTPS, login/logout flow working, routing configured | 5 |
| US1.4 | As a Database administrator, I want to set up Aurora Serverless so that application data can be stored and retrieved | Aurora cluster running, connection from Lambda working, basic schema deployed | 3 |
| US1.5 | As a Developer, I want local development environment configured so that I can run and test code locally | SAM local working, React dev server configured, environment variables documented | 3 |

## 4. Tasks (JIRA Subtasks)

| Task ID | Description | Owner | Component | Est (hrs) |
|----------|--------------|--------|------------|-----------|
| T1.1 | Create GitHub repositories (frontend, backend, infrastructure) | DevOps | Infra | 2 |
| T1.2 | Configure Jenkins pipeline with multi-stage deployment | DevOps | CI/CD | 8 |
| T1.3 | Write base SAM template.yaml with Lambda, API Gateway, Aurora | Backend | Infra | 6 |
| T1.4 | Implement "Hello World" Lambda function with health endpoint | Backend | Lambda | 4 |
| T1.5 | Configure Cognito User Pool with JWT authorizer | Backend | Auth | 6 |
| T1.6 | Set up Aurora Serverless v2 cluster with basic schema | Backend | Database | 4 |
| T1.7 | Create React application with TypeScript and TailwindCSS | Frontend | React | 6 |
| T1.8 | Configure S3 bucket and CloudFront distribution | Frontend | Infra | 4 |
| T1.9 | Implement authentication flow with Cognito integration | Frontend | Auth | 8 |
| T1.10 | Set up local development with SAM CLI and React dev server | DevOps | DevEnv | 4 |
| T1.11 | Configure environment variables and secrets management | DevOps | Config | 3 |
| T1.12 | Write deployment documentation and runbooks | DevOps | Docs | 3 |
| T1.13 | Set up basic monitoring with CloudWatch alarms | DevOps | Monitoring | 4 |
| T1.14 | Configure cost budgets and alerts | DevOps | Cost | 2 |
| T1.15 | Implement basic error handling and logging | Backend | Logging | 4 |

## 5. Deliverables

### Technical Deliverables
- **Working Application**: HTTPS-accessible React app with authentication at `https://test.igad-hub.example.com`
- **API Endpoints**: 
  - `GET /health` - Health check endpoint
  - `POST /auth/login` - Authentication endpoint
  - `GET /auth/user` - User profile endpoint
- **Infrastructure**: Complete SAM templates for Test and Production environments
- **CI/CD Pipeline**: Automated deployment pipeline with test gates

### Documentation Deliverables
- Updated `/specs/technical-spec-igad-innovations-hub-v1.1.md` with actual implementation details
- `/docs/development-setup.md` - Local development guide
- `/docs/deployment-guide.md` - Deployment procedures and troubleshooting
- `/docs/api-documentation.md` - Initial API documentation

### Code Quality
- All code merged into `main` branch through PR process
- Unit tests for Lambda functions (minimum 80% coverage)
- Integration tests for authentication flow
- Successful pipeline execution in both Test and Production

## 6. Sprint Ceremonies

| Ceremony | Time | Description |
|-----------|------|-------------|
| Sprint Planning | Day 1, 9:00 AM | Define Sprint Backlog, estimate tasks, assign ownership |
| Daily Standup | Daily, 9:30 AM | 15-min sync on progress, blockers, and daily goals |
| Sprint Review | Day 10, 2:00 PM | Demo working application to Product Owner and stakeholders |
| Sprint Retrospective | Day 10, 3:00 PM | Team reflection on process improvements and lessons learned |

### Additional Ceremonies
- **Architecture Review**: Day 3, 10:00 AM - Review SAM templates and infrastructure design
- **Security Review**: Day 7, 11:00 AM - Review Cognito configuration and security controls
- **Mid-Sprint Check**: Day 5, 4:00 PM - Progress assessment and risk mitigation

## 7. Definition of Done

### Story Level
- [ ] Code implemented and unit tested
- [ ] Integration tests passing
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Deployed to Test environment
- [ ] Acceptance criteria validated

### Sprint Level
- [ ] All user stories completed
- [ ] Pipeline successfully deploys to both environments
- [ ] Security scan passes
- [ ] Performance baseline established
- [ ] Cost monitoring configured
- [ ] Stakeholder demo completed

## 8. Risks and Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| AWS account setup delays | High | Medium | Pre-configure accounts, have backup region ready |
| Cognito integration complexity | Medium | High | Allocate extra time, have AWS support contact ready |
| CI/CD pipeline configuration issues | High | Medium | Use proven Jenkins templates, test incrementally |
| Aurora Serverless cold start issues | Medium | Low | Configure keep-alive, document connection pooling |

## 9. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Pipeline Success Rate | 95% | Jenkins build statistics |
| Application Availability | 99% | CloudWatch Synthetics |
| Authentication Success Rate | 98% | Cognito metrics |
| Page Load Time | < 3 seconds | Browser dev tools |
| Cost per Deployment | < $5 | AWS Cost Explorer |

## 10. References

- `/specs/technical-spec-igad-innovations-hub-v1.1.md` - Technical architecture specification
- `/specs/cost/cost-spec-igad-innovations-hub-v1.0.md` - Cost optimization guidelines
- `/specs/diagrams/c4-context.png` - System context diagram
- `/specs/diagrams/c4-container.png` - Container architecture diagram
- `/specs/diagrams/network-topology.png` - Network topology diagram

## 11. Next Sprint Preview

Sprint 2 will focus on:
- **Core Module Development**: Proposal Writer and Main Page modules
- **Database Schema**: Complete data model implementation
- **Advanced Authentication**: Role-based access control and user management
- **Testing Framework**: Comprehensive test suite with Playwright E2E tests
