import {
  STATUS_DEFINITIONS,
  PRIORITY_DEFINITIONS,
  getStatusConfig,
} from './statusutils';

describe('Status Utilities', () => {
  describe('STATUS_DEFINITIONS', () => {
    test('defines user statuses', () => {
      expect(STATUS_DEFINITIONS.USER).toBeDefined();
      expect(STATUS_DEFINITIONS.USER.active).toHaveProperty('label');
      expect(STATUS_DEFINITIONS.USER.active).toHaveProperty('color');
    });

    test('defines novel statuses', () => {
      expect(STATUS_DEFINITIONS.NOVEL).toBeDefined();
      expect(STATUS_DEFINITIONS.NOVEL.draft).toBeDefined();
    });

    test('defines all major status categories', () => {
      const categories = [
        'USER',
        'NOVEL',
        'CHAPTER',
        'COMMENT',
        'REVIEW',
        'REPORT',
        'TRANSACTION',
        'SUBSCRIPTION',
        'SYSTEM',
      ];
      categories.forEach((cat) => {
        expect(STATUS_DEFINITIONS[cat]).toBeDefined();
      });
    });

    test('each status has label and color', () => {
      Object.entries(STATUS_DEFINITIONS.USER).forEach(([_, status]) => {
        expect(status).toHaveProperty('label');
        expect(status).toHaveProperty('color');
        expect(status).toHaveProperty('variant');
      });
    });
  });

  describe('PRIORITY_DEFINITIONS', () => {
    test('defines all priority levels', () => {
      expect(PRIORITY_DEFINITIONS.low).toBeDefined();
      expect(PRIORITY_DEFINITIONS.normal).toBeDefined();
      expect(PRIORITY_DEFINITIONS.medium).toBeDefined();
      expect(PRIORITY_DEFINITIONS.high).toBeDefined();
      expect(PRIORITY_DEFINITIONS.urgent).toBeDefined();
      expect(PRIORITY_DEFINITIONS.critical).toBeDefined();
    });

    test('each priority has label, color, and icon', () => {
      Object.entries(PRIORITY_DEFINITIONS).forEach(([_, priority]) => {
        expect(priority).toHaveProperty('label');
        expect(priority).toHaveProperty('color');
        expect(priority).toHaveProperty('icon');
      });
    });
  });

  describe('getStatusConfig', () => {
    test('returns status configuration for valid category and status', () => {
      const config = getStatusConfig('USER', 'active');
      expect(config).toHaveProperty('label');
      expect(config).toHaveProperty('color');
      expect(config.label).toBe('活跃');
    });

    test('handles case-insensitive input', () => {
      const config1 = getStatusConfig('user', 'active');
      const config2 = getStatusConfig('USER', 'ACTIVE');
      expect(config1.label).toEqual(config2.label);
    });

    test('returns default for invalid category', () => {
      const config = getStatusConfig('INVALID', 'status');
      expect(config.color).toBe('default');
      expect(config.variant).toBe('outlined');
    });

    test('returns default for invalid status', () => {
      const config = getStatusConfig('USER', 'invalid_status');
      expect(config.color).toBe('default');
    });

    test('handles all major status categories', () => {
      const categories = ['USER', 'NOVEL', 'CHAPTER', 'COMMENT', 'REVIEW'];
      categories.forEach((cat) => {
        const statuses = Object.keys(STATUS_DEFINITIONS[cat]);
        statuses.forEach((status) => {
          const config = getStatusConfig(cat, status);
          expect(config).toHaveProperty('label');
          expect(config).toHaveProperty('color');
        });
      });
    });
  });
});
