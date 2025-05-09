# Deployment Guide for Adams Shore Supermarket Website

This guide explains how to deploy the Adams Shore Supermarket website to either your own server or to Netlify.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Git (for version control)

## Option 1: Deploy to Your Own Server (Recommended for Full Control)

### Step 1: Build the Application

```bash
# Install dependencies
npm install

# Build the application
npm run build
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the root of your project with the following variables:

```
NODE_ENV=production
DATABASE_URL=postgresql://username:password@hostname:port/database
```

Replace the DATABASE_URL with your actual PostgreSQL connection string.

### Step 3: Start the Server

For testing:
```bash
npm start
```

For production (using PM2 for process management):
```bash
# Install PM2 globally
npm install -g pm2

# Start the application with PM2
pm2 start dist/index.js --name adams-store

# Set PM2 to start on system boot
pm2 save
pm2 startup
```

### Step 4: Set Up Nginx (Optional but Recommended)

Install Nginx:
```bash
sudo apt update
sudo apt install nginx
```

Create a nginx configuration file:
```
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save this to `/etc/nginx/sites-available/adams-store` and enable it:
```bash
sudo ln -s /etc/nginx/sites-available/adams-store /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: Set Up SSL with Let's Encrypt (Recommended)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Option 2: Deploy to Netlify (Easier but with Some Limitations)

### Step 1: Push Your Code to GitHub

Create a GitHub repository and push your code to it. Make sure to include all the build configuration files:
- netlify.toml
- netlify-build.sh
- netlify.js
- .nvmrc

### Step 2: Fix Build Command Issues (Required)

Before connecting to Netlify, make a few critical changes to ensure the build succeeds:

1. Add build scripts to package.json as detailed in PACKAGE_UPDATE_INSTRUCTIONS.md
2. Ensure all build tools are in your package.json:
   ```bash
   npm install --save-dev vite esbuild tsx
   ```
3. Make sure the netlify-build.sh script is executable:
   ```bash
   git update-index --chmod=+x netlify-build.sh
   ```

### Step 3: Connect to Netlify

1. Log in to [Netlify](https://app.netlify.com/)
2. Click "New site from Git"
3. Select GitHub and authorize Netlify
4. Choose your repository
5. Keep the build settings as configured in netlify.toml:
   - Build command: `./netlify-build.sh`
   - Publish directory: `dist`

### Step 4: Configure Environment Variables

In Netlify site settings, go to "Environment variables" and add:
- `NODE_ENV` = `production`
- `DATABASE_URL` = Your PostgreSQL connection string
- `NPM_FLAGS` = `--legacy-peer-deps`

For PostgreSQL, use a provider that works with serverless functions:
- [Neon](https://neon.tech) (recommended for serverless)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

### Step 5: Additional Build Settings

In Netlify site settings:
1. Go to Build & deploy > Continuous Deployment
2. Under "Build environment variables", add:
   - Key: `CI` Value: `false` (This prevents treating warnings as errors)

### Step 6: Trigger Deployment

Either push a new commit to your repository or manually trigger a deployment from the Netlify dashboard.

### Step 7: Troubleshooting Build Issues

If the build still fails:
1. Check build logs for specific errors
2. Try setting NODE_VERSION to 20 in environment variables
3. Consider using the Netlify CLI for local testing:
   ```bash
   npm install -g netlify-cli
   netlify deploy --build
   ```

## Database Considerations

### PostgreSQL Requirements

For the production environment, you need a PostgreSQL database that's accessible from your server or Netlify Functions.

- For self-hosting: Any PostgreSQL 12+ instance works
- For Netlify: Use a PostgreSQL service that allows external connections like:
  - [Neon](https://neon.tech) (recommended for serverless)
  - [Supabase](https://supabase.com)
  - [Railway](https://railway.app)

### Database Initialization

The first time you connect to the database, it will automatically create the necessary tables using Drizzle ORM.

## Troubleshooting

### Cookie Issues

If you experience authentication problems:
- Check that your domain is correctly set in the cookie options
- For Netlify, ensure the appropriate CORS headers are being sent

### Database Connection Issues

If you're having trouble connecting to the database:
- Ensure your DATABASE_URL is correct
- Check that your database allows connections from your server's IP
- For Netlify, ensure your database provider allows serverless connections

## Maintenance

- Regularly update dependencies with `npm update` or `npm audit fix`
- Monitor server logs for errors
- Set up a backup schedule for your database