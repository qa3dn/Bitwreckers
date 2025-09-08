# هيكلية المجلدات والملفات - Bitwreckers Website

## هيكلية المشروع المقترحة

```
bitwreckers-website/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── team/
│   │   ├── projects/
│   │   ├── logos/
│   │   └── icons/
│   ├── fonts/
│   │   ├── arabic/
│   │   └── english/
│   ├── documents/
│   │   ├── case-studies/
│   │   └── resources/
│   └── locales/
│       ├── ar/
│       └── en/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Form.jsx
│   │   │   └── Loading.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Stats.jsx
│   │   │   └── Contact.jsx
│   │   └── pages/
│   │       ├── students/
│   │       ├── solutions/
│   │       ├── products/
│   │       ├── innovation-lab/
│   │       ├── community/
│   │       ├── blog/
│   │       ├── case-studies/
│   │       ├── about/
│   │       ├── careers/
│   │       └── contact/
│   ├── pages/
│   │   ├── index.js
│   │   ├── students/
│   │   │   ├── index.js
│   │   │   ├── apply.js
│   │   │   ├── tracks/
│   │   │   └── success-stories.js
│   │   ├── solutions/
│   │   │   ├── index.js
│   │   │   ├── web.js
│   │   │   ├── mobile.js
│   │   │   ├── systems.js
│   │   │   └── pricing.js
│   │   ├── products/
│   │   │   ├── index.js
│   │   │   └── [product].js
│   │   ├── innovation-lab/
│   │   │   ├── index.js
│   │   │   ├── projects.js
│   │   │   └── events.js
│   │   ├── community/
│   │   │   ├── index.js
│   │   │   ├── mentors.js
│   │   │   ├── alumni.js
│   │   │   └── events.js
│   │   ├── blog/
│   │   │   ├── index.js
│   │   │   ├── [category]/
│   │   │   └── [slug].js
│   │   ├── case-studies/
│   │   │   ├── index.js
│   │   │   └── [slug].js
│   │   ├── about/
│   │   │   ├── index.js
│   │   │   ├── team.js
│   │   │   └── values.js
│   │   ├── careers/
│   │   │   ├── index.js
│   │   │   ├── [position].js
│   │   │   └── apply.js
│   │   └── contact/
│   │       ├── index.js
│   │       └── sales.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── components/
│   │   │   ├── header.css
│   │   │   ├── footer.css
│   │   │   ├── navigation.css
│   │   │   └── forms.css
│   │   ├── pages/
│   │   │   ├── home.css
│   │   │   ├── students.css
│   │   │   ├── solutions.css
│   │   │   └── blog.css
│   │   └── utilities/
│   │       ├── typography.css
│   │       ├── colors.css
│   │       ├── spacing.css
│   │       └── animations.css
│   ├── utils/
│   │   ├── api.js
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── validation.js
│   │   └── seo.js
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useScrollPosition.js
│   │   ├── useWindowSize.js
│   │   └── useForm.js
│   ├── context/
│   │   ├── LanguageContext.js
│   │   ├── ThemeContext.js
│   │   └── AuthContext.js
│   └── data/
│       ├── navigation.js
│       ├── testimonials.js
│       ├── team.js
│       ├── projects.js
│       └── blog-posts.js
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── blogController.js
│   │   │   ├── contactController.js
│   │   │   ├── careersController.js
│   │   │   └── applicationsController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Blog.js
│   │   │   ├── Contact.js
│   │   │   ├── Career.js
│   │   │   └── Application.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── blog.js
│   │   │   ├── contact.js
│   │   │   ├── careers.js
│   │   │   └── applications.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── validation.js
│   │   │   ├── upload.js
│   │   │   └── cors.js
│   │   ├── utils/
│   │   │   ├── database.js
│   │   │   ├── email.js
│   │   │   ├── validation.js
│   │   │   └── helpers.js
│   │   └── config/
│   │       ├── database.js
│   │       ├── email.js
│   │       └── environment.js
│   ├── uploads/
│   │   ├── resumes/
│   │   ├── projects/
│   │   └── blog/
│   └── tests/
│       ├── unit/
│       ├── integration/
│       └── e2e/
├── cms/
│   ├── src/
│   │   ├── api/
│   │   │   ├── blog/
│   │   │   ├── case-studies/
│   │   │   ├── team/
│   │   │   └── projects/
│   │   ├── components/
│   │   ├── pages/
│   │   └── plugins/
│   └── config/
├── docs/
│   ├── api/
│   ├── deployment/
│   ├── development/
│   └── design/
├── scripts/
│   ├── build.js
│   ├── deploy.js
│   ├── seed.js
│   └── backup.js
├── .env.example
├── .gitignore
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── jest.config.js
├── README.md
└── docker-compose.yml
```

## تفاصيل المجلدات الرئيسية

### 1. `/public`
- **images/**: جميع الصور والرسومات
- **fonts/**: الخطوط العربية والإنجليزية
- **documents/**: الملفات القابلة للتحميل
- **locales/**: ملفات الترجمة

### 2. `/src/components`
- **layout/**: مكونات التخطيط الأساسية
- **common/**: مكونات مشتركة قابلة لإعادة الاستخدام
- **sections/**: أقسام الصفحات
- **pages/**: مكونات خاصة بالصفحات

### 3. `/src/pages`
- تنظيم الصفحات حسب المسارات المحددة
- صفحات ديناميكية للمحتوى المتغير
- صفحات خاصة بكل قسم

### 4. `/src/styles`
- **globals.css**: الأنماط العامة
- **components/**: أنماط المكونات
- **pages/**: أنماط الصفحات
- **utilities/**: الأنماط المساعدة

### 5. `/backend`
- **controllers/**: منطق الأعمال
- **models/**: نماذج البيانات
- **routes/**: مسارات API
- **middleware/**: الوسائط البرمجية
- **uploads/**: الملفات المرفوعة

### 6. `/cms`
- نظام إدارة المحتوى
- واجهة إدارية للمحتوى
- إدارة المدونة والحالات الدراسية

## ملفات التكوين المهمة

### Frontend
- `next.config.js`: إعدادات Next.js
- `tailwind.config.js`: إعدادات Tailwind CSS
- `package.json`: التبعيات والسكربتات

### Backend
- `package.json`: تبعيات الخادم
- `database.js`: إعدادات قاعدة البيانات
- `environment.js`: متغيرات البيئة

### DevOps
- `docker-compose.yml`: تكوين Docker
- `.env.example`: مثال لمتغيرات البيئة
- `scripts/`: سكربتات الأتمتة

## هيكلية قاعدة البيانات المقترحة

### الجداول الرئيسية
1. **users** - المستخدمون
2. **blog_posts** - مقالات المدونة
3. **case_studies** - الحالات الدراسية
4. **careers** - الوظائف
5. **applications** - الطلبات
6. **contacts** - رسائل التواصل
7. **team** - أعضاء الفريق
8. **projects** - المشاريع
9. **events** - الأحداث
10. **testimonials** - الشهادات

### العلاقات
- علاقات one-to-many بين المستخدمين والمحتوى
- علاقات many-to-many للمشاركات والتصنيفات
- علاقات one-to-one للملفات الشخصية

## خطة النشر

### البيئات
1. **Development** - للتطوير المحلي
2. **Staging** - للاختبار
3. **Production** - للإنتاج

### الخدمات
- **Frontend**: Vercel/Netlify
- **Backend**: Railway/Heroku
- **Database**: MongoDB Atlas/PostgreSQL
- **CDN**: Cloudflare
- **Email**: SendGrid/Mailgun



