# دليل رفع مشروع Bitwreckers على Vercel

## المتطلبات
- حساب على Vercel
- حساب على Supabase
- Git repository على GitHub

## 1. إعداد Supabase

### أ) إنشاء مشروع جديد في Supabase
1. اذهب إلى [supabase.com](https://supabase.com)
2. أنشئ مشروع جديد
3. احفظ المعلومات التالية:
   - Project URL
   - Anon Key
   - Service Key

### ب) إعداد قاعدة البيانات
قم بتشغيل ملفات SQL التالية في Supabase SQL Editor:

```sql
-- إنشاء جدول contact_messages
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول join_requests
CREATE TABLE join_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  university VARCHAR(255),
  major VARCHAR(255),
  year VARCHAR(50),
  experience TEXT,
  motivation TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول consultation_requests
CREATE TABLE consultation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  project_type VARCHAR(255),
  budget VARCHAR(100),
  timeline VARCHAR(100),
  description TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول team_members
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  description TEXT,
  avatar_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول blog_posts
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  category VARCHAR(100) DEFAULT 'general',
  status VARCHAR(50) DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول blog_categories
CREATE TABLE blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  color VARCHAR(7) DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول blog_interactions
CREATE TABLE blog_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_identifier VARCHAR(255) NOT NULL,
  interaction_type VARCHAR(50) NOT NULL, -- 'like' or 'view'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_identifier, interaction_type)
);

-- إدراج فئات المدونة
INSERT INTO blog_categories (name, slug, color) VALUES
('Technology', 'technology', '#3B82F6'),
('Announcements', 'announcements', '#10B981'),
('Tutorials', 'tutorials', '#F59E0B'),
('News', 'news', '#EF4444'),
('General', 'general', '#6B7280');

-- إعداد Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE join_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_interactions ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات RLS
CREATE POLICY "Enable read access for all users" ON contact_messages FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON contact_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON join_requests FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON join_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON consultation_requests FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON consultation_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON team_members FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Enable read access for all users" ON blog_categories FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON blog_interactions FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON blog_interactions FOR INSERT WITH CHECK (true);
```

## 2. رفع الموقع الرئيسي (Frontend)

### أ) عبر Vercel CLI
```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

### ب) عبر Vercel Dashboard
1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط "New Project"
3. اختر repository من GitHub
4. اختر مجلد `frontend`
5. أضف Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: URL مشروع Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon Key من Supabase

## 3. رفع موقع الإدارة (Admin)

### أ) عبر Vercel CLI
```bash
cd admin
vercel --prod
```

### ب) عبر Vercel Dashboard
1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط "New Project"
3. اختر نفس repository من GitHub
4. اختر مجلد `admin`
5. أضف Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: URL مشروع Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon Key من Supabase
   - `SUPABASE_SERVICE_KEY`: Service Key من Supabase

## 4. إعداد Custom Domains (اختياري)

### للموقع الرئيسي
- اذهب إلى Project Settings > Domains
- أضف domain مخصص مثل `bitwreckers.com`

### لموقع الإدارة
- اذهب إلى Project Settings > Domains
- أضف domain مخصص مثل `admin.bitwreckers.com`

## 5. إعداد Environment Variables في Vercel

### للموقع الرئيسي:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### لموقع الإدارة:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here
```

## 6. اختبار النشر

1. تأكد من أن الموقع الرئيسي يعمل بشكل صحيح
2. تأكد من أن موقع الإدارة يعمل بشكل صحيح
3. اختبر إرسال رسائل من الموقع الرئيسي
4. اختبر إدارة الرسائل من موقع الإدارة

## 7. نصائح مهمة

- تأكد من أن جميع Environment Variables صحيحة
- اختبر الموقعين على أجهزة مختلفة
- تأكد من أن قاعدة البيانات تعمل بشكل صحيح
- احتفظ بنسخة احتياطية من قاعدة البيانات

## 8. استكشاف الأخطاء

### مشاكل شائعة:
1. **خطأ في الاتصال بـ Supabase**: تأكد من صحة Environment Variables
2. **خطأ في RLS**: تأكد من إعداد السياسات بشكل صحيح
3. **خطأ في البناء**: تأكد من أن جميع dependencies مثبتة

### حلول:
- راجع logs في Vercel Dashboard
- تأكد من صحة ملفات vercel.json
- اختبر المشروع محلياً قبل النشر
