# Bitwreckers Website - موقع بيتوريكرز

## 🚀 تشغيل المشروع

### المتطلبات الأساسية
- Node.js 18+ 
- npm أو yarn

### خطوات التشغيل

1. **تثبيت التبعيات**
```bash
npm install
# أو
yarn install
```

2. **تشغيل خادم التطوير**
```bash
npm run dev
# أو
yarn dev
```

3. **فتح المتصفح**
```
http://localhost:3000
```

### الأوامر المتاحة

```bash
# التطوير
npm run dev          # تشغيل خادم التطوير
npm run build        # بناء المشروع للإنتاج
npm run start        # تشغيل خادم الإنتاج

# الجودة
npm run lint         # فحص الكود
npm run lint:fix     # إصلاح أخطاء الكود
```

---

## 📁 هيكلية المشروع

```
bitwreckers-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # الأنماط العامة
│   │   ├── layout.js          # Layout الرئيسي
│   │   └── page.js            # الصفحة الرئيسية
│   ├── components/            # المكونات
│   │   └── pages/home/
│   │       ├── HeroSection.jsx
│   │       └── ParticlesAnimation.jsx
│   └── styles/               # ملفات الأنماط
│       └── pages/
│           └── hero.css
├── public/
│   └── locales/              # ملفات الترجمة
│       ├── ar/home.json
│       └── en/home.json
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🎨 الميزات المطورة

### ✅ Hero Section
- سينمائي تفاعلي مع Canvas/WebGL
- Particles Animation (Bits تتجمع لتكوين كلمات)
- شعارات متبدلة كل 3-4 ثوان
- CTA مزدوج للطلاب والشركات
- دعم اللغتين العربية والإنجليزية (RTL/LTR)
- تصميم متجاوب
- تحسينات الأداء وإمكانية الوصول

### 🛠️ التقنيات المستخدمة
- **Next.js 14** - إطار عمل React
- **Tailwind CSS** - إطار عمل CSS
- **Framer Motion** - مكتبة الحركات
- **Canvas API** - الرسوم المتحركة
- **i18n** - الترجمة والتدويل

---

## 🌐 الترجمة واللغات

المشروع يدعم اللغتين العربية والإنجليزية:

### العربية (RTL)
- الاتجاه: من اليمين لليسار
- الخطوط: Cairo, Tajawal
- المحتوى: محتوى عربي كامل

### الإنجليزية (LTR)
- الاتجاه: من اليسار لليمين
- الخطوط: Inter, Poppins
- المحتوى: محتوى إنجليزي كامل

---

## 📱 التصميم المتجاوب

- **Mobile First** - تصميم يبدأ من الموبايل
- **Breakpoints** - نقاط توقف متعددة
- **Touch Friendly** - تفاعل مناسب للمس
- **Performance** - أداء محسن لجميع الأجهزة

---

## ♿ إمكانية الوصول

- **Keyboard Navigation** - التنقل بالكيبورد
- **Screen Reader** - دعم قارئات الشاشة
- **High Contrast** - وضع التباين العالي
- **Reduced Motion** - تقليل الحركة
- **Semantic HTML** - HTML دلالي

---

## 🚀 النشر

### Vercel (موصى به)
```bash
npm run build
# ثم رفع المشروع إلى Vercel
```

### Netlify
```bash
npm run build
# ثم رفع مجلد .next إلى Netlify
```

### خادم تقليدي
```bash
npm run build
npm run start
```

---

## 🔧 التخصيص

### تغيير الألوان
```css
/* في tailwind.config.js */
colors: {
  primary: {
    500: '#your-color',
    // ...
  }
}
```

### إضافة لغات جديدة
```js
// في next-i18next.config.js
locales: ['ar', 'en', 'fr']
```

### تعديل الشعارات
```jsx
// في HeroSection.jsx
const slogans = [
  {
    ar: "شعارك الجديد",
    en: "Your new slogan"
  }
];
```

---

## 🐛 استكشاف الأخطاء

### مشكلة: الموقع لا يفتح
```bash
# تأكد من تثبيت التبعيات
npm install

# تأكد من تشغيل الخادم
npm run dev
```

### مشكلة: Particles لا تظهر
- تأكد من دعم المتصفح لـ Canvas API
- تحقق من console errors
- اختبر على متصفح مختلف

### مشكلة: الترجمة لا تعمل
- تأكد من وجود ملفات الترجمة
- تحقق من إعدادات i18n
- أعد تشغيل الخادم

---

## 📞 الدعم

لأي استفسارات أو مشاكل:
- راجع الوثائق
- تحقق من console errors
- اختبر على متصفحات مختلفة
- تأكد من إعدادات الترجمة

---

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT.

---

**تم بناء موقع Bitwreckers بنجاح! 🎉**



