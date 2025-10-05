-- Drop team_members table and all related objects
-- WARNING: This will delete all team members data!

-- Drop policies first
DROP POLICY IF EXISTS "Allow public read access to active team members" ON team_members;
DROP POLICY IF EXISTS "Allow admin full access to team members" ON team_members;

-- Drop trigger
DROP TRIGGER IF EXISTS update_team_members_updated_at_trigger ON team_members;

-- Drop function
DROP FUNCTION IF EXISTS update_team_members_updated_at();

-- Drop indexes
DROP INDEX IF EXISTS idx_team_members_active_order;
DROP INDEX IF EXISTS idx_team_members_created_at;

-- Drop table
DROP TABLE IF EXISTS team_members;

-- Show success message
SELECT 'Team members table dropped successfully!' as message;
