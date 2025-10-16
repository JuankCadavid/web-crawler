# Sprint 2 – Core Backend & Frontend Foundation

**Duration:** Weeks 3–4  
**Goal:** Build core backend APIs and complete frontend foundation with full user management and navigation  
**Status:** Planned  
**Sprint Length:** 2 weeks

## 1. Sprint Goal

By the end of Sprint 2, we will have:
- **Backend Foundation**: Complete NestJS application with core modules, database integration, and RESTful APIs
- **Frontend Framework**: Fully functional React application with routing, state management, and responsive UI components
- **User Management**: Complete user registration, profile management, and role-based access control
- **Data Layer**: Comprehensive database schema with migrations and seed data for testing

Success criteria: A fully navigable web application with user management, dashboard, and foundational UI components ready for module-specific features.

## 2. Epics

| Epic ID | Epic Name | Description |
|----------|------------|-------------|
| E4 | NestJS Backend Development | Core API modules, database integration, and business logic |
| E5 | React Frontend Framework | Complete UI framework with routing, components, and state management |
| E6 | User Management System | Registration, profiles, roles, and permissions |
| E7 | Database Schema & Integration | Complete data model with relationships and migrations |

## 3. User Stories

| Story ID | Description | Acceptance Criteria | Story Points |
|-----------|--------------|--------------------|---------------|
| US2.1 | As a Backend developer, I want to implement NestJS core modules so that the application has proper structure and organization | All modules (auth, users, common) created with proper DTOs, services, and controllers | 8 |
| US2.2 | As a Frontend developer, I want to create responsive UI framework so that users have consistent and accessible interface | Component library with TailwindCSS, responsive design, accessibility compliance | 8 |
| US2.3 | As a User, I want to register and manage my profile so that I can access the platform with personalized settings | Registration flow, profile editing, password reset, email verification | 5 |
| US2.4 | As an Admin, I want to manage user roles and permissions so that access control is properly enforced | Role assignment, permission matrix, admin dashboard for user management | 5 |
| US2.5 | As a Developer, I want complete database schema so that all application data can be stored and retrieved efficiently | All entities defined, relationships established, migrations working, seed data available | 5 |
| US2.6 | As a User, I want intuitive navigation so that I can easily access all platform features | Main navigation, breadcrumbs, search functionality, mobile-responsive menu | 3 |

## 4. Tasks (JIRA Subtasks)

| Task ID | Description | Owner | Component | Est (hrs) |
|----------|--------------|--------|------------|-----------|
| T2.1 | Implement NestJS application structure with modules | Backend | NestJS | 6 |
| T2.2 | Create User entity and service with CRUD operations | Backend | Users | 4 |
| T2.3 | Implement authentication middleware and guards | Backend | Auth | 6 |
| T2.4 | Create database migrations for all core entities | Backend | Database | 4 |
| T2.5 | Implement role-based access control (RBAC) system | Backend | Auth | 8 |
| T2.6 | Create API endpoints for user management | Backend | API | 6 |
| T2.7 | Set up React Router with protected routes | Frontend | Routing | 4 |
| T2.8 | Create reusable UI component library | Frontend | Components | 8 |
| T2.9 | Implement responsive navigation and layout | Frontend | Layout | 6 |
| T2.10 | Set up state management with Zustand and TanStack Query | Frontend | State | 6 |
| T2.11 | Create user registration and login forms | Frontend | Auth | 6 |
| T2.12 | Implement user profile management interface | Frontend | Profile | 4 |
| T2.13 | Create admin dashboard for user management | Frontend | Admin | 6 |
| T2.14 | Implement form validation and error handling | Frontend | Validation | 4 |
| T2.15 | Set up API client with authentication headers | Frontend | API | 4 |
| T2.16 | Create database seed data for testing | Backend | Database | 3 |
| T2.17 | Implement comprehensive error handling | Backend | Error | 4 |
| T2.18 | Set up API documentation with Swagger | Backend | Docs | 3 |
| T2.19 | Configure CORS and security headers | Backend | Security | 2 |
| T2.20 | Implement loading states and user feedback | Frontend | UX | 4 |

## 5. Deliverables

