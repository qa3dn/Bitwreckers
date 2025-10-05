# 🚀 Bitwreckers Website

موقع بيتريكرز الرسمي - منصة تقنية شاملة تقدم خدمات التطوير والتصميم والاستشارات التقنية.

## 📋 المحتويات

- [المميزات](#المميزات)
- [التقنيات المستخدمة](#التقنيات-المستخدمة)
- [هيكل المشروع](#هيكل-المشروع)
- [التثبيت والتشغيل](#التثبيت-والتشغيل)
- [النشر على Vercel](#النشر-على-vercel)
- [إعداد Supabase](#إعداد-supabase)
- [المساهمة](#المساهمة)

## ✨ المميزات

### 🌐 الموقع الرئيسي
- **صفحة رئيسية تفاعلية** مع إحصائيات حية
- **صفحة الخدمات** مع تفاصيل شاملة
- **صفحة المنتجات** لعرض المشاريع المطورة
- **صفحة الفريق** مع معلومات الأعضاء
- **صفحة المدونة** مع نظام إدارة المحتوى
- **صفحة المجتمع** مع روابط التواصل الاجتماعي
- **دعم متعدد اللغات** (العربية والإنجليزية)
- **تصميم متجاوب** لجميع الأجهزة

### 🛠️ لوحة الإدارة
- **لوحة تحكم شاملة** مع إحصائيات مفصلة
- **إدارة رسائل التواصل** مع نظام الحالة
- **إدارة طلبات الانضمام** والاستشارات
- **نظام إدارة المدونة** مع محرر متقدم
- **إدارة أعضاء الفريق** مع إمكانية التعديل
- **نظام المهملات** للحذف المؤقت
- **تصميم متجاوب** للوحة الإدارة

### 📝 نظام المدونة
- **محرر محتوى متقدم** مع دعم Markdown
- **نظام الفئات** مع ألوان مخصصة
- **نظام الإعجاب والمشاهدات** مع تتبع المستخدمين
- **أزرار المشاركة** على وسائل التواصل الاجتماعي
- **نظام البحث والتصفية** للمقالات
- **دعم الصور** والوسائط المتعددة

## 🛠️ التقنيات المستخدمة

### Frontend
- **Next.js 14** - إطار عمل React
- **TypeScript** - لغة البرمجة
- **Tailwind CSS** - إطار عمل CSS
- **Framer Motion** - للرسوم المتحركة
- **Lucide React** - مكتبة الأيقونات
- **React Icons** - أيقونات إضافية

### Backend & Database
- **Supabase** - قاعدة البيانات والخدمات الخلفية
- **PostgreSQL** - قاعدة البيانات
- **Row Level Security (RLS)** - أمان البيانات

### Deployment
- **Vercel** - منصة النشر
- **GitHub** - إدارة الكود

## 📁 هيكل المشروع

```
bitwreckers/
├── frontend/                 # الموقع الرئيسي
│   ├── src/
│   │   ├── app/             # صفحات Next.js
│   │   ├── components/      # مكونات React
│   │   ├── hooks/           # React Hooks
│   │   └── locales/         # ملفات الترجمة
│   ├── public/              # الملفات الثابتة
│   └── package.json
├── admin/                   # لوحة الإدارة
│   ├── src/
│   │   ├── app/             # صفحات الإدارة
│   │   └── components/      # مكونات الإدارة
│   └── package.json
├── backend/                 # الخدمات الخلفية
│   ├── routes/              # مسارات API
│   └── server.js            # خادم Express
└── docs/                    # الوثائق
```

## 🚀 التثبيت والتشغيل

### المتطلبات
- Node.js 18+
- npm أو yarn
- حساب Supabase

### 1. استنساخ المشروع
```bash
git clone https://github.com/qa3dn/Bitwreckers.git
cd Bitwreckers
```

### 2. تثبيت التبعيات
```bash
# للموقع الرئيسي
cd frontend
npm install

# للوحة الإدارة
cd ../admin
npm install

# للخدمات الخلفية
cd ../backend
npm install
```

### 3. إعداد متغيرات البيئة

#### للموقع الرئيسي (`frontend/.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### للوحة الإدارة (`admin/.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

### 4. تشغيل المشروع
```bash
# تشغيل الموقع الرئيسي
cd frontend
npm run dev

# تشغيل لوحة الإدارة
cd admin
npm run dev

# تشغيل الخدمات الخلفية
cd backend
npm start
```

## 🌐 النشر على Vercel

### 1. إعداد Supabase
- أنشئ مشروع جديد في [Supabase](https://supabase.com)
- شغل ملف `SUPABASE_SETUP.sql` في SQL Editor
- احفظ URL و API Keys

### 2. رفع الموقع الرئيسي
```bash
cd frontend
vercel --prod
```

### 3. رفع لوحة الإدارة
```bash
cd admin
vercel --prod
```

### 4. إعداد Environment Variables في Vercel
- اذهب إلى Project Settings > Environment Variables
- أضف المتغيرات المطلوبة

## 📊 إعداد Supabase

### 1. إنشاء الجداول
شغل ملف `SUPABASE_SETUP.sql` في Supabase SQL Editor

### 2. إعداد Row Level Security
الملف يحتوي على جميع السياسات المطلوبة

### 3. إعداد Storage (اختياري)
```sql
-- إنشاء bucket للصور
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- إعداد سياسات Storage
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
```

## 🎨 التخصيص

### الألوان
يمكن تخصيص الألوان من خلال ملف `tailwind.config.js`:
```javascript
colors: {
  primary: '#8B5CF6',    // البنفسجي
  secondary: '#10B981',  // الأخضر
  accent: '#F59E0B',     // الأصفر
}
```

### الترجمة
أضف ترجمات جديدة في:
- `frontend/src/locales/ar.json` - للعربية
- `frontend/src/locales/en.json` - للإنجليزية

## 📱 الاستجابة

الموقع مصمم ليكون متجاوباً مع جميع الأجهزة:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔒 الأمان

- **Row Level Security (RLS)** مفعل على جميع الجداول
- **Environment Variables** محمية
- **API Keys** آمنة
- **HTTPS** مفعل على Vercel

## 🚀 الأداء

- **Next.js 14** مع App Router
- **Image Optimization** تلقائي
- **Code Splitting** تلقائي
- **Static Generation** حيثما أمكن
- **CDN** من Vercel

## 📈 التحليلات

يمكن إضافة Google Analytics أو أي نظام تحليلات آخر من خلال:
```javascript
// في _app.tsx أو layout.tsx
import { Analytics } from '@/components/Analytics'
```

## 🤝 المساهمة

1. Fork المشروع
2. أنشئ branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. افتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 التواصل

- **الموقع**: [bitwreckers.com](https://bitwreckers.com)
- **البريد الإلكتروني**: bitwreckers@gmail.com
- **الهاتف**: +962780242419

## 🙏 شكر وتقدير

شكر خاص لجميع المساهمين والمطورين الذين ساعدوا في تطوير هذا المشروع.

---

**تم التطوير بـ ❤️ بواسطة فريق بيتريكرز**