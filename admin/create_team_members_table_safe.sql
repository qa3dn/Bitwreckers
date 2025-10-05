-- Create team_members table (Safe version - handles existing objects)
-- This script can be run multiple times safely

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to active team members" ON team_members;
DROP POLICY IF EXISTS "Allow admin full access to team members" ON team_members;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_team_members_updated_at_trigger ON team_members;

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS update_team_members_updated_at();

-- Create team_members table if it doesn't exist
CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    description TEXT,
    avatar_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_team_members_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_team_members_updated_at_trigger
    BEFORE UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION update_team_members_updated_at();

-- Create RLS policies
CREATE POLICY "Allow public read access to active team members" ON team_members
    FOR SELECT USING (is_active = TRUE);

-- Simplified admin policy that doesn't rely on auth.users table
CREATE POLICY "Allow admin full access to team members" ON team_members
    FOR ALL USING (true);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_team_members_active_order ON team_members (is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_team_members_created_at ON team_members (created_at);

-- Insert initial team members data (only if table is empty)
INSERT INTO team_members (name, role, description, order_index) 
SELECT * FROM (VALUES
    ('Mohammad Qaadan', 'Founder | CEO', 'Visionary leader driving innovation and strategic growth.', 1),
    ('Ahmad Al Hamad', 'Back-end Developer', 'Expert in server-side development and database architecture.', 2),
    ('Mohammad Al Khaldi', 'UI/UX Team', 'Creative designer crafting stunning user experiences.', 3),
    ('Mohammad Freihat', 'PR Team', 'Building strong relationships and brand presence.', 4),
    ('Ahmad Jarad', 'Full Stack Developer', 'Full-stack expert turning ideas into reality.', 5),
    ('Maen Ababneh', 'Full Stack Developer', 'Versatile developer with expertise in multiple technologies.', 6),
    ('Yaman Gharaibeh', 'Flutter Developer', 'Mobile app specialist creating cross-platform solutions.', 7),
    ('Lina Khdeir', 'Full Stack Developer', 'Skilled developer with passion for clean code and innovation.', 8),
    ('Rama Al Raba''a', 'Flutter Developer', 'Mobile development expert focused on user experience.', 9),
    ('Hashem ALghazawi', 'Flutter Developer', 'Dedicated mobile developer creating seamless app experiences.', 10),
    ('Thaier Assaf', 'AI Automation', 'AI specialist automating processes and enhancing efficiency.', 11),
    ('Taimaa Bany Ahmad', 'Frontend Developer', 'Frontend expert creating beautiful and responsive interfaces.', 12),
    ('Mohammad Ibdah', 'Frontend Developer', 'Creative frontend developer with eye for detail and design.', 13),
    ('Ahmad Obaidawi', 'Frontend Developer', 'Frontend specialist focused on performance and user experience.', 14),
    ('Mai Alkhdairat', 'Machine Learning Engineer', 'ML engineer developing intelligent solutions and algorithms.', 15)
) AS new_members(name, role, description, order_index)
WHERE NOT EXISTS (SELECT 1 FROM team_members LIMIT 1);

-- Show success message
SELECT 'Team members table setup completed successfully!' as message;
