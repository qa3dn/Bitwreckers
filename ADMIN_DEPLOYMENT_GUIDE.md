# 🚀 دليل رفع موقع الادمن على Vercel

## 📋 الخطوات:

### 1. رفع الكود على GitHub:
```bash
# تأكد أنك في مجلد admin
cd admin

# أضف جميع الملفات
git add .

# احفظ التغييرات
git commit -m "Prepare admin panel for deployment"

# ارفع على GitHub
git push
```

### 2. رفع الادمن على Vercel:

#### أ) اذهب إلى [vercel.com](https://vercel.com)
#### ب) اضغط "New Project"
#### ج) اختر GitHub repository: `qa3dn/Bitwreckers`
#### د) في "Root Directory" اكتب: `admin`
#### ه) اضغط "Deploy"

### 3. إعداد Environment Variables:

بعد الرفع، اذهب إلى:
- **Project Settings** → **Environment Variables**

أضف هذه المتغيرات:

```
NEXT_PUBLIC_SUPABASE_URL = https://iprvecbzvzzyrepzlsho.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU
NEXT_PUBLIC_BACKEND_URL = https://bitwreckers-admin.vercel.app
ADMIN_EMAIL = admin@bitwreckers.com
```

### 4. إعادة النشر:
- بعد إضافة Environment Variables
- اذهب إلى **Deployments**
- اضغط **"Redeploy"** على آخر deployment

## 🔗 ربط الادمن مع الموقع الرئيسي:

### 1. تحديث رابط الادمن في الموقع الرئيسي:

في ملف `frontend/src/app/layout.tsx`:
```typescript
// ابحث عن رابط الادمن وحدثه
<Link href="https://[admin-vercel-url]" className="text-white hover:text-gray-300">
  Admin Panel
</Link>
```

### 2. تحديث API calls في الادمن:

في ملف `admin/src/lib/supabase.ts`:
```typescript
// تأكد أن الـ URL صحيح
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
```

## 🎯 النتيجة المتوقعة:

بعد اكتمال الخطوات:
- ✅ موقع الادمن يعمل على Vercel
- ✅ الادمن مربوط مع Supabase
- ✅ المقالات تظهر في الموقع الرئيسي
- ✅ يمكن إدارة المحتوى من الادمن

## 🔧 استكشاف الأخطاء:

### إذا لم تظهر المقالات:
1. تأكد من أن Environment Variables صحيحة
2. تأكد من أن Supabase RLS policies صحيحة
3. تأكد من أن الادمن يصل للبيانات

### إذا فشل البناء:
1. تأكد من أن `admin/package.json` صحيح
2. تأكد من أن `admin/vercel.json` صحيح
3. تأكد من أن جميع dependencies مثبتة

## 📱 اختبار النتيجة:

1. اذهب إلى رابط الادمن
2. سجل دخول
3. اذهب إلى "Blog Management"
4. أضف مقال جديد
5. اذهب إلى الموقع الرئيسي
6. تأكد من ظهور المقال

---

**ملاحظة**: تأكد من أن جميع ملفات SQL تم تنفيذها في Supabase قبل الاختبار!