### Backend Deliverables
- **NestJS Application**: Complete modular structure with dependency injection
- **API Endpoints**:
  - `POST /auth/register` - User registration
  - `POST /auth/login` - User authentication  
  - `GET /auth/profile` - Get user profile
  - `PUT /auth/profile` - Update user profile
  - `GET /users` - List users (admin only)
  - `PUT /users/:id/role` - Update user role (admin only)
  - `GET /health` - Health check endpoint
- **Database Schema**: Complete entity definitions with relationships
- **Authentication**: JWT-based auth with role-based access control
- **API Documentation**: Swagger/OpenAPI specification

### Frontend Deliverables
- **React Application**: Complete SPA with routing and state management
- **UI Components**: Reusable component library with TailwindCSS
- **User Interfaces**:
  - Registration and login pages
  - User dashboard with navigation
  - Profile management interface
  - Admin user management panel
- **Responsive Design**: Mobile-first approach with accessibility compliance
- **State Management**: Global state with authentication and user data

### Infrastructure Deliverables
- **Database Migrations**: Automated schema deployment
- **Environment Configuration**: Separate configs for Test/Production
- **API Integration**: Complete frontend-backend connectivity
- **Error Handling**: Comprehensive error boundaries and user feedback

## 6. Sprint Ceremonies

| Ceremony | Time | Description |
|-----------|------|-------------|
| Sprint Planning | Day 1, 9:00 AM | Review Sprint 1 outcomes, plan Sprint 2 backlog |
| Daily Standup | Daily, 9:30 AM | Progress sync, blocker identification, daily goals |
| Mid-Sprint Review | Day 5, 2:00 PM | Demo progress, adjust scope if needed |
| Sprint Review | Day 10, 2:00 PM | Demo complete user management system |
| Sprint Retrospective | Day 10, 3:00 PM | Process improvements and Sprint 3 preparation |

### Technical Reviews
- **API Design Review**: Day 2, 10:00 AM - Review endpoint design and data models
- **UI/UX Review**: Day 4, 11:00 AM - Review component design and user flows
- **Security Review**: Day 7, 10:00 AM - Review authentication and authorization
- **Performance Review**: Day 8, 2:00 PM - Review database queries and API performance

## 7. Definition of Done

### Story Level
- [ ] All acceptance criteria met and validated
- [ ] Backend APIs implemented with proper error handling
- [ ] Frontend components created with responsive design
- [ ] Unit tests written and passing (≥ 80% coverage)
- [ ] Integration tests for API endpoints
- [ ] Code reviewed and approved by tech lead
- [ ] API documentation updated
- [ ] Deployed and tested in Test environment

### Sprint Level
- [ ] Complete user registration and authentication flow
- [ ] Admin can manage users and roles
- [ ] Responsive navigation works on all devices
- [ ] Database schema supports all planned features
- [ ] API endpoints documented and tested
- [ ] Frontend state management working correctly
- [ ] Performance benchmarks established

## 8. Technical Architecture

### Backend Architecture
```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── guards/
│   │   └── strategies/
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── entities/
│   └── common/
│       ├── decorators/
│       ├── filters/
│       ├── interceptors/
│       └── pipes/
├── database/
│   ├── entities/
│   ├── migrations/
│   └── seeds/
└── config/
```

### Frontend Architecture
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── forms/        # Form components
│   ├── layout/       # Layout components
│   └── auth/         # Authentication components
├── pages/
│   ├── auth/         # Login, register, profile
│   ├── dashboard/    # Main dashboard
│   └── admin/        # Admin interfaces
├── hooks/            # Custom React hooks
├── services/         # API services
├── store/            # State management
├── types/            # TypeScript definitions
└── utils/            # Utility functions
```

### Database Schema
```sql
-- Core entities for Sprint 2
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  organization VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  avatar_url VARCHAR(500),
  bio TEXT,
  phone VARCHAR(50),
  timezone VARCHAR(50) DEFAULT 'UTC',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  permissions TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 9. API Specifications

