# Team Members Management Setup

## الخطوات المطلوبة لإعداد نظام إدارة أعضاء الفريق

### 1. تشغيل ملف SQL في Supabase

#### الطريقة الآمنة (مستحسنة):
1. اذهب إلى [Supabase Dashboard](https://supabase.com/dashboard)
2. اختر مشروعك
3. اذهب إلى **SQL Editor** من القائمة الجانبية
4. انسخ محتوى ملف `create_team_members_table_safe.sql`
5. الصق المحتوى في محرر SQL
6. اضغط **Run** لتنفيذ الكود

#### إذا واجهت خطأ "permission denied for table users":
- استخدم ملف `create_team_members_table_no_rls.sql` للاختبار
- أو استخدم ملف `create_team_members_table_secure.sql` للأمان

#### إذا واجهت خطأ "already exists":
- استخدم ملف `create_team_members_table_safe.sql` بدلاً من الملف الأصلي
- هذا الملف آمن للتشغيل عدة مرات

#### إذا أردت البدء من جديد:
1. شغل ملف `drop_team_members_table.sql` أولاً
2. ثم شغل أحد الملفات الآمنة

### 1.1. اختيار الملف المناسب

#### `create_team_members_table_no_rls.sql` (للاختبار):
- ✅ **أسهل للاختبار**: بدون RLS
- ✅ **لا مشاكل صلاحيات**: يعمل دائماً
- ⚠️ **أقل أماناً**: أي شخص يمكنه التعديل

#### `create_team_members_table_secure.sql` (للإنتاج):
- ✅ **آمن**: مع RLS للقراءة العامة
- ✅ **محمي**: فقط المستخدمون المسجلون يمكنهم التعديل
- ⚠️ **يتطلب تسجيل دخول**: للعمليات الإدارية

#### `create_team_members_table_safe.sql` (متوازن):
- ✅ **متوازن**: RLS بسيط
- ✅ **آمن للتشغيل**: يمكن تشغيله عدة مرات
- ✅ **يعمل مع معظم الإعدادات**

### 2. التحقق من إنشاء الجدول

بعد تشغيل ملف SQL، يجب أن تجد:
- جدول `team_members` في قسم **Table Editor**
- 15 عضو فريق تم إدراجهم تلقائياً
- سياسات الأمان (RLS) مفعلة

### 3. الوصول لصفحة الإدارة

1. اذهب إلى الـ admin panel: `http://localhost:3000`
2. اضغط على **Manage Team Members** في الـ dashboard
3. أو اذهب مباشرة إلى: `http://localhost:3000/team-members`

### 4. الميزات المتاحة

#### إضافة عضو جديد:
- اضغط **Add Member**
- املأ البيانات: الاسم، الدور، الوصف
- (اختياري) أضف رابط صورة العضو
- اضغط **Add Member**

#### تعديل عضو موجود:
- اضغط أيقونة التعديل (✏️) على العضو
- عدّل البيانات المطلوبة
- اضغط **Update Member**

#### حذف عضو:
- اضغط أيقونة الحذف (🗑️) على العضو
- أكد الحذف

#### ترتيب الأعضاء:
- استخدم أزرار السهم (↑↓) لترتيب الأعضاء
- الترتيب يظهر في صفحة About Us

### 5. عرض النتائج

بعد إضافة/تعديل الأعضاء:
1. اذهب إلى صفحة About Us: `http://localhost:3001/about`
2. ستجد قسم **Our Team** محدث تلقائياً
3. الأعضاء يظهرون بالترتيب المحدد

### 6. استكشاف الأخطاء

إذا واجهت مشاكل:

#### الخطأ: "permission denied for table users"
- **الحل السريع**: استخدم ملف `create_team_members_table_no_rls.sql`
- **الحل الآمن**: استخدم ملف `create_team_members_table_secure.sql`
- هذا الخطأ يحدث بسبب قيود الوصول لجدول `auth.users`

#### الخطأ: "policy already exists"
- **الحل**: استخدم ملف `create_team_members_table_safe.sql`
- هذا الملف آمن للتشغيل عدة مرات

#### الخطأ: "relation team_members does not exist"
- تأكد من تشغيل ملف SQL في Supabase
- تحقق من أن الجدول تم إنشاؤه في **Table Editor**

#### الخطأ: "Permission denied"
- تأكد من أن RLS policies تم إنشاؤها
- أو استخدم ملف `create_team_members_table_no_rls.sql` للاختبار

#### لا تظهر التحديثات في About Us
- تأكد من أن `is_active = true` للعضو
- تحقق من ترتيب `order_index`
- امسح cache المتصفح

#### أخطاء متعددة أو بيانات مكررة
- شغل ملف `drop_team_members_table.sql` أولاً
- ثم شغل ملف `create_team_members_table_safe.sql`

### 7. بنية الجدول

```sql
team_members:
- id (UUID, Primary Key)
- name (VARCHAR, Required)
- role (VARCHAR, Required) 
- description (TEXT)
- avatar_url (TEXT, Optional)
- order_index (INTEGER, Default: 0)
- is_active (BOOLEAN, Default: true)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 8. الأمان

- **RLS مفعل**: فقط المديرون يمكنهم التعديل
- **القراءة العامة**: أي شخص يمكنه قراءة الأعضاء النشطين
- **الكتابة مقيدة**: فقط المديرون المصرح لهم

---

**ملاحظة**: تأكد من تشغيل ملف SQL أولاً قبل استخدام نظام الإدارة!
