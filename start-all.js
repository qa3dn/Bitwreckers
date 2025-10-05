#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const net = require('net');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Function to find available port
function findAvailablePort(startPort = 3002) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    
    server.on('error', () => {
      findAvailablePort(startPort + 1).then(resolve);
    });
  });
}

// Function to wait for server to be ready
function waitForServer(url, maxAttempts = 30) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const checkServer = () => {
      attempts++;
      
      const http = require('http');
      const req = http.get(url, (res) => {
        log(`✅ Backend server is ready on ${url}`, 'green');
        resolve();
      });
      
      req.on('error', () => {
        if (attempts >= maxAttempts) {
          reject(new Error(`Server not ready after ${maxAttempts} attempts`));
        } else {
          setTimeout(checkServer, 1000);
        }
      });
    };
    
    checkServer();
  });
}

// Function to update environment files
function updateEnvFiles(backendPort) {
  const backendUrl = `http://localhost:${backendPort}`;
  
  // Update admin env.local
  const adminEnvPath = path.join(__dirname, 'admin', 'env.local');
  let adminEnv = '';
  
  if (fs.existsSync(adminEnvPath)) {
    adminEnv = fs.readFileSync(adminEnvPath, 'utf8');
  }
  
  // Add or update NEXT_PUBLIC_BACKEND_URL
  if (adminEnv.includes('NEXT_PUBLIC_BACKEND_URL')) {
    adminEnv = adminEnv.replace(
      /NEXT_PUBLIC_BACKEND_URL=.*/,
      `NEXT_PUBLIC_BACKEND_URL=${backendUrl}`
    );
  } else {
    adminEnv += `\n# Backend API URL\nNEXT_PUBLIC_BACKEND_URL=${backendUrl}\n`;
  }
  
  fs.writeFileSync(adminEnvPath, adminEnv);
  log(`✅ Updated admin env.local with backend URL: ${backendUrl}`, 'green');
  
  // Update frontend env.local
  const frontendEnvPath = path.join(__dirname, 'frontend', '.env.local');
  let frontendEnv = '';
  
  if (fs.existsSync(frontendEnvPath)) {
    frontendEnv = fs.readFileSync(frontendEnvPath, 'utf8');
  }
  
  // Add or update NEXT_PUBLIC_BACKEND_URL
  if (frontendEnv.includes('NEXT_PUBLIC_BACKEND_URL')) {
    frontendEnv = frontendEnv.replace(
      /NEXT_PUBLIC_BACKEND_URL=.*/,
      `NEXT_PUBLIC_BACKEND_URL=${backendUrl}`
    );
  } else {
    frontendEnv += `\n# Backend API URL\nNEXT_PUBLIC_BACKEND_URL=${backendUrl}\n`;
  }
  
  fs.writeFileSync(frontendEnvPath, frontendEnv);
  log(`✅ Updated frontend .env.local with backend URL: ${backendUrl}`, 'green');
}

// Function to start a service
function startService(name, command, args, cwd, env = {}) {
  return new Promise((resolve, reject) => {
    log(`🚀 Starting ${name}...`, 'blue');
    
    const process = spawn(command, args, {
      cwd,
      env: { ...process.env, ...env },
      stdio: 'pipe'
    });
    
    let output = '';
    
    process.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      log(`[${name}] ${text.trim()}`, 'cyan');
    });
    
    process.stderr.on('data', (data) => {
      const text = data.toString();
      log(`[${name}] ${text.trim()}`, 'yellow');
    });
    
    process.on('close', (code) => {
      if (code !== 0) {
        log(`❌ ${name} exited with code ${code}`, 'red');
        reject(new Error(`${name} failed with code ${code}`));
      } else {
        log(`✅ ${name} completed`, 'green');
        resolve();
      }
    });
    
    process.on('error', (err) => {
      log(`❌ Failed to start ${name}: ${err.message}`, 'red');
      reject(err);
    });
    
    // Store process reference for cleanup
    process._serviceName = name;
    return process;
  });
}

// Main function
async function main() {
  try {
    log('🎯 Bitwreckers Development Environment Startup', 'bright');
    log('================================================', 'bright');
    
    // Step 1: Find available port for backend
    log('🔍 Finding available port for backend...', 'blue');
    const backendPort = await findAvailablePort(3002);
    log(`✅ Found available port: ${backendPort}`, 'green');
    
    // Step 2: Update environment files
    log('📝 Updating environment files...', 'blue');
    updateEnvFiles(backendPort);
    
    // Step 3: Start backend
    log('🚀 Starting Backend API...', 'blue');
    const backendProcess = spawn('node', ['server.js'], {
      cwd: path.join(__dirname, 'backend'),
      env: { ...process.env, PORT: backendPort.toString() },
      stdio: 'pipe',
      shell: true
    });
    
    let backendOutput = '';
    backendProcess.stdout.on('data', (data) => {
      const text = data.toString();
      backendOutput += text;
      log(`[Backend] ${text.trim()}`, 'cyan');
    });
    
    backendProcess.stderr.on('data', (data) => {
      const text = data.toString();
      log(`[Backend] ${text.trim()}`, 'yellow');
    });
    
    // Wait for backend to be ready
    const backendUrl = `http://localhost:${backendPort}`;
    log(`⏳ Waiting for backend to be ready on ${backendUrl}...`, 'blue');
    
    try {
      await waitForServer(`${backendUrl}/health`);
    } catch (err) {
      log(`❌ Backend failed to start: ${err.message}`, 'red');
      backendProcess.kill();
      process.exit(1);
    }
    
    // Step 4: Start frontend
    log('🚀 Starting Frontend...', 'blue');
    const frontendProcess = spawn('npm', ['run', 'dev'], {
      cwd: path.join(__dirname, 'frontend'),
      stdio: 'pipe',
      shell: true
    });
    
    frontendProcess.stdout.on('data', (data) => {
      const text = data.toString();
      log(`[Frontend] ${text.trim()}`, 'cyan');
    });
    
    frontendProcess.stderr.on('data', (data) => {
      const text = data.toString();
      log(`[Frontend] ${text.trim()}`, 'yellow');
    });
    
    // Step 5: Start admin panel
    log('🚀 Starting Admin Panel...', 'blue');
    const adminProcess = spawn('npm', ['run', 'dev'], {
      cwd: path.join(__dirname, 'admin'),
      stdio: 'pipe',
      shell: true
    });
    
    adminProcess.stdout.on('data', (data) => {
      const text = data.toString();
      log(`[Admin] ${text.trim()}`, 'cyan');
    });
    
    adminProcess.stderr.on('data', (data) => {
      const text = data.toString();
      log(`[Admin] ${text.trim()}`, 'yellow');
    });
    
    // Wait a bit for services to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Display final information
    log('\n🎉 All services started successfully!', 'green');
    log('================================================', 'bright');
    log(`🌐 Frontend: http://localhost:3000`, 'green');
    log(`🔧 Backend API: http://localhost:${backendPort}`, 'green');
    log(`👨‍💼 Admin Panel: http://localhost:3001`, 'green');
    log('================================================', 'bright');
    log('Press Ctrl+C to stop all services', 'yellow');
    
    // Handle cleanup on exit
    process.on('SIGINT', () => {
      log('\n🛑 Stopping all services...', 'yellow');
      backendProcess.kill();
      frontendProcess.kill();
      adminProcess.kill();
      process.exit(0);
    });
    
    // Keep the script running
    await new Promise(() => {});
    
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run the main function
main();