### Authentication Endpoints
```yaml
/auth/register:
  post:
    summary: Register new user
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              email: { type: string, format: email }
              password: { type: string, minLength: 8 }
              firstName: { type: string }
              lastName: { type: string }
              organization: { type: string }
    responses:
      201:
        description: User created successfully
      400:
        description: Validation error
      409:
        description: Email already exists

/auth/login:
  post:
    summary: Authenticate user
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              email: { type: string, format: email }
              password: { type: string }
    responses:
      200:
        description: Authentication successful
        content:
          application/json:
            schema:
              type: object
              properties:
                access_token: { type: string }
                user: { $ref: '#/components/schemas/User' }
      401:
        description: Invalid credentials
```

## 10. Testing Strategy

### Backend Testing
- **Unit Tests**: Service layer business logic (Jest)
- **Integration Tests**: API endpoints with test database
- **Authentication Tests**: JWT token validation and RBAC
- **Database Tests**: Entity relationships and migrations

### Frontend Testing
- **Component Tests**: React Testing Library for UI components
- **Integration Tests**: User flows and API integration
- **Accessibility Tests**: WCAG 2.1 AA compliance
- **Responsive Tests**: Cross-device compatibility

### Test Coverage Targets
| Component | Coverage Target | Test Types |
|-----------|----------------|------------|
| Backend Services | 90% | Unit + Integration |
| API Controllers | 85% | Integration |
| Frontend Components | 80% | Component + Integration |
| User Flows | 100% | E2E (preparation for Sprint 5) |

## 11. Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| API Response Time (p95) | < 500ms | CloudWatch metrics |
| Database Query Time | < 100ms | Aurora Performance Insights |
| Page Load Time | < 2s | Lighthouse CI |
| Bundle Size | < 500KB | Webpack Bundle Analyzer |
| Memory Usage (Lambda) | < 256MB | CloudWatch Lambda metrics |

## 12. Security Considerations

### Authentication Security
- Password hashing with bcrypt (12 rounds)
- JWT tokens with 1-hour expiration
- Refresh token rotation
- Rate limiting on auth endpoints (5 attempts/minute)

### API Security
- Input validation with class-validator
- SQL injection prevention with TypeORM
- CORS configuration for allowed origins
- Security headers (helmet.js)
- Request size limits

### Frontend Security
- XSS prevention with React's built-in protection
- Secure token storage (httpOnly cookies for refresh tokens)
- CSRF protection
- Content Security Policy headers

## 13. Risks and Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Database migration issues | High | Low | Test migrations thoroughly, backup strategy |
| Authentication complexity | Medium | Medium | Use proven patterns, extensive testing |
| Frontend state management complexity | Medium | Medium | Keep state simple, use established patterns |
| API performance issues | Medium | Low | Implement caching, optimize queries |
| RBAC implementation complexity | High | Medium | Start simple, iterate based on requirements |

## 14. Success Metrics

### Functional Metrics
- [ ] User can register and login successfully
- [ ] Admin can manage user roles and permissions
- [ ] All API endpoints respond within performance targets
- [ ] Frontend is responsive on mobile and desktop
- [ ] Database supports concurrent users without issues

### Technical Metrics
- [ ] Code coverage ≥ 80% for all components
- [ ] API documentation complete and accurate
- [ ] Zero critical security vulnerabilities
- [ ] Performance targets met for all endpoints
- [ ] Accessibility score ≥ 95% (Lighthouse)

## 15. References

### Sprint Dependencies
- **Sprint 1 Outputs**: SAM templates, Cognito configuration, Aurora cluster, CI/CD pipeline
- **Required for Sprint 3**: User authentication, API framework, UI components, database schema

### Documentation
- `/specs/technical-spec-igad-innovations-hub-v1.1.md` - Technical architecture
- `/planning/sprint-1-architecture-setup.md` - Previous sprint outcomes
- `/planning/development-plan-overview.md` - Overall project roadmap

### External Resources
- [NestJS Documentation](https://docs.nestjs.com/)
- [React Router Documentation](https://reactrouter.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [AWS Cognito Best Practices](https://docs.aws.amazon.com/cognito/latest/developerguide/security.html)

## 16. Next Sprint Preview

Sprint 3 will focus on:
- **AI Integration**: Amazon Q and Bedrock service integration
- **Proposal Writer Module**: Template-based proposal creation with LLM assistance
- **Newsletter Generator Module**: Content aggregation and AI-powered summarization
- **Advanced Features**: Real-time collaboration, version control, content workflows
