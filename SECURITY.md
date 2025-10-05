# Bitwreckers Admin Panel - Security Documentation

## 🔒 Security Features Implemented

### 1. Authentication & Authorization
- **Multi-layer Authentication**: Supabase Auth + Custom Admin Validation
- **Admin Email Whitelist**: Only pre-approved emails can access admin panel
- **Session Management**: Automatic session timeout and validation
- **Account Lockout**: Temporary lockout after 5 failed login attempts (15 minutes)

### 2. Data Protection
- **Encryption**: AES-256-GCM encryption for sensitive data
- **Password Hashing**: PBKDF2 with 100,000 iterations
- **Secure Key Generation**: Cryptographically secure random keys
- **Data Sanitization**: Input validation and sanitization

### 3. Network Security
- **HTTPS Enforcement**: HSTS headers with preload
- **CORS Protection**: Restricted to authorized domains only
- **Rate Limiting**: 50 requests per 15 minutes per IP
- **Security Headers**: Comprehensive security headers

### 4. Content Security Policy (CSP)
```
default-src 'self'
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
font-src 'self' https://fonts.gstatic.com
img-src 'self' data: https:
script-src 'self' 'unsafe-eval' 'unsafe-inline'
connect-src 'self' https://iprvecbzvzzyrepzlsho.supabase.co
frame-src 'none'
object-src 'none'
base-uri 'self'
form-action 'self'
upgrade-insecure-requests
```

### 5. Security Monitoring
- **Event Logging**: All security events are logged
- **Failed Attempt Tracking**: IP and timestamp tracking
- **Suspicious Activity Detection**: Automated monitoring
- **Admin Action Auditing**: All admin actions are logged

### 6. Server Security
- **Helmet.js**: Security middleware for Express
- **Input Validation**: Request validation and sanitization
- **Error Handling**: Secure error messages
- **Environment Variables**: Sensitive data in environment variables

## 🛡️ Security Headers

| Header | Value | Purpose |
|--------|-------|---------|
| X-Frame-Options | DENY | Prevents clickjacking |
| X-Content-Type-Options | nosniff | Prevents MIME sniffing |
| X-XSS-Protection | 1; mode=block | XSS protection |
| Referrer-Policy | strict-origin-when-cross-origin | Controls referrer info |
| Strict-Transport-Security | max-age=31536000; includeSubDomains; preload | HTTPS enforcement |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Restricts permissions |

## 🔐 Environment Variables

### Required Environment Variables
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://iprvecbzvzzyrepzlsho.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Security Configuration
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=50

# Admin Configuration
ADMIN_EMAIL=admin@bitwreckers.com
ADMIN_SESSION_TIMEOUT=3600000
```

## 🚨 Security Monitoring

### Logged Events
- **SUCCESSFUL_LOGIN**: Successful admin login
- **FAILED_LOGIN**: Failed login attempts with details
- **ACCOUNT_LOCKED**: Account lockout events
- **SUSPICIOUS_ACTIVITY**: Unusual behavior detection
- **ADMIN_ACTION**: All admin panel actions

### Security Logs Location
- **Client-side**: `localStorage.security_logs` (for debugging)
- **Server-side**: Console logs (configure for production logging)

## 🔧 Security Configuration

### Rate Limiting
- **Window**: 15 minutes
- **Max Requests**: 50 per IP
- **Exclusions**: Health check endpoint

### Account Lockout
- **Max Attempts**: 5 failed logins
- **Lockout Duration**: 15 minutes
- **Reset**: Automatic after lockout period

### Session Security
- **Timeout**: 24 hours
- **Secure Cookies**: HTTPS only in production
- **HttpOnly**: Prevents XSS access
- **SameSite**: Strict CSRF protection

## 🛠️ Security Best Practices

### 1. Regular Updates
- Keep all dependencies updated
- Monitor security advisories
- Apply security patches promptly

### 2. Access Control
- Use strong, unique passwords
- Enable 2FA when available
- Regular access reviews
- Principle of least privilege

### 3. Monitoring
- Regular security log reviews
- Monitor failed login attempts
- Watch for suspicious activities
- Set up alerts for critical events

### 4. Data Protection
- Encrypt sensitive data at rest
- Use HTTPS for all communications
- Regular data backups
- Secure data disposal

## 🚀 Production Deployment Security

### 1. Environment Setup
```bash
# Set production environment
NODE_ENV=production

# Use strong secrets
NEXTAUTH_SECRET=your-very-strong-secret-here
ADMIN_EMAIL=admin@yourdomain.com

# Configure CORS for production domain
CORS_ORIGIN=https://yourdomain.com
```

### 2. Server Configuration
- Use reverse proxy (Nginx/Apache)
- Enable SSL/TLS with strong ciphers
- Configure firewall rules
- Regular security updates

### 3. Database Security
- Use connection encryption
- Regular backups
- Access control
- Monitor database logs

## 📞 Security Incident Response

### 1. Immediate Actions
- Change all passwords
- Review access logs
- Check for data breaches
- Notify relevant parties

### 2. Investigation
- Analyze security logs
- Identify attack vectors
- Assess damage scope
- Document findings

### 3. Recovery
- Apply security patches
- Update security measures
- Monitor for recurrence
- Review security procedures

## 🔍 Security Testing

### 1. Regular Checks
- Penetration testing
- Vulnerability scanning
- Code security reviews
- Access control testing

### 2. Automated Testing
- Security linting
- Dependency scanning
- Automated security tests
- CI/CD security checks

---

**Note**: This security documentation should be reviewed and updated regularly. Always follow security best practices and keep the system updated with the latest security patches.
