// This file helps ensure the build process outputs files in the correct location for Netlify
const fs = require('fs');
const path = require('path');

// Make sure the client build is copied to the correct location
try {
  if (fs.existsSync(path.join(__dirname, 'dist', 'client'))) {
    // Copy all files from dist/client to dist
    const files = fs.readdirSync(path.join(__dirname, 'dist', 'client'));
    files.forEach(file => {
      // Skip if the file already exists at the destination
      if (!fs.existsSync(path.join(__dirname, 'dist', file))) {
        fs.copyFileSync(
          path.join(__dirname, 'dist', 'client', file),
          path.join(__dirname, 'dist', file)
        );
      }
    });
    console.log('Successfully copied client build files to dist directory');
  }
} catch (err) {
  console.error('Error handling build files:', err);
}