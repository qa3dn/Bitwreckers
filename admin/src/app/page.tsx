'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AdminAuth } from '@/lib/auth';
import { SecurityMonitor } from '@/lib/security-monitor';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await AdminAuth.isAuthenticatedAdmin();
      if (isAuthenticated) {
        router.push('/dashboard');
      }
    };
    checkAuth();
  }, [router]);

  // Check for lockout and clear old logs
  useEffect(() => {
    SecurityMonitor.clearOldLogs();
    
    const lockoutTime = localStorage.getItem('admin_lockout');
    if (lockoutTime) {
      const lockoutEnd = parseInt(lockoutTime);
      if (Date.now() < lockoutEnd) {
        setIsLocked(true);
        const remainingTime = Math.ceil((lockoutEnd - Date.now()) / 1000 / 60);
        setError(`Account locked. Try again in ${remainingTime} minutes.`);
      } else {
        localStorage.removeItem('admin_lockout');
        localStorage.removeItem('login_attempts');
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError('Account is temporarily locked due to multiple failed attempts.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await AdminAuth.login(email, password);
      
      if (result.success) {
        // Reset login attempts on successful login
        localStorage.removeItem('login_attempts');
        SecurityMonitor.logSecurityEvent('SUCCESSFUL_LOGIN', { email }, 'low');
        router.push('/dashboard');
      } else {
        setError(result.error || 'Login failed');
        
        // Track failed attempts with security monitoring
        SecurityMonitor.trackFailedLogin(email, result.error || 'Invalid credentials');
        
        const attempts = parseInt(localStorage.getItem('login_attempts') || '0') + 1;
        localStorage.setItem('login_attempts', attempts.toString());
        setLoginAttempts(attempts);
        
        // Lock account after 5 failed attempts
        if (attempts >= 5) {
          const lockoutEnd = Date.now() + (15 * 60 * 1000); // 15 minutes
          localStorage.setItem('admin_lockout', lockoutEnd.toString());
          setIsLocked(true);
          setError('Too many failed attempts. Account locked for 15 minutes.');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-[#6B2D73]/10 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-[#2D7363]/10 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#131422]/50 backdrop-blur-xl rounded-3xl border border-[#6B2D73]/20 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="px-6 py-2 bg-gradient-to-r from-[#6B2D73]/20 to-[#2D7363]/20 border border-[#6B2D73]/30 rounded-full text-[#d4aad9] font-semibold text-sm backdrop-blur-sm">
                Admin Access
              </span>
            </motion.div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent mb-2">
              Bitwreckers Admin
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[#F8F8F8] font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                placeholder="admin@bitwreckers.com"
              />
            </div>

            <div>
              <label className="block text-[#F8F8F8] font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-lg font-semibold shadow-lg hover:shadow-[#2D7363]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

        </div>
      </motion.div>
    </div>
  );
}
