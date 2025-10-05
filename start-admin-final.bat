@echo off
echo 🎛️ Starting Bitwreckers Admin Panel...
echo.

echo 📦 Starting Backend API...
start "Backend API" cmd /k "cd /d C:\Users\qa3dn\Desktop\bit2\backend && npm run dev"

echo.
echo ⏳ Waiting 5 seconds for backend to start...
timeout /t 5 >nul

echo.
echo 🎛️ Starting Admin Panel...
start "Admin Panel" cmd /k "cd /d C:\Users\qa3dn\Desktop\bit2\admin && npm run dev"

echo.
echo ✅ Admin Panel is starting...
echo.
echo 📋 Services:
echo   - Backend API: Check terminal for port (usually 3002+)
echo   - Admin Panel: http://localhost:3000
echo.
echo 🔐 To access Admin Panel:
echo   1. Go to: http://localhost:3000
echo   2. Create admin user in Supabase Dashboard
echo   3. Login with admin credentials
echo.
echo 📊 Supabase Dashboard: https://supabase.com/dashboard
echo.
echo ⚠️  If you see EPERM errors, close all terminals and run this script again
echo.
pause
