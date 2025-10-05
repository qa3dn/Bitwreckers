-- Step 4: Update default values
-- Run this AFTER step 3 in Supabase SQL Editor

-- Update default values for status columns
ALTER TABLE join_requests 
ALTER COLUMN status SET DEFAULT 'under_study';

ALTER TABLE consultation_requests 
ALTER COLUMN status SET DEFAULT 'under_study';

-- Verify the changes
SELECT 
  table_name, 
  column_name, 
  column_default 
FROM information_schema.columns 
WHERE table_name IN ('join_requests', 'consultation_requests') 
  AND column_name = 'status';

SELECT 'Default values updated successfully!' as status;
