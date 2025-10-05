# Contact Messages Setup

## المشكلة
الرسائل لا تظهر في لوحة الأدمن لأن جدول `contact_messages` غير موجود في قاعدة البيانات.

## الحل

### الطريقة 1: استخدام Python (مستحسن)
```bash
cd backend
python setup_contact_messages.py
```

### الطريقة 2: استخدام Batch File
```bash
cd backend
setup_contact_messages.bat
```

### الطريقة 3: استخدام PowerShell
```powershell
cd backend
.\setup_contact_messages.ps1
```

### الطريقة 4: تنفيذ SQL مباشرة في Supabase
1. اذهب إلى [Supabase Dashboard](https://supabase.com/dashboard)
2. اختر مشروعك
3. اذهب إلى SQL Editor
4. انسخ والصق محتوى `create_contact_messages_table.sql`
5. اضغط "Run"

## ما يتم إنشاؤه
- جدول `contact_messages` مع جميع الأعمدة المطلوبة
- فهارس للأداء
- سياسات الأمان (RLS)
- بيانات تجريبية للاختبار

## بعد التنفيذ
1. أعد تشغيل Backend API
2. أعد تشغيل Admin Panel
3. جرب إرسال رسالة من صفحة Contact
4. تحقق من ظهورها في لوحة الأدمن

## استكشاف الأخطاء
إذا واجهت مشاكل:
1. تأكد من أن Supabase URL و API Key صحيحان
2. تأكد من أن لديك صلاحيات لإنشاء الجداول
3. تحقق من logs في Supabase Dashboard

