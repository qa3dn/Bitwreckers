# دليل الترجمة العربية - Arabic Translation Guide

## نظرة عامة
تم إضافة دعم كامل للترجمة العربية إلى موقع بيت ريكرز مع الخط العربي IBM Plex Sans Arabic ومكتبة Material Design Icons.

## الميزات المضافة

### 1. الخط العربي
- **IBM Plex Sans Arabic**: خط عربي حديث ومتقدم
- **دعم RTL**: اتجاه النص من اليمين إلى اليسار
- **تكامل مع Tailwind CSS**: استخدام `font-arabic` و `font-ibm-arabic`

### 2. نظام الترجمة
- **ملفات الترجمة**: `src/locales/ar.json` و `src/locales/en.json`
- **Hook الترجمة**: `useTranslation` hook للتبديل بين اللغات
- **حفظ التفضيل**: حفظ اللغة المختارة في localStorage

### 3. مكتبة الأيقونات
- **Material Design Icons**: مكتبة شاملة للأيقونات
- **CDN Integration**: تحميل مباشر من CDN

## الملفات المحدثة

### ملفات التكوين
- `src/app/layout.tsx` - إضافة الخطوط والأيقونات
- `src/styles/globals.css` - متغيرات CSS للخطوط
- `tailwind.config.js` - إعدادات Tailwind للخط العربي

### ملفات الترجمة
- `src/locales/ar.json` - الترجمة العربية الكاملة
- `src/locales/en.json` - الترجمة الإنجليزية
- `src/hooks/useTranslation.ts` - Hook إدارة الترجمة

### المكونات المحدثة
- `src/components/Navbar.tsx` - شريط التنقل مع تبديل اللغة
- `src/components/Hero.tsx` - القسم الرئيسي
- `src/components/Features.tsx` - قسم الميزات
- `src/components/Footer.tsx` - التذييل
- `src/app/page.tsx` - الصفحة الرئيسية

## كيفية الاستخدام

### 1. استخدام Hook الترجمة
```tsx
import useTranslation from '../hooks/useTranslation';

const MyComponent = () => {
  const { t, language, changeLanguage, isRTL } = useTranslation();
  
  return (
    <div className={isRTL ? 'font-arabic' : 'font-english'} dir={isRTL ? 'rtl' : 'ltr'}>
      <h1>{t('common.title')}</h1>
      <button onClick={() => changeLanguage('ar')}>العربية</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  );
};
```

### 2. إضافة ترجمة جديدة
```json
// في src/locales/ar.json
{
  "newSection": {
    "title": "عنوان جديد",
    "description": "وصف جديد"
  }
}

// في src/locales/en.json
{
  "newSection": {
    "title": "New Title",
    "description": "New Description"
  }
}
```

### 3. استخدام الخط العربي
```tsx
// في المكونات
<div className="font-arabic">نص عربي</div>
<div className="font-ibm-arabic">نص بالخط الجديد</div>

// في Tailwind CSS
<h1 className="font-arabic text-2xl">عنوان</h1>
```

## الميزات التقنية

### 1. دعم RTL
- تغيير تلقائي لاتجاه النص
- تحديث `dir` attribute في HTML
- دعم CSS للاتجاه

### 2. حفظ التفضيلات
- حفظ اللغة في localStorage
- استرجاع التفضيل عند إعادة تحميل الصفحة
- تحديث HTML lang attribute

### 3. الأداء
- تحميل ديناميكي للترجمات
- تحسين bundle size
- Lazy loading للترجمات

## الخطوات التالية

### 1. تحديث المكونات المتبقية
- `src/components/home/StudentsSection.tsx`
- `src/components/home/SolutionsSection.tsx`
- `src/components/home/ProductsSection.tsx`
- `src/components/home/InnovationSection.tsx`
- `src/components/home/CommunitySection.tsx`

### 2. تحديث الصفحات
- `src/app/about/page.tsx`
- `src/app/services/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/portfolio/page.tsx`

### 3. إضافة ميزات متقدمة
- ترجمة ديناميكية للمحتوى
- دعم تعدد اللغات
- ترجمة تلقائية للمحتوى الجديد

## ملاحظات مهمة

1. **الخط العربي**: تأكد من تحميل الخط قبل استخدامه
2. **RTL Support**: استخدم `dir` attribute في العناصر
3. **الترجمة**: استخدم `t()` function لجميع النصوص
4. **الأداء**: تجنب إعادة تحميل الترجمة غير الضرورية

## الدعم

لأي استفسارات أو مشاكل في الترجمة، يرجى التواصل مع فريق التطوير.
