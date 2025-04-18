#!/bin/bash

# Default username and password
DEFAULT_USERNAME="admin"
DEFAULT_PASSWORD="Nuuron@dmin123"

# Get username and password from command line arguments or use defaults
USERNAME=${1:-$DEFAULT_USERNAME}
PASSWORD=${2:-$DEFAULT_PASSWORD}

# Build the project to generate the dist folder
echo "Building project..."
npm run build

# Run the create-admin script
echo "Creating admin user '$USERNAME'..."
NODE_ENV=production DATABASE_URL=$DATABASE_URL node scripts/create-admin.js "$USERNAME" "$PASSWORD"

echo "Setup complete. You can now login to the admin portal at /admin/login"