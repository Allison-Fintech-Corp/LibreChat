#!/bin/bash

# Allison Demo Deployment Script
# Usage: ./deploy-allison.sh

set -e

echo "🚀 Deploying Allison Demo..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  Creating .env from example..."
    cp .env.example .env
    echo "✅ Please edit .env with your API keys before continuing."
    echo "   Required: OPENROUTER_API_KEY"
    read -p "Press Enter after updating .env file..."
fi

# Build and start services
echo "🔨 Building Allison application..."
docker compose -f docker-compose.demo.yml build --no-cache

echo "🚀 Starting services..."
docker compose -f docker-compose.demo.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check if Allison is responding
for i in {1..30}; do
    if curl -s http://localhost:3080/api/config > /dev/null; then
        echo "✅ Allison is ready!"
        echo ""
        echo "🎉 Demo deployed successfully!"
        echo "   URL: http://localhost:3080"
        echo "   App: Allison"
        echo ""
        echo "📋 Useful commands:"
        echo "   View logs: docker compose -f docker-compose.demo.yml logs -f"
        echo "   Stop demo: docker compose -f docker-compose.demo.yml down"
        echo "   Restart:   docker compose -f docker-compose.demo.yml restart"
        exit 0
    fi
    echo "   Attempt $i/30 - waiting for Allison to start..."
    sleep 2
done

echo "❌ Allison failed to start. Check logs:"
echo "   docker compose -f docker-compose.demo.yml logs"
exit 1
