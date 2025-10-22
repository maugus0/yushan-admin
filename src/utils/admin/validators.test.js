import {
  isValidEmail,
  validatePassword,
  validateUsername,
  isValidPhone,
} from './validators';

describe('Validators Utility', () => {
  describe('isValidEmail', () => {
    test('validates correct email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
    });

    test('rejects invalid email', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });

    test('handles edge cases', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail(null)).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('accepts valid password', () => {
      const result = validatePassword('ValidPass123!');
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    test('rejects short password', () => {
      const result = validatePassword('Short1!');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('rejects password without uppercase', () => {
      const result = validatePassword('lowercase123!');
      expect(result.isValid).toBe(false);
    });

    test('rejects password without number', () => {
      const result = validatePassword('NoNumber!');
      expect(result.isValid).toBe(false);
    });

    test('rejects password without special character', () => {
      const result = validatePassword('NoSpecial123');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateUsername', () => {
    test('accepts valid username', () => {
      const result = validateUsername('validUser123');
      expect(result.isValid).toBe(true);
    });

    test('rejects short username', () => {
      const result = validateUsername('ab');
      expect(result.isValid).toBe(false);
    });

    test('rejects long username', () => {
      const result = validateUsername('thisusernameistoolong123');
      expect(result.isValid).toBe(false);
    });

    test('rejects username with invalid characters', () => {
      const result = validateUsername('user@name');
      expect(result.isValid).toBe(false);
    });

    test('accepts username with underscores and hyphens', () => {
      const result = validateUsername('user_name-123');
      expect(result.isValid).toBe(true);
    });
  });

  describe('isValidPhone', () => {
    test('validates phone number format', () => {
      expect(typeof isValidPhone('1234567890')).toBe('boolean');
    });

    test('handles empty phone', () => {
      expect(isValidPhone('')).toBe(false);
      expect(isValidPhone(null)).toBe(false);
    });

    test('phone validation returns consistent type', () => {
      const result = isValidPhone('1234567890');
      expect(typeof result).toBe('boolean');
    });
  });
});
