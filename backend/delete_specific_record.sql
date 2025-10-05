-- Delete the specific problematic record
-- Run this in Supabase SQL Editor

-- Delete the specific record that's causing the constraint violation
DELETE FROM join_requests 
WHERE id = '0896ecef-1a28-42fe-8ffb-136998e7dd56';

-- Verify the record is deleted
SELECT COUNT(*) as remaining_records FROM join_requests 
WHERE id = '0896ecef-1a28-42fe-8ffb-136998e7dd56';

-- Show all remaining records with their status
SELECT id, full_name, email, status, created_at 
FROM join_requests 
ORDER BY created_at DESC;

SELECT 'Problematic record deleted successfully!' as result;
