# IGAD Innovations Hub

AI-Powered Agricultural Intelligence Hub for the Intergovernmental Authority on Development (IGAD).

## Quick Start

```bash
# Start development environment
./dev.sh start

# Start frontend only
./dev.sh frontend

# Build everything
./dev.sh build

# See all commands
./dev.sh help
```

## Project Structure

```
igad-app/
├── frontend/                  # React + TypeScript + Tailwind frontend
├── backend/                   # NestJS backend (for future Lambda deployment)
├── infrastructure/            # AWS SAM deployment files
│   ├── templates/            # SAM templates
│   ├── params/               # Environment parameters
│   ├── scripts/              # Utility scripts
│   ├── samconfig.toml        # SAM configuration
│   └── deploy.sh             # Deployment script
├── scripts/                   # Development & build scripts
│   ├── dev/                  # Development scripts
│   ├── build/                # Build scripts
│   └── README.md             # Scripts documentation
├── dev.sh                     # Main development script
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## Quick Start

### Prerequisites
- AWS CLI configured with IBD-DEV profile
- AWS SAM CLI installed
- Node.js 20+ for local development

### Deploy to AWS
```bash
# Deploy infrastructure and frontend
./infrastructure/deploy.sh
```

### Local Development
```bash
# Frontend development
cd frontend
npm install
npm run dev

# Backend development (future)
cd backend
npm install
npm run start:dev
```

## Features

- **Frontend**: React with Cognito authentication and role-based access control
- **Authentication**: AWS Cognito with USER/ADMIN roles
- **Infrastructure**: AWS SAM with S3 + CloudFront hosting
- **Deployment**: Single-command deployment with organized infrastructure

## Environment Configuration

Copy `.env.example` to create environment files:
- Frontend: `frontend/.env`
- Backend: `backend/.env` (for future use)

## AWS Resources

The application creates:
- S3 bucket for frontend hosting
- CloudFront distribution with custom domain support
- Cognito User Pool with groups (USER, ADMIN)
- Origin Access Control for secure S3 access

## Development Workflow

1. Make changes to frontend/backend code
2. Test locally if needed
3. Deploy using `./infrastructure/deploy.sh`
4. Frontend is automatically built and uploaded to S3

## Authentication

- Users register via Cognito
- Manual approval by adding users to USER/ADMIN groups
- Role-based UI and API access control
- JWT tokens for secure communication
