// Security monitoring and logging
export class SecurityMonitor {
  private static readonly MAX_FAILED_ATTEMPTS = 5;
  private static readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
  private static readonly SUSPICIOUS_ACTIVITY_THRESHOLD = 10;

  // Log security events
  static logSecurityEvent(event: string, details: any, severity: 'low' | 'medium' | 'high' = 'medium') {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      severity,
      ip: this.getClientIP(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
      sessionId: this.getSessionId(),
    };

    console.warn(`[SECURITY ${severity.toUpperCase()}]`, logEntry);

    // Store in localStorage for debugging (remove in production)
    if (typeof window !== 'undefined') {
      const logs = JSON.parse(localStorage.getItem('security_logs') || '[]');
      logs.push(logEntry);
      
      // Keep only last 100 logs
      if (logs.length > 100) {
        logs.splice(0, logs.length - 100);
      }
      
      localStorage.setItem('security_logs', JSON.stringify(logs));
    }
  }

  // Track failed login attempts
  static trackFailedLogin(email: string, reason: string) {
    const attempts = this.getFailedAttempts(email);
    attempts.push({
      timestamp: Date.now(),
      reason,
      ip: this.getClientIP(),
    });

    localStorage.setItem(`failed_attempts_${email}`, JSON.stringify(attempts));

    this.logSecurityEvent('FAILED_LOGIN', {
      email,
      reason,
      attemptCount: attempts.length,
    }, 'high');

    // Check if account should be locked
    if (attempts.length >= this.MAX_FAILED_ATTEMPTS) {
      this.lockAccount(email);
    }
  }

  // Lock account after too many failed attempts
  static lockAccount(email: string) {
    const lockoutEnd = Date.now() + this.LOCKOUT_DURATION;
    localStorage.setItem(`account_lockout_${email}`, lockoutEnd.toString());

    this.logSecurityEvent('ACCOUNT_LOCKED', {
      email,
      lockoutEnd: new Date(lockoutEnd).toISOString(),
    }, 'high');
  }

  // Check if account is locked
  static isAccountLocked(email: string): boolean {
    const lockoutEnd = localStorage.getItem(`account_lockout_${email}`);
    if (!lockoutEnd) return false;

    const lockoutTime = parseInt(lockoutEnd);
    if (Date.now() < lockoutTime) {
      return true;
    } else {
      // Remove expired lockout
      localStorage.removeItem(`account_lockout_${email}`);
      localStorage.removeItem(`failed_attempts_${email}`);
      return false;
    }
  }

  // Get remaining lockout time
  static getRemainingLockoutTime(email: string): number {
    const lockoutEnd = localStorage.getItem(`account_lockout_${email}`);
    if (!lockoutEnd) return 0;

    const lockoutTime = parseInt(lockoutEnd);
    const remaining = lockoutTime - Date.now();
    return Math.max(0, remaining);
  }

  // Track suspicious activity
  static trackSuspiciousActivity(activity: string, details: any) {
    const activities = this.getSuspiciousActivities();
    activities.push({
      timestamp: Date.now(),
      activity,
      details,
      ip: this.getClientIP(),
    });

    localStorage.setItem('suspicious_activities', JSON.stringify(activities));

    this.logSecurityEvent('SUSPICIOUS_ACTIVITY', {
      activity,
      details,
      totalActivities: activities.length,
    }, 'high');

    // Check if too many suspicious activities
    if (activities.length > this.SUSPICIOUS_ACTIVITY_THRESHOLD) {
      this.logSecurityEvent('EXCESSIVE_SUSPICIOUS_ACTIVITY', {
        activityCount: activities.length,
      }, 'high');
    }
  }

  // Track admin actions
  static trackAdminAction(action: string, details: any) {
    this.logSecurityEvent('ADMIN_ACTION', {
      action,
      details,
    }, 'medium');
  }

  // Get failed attempts for an email
  private static getFailedAttempts(email: string): any[] {
    const attempts = localStorage.getItem(`failed_attempts_${email}`);
    return attempts ? JSON.parse(attempts) : [];
  }

  // Get suspicious activities
  private static getSuspiciousActivities(): any[] {
    const activities = localStorage.getItem('suspicious_activities');
    return activities ? JSON.parse(activities) : [];
  }

  // Get client IP (simplified)
  private static getClientIP(): string {
    // In a real application, this would come from the server
    return 'unknown';
  }

  // Get session ID
  private static getSessionId(): string {
    if (typeof window === 'undefined') return 'unknown';
    
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = this.generateSessionId();
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  // Generate session ID
  private static generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Clear old logs
  static clearOldLogs() {
    if (typeof window === 'undefined') return;

    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

    // Clear old security logs
    const logs = JSON.parse(localStorage.getItem('security_logs') || '[]');
    const recentLogs = logs.filter((log: any) => 
      now - new Date(log.timestamp).getTime() < maxAge
    );
    localStorage.setItem('security_logs', JSON.stringify(recentLogs));

    // Clear old suspicious activities
    const activities = this.getSuspiciousActivities();
    const recentActivities = activities.filter((activity: any) => 
      now - activity.timestamp < maxAge
    );
    localStorage.setItem('suspicious_activities', JSON.stringify(recentActivities));
  }
}
