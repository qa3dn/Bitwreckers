import { createClient } from '@supabase/supabase-js';

// Secure Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce'
  }
});

// Admin authentication utilities
export class AdminAuth {
  // Expose supabase client
  static get supabase() {
    return supabase;
  }

  private static readonly ADMIN_EMAILS = [
    'admin@bitwreckers.com',
    'admin@bitwreckers.org',
    // Add more admin emails as needed
  ];

  private static readonly SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

  // Check if user is authenticated admin
  static async isAuthenticatedAdmin(): Promise<boolean> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return false;
      }

      // Check if user email is in admin list
      const isAdmin = this.ADMIN_EMAILS.includes(user.email?.toLowerCase() || '');
      
      if (!isAdmin) {
        // Sign out non-admin users
        await supabase.auth.signOut();
        return false;
      }

      // Check session age
      const sessionAge = Date.now() - (user.last_sign_in_at ? new Date(user.last_sign_in_at).getTime() : 0);
      if (sessionAge > this.SESSION_TIMEOUT) {
        await supabase.auth.signOut();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  }

  // Secure login with additional validation
  static async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { success: false, error: 'Invalid email format' };
      }

      // Check if email is in admin list before attempting login
      if (!this.ADMIN_EMAILS.includes(email.toLowerCase())) {
        return { success: false, error: 'Access denied' };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password: password,
      });

      if (error) {
        return { success: false, error: 'Invalid credentials' };
      }

      if (!data.user) {
        return { success: false, error: 'Authentication failed' };
      }

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Authentication error' };
    }
  }

  // Secure logout
  static async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
      // Clear any additional session data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_auth');
        sessionStorage.clear();
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Get current admin user
  static async getCurrentAdmin() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return null;
      }

      const isAdmin = this.ADMIN_EMAILS.includes(user.email?.toLowerCase() || '');
      return isAdmin ? user : null;
    } catch (error) {
      console.error('Get current admin error:', error);
      return null;
    }
  }
}
