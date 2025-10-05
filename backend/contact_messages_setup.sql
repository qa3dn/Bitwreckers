-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('general', 'companies', 'partnerships', 'media')),
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'closed')),
    priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    admin_notes TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_category ON contact_messages(category);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_contact_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_contact_messages_updated_at
    BEFORE UPDATE ON contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_contact_messages_updated_at();

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public to insert contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admins to view all contact messages" ON contact_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Allow admins to update contact messages" ON contact_messages
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.email = auth.jwt() ->> 'email'
        )
    );

-- Insert sample data for testing
INSERT INTO contact_messages (full_name, email, phone, company, subject, message, category, status, priority) VALUES
('أحمد محمد', 'ahmed@example.com', '+962791234567', 'شركة التقنية المتقدمة', 'طلب شراكة استراتيجية', 'نحن شركة رائدة في مجال التكنولوجيا ونتطلع لشراكة مع Bitwreckers لتطوير حلول مبتكرة', 'partnerships', 'new', 'high'),
('سارة أحمد', 'sara@techcorp.com', '+962791234568', 'TechCorp', 'استفسار عن الخدمات', 'نود معرفة المزيد عن خدمات تطوير التطبيقات التي تقدمونها', 'companies', 'read', 'medium'),
('محمد علي', 'mohammed@news.com', '+962791234569', 'TechNews', 'طلب مقابلة صحفية', 'نود إجراء مقابلة مع فريق Bitwreckers حول رؤيتكم المستقبلية', 'media', 'new', 'medium'),
('فاطمة حسن', 'fatima@startup.com', '+962791234570', 'StartupXYZ', 'استشارة تقنية', 'نحتاج استشارة حول اختيار التقنيات المناسبة لمشروعنا الجديد', 'general', 'responded', 'low'),
('خالد محمود', 'khalid@enterprise.com', '+962791234571', 'Enterprise Solutions', 'عرض تعاون', 'نود مناقشة إمكانيات التعاون في مشاريع كبيرة', 'partnerships', 'new', 'high');

