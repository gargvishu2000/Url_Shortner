#!/bin/bash

# Make script executable with: chmod +x deploy.sh

# Stop any running containers
echo "Stopping existing containers..."
docker-compose down

# Pull latest changes
echo "Pulling latest changes from repository..."
git pull

# Build and start containers
echo "Building and starting containers..."
docker-compose up --build -d

echo "Deployment completed successfully!"