-- Update old status values to new ones
-- Run this in Supabase SQL Editor

-- Update join_requests
UPDATE join_requests 
SET status = 'under_study' 
WHERE status = 'pending';

UPDATE join_requests 
SET status = 'responded' 
WHERE status = 'approved';

-- Update consultation_requests  
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

SELECT 'All old status values have been updated!' as result;
