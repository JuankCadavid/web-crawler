# IGAD Hub Scripts

Organized shell scripts for development, building, and deployment.

## Quick Start

Use the main development script from the project root:

```bash
# Start full development environment
./dev.sh start

# Start frontend only
./dev.sh frontend

# Build everything
./dev.sh build
```

## Directory Structure

```
scripts/
├── dev/                    # Development scripts
│   ├── start-dev.sh       # Full dev environment (frontend + backend)
│   ├── start-frontend.sh  # Frontend development server only
│   └── serve-local.sh     # Serve built files locally
├── build/                 # Build scripts
│   ├── build-all.sh       # Build both frontend and backend
│   ├── build-frontend.sh  # Build frontend only
│   └── build-backend.sh   # Build backend only
└── deploy/                # Deployment scripts (future)
```

## Available Commands

### Development
- `./scripts/dev/start-dev.sh` - Start both frontend and backend
- `./scripts/dev/start-frontend.sh` - Frontend development server only
- `./scripts/dev/serve-local.sh` - Serve pre-built files

### Building
- `./scripts/build/build-all.sh` - Build everything
- `./scripts/build/build-frontend.sh` - Build frontend only
- `./scripts/build/build-backend.sh` - Build backend only

### Main Script (Recommended)
- `./dev.sh help` - Show all available commands
- `./dev.sh start` - Start development environment
- `./dev.sh build` - Build all components
