import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Admin {
  id: string
  name: string
  email: string
  role: string
  created_at: string
}

export interface JoinRequest {
  id: string
  full_name: string
  email: string
  phone: string
  age: string
  country: string
  university: string
  field_of_interest: string
  other_field: string
  experience_level: string
  skills: string
  portfolio: string
  motivation: string
  inspiration: string
  expectations: string
  contribution: string
  teamwork: string
  hours_per_week: string
  activities: string[]
  previous_experience: string
  future_vision: string
  project_idea: string
  agreement: boolean
  status: 'pending' | 'approved' | 'rejected'
  notes: string
  created_at: string
}

export interface ConsultationRequest {
  id: string
  full_name: string
  email: string
  phone: string
  organization: string
  consultation_type: string
  other_type: string
  project_description: string
  consultation_format: string
  duration: string
  preferred_time: string
  preferred_date: string
  documents: string
  additional_notes: string
  status: 'pending' | 'approved' | 'rejected'
  notes: string
  created_at: string
}
