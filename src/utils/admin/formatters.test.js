import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatFileSize,
  formatDate,
} from './formatters';

describe('Formatters Utility', () => {
  describe('formatCurrency', () => {
    test('formats valid currency', () => {
      expect(formatCurrency(1000)).toBe('¥1,000.00');
    });

    test('formats currency with custom symbol', () => {
      expect(formatCurrency(1000, '$')).toBe('$1,000.00');
    });

    test('handles invalid input', () => {
      expect(formatCurrency('invalid')).toBe('¥0.00');
      expect(formatCurrency(null)).toBe('¥0.00');
    });

    test('formats decimal amounts', () => {
      expect(formatCurrency(1234.56)).toBe('¥1,234.56');
    });
  });

  describe('formatNumber', () => {
    test('formats number with default decimals', () => {
      expect(formatNumber(1000)).toBe('1,000');
    });

    test('formats number with custom decimals', () => {
      expect(formatNumber(1000.5, 2)).toBe('1,000.50');
    });

    test('handles invalid input', () => {
      expect(formatNumber('invalid')).toBe('0');
      expect(formatNumber(null)).toBe('0');
    });
  });

  describe('formatPercentage', () => {
    test('formats percentage correctly', () => {
      expect(formatPercentage(0.5)).toBe('50.0%');
    });

    test('formats percentage with custom decimals', () => {
      expect(formatPercentage(0.555, 2)).toBe('55.50%');
    });

    test('handles invalid input', () => {
      expect(formatPercentage('invalid')).toBe('0%');
      expect(formatPercentage(null)).toBe('0%');
    });
  });

  describe('formatFileSize', () => {
    test('formats bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
    });

    test('formats large file sizes', () => {
      const gb = 1024 * 1024 * 1024;
      expect(formatFileSize(gb)).toContain('GB');
    });
  });

  describe('formatDate', () => {
    test('formats date correctly', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date, 'short');
      expect(result).toBeTruthy();
    });

    test('handles empty date', () => {
      expect(formatDate(null)).toBe('');
      expect(formatDate('')).toBe('');
    });

    test('handles date string', () => {
      const result = formatDate('2024-01-15', 'short');
      expect(result).toBeTruthy();
    });

    test('formats different date formats', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date, 'long')).toBeTruthy();
      expect(formatDate(date, 'datetime')).toBeTruthy();
    });
  });
});
