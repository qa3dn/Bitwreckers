-- Update existing database schema for enhanced admin interface
-- Run this in your Supabase SQL Editor

-- Update join_requests table
ALTER TABLE join_requests 
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS responded_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update consultation_requests table
ALTER TABLE consultation_requests 
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS responded_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update existing records to use new status values FIRST
UPDATE join_requests 
SET status = 'under_study' 
WHERE status = 'pending';

UPDATE join_requests 
SET status = 'responded' 
WHERE status = 'approved';

UPDATE consultation_requests 
SET status = 'under_study' 
WHERE status = 'pending';

UPDATE consultation_requests 
SET status = 'responded' 
WHERE status = 'approved';

-- Now update status constraints
ALTER TABLE join_requests 
DROP CONSTRAINT IF EXISTS join_requests_status_check;

ALTER TABLE join_requests 
ADD CONSTRAINT join_requests_status_check 
CHECK (status IN ('responded', 'under_study', 'rejected'));

ALTER TABLE consultation_requests 
DROP CONSTRAINT IF EXISTS consultation_requests_status_check;

ALTER TABLE consultation_requests 
ADD CONSTRAINT consultation_requests_status_check 
CHECK (status IN ('responded', 'under_study', 'rejected'));

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
