-- إعداد قاعدة البيانات الكاملة لموقع Bitwreckers
-- قم بتشغيل هذا الملف في Supabase SQL Editor

-- إنشاء جدول contact_messages
CREATE TABLE IF NOT EXISTS contact_messages (
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
CREATE TABLE IF NOT EXISTS join_requests (
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
CREATE TABLE IF NOT EXISTS consultation_requests (
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
CREATE TABLE IF NOT EXISTS team_members (
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
CREATE TABLE IF NOT EXISTS blog_posts (
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
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  color VARCHAR(7) DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول blog_interactions
CREATE TABLE IF NOT EXISTS blog_interactions (
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
('General', 'general', '#6B7280')
ON CONFLICT (slug) DO NOTHING;

-- إدراج أعضاء الفريق الافتراضيين
INSERT INTO team_members (name, role, description, order_index) VALUES
('أحمد محمد', 'Chief Executive Officer', 'خبير في التكنولوجيا والقيادة مع أكثر من 10 سنوات من الخبرة', 1),
('فاطمة علي', 'Chief Technology Officer', 'مطورة برمجيات متخصصة في تطوير الويب والتطبيقات', 2),
('محمد حسن', 'Lead Developer', 'مطور متخصص في تقنيات الويب الحديثة', 3),
('سارة أحمد', 'UI/UX Designer', 'مصممة واجهات مستخدم متخصصة في تجربة المستخدم', 4),
('علي محمود', 'Project Manager', 'مدير مشاريع متخصص في إدارة الفرق التقنية', 5)
ON CONFLICT DO NOTHING;

-- إعداد Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE join_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_interactions ENABLE ROW LEVEL SECURITY;

-- حذف السياسات الموجودة إذا كانت موجودة
DROP POLICY IF EXISTS "Enable read access for all users" ON contact_messages;
DROP POLICY IF EXISTS "Enable insert for all users" ON contact_messages;
DROP POLICY IF EXISTS "Enable read access for all users" ON join_requests;
DROP POLICY IF EXISTS "Enable insert for all users" ON join_requests;
DROP POLICY IF EXISTS "Enable read access for all users" ON consultation_requests;
DROP POLICY IF EXISTS "Enable insert for all users" ON consultation_requests;
DROP POLICY IF EXISTS "Enable read access for all users" ON team_members;
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_posts;
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_categories;
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_interactions;
DROP POLICY IF EXISTS "Enable insert for all users" ON blog_interactions;

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

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_join_requests_status ON join_requests(status);
CREATE INDEX IF NOT EXISTS idx_join_requests_created_at ON join_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at ON consultation_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_interactions_post_id ON blog_interactions(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_interactions_user_identifier ON blog_interactions(user_identifier);

-- إنشاء دالة لتحديث updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- إنشاء triggers لتحديث updated_at
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_join_requests_updated_at BEFORE UPDATE ON join_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consultation_requests_updated_at BEFORE UPDATE ON consultation_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- إدراج مقال تجريبي
INSERT INTO blog_posts (title, slug, content, excerpt, category, status, published_at) VALUES
('مرحباً بكم في بيتريكرز', 'welcome-to-bitwreckers', 
'<h1>مرحباً بكم في بيتريكرز</h1><p>نحن فريق من المطورين والمصممين المتحمسين لإنشاء حلول تقنية مبتكرة. هدفنا هو تطوير مشاريع تقنية متقدمة تساعد في حل المشاكل الحقيقية.</p><h2>رؤيتنا</h2><p>أن نكون الرائدين في مجال التكنولوجيا في المنطقة، وأن نساهم في بناء مستقبل رقمي أفضل.</p><h2>مهمتنا</h2><p>تطوير حلول تقنية مبتكرة تساعد المؤسسات والأفراد على تحقيق أهدافهم بكفاءة وفعالية.</p>',
'مرحباً بكم في بيتريكرز - فريق من المطورين والمصممين المتحمسين لإنشاء حلول تقنية مبتكرة.',
'general', 'published', NOW())
ON CONFLICT (slug) DO NOTHING;

-- رسالة نجاح
SELECT 'تم إعداد قاعدة البيانات بنجاح! 🎉' as message;
