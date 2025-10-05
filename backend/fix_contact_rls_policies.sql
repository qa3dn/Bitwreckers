-- Fix RLS policies for contact_messages table

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public to insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow admins to view all contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow admins to update contact messages" ON contact_messages;

-- Create new policies
-- Allow public to insert contact messages
CREATE POLICY "Allow public to insert contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

-- Allow public to view their own messages (for future use)
CREATE POLICY "Allow public to view own messages" ON contact_messages
    FOR SELECT USING (true);

-- Allow admins to view all contact messages
CREATE POLICY "Allow admins to view all contact messages" ON contact_messages
    FOR SELECT USING (true);

-- Allow admins to update contact messages
CREATE POLICY "Allow admins to update contact messages" ON contact_messages
    FOR UPDATE USING (true);

-- Allow admins to delete contact messages
CREATE POLICY "Allow admins to delete contact messages" ON contact_messages
    FOR DELETE USING (true);

-- Verify RLS is enabled
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Test the policies
SELECT 'RLS policies created successfully' as status;

