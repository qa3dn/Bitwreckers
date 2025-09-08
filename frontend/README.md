# Bitwreckers Website - موقع بيتوريكرز

## نظرة عامة

موقع شركة برمجة طالبية يقودها الطلبة في الأردن ومنطقة MENA، يهدف إلى استقطاب المواهب الطالبية، بيع الحلول المؤسسية، وإبراز المنصات والمنتجات مع تنمية المجتمع التقني.

## الميزات الرئيسية

### 🎯 للطلاب
- برامج تدريب وتطوير شاملة
- مسارات متخصصة (Web, Mobile, Systems)
- قصص نجاح ملهمة
- نظام تقديم سهل وبسيط

### 🏢 للشركات
- حلول برمجية متقدمة
- منهجية عمل احترافية
- نماذج مشاريع ناجحة
- عروض أسعار شفافة

### 🌟 للمجتمع التقني
- منصة للتواصل والتعلم
- أحداث وهاكاثون
- فرص التطوع والمساهمة
- موارد تعليمية مجانية

## التقنيات المستخدمة

### Frontend
- **Next.js 13+** - إطار عمل React مع App Router
- **Tailwind CSS** - إطار عمل CSS للتصميم
- **Framer Motion** - مكتبة الرسوم المتحركة
- **React Hook Form** - إدارة النماذج
- **React Query** - إدارة الحالة والبيانات

### Backend
- **Node.js** - بيئة تشغيل JavaScript
- **Express.js** - إطار عمل الخادم
- **MongoDB/PostgreSQL** - قاعدة البيانات
- **JWT** - المصادقة والتفويض
- **Multer** - رفع الملفات

### DevOps
- **Docker** - حاويات التطوير والنشر
- **GitHub Actions** - التكامل والنشر المستمر
- **Vercel/Netlify** - نشر Frontend
- **Cloudflare** - CDN والأمان

## هيكلية المشروع

```
bitwreckers-website/
├── public/                 # الملفات العامة
├── src/
│   ├── components/         # المكونات
│   ├── pages/             # صفحات Next.js
│   ├── styles/            # ملفات CSS
│   ├── utils/             # وظائف مساعدة
│   ├── hooks/             # React Hooks
│   ├── context/           # React Context
│   └── data/              # البيانات الثابتة
├── backend/               # خادم API
├── cms/                   # نظام إدارة المحتوى
└── docs/                  # الوثائق
```

## الصفحات الرئيسية

### 1. للطالب (`/students`)
- برامج التدريب والتطوير
- المسارات المتاحة
- قصص نجاح الطلاب
- كيفية التقديم

### 2. الحلول للشركات (`/solutions`)
- أنواع الحلول (Web, Mobile, Systems)
- الصناعات المستهدفة
- منهجية العمل
- عروض الأسعار

### 3. المنتجات والمنصات (`/products`)
- المنتجات المطورة
- المنصات التقنية
- التقنيات المستخدمة
- الابتكارات

### 4. الابتكار وريادة الأعمال (`/innovation-lab`)
- مختبر الابتكار
- المشاريع التجريبية
- برامج ريادة الأعمال
- الأحداث والهاكاثون

### 5. المجتمع (`/community`)
- المدرسون (Mentors)
- الخريجون (Alumni)
- المساهمون في المصادر المفتوحة
- الأحداث المجتمعية

### 6. المدونة والرؤى (`/blog`)
- مقالات تقنية
- رؤى الصناعة
- أخبار الشركة
- دراسات حالة

### 7. قصص النجاح (`/case-studies`)
- مشاريع ناجحة للشركات
- قصص نجاح الطلاب
- الشهادات والتوصيات
- الإحصائيات والإنجازات

### 8. من نحن (`/about`)
- قصة الشركة
- الفريق المؤسس
- القيم والرؤية
- الإنجازات والجوائز

### 9. انضم إلينا (`/careers`)
- الوظائف المتاحة
- ثقافة الشركة
- المزايا والفوائد
- عملية التوظيف

### 10. تواصل (`/contact`)
- معلومات التواصل
- نموذج الاتصال
- المكاتب والمواقع
- وسائل التواصل الاجتماعي

## التثبيت والتشغيل

### المتطلبات الأساسية
- Node.js 18+
- npm أو yarn
- Git

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/bitwreckers/website.git
cd bitwreckers-website
```

2. **تثبيت التبعيات**
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

3. **إعداد متغيرات البيئة**
```bash
cp .env.example .env.local
# تعديل المتغيرات حسب الحاجة
```

4. **تشغيل المشروع**
```bash
# Frontend (Terminal 1)
npm run dev

