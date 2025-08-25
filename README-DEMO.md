# Allison Demo Deployment

## Quick Start (1 command)

```bash
./deploy-allison.sh
```

This script will:
1. Build a custom Docker image with Allison branding
2. Start all required services (MongoDB, MeiliSearch, VectorDB)
3. Deploy Allison at http://localhost:3080

## Manual Deployment

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Edit .env with your OpenRouter API key
# Required: OPENROUTER_API_KEY=your_key_here

# 3. Deploy
docker compose -f docker-compose.demo.yml up -d --build
```

## For Bank Demo

### Pre-Demo Setup
1. Ensure Docker is installed and running
2. Set your OpenRouter API key in `.env`
3. Run `./deploy-allison.sh`
4. Test at http://localhost:3080

### Demo Commands
```bash
# Start demo
./deploy-allison.sh

# View logs during demo
docker compose -f docker-compose.demo.yml logs -f allison

# Stop after demo
docker compose -f docker-compose.demo.yml down

# Clean restart
docker compose -f docker-compose.demo.yml down -v
./deploy-allison.sh
```

### Production Considerations
- Change default passwords in docker-compose.demo.yml
- Use proper SSL certificates
- Configure firewall rules
- Set up monitoring and backups

## Troubleshooting

**Service won't start:**
```bash
docker compose -f docker-compose.demo.yml logs allison
```

**Reset everything:**
```bash
docker compose -f docker-compose.demo.yml down -v
docker system prune -f
./deploy-allison.sh
```

**Check service status:**
```bash
docker compose -f docker-compose.demo.yml ps
curl http://localhost:3080/api/config
```
