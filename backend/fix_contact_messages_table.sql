-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS trigger_update_contact_messages_updated_at ON contact_messages;

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS update_contact_messages_updated_at();

-- Create the function
CREATE OR REPLACE FUNCTION update_contact_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER trigger_update_contact_messages_updated_at
    BEFORE UPDATE ON contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_contact_messages_updated_at();

-- Ensure the table has all required columns
ALTER TABLE contact_messages 
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS responded_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update existing records to have updated_at
UPDATE contact_messages SET updated_at = NOW() WHERE updated_at IS NULL;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_contact_messages_category ON contact_messages(category);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- Ensure RLS is enabled
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public to insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow admins to view all contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow admins to update contact messages" ON contact_messages;

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

-- Insert sample data for testing (only if table is empty)
INSERT INTO contact_messages (full_name, email, phone, company, subject, message, category, status, priority) 
SELECT 'أحمد محمد', 'ahmed@example.com', '+962791234567', 'شركة التقنية المتقدمة', 'طلب شراكة استراتيجية', 'نحن شركة رائدة في مجال التكنولوجيا ونتطلع لشراكة مع Bitwreckers لتطوير حلول مبتكرة', 'partnerships', 'new', 'high'
WHERE NOT EXISTS (SELECT 1 FROM contact_messages LIMIT 1);

INSERT INTO contact_messages (full_name, email, phone, company, subject, message, category, status, priority) 
SELECT 'سارة أحمد', 'sara@techcorp.com', '+962791234568', 'TechCorp', 'استفسار عن الخدمات', 'نود معرفة المزيد عن خدمات تطوير التطبيقات التي تقدمونها', 'companies', 'read', 'medium'
WHERE NOT EXISTS (SELECT 1 FROM contact_messages LIMIT 1);

INSERT INTO contact_messages (full_name, email, phone, company, subject, message, category, status, priority) 
SELECT 'محمد علي', 'mohammed@news.com', '+962791234569', 'TechNews', 'طلب مقابلة صحفية', 'نود إجراء مقابلة مع فريق Bitwreckers حول رؤيتكم المستقبلية', 'media', 'new', 'medium'
WHERE NOT EXISTS (SELECT 1 FROM contact_messages LIMIT 1);

INSERT INTO contact_messages (full_name, email, phone, company, subject, message, category, status, priority) 
SELECT 'فاطمة حسن', 'fatima@startup.com', '+962791234570', 'StartupXYZ', 'استشارة تقنية', 'نحتاج استشارة حول اختيار التقنيات المناسبة لمشروعنا الجديد', 'general', 'responded', 'low'
WHERE NOT EXISTS (SELECT 1 FROM contact_messages LIMIT 1);

INSERT INTO contact_messages (full_name, email, phone, company, subject, message, category, status, priority) 
SELECT 'خالد محمود', 'khalid@enterprise.com', '+962791234571', 'Enterprise Solutions', 'عرض تعاون', 'نود مناقشة إمكانيات التعاون في مشاريع كبيرة', 'partnerships', 'new', 'high'
WHERE NOT EXISTS (SELECT 1 FROM contact_messages LIMIT 1);