# Backend (Terminal 2)
cd backend
npm run dev
```

5. **فتح المتصفح**
```
http://localhost:3000
```

## السكربتات المتاحة

```bash
# التطوير
npm run dev          # تشغيل خادم التطوير
npm run build        # بناء المشروع للإنتاج
npm run start        # تشغيل خادم الإنتاج

# الاختبار
npm run test         # تشغيل الاختبارات
npm run test:watch   # تشغيل الاختبارات مع المراقبة
npm run test:coverage # تقرير تغطية الاختبارات

# الجودة
npm run lint         # فحص الكود
npm run lint:fix     # إصلاح أخطاء الكود
npm run format       # تنسيق الكود

# النشر
npm run deploy       # نشر المشروع
npm run backup       # نسخ احتياطي
```

## هيكلية قاعدة البيانات

### الجداول الرئيسية
- **users** - المستخدمون
- **blog_posts** - مقالات المدونة
- **case_studies** - الحالات الدراسية
- **careers** - الوظائف
- **applications** - الطلبات
- **contacts** - رسائل التواصل
- **team** - أعضاء الفريق
- **projects** - المشاريع
- **events** - الأحداث
- **testimonials** - الشهادات

## API Endpoints

### المصادقة
```
POST /api/auth/register    # تسجيل مستخدم جديد
POST /api/auth/login       # تسجيل الدخول
POST /api/auth/logout      # تسجيل الخروج
GET  /api/auth/profile     # معلومات الملف الشخصي
```

### المدونة
```
GET    /api/blog           # قائمة المقالات
GET    /api/blog/:id       # مقال واحد
POST   /api/blog           # إنشاء مقال جديد
PUT    /api/blog/:id       # تحديث مقال
DELETE /api/blog/:id       # حذف مقال
```

### الطلبات
```
GET    /api/applications   # قائمة الطلبات
POST   /api/applications   # تقديم طلب جديد
GET    /api/applications/:id # تفاصيل طلب
PUT    /api/applications/:id # تحديث حالة الطلب
```

### التواصل
```
POST /api/contact          # إرسال رسالة تواصل
POST /api/contact/sales    # طلب عرض سعر
```

## الترجمة واللغات

الموقع يدعم اللغتين العربية والإنجليزية مع أولوية للعربية (RTL).

### إضافة ترجمة جديدة
```javascript
// locales/ar/common.json
{
  "welcome": "مرحباً بكم في بيتوريكرز",
  "students": "للطالب",
  "solutions": "الحلول للشركات"
}

// locales/en/common.json
{
  "welcome": "Welcome to Bitwreckers",
  "students": "Students",
  "solutions": "Enterprise Solutions"
}
```

## الأمان

### إجراءات الأمان المطبقة
- HTTPS إجباري
- حماية من CSRF
- حماية من XSS
- حماية من SQL Injection
- Rate Limiting
- Input Validation
- Secure Headers

### أفضل الممارسات
- تحديث التبعيات بانتظام
- مراجعة الأمان أسبوعياً
- نسخ احتياطي يومي
- مراقبة الأخطاء والتهديدات

## الأداء

### تحسينات الأداء
- Lazy Loading للصور
- Code Splitting
- Image Optimization
- Caching Strategies
- CDN للملفات الثابتة
- Gzip Compression

### مؤشرات الأداء المستهدفة
- وقت تحميل الصفحة < 3 ثواني
- معدل الارتداد < 40%
- وقت البقاء في الموقع > 2 دقيقة
- معدل التحويل > 2%

## المساهمة

نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. إنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

### معايير الكود
- استخدام ESLint و Prettier
- كتابة اختبارات للوظائف الجديدة
- تحديث الوثائق عند الحاجة
- اتباع معايير Git Commit

## الترخيص

هذا المشروع مرخص تحت رخصة MIT. راجع ملف [LICENSE](LICENSE) للتفاصيل.

## التواصل

### معلومات التواصل
- **الموقع الإلكتروني**: [bitwreckers.com](https://bitwreckers.com)
- **البريد الإلكتروني**: info@bitwreckers.com
- **الهاتف**: +962 6 123 4567
- **العنوان**: عمان، الأردن

### وسائل التواصل الاجتماعي
- **LinkedIn**: [Bitwreckers](https://linkedin.com/company/bitwreckers)
- **Twitter**: [@bitwreckers](https://twitter.com/bitwreckers)
- **Instagram**: [@bitwreckers](https://instagram.com/bitwreckers)
- **GitHub**: [@bitwreckers](https://github.com/bitwreckers)

## الشكر والتقدير

شكر خاص لجميع المساهمين والمطورين الذين ساعدوا في تطوير هذا المشروع.

---

**Bitwreckers** - حطّم الكود، وابن المستقبل 🚀

