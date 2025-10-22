import { APP_CONFIG, API_ENDPOINTS } from './constants';

describe('Constants Module', () => {
  describe('APP_CONFIG', () => {
    test('has required application configuration', () => {
      expect(APP_CONFIG).toBeDefined();
      expect(APP_CONFIG.NAME).toBe('Yushan Admin');
      expect(APP_CONFIG.VERSION).toBe('1.0.0');
      expect(APP_CONFIG.DEFAULT_LANGUAGE).toBe('zh-CN');
    });

    test('has valid settings', () => {
      expect(APP_CONFIG.ITEMS_PER_PAGE).toBe(20);
      expect(APP_CONFIG.MAX_UPLOAD_SIZE).toBeGreaterThan(0);
    });
  });

  describe('API_ENDPOINTS', () => {
    test('API_ENDPOINTS is defined', () => {
      expect(API_ENDPOINTS).toBeDefined();
    });

    test('has core endpoints', () => {
      expect(API_ENDPOINTS.AUTH).toBeDefined();
      expect(API_ENDPOINTS.USERS).toBeDefined();
      expect(API_ENDPOINTS.NOVELS).toBeDefined();
    });

    test('auth endpoints are strings', () => {
      expect(typeof API_ENDPOINTS.AUTH.LOGIN).toBe('string');
      expect(typeof API_ENDPOINTS.AUTH.LOGOUT).toBe('string');
    });

    test('user endpoints are configured', () => {
      expect(API_ENDPOINTS.USERS.LIST).toBeDefined();
      expect(API_ENDPOINTS.USERS.BAN).toBeDefined();
      expect(API_ENDPOINTS.USERS.SUSPEND).toBeDefined();
    });

    test('novel endpoints are configured', () => {
      expect(API_ENDPOINTS.NOVELS).toBeDefined();
      expect(API_ENDPOINTS.NOVELS.LIST).toBeDefined();
      expect(API_ENDPOINTS.NOVELS.APPROVE).toBeDefined();
    });
  });

  describe('All endpoint categories exist', () => {
    test('has all required endpoint categories', () => {
      const categories = [
        'AUTH',
        'USERS',
        'NOVELS',
        'CHAPTERS',
        'COMMENTS',
        'REVIEWS',
        'REPORTS',
        'CATEGORIES',
        'YUAN',
        'RANKINGS',
        'SETTINGS',
        'DASHBOARD',
      ];
      categories.forEach((cat) => {
        expect(API_ENDPOINTS[cat]).toBeDefined();
      });
    });
  });
});
