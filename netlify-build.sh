#!/bin/bash
# Ensure Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Node.js not found. Installing Node.js..."
  curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
  apt-get install -y nodejs
fi

# Create a .npmrc file to specify npm to use legacy peer dependencies to avoid dependency conflicts
echo "legacy-peer-deps=true" > .npmrc

# Install vite and other essential build tools globally to make them available to the build script
npm install -g vite esbuild tsx

# Install all dependencies including dev dependencies
npm install

# Run the build command
export PATH="$PATH:./node_modules/.bin"
npx vite build
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Process files to ensure correct structure for Netlify
node netlify.js