# Hero Section - القسم الرئيسي

## نظرة عامة

تم بناء Hero Section كامل لموقع Bitwreckers مع جميع الميزات المطلوبة:

- ✅ سينمائي تفاعلي مع Canvas/WebGL
- ✅ Particles Animation (Bits تتجمع لتكوين كلمات)
- ✅ شعارات متبدلة كل 3-4 ثوان
- ✅ CTA مزدوج للطلاب والشركات
- ✅ دعم اللغتين العربية والإنجليزية (RTL/LTR)
- ✅ تصميم متجاوب
- ✅ تحسينات الأداء وإمكانية الوصول

---

## الملفات المُنشأة

### 1. المكونات الرئيسية
```
src/components/pages/home/
├── HeroSection.jsx          # المكون الرئيسي
└── ParticlesAnimation.jsx   # مكون الرسوم المتحركة
```

### 2. ملفات الأنماط
```
src/styles/pages/
└── hero.css                # أنماط Hero Section
```

### 3. ملفات الترجمة
```
public/locales/
├── ar/home.json            # الترجمة العربية
└── en/home.json            # الترجمة الإنجليزية
```

---

## الميزات المطورة

### 🎨 **التصميم السينمائي**
- خلفية متدرجة ديناميكية
- تأثيرات بصرية متقدمة
- تصميم زجاجي (Glassmorphism)
- ألوان متدرجة جذابة

### ⚡ **Particles Animation**
- Canvas/WebGL للرسوم المتحركة
- Bits تتجمع لتكوين كلمات (Build, Bitwreckers, Innovate)
- حركة طبيعية مع فيزياء بسيطة
- تحسين الأداء مع GPU acceleration

### 🔄 **الشعارات المتبدلة**
- 4 شعارات مختلفة
- تبديل كل 3.5 ثانية
- انتقال سلس بين الشعارات
- دعم اللغتين العربية والإنجليزية

### 🎯 **CTA المزدوج**
- زر للطلاب: "انضم كمطور"
- زر للشركات: "احصل على استشارة للشركة"
- تأثيرات hover متقدمة
- ألوان مختلفة لكل فئة

### 📊 **إحصائيات سريعة**
- 4 إحصائيات رئيسية
- عداد متحرك للأرقام
- تصميم شبكي متجاوب

### 🎭 **الحركات والانتقالات**
- Cover Overlay Intro (600ms)
- Fade + Slide animations
- Stagger effects
- Smooth transitions

---

## كيفية الاستخدام

### 1. استيراد المكون
```jsx
import HeroSection from '@/components/pages/home/HeroSection';

// في الصفحة الرئيسية
export default function HomePage() {
  return (
    <div>
      <HeroSection />
      {/* باقي الأقسام */}
    </div>
  );
}
```

### 2. إعداد الترجمة
```jsx
// في _app.js أو layout
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
```

### 3. استيراد الأنماط
```css
/* في globals.css أو _app.js */
@import '@/styles/pages/hero.css';
```

---

## التخصيص

### تغيير الشعارات
```jsx
// في HeroSection.jsx
const slogans = [
  {
    ar: "شعارك الجديد هنا",
    en: "Your new slogan here"
  },
  // ... المزيد من الشعارات
];
```

### تعديل الألوان
```css
/* في hero.css */
.hero-section {
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 50%, #your-color-3 100%);
}
```

### تغيير الإحصائيات
```jsx
// في HeroSection.jsx
const stats = [
  { number: '1000+', label: t('hero.stats.students') },
  // ... المزيد من الإحصائيات
];
```

---

## التحسينات المطبقة

### 🚀 **الأداء**
- Lazy loading للصور
- Code splitting
- GPU acceleration للحركات
- Optimized canvas rendering

### ♿ **إمكانية الوصول**
- Keyboard navigation
- Screen reader support
- High contrast mode
- Reduced motion support

### 📱 **التجاوب**
- Mobile-first design
- Responsive breakpoints
- Touch-friendly interactions
- Adaptive layouts

### 🌐 **SEO**
- Semantic HTML
- Meta tags
- Structured data
- Performance optimization

---

## المتطلبات التقنية

### التبعيات المطلوبة
```json
{
  "dependencies": {
    "framer-motion": "^10.0.0",
    "next-i18next": "^13.0.0",
    "react": "^18.0.0",
    "next": "^13.0.0"
  }
}
```

### متطلبات المتصفح
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

## استكشاف الأخطاء

### مشكلة: Particles لا تظهر
```jsx
// تأكد من أن Canvas يحصل على الأبعاد الصحيحة
useEffect(() => {
  const canvas = canvasRef.current;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}, []);
```

### مشكلة: الترجمة لا تعمل
```jsx
// تأكد من إعداد i18n
import { useTranslation } from 'next-i18next';

const { t } = useTranslation('home');
```

### مشكلة: الحركات بطيئة
```css
/* تحسين الأداء */
@media (prefers-reduced-motion: reduce) {
  .hero-section * {
    animation-duration: 0.01ms !important;
  }
}
```

---

## الخطوات التالية

1. **دمج مع باقي الأقسام**
2. **إضافة Navigation**
3. **تحسين SEO**
4. **إضافة Analytics**
5. **اختبار الأداء**

---

## الدعم

لأي استفسارات أو مشاكل:
- راجع الوثائق
- تحقق من console errors
- اختبر على متصفحات مختلفة
- تأكد من إعدادات الترجمة

---

**تم بناء Hero Section بنجاح! 🎉**



