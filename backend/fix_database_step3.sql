-- Step 3: Create indexes and triggers
-- Run this AFTER step 2 in Supabase SQL Editor

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_join_requests_status ON join_requests(status);
CREATE INDEX IF NOT EXISTS idx_join_requests_created_at ON join_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_join_requests_responded_at ON join_requests(responded_at);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at ON consultation_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_responded_at ON consultation_requests(responded_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_join_requests_updated_at ON join_requests;
CREATE TRIGGER update_join_requests_updated_at
    BEFORE UPDATE ON join_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_consultation_requests_updated_at ON consultation_requests;
CREATE TRIGGER update_consultation_requests_updated_at
    BEFORE UPDATE ON consultation_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Verify everything is working
SELECT 'Database update completed successfully!' as status;
