import analyticsService, {
  formatChartData,
  calculateGrowth,
  getPeriodDisplayText,
} from './analyticsservice';

describe('Analytics Service - Pure Functions', () => {
  describe('formatChartData', () => {
    test('should format valid data array correctly', () => {
      const input = [
        { date: '2024-01-01', count: 100 },
        { timestamp: '2024-01-02', value: 200 },
      ];

      const result = formatChartData(input);

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('date', '2024-01-01');
      expect(result[0]).toHaveProperty('value', 100);
      expect(result[1]).toHaveProperty('date', '2024-01-02');
      expect(result[1]).toHaveProperty('value', 200);
    });

    test('should return empty array for null input', () => {
      const result = formatChartData(null);
      expect(result).toEqual([]);
    });

    test('should return empty array for undefined input', () => {
      const result = formatChartData(undefined);
      expect(result).toEqual([]);
    });

    test('should return empty array for non-array input', () => {
      const result = formatChartData('not an array');
      expect(result).toEqual([]);
    });

    test('should handle objects with no date field', () => {
      const input = [{ count: 100 }];
      const result = formatChartData(input);

      expect(result[0]).toHaveProperty('value', 100);
      expect(result[0].date).toBeUndefined();
    });

    test('should handle objects with no value/count field', () => {
      const input = [{ date: '2024-01-01' }];
      const result = formatChartData(input);

      expect(result[0]).toHaveProperty('date', '2024-01-01');
      expect(result[0]).toHaveProperty('value', 0);
    });

    test('should prioritize timestamp over date', () => {
      const input = [{ date: '2024-01-01', timestamp: '2024-02-01' }];
      const result = formatChartData(input);

      expect(result[0].date).toBe('2024-01-01');
    });

    test('should prioritize count over value', () => {
      const input = [{ count: 100, value: 200 }];
      const result = formatChartData(input);

      expect(result[0].value).toBe(100);
    });
  });

  describe('calculateGrowth', () => {
    test('should calculate positive growth correctly', () => {
      const result = calculateGrowth(150, 100);
      expect(result).toBe('50.00');
    });

    test('should calculate negative growth correctly', () => {
      const result = calculateGrowth(50, 100);
      expect(result).toBe('-50.00');
    });

    test('should calculate zero growth', () => {
      const result = calculateGrowth(100, 100);
      expect(result).toBe('0.00');
    });

    test('should return 100 when previous is 0', () => {
      const result = calculateGrowth(100, 0);
      expect(result).toBe(100);
    });

    test('should return 100 when previous is null', () => {
      const result = calculateGrowth(100, null);
      expect(result).toBe(100);
    });

    test('should return 100 when previous is undefined', () => {
      const result = calculateGrowth(100, undefined);
      expect(result).toBe(100);
    });

    test('should handle decimal current value', () => {
      const result = calculateGrowth(150.5, 100);
      expect(result).toBe('50.50');
    });

    test('should handle decimal previous value', () => {
      const result = calculateGrowth(150, 100.5);
      expect(parseFloat(result) > 49 && parseFloat(result) < 50).toBe(true);
    });

    test('should handle large numbers', () => {
      const result = calculateGrowth(2000000, 1000000);
      expect(result).toBe('100.00');
    });

    test('should handle very small growth', () => {
      const result = calculateGrowth(100.1, 100);
      expect(result).toBe('0.10');
    });
  });

  describe('getPeriodDisplayText', () => {
    test('should return Daily for daily period', () => {
      expect(getPeriodDisplayText('daily')).toBe('Daily');
    });

    test('should return Weekly for weekly period', () => {
      expect(getPeriodDisplayText('weekly')).toBe('Weekly');
    });

    test('should return Monthly for monthly period', () => {
      expect(getPeriodDisplayText('monthly')).toBe('Monthly');
    });

    test('should return original text for unknown period', () => {
      expect(getPeriodDisplayText('yearly')).toBe('yearly');
    });

    test('should return original text for null input', () => {
      expect(getPeriodDisplayText(null)).toBe(null);
    });

    test('should return original text for undefined input', () => {
      expect(getPeriodDisplayText(undefined)).toBeUndefined();
    });

    test('should return original text for empty string', () => {
      expect(getPeriodDisplayText('')).toBe('');
    });

    test('should be case-sensitive', () => {
      expect(getPeriodDisplayText('Daily')).toBe('Daily');
      expect(getPeriodDisplayText('DAILY')).toBe('DAILY');
    });
  });

  describe('analyticsService exports', () => {
    test('should export default object with methods', () => {
      expect(analyticsService).toBeDefined();
      expect(typeof analyticsService).toBe('object');
    });

    test('should export getAnalyticsSummary method', () => {
      expect(analyticsService.getAnalyticsSummary).toBeDefined();
      expect(typeof analyticsService.getAnalyticsSummary).toBe('function');
    });

    test('should export getUserTrends method', () => {
      expect(analyticsService.getUserTrends).toBeDefined();
      expect(typeof analyticsService.getUserTrends).toBe('function');
    });

    test('should export getPlatformDAU method', () => {
      expect(analyticsService.getPlatformDAU).toBeDefined();
      expect(typeof analyticsService.getPlatformDAU).toBe('function');
    });

    test('should export formatChartData method', () => {
      expect(analyticsService.formatChartData).toBeDefined();
      expect(typeof analyticsService.formatChartData).toBe('function');
    });

    test('should export calculateGrowth method', () => {
      expect(analyticsService.calculateGrowth).toBeDefined();
      expect(typeof analyticsService.calculateGrowth).toBe('function');
    });

    test('should export getPeriodDisplayText method', () => {
      expect(analyticsService.getPeriodDisplayText).toBeDefined();
      expect(typeof analyticsService.getPeriodDisplayText).toBe('function');
    });
  });

  describe('Data transformation consistency', () => {
    test('formatChartData should maintain original object properties', () => {
      const input = [{ date: '2024-01-01', count: 100, extra: 'data' }];
      const result = formatChartData(input);

      expect(result[0]).toHaveProperty('extra', 'data');
    });

    test('calculateGrowth output should be a string', () => {
      const result = calculateGrowth(150, 100);
      expect(typeof result).toBe('string');
    });

    test('getPeriodDisplayText should handle all period types', () => {
      const periods = ['daily', 'weekly', 'monthly'];
      const displayTexts = periods.map(getPeriodDisplayText);

      expect(displayTexts).toEqual(['Daily', 'Weekly', 'Monthly']);
    });
  });
});
