// This file helps ensure the build process outputs files in the correct location for Netlify
const fs = require('fs');
const path = require('path');

// Function to copy directory recursively
function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Get all files and directories in source
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursive call for directories
      copyDir(srcPath, destPath);
    } else {
      // Copy file if it doesn't exist or is newer
      if (!fs.existsSync(destPath) || 
          fs.statSync(srcPath).mtime > fs.statSync(destPath).mtime) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${destPath}`);
      }
    }
  }
}

// Main execution
try {
  // Check if Vite built files to "dist/client" (which is common)
  const clientDir = path.join(__dirname, 'dist', 'client');
  const targetDir = path.join(__dirname, 'dist');
  
  if (fs.existsSync(clientDir)) {
    console.log('Found client build directory, copying files...');
    copyDir(clientDir, targetDir);
    console.log('Successfully copied client build files to dist directory');
  } else {
    console.log('Client build directory not found or already in correct location');
  }

  // Create a necessary stub file for netlify to recognize the build
  fs.writeFileSync(
    path.join(__dirname, 'dist', 'netlify-ready.txt'), 
    'Build processed successfully for Netlify deployment'
  );

  // Add ESM extension to JS files if needed
  const serverFile = path.join(__dirname, 'dist', 'index.js');
  if (fs.existsSync(serverFile)) {
    console.log('Ensuring server file has proper extension for ESM');
    const content = fs.readFileSync(serverFile, 'utf8');
    if (!serverFile.endsWith('.mjs')) {
      fs.writeFileSync(path.join(__dirname, 'dist', 'index.mjs'), content);
      console.log('Created ESM-compatible server file');
    }
  }
} catch (err) {
  console.error('Error handling build files:', err);
  process.exit(1);
}