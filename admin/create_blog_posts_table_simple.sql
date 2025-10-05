-- Create blog_posts table (simplified version without admin_users dependency)
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Basic post info
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    
    -- Content
    content_en TEXT NOT NULL,
    content_ar TEXT NOT NULL,
    excerpt_en TEXT,
    excerpt_ar TEXT,
    
    -- Media
    featured_image_url TEXT,
    featured_image_alt_en TEXT,
    featured_image_alt_ar TEXT,
    
    -- SEO
    meta_description_en TEXT,
    meta_description_ar TEXT,
    meta_keywords_en TEXT,
    meta_keywords_ar TEXT,
    
    -- Status and visibility
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- Categories and tags
    category_en TEXT,
    category_ar TEXT,
    tags_en TEXT[], -- Array of tags in English
    tags_ar TEXT[], -- Array of tags in Arabic
    
    -- Author info
    author_name TEXT NOT NULL,
    author_email TEXT,
    author_avatar_url TEXT,
    
    -- Statistics
    view_count INTEGER NOT NULL DEFAULT 0,
    like_count INTEGER NOT NULL DEFAULT 0,
    share_count INTEGER NOT NULL DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_featured ON public.blog_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_en ON public.blog_posts(category_en);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_ar ON public.blog_posts(category_ar);

-- Set RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies (simplified - allow public read, authenticated write)
DROP POLICY IF EXISTS "Allow public read access to published blog posts" ON public.blog_posts;
CREATE POLICY "Allow public read access to published blog posts"
ON public.blog_posts FOR SELECT
USING (status = 'published');

DROP POLICY IF EXISTS "Allow authenticated users to manage blog posts" ON public.blog_posts;
CREATE POLICY "Allow authenticated users to manage blog posts"
ON public.blog_posts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_blog_post_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on row update
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_blog_post_updated_at();

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION public.generate_blog_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(
        regexp_replace(
            regexp_replace(
                regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g'),
                '\s+', '-', 'g'
            ),
            '^-+|-+$', '', 'g'
        )
    );
END;
$$ LANGUAGE plpgsql;

-- Create blog_categories table for better organization
CREATE TABLE IF NOT EXISTS public.blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description_en TEXT,
    description_ar TEXT,
    color TEXT DEFAULT '#6B2D73',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO public.blog_categories (name_en, name_ar, slug, description_en, description_ar, color) VALUES
('Technology', 'تقنية', 'technology', 'Latest technology news and insights', 'أحدث أخبار التقنية ورؤى', '#6B2D73'),
('Web Development', 'تطوير الويب', 'web-development', 'Web development tutorials and tips', 'دروس ونصائح تطوير الويب', '#2D7363'),
('Mobile Development', 'تطوير التطبيقات', 'mobile-development', 'Mobile app development guides', 'دلائل تطوير التطبيقات المحمولة', '#9347a0'),
('AI & Machine Learning', 'الذكاء الاصطناعي', 'ai-ml', 'AI and machine learning articles', 'مقالات الذكاء الاصطناعي والتعلم الآلي', '#5fa896'),
('Startups', 'الشركات الناشئة', 'startups', 'Startup news and entrepreneurship', 'أخبار الشركات الناشئة وريادة الأعمال', '#b376bf'),
('Announcements', 'إعلانات', 'announcements', 'Company announcements and updates', 'إعلانات وتحديثات الشركة', '#FF6B35');

-- Set RLS for categories
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to active blog categories" ON public.blog_categories;
CREATE POLICY "Allow public read access to active blog categories"
ON public.blog_categories FOR SELECT
USING (is_active = TRUE);

DROP POLICY IF EXISTS "Allow authenticated users to manage blog categories" ON public.blog_categories;
CREATE POLICY "Allow authenticated users to manage blog categories"
ON public.blog_categories FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Insert sample blog posts
INSERT INTO public.blog_posts (
    title_en, title_ar, slug, content_en, content_ar, excerpt_en, excerpt_ar,
    category_en, category_ar, tags_en, tags_ar, author_name, author_email,
    status, is_featured, published_at
) VALUES 
(
    'Welcome to Bitwreckers Blog',
    'مرحباً بكم في مدونة بيتريكرز',
    'welcome-to-bitwreckers-blog',
    'Welcome to our official blog where we share the latest news, technical articles, and updates about our journey in the tech world.',
    'مرحباً بكم في مدونتنا الرسمية حيث نشارك آخر الأخبار والمقالات التقنية والتحديثات حول رحلتنا في عالم التكنولوجيا.',
    'Welcome to our official blog where we share the latest news and technical articles.',
    'مرحباً بكم في مدونتنا الرسمية حيث نشارك آخر الأخبار والمقالات التقنية.',
    'Announcements',
    'إعلانات',
    ARRAY['welcome', 'blog', 'announcement'],
    ARRAY['ترحيب', 'مدونة', 'إعلان'],
    'Bitwreckers Team',
    'team@bitwreckers.com',
    'published',
    TRUE,
    NOW()
),
(
    'The Future of Web Development',
    'مستقبل تطوير الويب',
    'future-of-web-development',
    'Web development is evolving rapidly with new technologies and frameworks. In this article, we explore the latest trends and what the future holds for web developers.',
    'تطوير الويب يتطور بسرعة مع التقنيات والأطر الجديدة. في هذه المقالة، نستكشف أحدث الاتجاهات وما يحمله المستقبل لمطوري الويب.',
    'Exploring the latest trends in web development and what the future holds.',
    'استكشاف أحدث الاتجاهات في تطوير الويب وما يحمله المستقبل.',
    'Technology',
    'تقنية',
    ARRAY['web-development', 'technology', 'future'],
    ARRAY['تطوير-الويب', 'تقنية', 'مستقبل'],
    'Mohammad Qaadan',
    'mohammad@bitwreckers.com',
    'published',
    FALSE,
    NOW() - INTERVAL '1 day'
);
