const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const net = require('net');

const rootDir = __dirname;
const frontendDir = path.join(rootDir, 'frontend');
const backendDir = path.join(rootDir, 'backend');
const adminDir = path.join(rootDir, 'admin');

let backendPort = 3002;

const processes = [];

// Function to find an available port
async function findAvailablePort(startPort) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.listen(startPort, () => {
            const port = server.address().port;
            server.close(() => resolve(port));
        });
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                findAvailablePort(startPort + 1).then(resolve).catch(reject);
            } else {
                reject(err);
            }
        });
    });
}

// Function to update .env.local files
function updateEnvFile(dir, key, value) {
    const envPath = path.join(dir, '.env.local');
    let content = '';
    if (fs.existsSync(envPath)) {
        content = fs.readFileSync(envPath, 'utf8');
    }

    const lines = content.split('\n');
    let updated = false;
    const newLines = lines.map(line => {
        if (line.startsWith(`${key}=`)) {
            updated = true;
            return `${key}=${value}`;
        }
        return line;
    });

    if (!updated) {
        newLines.push(`${key}=${value}`);
    }

    fs.writeFileSync(envPath, newLines.join('\n'));
    console.log(`Updated ${key} in ${envPath}`);
}

// Start a process
function startProcess(name, command, args, cwd, env = {}) {
    console.log(`Starting ${name} in ${cwd} with command: ${command} ${args.join(' ')}`);
    const child = spawn(command, args, {
        cwd,
        env: { ...process.env, ...env },
        stdio: 'pipe',
        shell: true
    });

    child.stdout.on('data', (data) => {
        process.stdout.write(`[${name}]: ${data.toString()}`);
    });

    child.stderr.on('data', (data) => {
        process.stderr.write(`[${name} ERROR]: ${data.toString()}`);
    });

    child.on('close', (code) => {
        console.log(`[${name}] exited with code ${code}`);
        if (code !== 0) {
            console.error(`[${name}] crashed. Terminating all services.`);
            terminateProcesses();
            process.exit(1);
        }
    });

    processes.push(child);
    return child;
}

// Terminate all child processes
function terminateProcesses() {
    console.log('Terminating all running processes...');
    processes.forEach(p => {
        if (!p.killed) {
            p.kill('SIGTERM');
        }
    });
}

// Main execution
async function main() {
    process.on('SIGINT', terminateProcesses);
    process.on('SIGTERM', terminateProcesses);
    process.on('exit', terminateProcesses);

    try {
        console.log('🎯 Bitwreckers Development Environment Startup');
        console.log('================================================');
        
        // 1. Find an available port for the backend
        console.log('🔍 Finding available port for backend...');
        backendPort = await findAvailablePort(3002);
        console.log(`✅ Found available port: ${backendPort}`);

        // 2. Update .env.local files with the chosen backend port
        console.log('📝 Updating environment files...');
        updateEnvFile(frontendDir, 'NEXT_PUBLIC_BACKEND_URL', `http://localhost:${backendPort}`);
        updateEnvFile(adminDir, 'NEXT_PUBLIC_BACKEND_URL', `http://localhost:${backendPort}`);
        updateEnvFile(backendDir, 'PORT', backendPort);

        // 3. Start Backend API
        console.log('🚀 Starting Backend API...');
        startProcess('Backend', 'node', ['server.js'], backendDir, { PORT: backendPort });

        // Wait a bit for backend to start
        console.log('⏳ Waiting for backend to start...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        // 4. Start Frontend
        console.log('🚀 Starting Frontend...');
        startProcess('Frontend', 'node', ['node_modules/.bin/next', 'dev'], frontendDir, { PORT: 3000 });

        // 5. Start Admin Panel
        console.log('🚀 Starting Admin Panel...');
        startProcess('Admin', 'node', ['node_modules/.bin/next', 'dev'], adminDir, { PORT: 3001 });

        console.log('\nAll services are starting:');
        console.log(`- Frontend: http://localhost:3000`);
        console.log(`- Admin Panel: http://localhost:3001`);
        console.log(`- Backend API: http://localhost:${backendPort}`);
        console.log('\nPress Ctrl+C to stop all services.');

    } catch (error) {
        console.error('Failed to start services:', error);
        terminateProcesses();
        process.exit(1);
    }
}

main();

