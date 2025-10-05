-- Step 1: Update existing records to new status values
-- Run this FIRST in Supabase SQL Editor

-- Update join_requests status values
UPDATE join_requests 
SET status = 'under_study' 
WHERE status = 'pending';

UPDATE join_requests 
SET status = 'responded' 
WHERE status = 'approved';

-- Update consultation_requests status values  
UPDATE consultation_requests 
SET status = 'under_study' 
WHERE status = 'pending';

UPDATE consultation_requests 
SET status = 'responded' 
WHERE status = 'approved';

-- Verify the updates
SELECT 'join_requests' as table_name, status, COUNT(*) as count 
FROM join_requests 
GROUP BY status
UNION ALL
SELECT 'consultation_requests' as table_name, status, COUNT(*) as count 
FROM consultation_requests 
GROUP BY status;
