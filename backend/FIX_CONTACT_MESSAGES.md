# Fix Contact Messages Table

## المشكلة
الـ trigger `trigger_update_contact_messages_updated_at` موجود بالفعل، مما يعني أن الجدول موجود جزئياً.

## الحل

### الطريقة 1: استخدام JavaScript (مستحسن)
```bash
cd backend
node fix_contact_messages.js
```

### الطريقة 2: استخدام Batch File
```bash
cd backend
fix_contact_messages.bat
```

### الطريقة 3: استخدام PowerShell
```powershell
cd backend
.\fix_contact_messages.ps1
```

### الطريقة 4: تنفيذ SQL مباشرة في Supabase
1. اذهب إلى [Supabase Dashboard](https://supabase.com/dashboard)
2. اختر مشروعك
3. اذهب إلى SQL Editor
4. انسخ والصق محتوى `fix_contact_messages_table.sql`
5. اضغط "Run"

## ما يتم إصلاحه
- حذف الـ trigger الموجود
- إعادة إنشاء الـ trigger بشكل صحيح
- إضافة الأعمدة المفقودة
- إنشاء الفهارس
- إنشاء سياسات الأمان
- إضافة بيانات تجريبية

## بعد التنفيذ
1. أعد تشغيل Backend API
2. أعد تشغيل Admin Panel
3. جرب إرسال رسالة من صفحة Contact
4. تحقق من ظهورها في لوحة الأدمن

## استكشاف الأخطاء
إذا واجهت مشاكل:
1. تأكد من أن Supabase URL و API Key صحيحان
2. تأكد من أن لديك صلاحيات لتعديل الجداول
3. تحقق من logs في Supabase Dashboard

