import crypto from 'crypto';

// Encryption utilities for sensitive data
export class Encryption {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly KEY_LENGTH = 32;
  private static readonly IV_LENGTH = 16;
  private static readonly SALT_LENGTH = 64;
  private static readonly TAG_LENGTH = 16;

  // Generate a secure random key
  static generateKey(): string {
    return crypto.randomBytes(this.KEY_LENGTH).toString('hex');
  }

  // Derive key from password using PBKDF2
  static deriveKey(password: string, salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(password, salt, 100000, this.KEY_LENGTH, 'sha512');
  }

  // Encrypt sensitive data
  static encrypt(text: string, key: string): string {
    try {
      const salt = crypto.randomBytes(this.SALT_LENGTH);
      const derivedKey = this.deriveKey(key, salt);
      const iv = crypto.randomBytes(this.IV_LENGTH);
      
      const cipher = crypto.createCipher(this.ALGORITHM, derivedKey);
      cipher.setAAD(salt);
      
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      const tag = cipher.getAuthTag();
      
      // Combine salt + iv + tag + encrypted data
      const combined = Buffer.concat([
        salt,
        iv,
        tag,
        Buffer.from(encrypted, 'hex')
      ]);
      
      return combined.toString('base64');
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  // Decrypt sensitive data
  static decrypt(encryptedData: string, key: string): string {
    try {
      const combined = Buffer.from(encryptedData, 'base64');
      
      const salt = combined.subarray(0, this.SALT_LENGTH);
      const iv = combined.subarray(this.SALT_LENGTH, this.SALT_LENGTH + this.IV_LENGTH);
      const tag = combined.subarray(this.SALT_LENGTH + this.IV_LENGTH, this.SALT_LENGTH + this.IV_LENGTH + this.TAG_LENGTH);
      const encrypted = combined.subarray(this.SALT_LENGTH + this.IV_LENGTH + this.TAG_LENGTH);
      
      const derivedKey = this.deriveKey(key, salt);
      
      const decipher = crypto.createDecipher(this.ALGORITHM, derivedKey);
      decipher.setAAD(salt);
      decipher.setAuthTag(tag);
      
      let decrypted = decipher.update(encrypted, undefined, 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  // Hash sensitive data (one-way)
  static hash(text: string, salt?: string): string {
    const saltToUse = salt || crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(text, saltToUse, 100000, 64, 'sha512');
    return `${saltToUse}:${hash.toString('hex')}`;
  }

  // Verify hashed data
  static verifyHash(text: string, hashedText: string): boolean {
    try {
      const [salt, hash] = hashedText.split(':');
      const newHash = crypto.pbkdf2Sync(text, salt, 100000, 64, 'sha512');
      return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), newHash);
    } catch (error) {
      console.error('Hash verification error:', error);
      return false;
    }
  }

  // Generate secure random token
  static generateToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  // Generate secure random password
  static generatePassword(length: number = 16): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    return password;
  }
}
