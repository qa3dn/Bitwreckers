-- Add trash system to contact_messages table
-- Add columns for soft delete functionality

ALTER TABLE contact_messages 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE;

-- Create index for deleted messages
CREATE INDEX IF NOT EXISTS idx_contact_messages_deleted ON contact_messages(is_deleted, deleted_at);

-- Update RLS policies to handle deleted messages
DROP POLICY IF EXISTS "Allow admins to view all contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow admins to update contact messages" ON contact_messages;

-- Create new policies that exclude deleted messages by default
CREATE POLICY "Allow admins to view active contact messages" ON contact_messages
    FOR SELECT USING (
        is_deleted = FALSE AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Allow admins to view deleted contact messages" ON contact_messages
    FOR SELECT USING (
        is_deleted = TRUE AND
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

-- Create function to soft delete messages
CREATE OR REPLACE FUNCTION soft_delete_contact_message(message_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE contact_messages 
    SET 
        is_deleted = TRUE,
        deleted_at = NOW(),
        updated_at = NOW()
    WHERE id = message_id AND is_deleted = FALSE;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Create function to restore messages from trash
CREATE OR REPLACE FUNCTION restore_contact_message(message_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE contact_messages 
    SET 
        is_deleted = FALSE,
        deleted_at = NULL,
        updated_at = NOW()
    WHERE id = message_id AND is_deleted = TRUE;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Create function to permanently delete old messages (90 days)
CREATE OR REPLACE FUNCTION permanent_delete_old_messages()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM contact_messages 
    WHERE is_deleted = TRUE 
    AND deleted_at < NOW() - INTERVAL '90 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to run permanent deletion (this would need to be set up in your cron or scheduled task system)
-- For now, this function can be called manually or via an API endpoint

-- Grant permissions
GRANT EXECUTE ON FUNCTION soft_delete_contact_message(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION restore_contact_message(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION permanent_delete_old_messages() TO authenticated;
