# Package.json Update Instructions

To fix the Netlify build issue, you need to add the following scripts to your package.json file:

```json
"scripts": {
  "dev": "NODE_ENV=development tsx server/index.ts",
  "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "prebuild": "mkdir -p dist && node -e \"process.env.VITE_BUILD_TIME = new Date().toISOString()\"",
  "postbuild": "node netlify.js",
  "start": "NODE_ENV=production node dist/index.js",
  "check": "tsc",
  "db:push": "drizzle-kit push"
}
```

The key additions are:
1. A `prebuild` script that creates the dist directory and sets a build-time environment variable
2. A `postbuild` script that runs our netlify.js file to handle file organization

Since the Replit environment prevents direct editing of package.json, you'll need to add these scripts manually when deploying to Netlify.

## How to Apply These Changes

In your Netlify dashboard:

1. Go to Site settings > Build & deploy > Environment variables
2. Add these environment variables:
   - `NPM_FLAGS` = `--legacy-peer-deps`

Alternatively, you can add the npm scripts when pushing to your Git repository for Netlify deployment.