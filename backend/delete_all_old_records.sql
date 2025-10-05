-- Delete ALL records with old status values
-- Run this in Supabase SQL Editor

-- Delete all join_requests with old status
DELETE FROM join_requests 
WHERE status IN ('pending', 'approved', 'rejected');

-- Delete all consultation_requests with old status  
DELETE FROM consultation_requests 
WHERE status IN ('pending', 'approved', 'rejected');

-- Verify all old records are deleted
SELECT 'join_requests' as table_name, COUNT(*) as total_records 
FROM join_requests
UNION ALL
SELECT 'consultation_requests' as table_name, COUNT(*) as total_records 
FROM consultation_requests;

-- Show remaining records (should be 0 or only new status values)
SELECT 'join_requests' as table_name, status, COUNT(*) as count 
FROM join_requests 
GROUP BY status
UNION ALL
SELECT 'consultation_requests' as table_name, status, COUNT(*) as count 
FROM consultation_requests 
GROUP BY status;

SELECT 'All old records deleted! Database is now clean.' as result;
