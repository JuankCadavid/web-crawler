# IGAD Hub Infrastructure

This folder contains all infrastructure-related files for the IGAD Hub deployment.

## Files Structure

```
infrastructure/
├── templates/
│   ├── template.yaml           # Main SAM template for frontend infrastructure
│   └── template-infra-only.yaml # Infrastructure-only template
├── samconfig.toml             # SAM configuration
├── deploy.sh                  # Deployment script
├── README.md                  # This file
├── params/                    # Parameter files for different environments
└── scripts/                   # Utility scripts
```

## Deployment

### Quick Deploy
```bash
./infrastructure/deploy.sh
```

### Manual Deploy (from infrastructure folder)
```bash
cd infrastructure
sam build
sam deploy
```

## Configuration

The `samconfig.toml` file contains:
- Stack name: `igad-hub-test`
- Profile: `IBD-DEV`
- Region: `us-east-1`
- Template: `templates/template.yaml`

## Resources Created

- S3 bucket for frontend hosting
- CloudFront distribution
- Origin Access Control for S3
- Bucket policies for CloudFront access
