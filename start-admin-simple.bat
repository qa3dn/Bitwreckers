@echo off
echo Starting Admin Panel and Backend API...
echo.

echo Starting Backend API...
start "Backend API" cmd /k "cd /d C:\Users\qa3dn\Desktop\bit2\backend && npm run dev"

timeout /t 3 >nul

echo.
echo Starting Admin Panel...
start "Admin Panel" cmd /k "cd /d C:\Users\qa3dn\Desktop\bit2\admin && npm run dev"

echo.
echo ✅ Services are starting...
echo.
echo Backend API: http://localhost:3002
echo Admin Panel: Will be on http://localhost:3000 or 3001
echo.
echo 🔐 To access Admin Panel:
echo 1. Wait for both services to start
echo 2. Go to the Admin Panel URL
echo 3. Create admin user in Supabase Dashboard > Authentication
echo 4. Login with admin credentials
echo.
pause
