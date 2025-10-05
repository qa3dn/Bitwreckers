-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for admin_users
DROP POLICY IF EXISTS "Allow admin users to manage their own data" ON public.admin_users;
CREATE POLICY "Allow admin users to manage their own data"
ON public.admin_users FOR ALL
TO authenticated
USING (email = auth.email())
WITH CHECK (email = auth.email());

-- Insert default admin user (password: admin123)
INSERT INTO public.admin_users (email, password_hash, name, role, is_active)
VALUES (
    'admin@bitwreckers.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- admin123
    'Admin User',
    'admin',
    TRUE
) ON CONFLICT (email) DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_admin_user_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on row update
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON public.admin_users;
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON public.admin_users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_admin_user_updated_at();
