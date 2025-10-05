@echo off
echo 🚀 Starting Bitwreckers Services...
echo.

echo 📦 Starting Backend API...
start "Backend API" cmd /k "cd /d C:\Users\qa3dn\Desktop\bit2\backend && npm run dev"

timeout /t 3 >nul

echo.
echo 🎛️ Starting Admin Panel...
start "Admin Panel" cmd /k "cd /d C:\Users\qa3dn\Desktop\bit2\admin && npm run dev"

timeout /t 3 >nul

echo.
echo 🌐 Starting Main Website...
start "Main Website" cmd /k "cd /d C:\Users\qa3dn\Desktop\bit2\frontend && npm run dev"

echo.
echo ✅ All services are starting...
echo.
echo 📋 Services will run on available ports:
echo   - Backend API: Will find available port (3002+)
echo   - Admin Panel: Will find available port (3000+)
echo   - Main Website: Will find available port (3000+)
echo.
echo 🔐 To access Admin Panel:
echo   1. Wait for services to start
echo   2. Check terminal for actual URLs
echo   3. Create admin user in Supabase Dashboard
echo   4. Login with admin credentials
echo.
echo 📊 Supabase Dashboard: https://supabase.com/dashboard
echo.
pause
