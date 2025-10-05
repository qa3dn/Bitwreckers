-- Add trash system to join_requests table
ALTER TABLE join_requests 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE;

-- Add trash system to consultation_requests table
ALTER TABLE consultation_requests 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE;

-- Create indexes for deleted messages
CREATE INDEX IF NOT EXISTS idx_join_requests_deleted ON join_requests(is_deleted, deleted_at);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_deleted ON consultation_requests(is_deleted, deleted_at);

-- Update RLS policies for join_requests
DROP POLICY IF EXISTS "Allow admins to view all join requests" ON join_requests;
DROP POLICY IF EXISTS "Allow admins to update join requests" ON join_requests;

CREATE POLICY "Allow admins to view active join requests" ON join_requests
    FOR SELECT USING (
        is_deleted = FALSE AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Allow admins to view deleted join requests" ON join_requests
    FOR SELECT USING (
        is_deleted = TRUE AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Allow admins to update join requests" ON join_requests
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.email = auth.jwt() ->> 'email'
        )
    );

-- Update RLS policies for consultation_requests
DROP POLICY IF EXISTS "Allow admins to view all consultation requests" ON consultation_requests;
DROP POLICY IF EXISTS "Allow admins to update consultation requests" ON consultation_requests;

CREATE POLICY "Allow admins to view active consultation requests" ON consultation_requests
    FOR SELECT USING (
        is_deleted = FALSE AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Allow admins to view deleted consultation requests" ON consultation_requests
    FOR SELECT USING (
        is_deleted = TRUE AND
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Allow admins to update consultation requests" ON consultation_requests
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.email = auth.jwt() ->> 'email'
        )
    );

-- Create functions for join_requests
CREATE OR REPLACE FUNCTION soft_delete_join_request(request_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE join_requests 
    SET 
        is_deleted = TRUE,
        deleted_at = NOW(),
        updated_at = NOW()
    WHERE id = request_id AND is_deleted = FALSE;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION restore_join_request(request_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE join_requests 
    SET 
        is_deleted = FALSE,
        deleted_at = NULL,
        updated_at = NOW()
    WHERE id = request_id AND is_deleted = TRUE;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Create functions for consultation_requests
CREATE OR REPLACE FUNCTION soft_delete_consultation_request(request_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE consultation_requests 
    SET 
        is_deleted = TRUE,
        deleted_at = NOW(),
        updated_at = NOW()
    WHERE id = request_id AND is_deleted = FALSE;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION restore_consultation_request(request_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE consultation_requests 
    SET 
        is_deleted = FALSE,
        deleted_at = NULL,
        updated_at = NOW()
    WHERE id = request_id AND is_deleted = TRUE;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Create function to permanently delete old requests (90 days)
CREATE OR REPLACE FUNCTION permanent_delete_old_requests()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER := 0;
    temp_count INTEGER;
BEGIN
    -- Delete old join requests
    DELETE FROM join_requests 
    WHERE is_deleted = TRUE 
    AND deleted_at < NOW() - INTERVAL '90 days';
    
    GET DIAGNOSTICS temp_count = ROW_COUNT;
    deleted_count := deleted_count + temp_count;
    
    -- Delete old consultation requests
    DELETE FROM consultation_requests 
    WHERE is_deleted = TRUE 
    AND deleted_at < NOW() - INTERVAL '90 days';
    
    GET DIAGNOSTICS temp_count = ROW_COUNT;
    deleted_count := deleted_count + temp_count;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT EXECUTE ON FUNCTION soft_delete_join_request(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION restore_join_request(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION soft_delete_consultation_request(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION restore_consultation_request(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION permanent_delete_old_requests() TO authenticated;
