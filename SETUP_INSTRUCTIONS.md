# 🚀 Bitwreckers Setup Instructions

## 📋 Quick Setup Guide

### 1. 🗄️ Database Setup (Supabase)

1. **Go to your Supabase Dashboard:** https://supabase.com/dashboard
2. **Open SQL Editor** in your project
3. **Copy and paste** the contents of `backend/supabase_setup.sql`
4. **Run the SQL script** to create all tables and policies

### 2. 🔧 Environment Setup

#### Frontend (Main Website)
```bash
cd frontend
# No additional setup needed - Supabase is already configured
```

#### Admin Panel
```bash
cd admin
# Environment file is already configured with your Supabase credentials
npm install
npm run dev
# Visit: http://localhost:3000
```

#### Backend API
```bash
cd backend
# Environment file is already configured with your Supabase credentials
npm install
npm run dev
# API runs on: http://localhost:3001
```

### 3. 🎯 Testing the System

#### Test Main Website Forms:
1. **Join Form:** http://localhost:3000/join
2. **Consultation Form:** http://localhost:3000/consultation

#### Test Admin Panel:
1. **Login:** http://localhost:3000 (admin panel)
2. **Default Admin:** 
   - Email: `admin@bitwreckers.com`
   - Password: (set in Supabase Auth)

### 4. 🔐 Setting Up Admin Authentication

1. **Go to Supabase Dashboard > Authentication > Users**
2. **Add a new user** with email `admin@bitwreckers.com`
3. **Set a strong password** (min 12 characters)
4. **Login to admin panel** with these credentials

### 5. 📊 Database Tables Created

- ✅ `admins` - Admin users
- ✅ `join_requests` - Student applications
- ✅ `consultation_requests` - Consultation bookings

### 6. 🔗 Supabase Configuration

**Project URL:** `https://iprvecbzvzzyrepzlsho.supabase.co`
**API Key:** Already configured in all projects

### 7. 🚀 Deployment Ready

#### Admin Panel (Separate Deployment)
- **Platform:** Vercel (recommended)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

#### Backend API
- **Platform:** Railway, DigitalOcean, or Vercel
- **Start Command:** `npm start`

### 8. 📧 Email Notifications (Optional)

To enable email notifications:
1. **Update `backend/env`** with your SMTP credentials
2. **Uncomment email code** in the backend routes
3. **Test notifications** by submitting forms

### 9. 🎨 Customization

#### Colors & Theme
- **Main Colors:** Maximum Purple (#6B2D73), Teal (#2D7363)
- **Files:** `tailwind.config.js` in each project

#### Database Schema
- **Modify:** `backend/supabase_setup.sql`
- **Redeploy:** Run updated SQL in Supabase

### 10. 🔍 Troubleshooting

#### Common Issues:
1. **Database Connection:** Check Supabase URL and API key
2. **CORS Errors:** Verify frontend URL in backend env
3. **Authentication:** Ensure admin user exists in Supabase Auth
4. **Form Submission:** Check browser console for errors

#### Debug Steps:
1. **Check Supabase Dashboard** for table data
2. **Verify environment variables** are loaded
3. **Test API endpoints** directly
4. **Check browser network tab** for failed requests

---

## ✅ Success Checklist

- [ ] Supabase database tables created
- [ ] Admin panel accessible at http://localhost:3000
- [ ] Backend API running on http://localhost:3001
- [ ] Main website forms submitting to database
- [ ] Admin can login and view requests
- [ ] All projects building without errors

---

## 📞 Support

If you encounter any issues:
1. Check the console logs
2. Verify Supabase configuration
3. Ensure all dependencies are installed
4. Check that all services are running

**Happy coding! 🎉**
