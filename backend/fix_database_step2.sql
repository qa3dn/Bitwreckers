-- Step 2: Add new columns and update constraints
-- Run this AFTER step 1 in Supabase SQL Editor

-- Add new columns to join_requests
ALTER TABLE join_requests 
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS responded_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add new columns to consultation_requests
ALTER TABLE consultation_requests 
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS responded_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Drop old constraints
ALTER TABLE join_requests 
DROP CONSTRAINT IF EXISTS join_requests_status_check;

ALTER TABLE consultation_requests 
DROP CONSTRAINT IF EXISTS consultation_requests_status_check;

-- Add new constraints
ALTER TABLE join_requests 
ADD CONSTRAINT join_requests_status_check 
CHECK (status IN ('responded', 'under_study', 'rejected'));

ALTER TABLE consultation_requests 
ADD CONSTRAINT consultation_requests_status_check 
CHECK (status IN ('responded', 'under_study', 'rejected'));
