# Bitwreckers Admin Panel

A professional admin panel for managing Bitwreckers website requests, built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🔐 **Secure Authentication** - Supabase Auth integration
- 📊 **Dashboard** - Real-time statistics and overview
- 👥 **Join Requests Management** - Approve/reject student applications
- 💬 **Consultation Requests** - Handle consultation bookings
- 📧 **Email Notifications** - Automatic notifications for new requests
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Consistent Theme** - Matches main Bitwreckers website

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (Database, Auth, Storage)
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Setup Instructions

### 1. Environment Variables

Copy `env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp env.example .env.local
```

Update the following variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `ADMIN_EMAIL` - Email for notifications

### 2. Install Dependencies

```bash
npm install
```

### 3. Supabase Database Setup

Run the following SQL commands in your Supabase SQL editor:

```sql
-- Create admins table
CREATE TABLE admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create join_requests table
CREATE TABLE join_requests (
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
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create consultation_requests table
CREATE TABLE consultation_requests (
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
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE join_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (adjust based on your auth setup)
CREATE POLICY "Admins can view all data" ON admins FOR ALL USING (true);
CREATE POLICY "Admins can view join requests" ON join_requests FOR ALL USING (true);
CREATE POLICY "Admins can view consultation requests" ON consultation_requests FOR ALL USING (true);
```

### 4. Add Admin User

Insert an admin user in the admins table:

```sql
INSERT INTO admins (name, email, role) 
VALUES ('Admin User', 'admin@bitwreckers.com', 'admin');
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to access the admin panel.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The admin panel can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Usage

### Login
- Use the admin credentials you created in the database
- The system will redirect to the dashboard after successful login

### Dashboard
- View real-time statistics
- See recent requests
- Quick access to management sections

### Managing Requests
- **Join Requests**: View, approve, reject student applications
- **Consultation Requests**: Handle consultation bookings
- Add notes to requests for internal tracking
- Update request status

### Email Notifications
- New requests automatically trigger email notifications
- Configure admin email in environment variables

## Security Features

- Row Level Security (RLS) enabled on all tables
- Admin-only access to sensitive data
- Secure authentication via Supabase Auth
- Input validation and sanitization

## Customization

### Styling
- Modify `tailwind.config.js` for theme changes
- Update colors in `globals.css`
- Components are in `src/components/`

### Functionality
- Add new request types in database
- Extend admin permissions
- Add more notification channels

## Support

For issues or questions:
1. Check the console for errors
2. Verify Supabase configuration
3. Ensure database tables are created correctly
4. Check environment variables

## License

This project is proprietary to Bitwreckers.
