#!/bin/bash

# Create a .npmrc file to specify npm to use legacy peer dependencies to avoid dependency conflicts
echo "legacy-peer-deps=true" > .npmrc

# Install vite and other essential build tools globally to make them available to the build script
npm install -g vite esbuild tsx

# Install all dependencies including dev dependencies
npm install

# Run the build command
npm run build