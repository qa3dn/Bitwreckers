# Bitwreckers Development Environment

## 🚀 Quick Start

### Windows
```bash
# Double-click on start-all.bat
# OR run in command prompt:
start-all.bat
```

### Linux/Mac
```bash
# Make executable and run
chmod +x start-all.sh
./start-all.sh
```

### Cross-platform (Node.js)
```bash
# Install dependencies (if needed)
npm install

# Start all services
npm start
# OR
node start-all.js
```

## 🎯 What This Script Does

### 1. **Port Management**
- Automatically finds available port for backend (starting from 3002)
- Updates environment files with correct backend URL
- Handles port conflicts gracefully

### 2. **Service Startup Order**
1. **Backend API** (Port 3002+)
2. **Frontend** (Port 3000)
3. **Admin Panel** (Port 3001)

### 3. **Environment Configuration**
- Updates `admin/env.local` with backend URL
- Updates `frontend/.env.local` with backend URL
- Ensures all services can communicate

### 4. **Health Monitoring**
- Waits for backend to be ready before starting frontend
- Monitors service health
- Provides real-time logs

## 🌐 Access URLs

After successful startup:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3002 (or next available port)
- **Admin Panel**: http://localhost:3001

## 🛠️ Manual Setup (Alternative)

If you prefer to start services manually:

### 1. Start Backend
```bash
cd backend
npm start
```

### 2. Start Frontend
```bash
cd frontend
npm run dev
```

### 3. Start Admin Panel
```bash
cd admin
npm run dev
```

## 🔧 Troubleshooting

### Port Already in Use
The script automatically finds available ports. If you still get port conflicts:
1. Stop all running Node.js processes
2. Restart the script

### Environment Variables Not Updated
1. Check if `admin/env.local` and `frontend/.env.local` exist
2. Manually add `NEXT_PUBLIC_BACKEND_URL=http://localhost:PORT`

### Services Not Starting
1. Check if all dependencies are installed (`npm install` in each directory)
2. Check Node.js version (requires 14+)
3. Check console output for specific errors

## 📁 Project Structure

```
bitwreckers/
├── start-all.js          # Main startup script
├── start-all.bat         # Windows batch file
├── start-all.sh          # Linux/Mac shell script
├── package.json          # Script dependencies
├── README.md             # This file
├── frontend/             # Next.js frontend
├── admin/                # Next.js admin panel
└── backend/              # Express.js backend
```

## 🎉 Features

- ✅ **Automatic Port Detection**: Finds available ports automatically
- ✅ **Environment Management**: Updates env files automatically
- ✅ **Health Monitoring**: Waits for services to be ready
- ✅ **Real-time Logs**: Shows logs from all services
- ✅ **Graceful Shutdown**: Stops all services with Ctrl+C
- ✅ **Cross-platform**: Works on Windows, Linux, and Mac
- ✅ **Error Handling**: Comprehensive error handling and reporting

## 🚨 Important Notes

1. **Node.js Required**: Make sure Node.js 14+ is installed
2. **Dependencies**: Run `npm install` in each directory if needed
3. **Ports**: The script will find available ports automatically
4. **Environment**: Environment files are updated automatically
5. **Shutdown**: Use Ctrl+C to stop all services gracefully

## 🆘 Support

If you encounter issues:
1. Check the console output for error messages
2. Ensure all dependencies are installed
3. Check if ports are available
4. Verify Node.js version compatibility

---

**Happy Coding! 🚀**

