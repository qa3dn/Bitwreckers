-- Clean old status values completely
-- Run this in Supabase SQL Editor

-- Delete all records with old status values
DELETE FROM join_requests 
WHERE status IN ('pending', 'approved', 'rejected');

DELETE FROM consultation_requests 
WHERE status IN ('pending', 'approved', 'rejected');

-- Verify all old records are deleted
SELECT 'join_requests' as table_name, status, COUNT(*) as count 
FROM join_requests 
GROUP BY status
UNION ALL
SELECT 'consultation_requests' as table_name, status, COUNT(*) as count 
FROM consultation_requests 
GROUP BY status;

-- Show remaining records count
SELECT 
  (SELECT COUNT(*) FROM join_requests) as join_requests_count,
  (SELECT COUNT(*) FROM consultation_requests) as consultation_requests_count;

SELECT 'All old status records have been deleted!' as result;
