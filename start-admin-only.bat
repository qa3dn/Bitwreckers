@echo off
echo 🎛️ Starting Admin Panel Only...
echo.

echo 📦 Starting Backend API first...
start "Backend API" cmd /k "cd /d C:\Users\qa3dn\Desktop\bit2\backend && npm run dev"

timeout /t 5 >nul

echo.
echo 🎛️ Starting Admin Panel...
start "Admin Panel" cmd /k "cd /d C:\Users\qa3dn\Desktop\bit2\admin && npm run dev"

echo.
echo ✅ Admin Panel is starting...
echo.
echo 📋 Check the terminals for actual URLs:
echo   - Backend API: Will show port in terminal
echo   - Admin Panel: Will show port in terminal
echo.
echo 🔐 To access Admin Panel:
echo   1. Wait for both services to start
echo   2. Check terminal for Admin Panel URL
echo   3. Create admin user in Supabase Dashboard
echo   4. Login with admin credentials
echo.
echo 📊 Supabase Dashboard: https://supabase.com/dashboard
echo.
pause
