-- Bitwreckers Admin Panel Database Setup
-- Run this in your Supabase SQL Editor

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create join_requests table
CREATE TABLE IF NOT EXISTS join_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  age TEXT,
  country TEXT,
  university TEXT,
  field_of_interest TEXT,
  other_field TEXT,
  experience_level TEXT,
  skills TEXT,
  portfolio TEXT,
  motivation TEXT,
  inspiration TEXT,
  expectations TEXT,
  contribution TEXT,
  teamwork TEXT,
  hours_per_week TEXT,
  activities TEXT[],
  previous_experience TEXT,
  future_vision TEXT,
  project_idea TEXT,
  agreement BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'under_study' CHECK (status IN ('responded', 'under_study', 'rejected')),
  notes TEXT,
  admin_notes TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create consultation_requests table
CREATE TABLE IF NOT EXISTS consultation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  consultation_type TEXT,
  other_type TEXT,
  project_description TEXT,
  consultation_format TEXT,
  duration TEXT,
  preferred_time TEXT,
  preferred_date TEXT,
  documents TEXT,
  additional_notes TEXT,
  status TEXT DEFAULT 'under_study' CHECK (status IN ('responded', 'under_study', 'rejected')),
  notes TEXT,
  admin_notes TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE join_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admins
CREATE POLICY "Admins can view all data" ON admins FOR ALL USING (true);
CREATE POLICY "Admins can view join requests" ON join_requests FOR ALL USING (true);
CREATE POLICY "Admins can view consultation requests" ON consultation_requests FOR ALL USING (true);

-- Create RLS policies for public access (for form submissions)
CREATE POLICY "Public can insert join requests" ON join_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert consultation requests" ON consultation_requests FOR INSERT WITH CHECK (true);

-- Insert default admin user (change email and name as needed)
INSERT INTO admins (name, email, role) 
VALUES ('Admin User', 'admin@bitwreckers.com', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_join_requests_status ON join_requests(status);
CREATE INDEX IF NOT EXISTS idx_join_requests_created_at ON join_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at ON consultation_requests(created_at);

-- Create function to send email notifications for new requests
CREATE OR REPLACE FUNCTION notify_admin_new_request()
RETURNS TRIGGER AS $$
BEGIN
  -- This function can be extended to send actual emails
  -- For now, it just logs the event
  RAISE NOTICE 'New request received: %', NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for email notifications
CREATE TRIGGER notify_new_join_request
  AFTER INSERT ON join_requests
  FOR EACH ROW
  EXECUTE FUNCTION notify_admin_new_request();

CREATE TRIGGER notify_new_consultation_request
  AFTER INSERT ON consultation_requests
  FOR EACH ROW
  EXECUTE FUNCTION notify_admin_new_request();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
