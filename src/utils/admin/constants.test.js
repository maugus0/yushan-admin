import {
  APP_CONFIG,
  API_ENDPOINTS,
  STATUS,
  USER_ROLES,
  NOVEL_GENRES,
  PRIORITY_LEVELS,
  REPORT_TYPES,
  DATE_FORMATS,
  THEMES,
  LANGUAGES,
  FILE_TYPES,
  TABLE_CONFIG,
  CHART_COLORS,
  ANIMATION,
  Z_INDEX,
  BREAKPOINTS,
  commonFilters,
  fieldTypes,
  validationRules,
  TABLE_ACTIONS,
  BULK_ACTIONS,
  EXPORT_FORMATS,
  SEARCH_OPERATORS,
  ERROR_CODES,
  SUCCESS_CODES,
  STORAGE_KEYS,
} from './constants';

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

  describe('STATUS', () => {
    test('has key statuses', () => {
      expect(STATUS.ACTIVE).toBe('active');
      expect(STATUS.SUSPENDED).toBe('suspended');
      expect(STATUS.BANNED).toBe('banned');
      expect(STATUS.PUBLISHED).toBe('published');
      expect(STATUS.RESOLVED).toBe('resolved');
    });
  });

  describe('USER_ROLES', () => {
    test('contains all roles', () => {
      expect(USER_ROLES.SUPER_ADMIN).toBe('super_admin');
      expect(USER_ROLES.ADMIN).toBe('admin');
      expect(USER_ROLES.EDITOR).toBe('editor');
      expect(USER_ROLES.AUTHOR).toBe('author');
      expect(USER_ROLES.USER).toBe('user');
    });
  });

  describe('NOVEL_GENRES', () => {
    test('includes representative genres', () => {
      expect(NOVEL_GENRES.FANTASY).toBe('fantasy');
      expect(NOVEL_GENRES.ROMANCE).toBe('romance');
      expect(NOVEL_GENRES.MARTIAL_ARTS).toBe('martial_arts');
      expect(NOVEL_GENRES.CULTIVATION).toBe('cultivation');
      expect(NOVEL_GENRES.SCIFI).toBe('scifi');
    });
  });

  describe('PRIORITY_LEVELS', () => {
    test('priority labels', () => {
      expect(PRIORITY_LEVELS.LOW).toBe('low');
      expect(PRIORITY_LEVELS.CRITICAL).toBe('critical');
    });
  });

  describe('REPORT_TYPES', () => {
    test('report categories', () => {
      expect(REPORT_TYPES.SPAM).toBe('spam');
      expect(REPORT_TYPES.COPYRIGHT).toBe('copyright');
      expect(REPORT_TYPES.OTHER).toBe('other');
    });
  });

  describe('DATE_FORMATS', () => {
    test('format strings are defined', () => {
      expect(DATE_FORMATS.SHORT).toMatch(/YYYY/);
      expect(DATE_FORMATS.DATETIME).toMatch(/HH:mm/);
    });
  });

  describe('TABLE_CONFIG', () => {
    test('pagination and limits', () => {
      expect(TABLE_CONFIG.DEFAULT_PAGE_SIZE).toBeGreaterThan(0);
      expect(TABLE_CONFIG.PAGE_SIZE_OPTIONS).toContain(10);
      expect(TABLE_CONFIG.MAX_EXPORT_ROWS).toBeGreaterThan(0);
    });
  });

  describe('EXPORT_FORMATS', () => {
    test('export options', () => {
      expect(EXPORT_FORMATS.CSV).toBe('csv');
      expect(EXPORT_FORMATS.EXCEL).toBe('excel');
      expect(EXPORT_FORMATS.JSON).toBe('json');
      expect(EXPORT_FORMATS.PDF).toBe('pdf');
    });
  });

  describe('ERROR_CODES and SUCCESS_CODES', () => {
    test('HTTP error codes', () => {
      expect(ERROR_CODES.UNAUTHORIZED).toBe(401);
      expect(ERROR_CODES.NOT_FOUND).toBe(404);
      expect(ERROR_CODES.SERVER_ERROR).toBe(500);
    });
    test('HTTP success codes', () => {
      expect(SUCCESS_CODES.OK).toBe(200);
      expect(SUCCESS_CODES.CREATED).toBe(201);
      expect(SUCCESS_CODES.DELETED).toBe(204);
    });
  });

  describe('STORAGE_KEYS', () => {
    test('storage key strings', () => {
      expect(STORAGE_KEYS.AUTH_TOKEN).toMatch(/token/i);
      expect(STORAGE_KEYS.USER_PROFILE).toMatch(/user/i);
      expect(typeof STORAGE_KEYS.TABLE_SETTINGS).toBe('string');
    });
  });

  describe('UI and theme constants', () => {
    test('themes exist', () => {
      expect(Object.values(THEMES)).toEqual(
        expect.arrayContaining(['light', 'dark', 'auto'])
      );
    });
    test('languages include zh-CN and en-US', () => {
      expect(LANGUAGES.ZH_CN).toBe('zh-CN');
      expect(LANGUAGES.EN_US).toBe('en-US');
    });
    test('file types include images and documents', () => {
      expect(FILE_TYPES.IMAGE).toEqual(expect.arrayContaining(['jpg', 'png']));
      expect(FILE_TYPES.DOCUMENT).toEqual(
        expect.arrayContaining(['pdf', 'doc'])
      );
    });
    test('chart colors arrays not empty', () => {
      expect(CHART_COLORS.PRIMARY.length).toBeGreaterThan(0);
    });
    test('animation and z-index expose numeric values', () => {
      expect(ANIMATION.NORMAL).toBeGreaterThan(0);
      expect(Z_INDEX.MODAL).toBeGreaterThan(0);
    });
    test('breakpoints are numeric', () => {
      expect(BREAKPOINTS.MD).toBeGreaterThan(0);
    });
  });

  describe('commonFilters', () => {
    test('has search/status/dateRange quick filters', () => {
      expect(commonFilters.search.type).toBe('text');
      expect(commonFilters.status.type).toBe('select');
      expect(commonFilters.dateRange.type).toBe('daterange');
    });
  });

  describe('fieldTypes', () => {
    test('factory returns config objects with type and name', () => {
      const f = fieldTypes.text('title', 'Title');
      expect(f.type).toBe('text');
      expect(f.name).toBe('title');
      const s = fieldTypes.select('status', 'Status', [
        { label: 'A', value: 'a' },
      ]);
      expect(s.type).toBe('select');
      expect(s.options[0].value).toBe('a');
    });
  });

  describe('validationRules', () => {
    test('has required/email/password rules', () => {
      expect(validationRules.required.required).toBe(true);
      expect(validationRules.email.type).toBe('email');
      expect(validationRules.password.min).toBeGreaterThan(0);
    });
  });

  describe('Table and bulk actions enums', () => {
    test('TABLE_ACTIONS include CRUD', () => {
      expect(TABLE_ACTIONS.VIEW).toBe('view');
      expect(TABLE_ACTIONS.EDIT).toBe('edit');
      expect(TABLE_ACTIONS.DELETE).toBe('delete');
    });
    test('BULK_ACTIONS include bulk operations', () => {
      expect(BULK_ACTIONS.DELETE).toBe('bulk_delete');
      expect(BULK_ACTIONS.EXPORT).toBe('bulk_export');
    });
  });

  describe('SEARCH_OPERATORS', () => {
    test('string operators defined', () => {
      expect(SEARCH_OPERATORS.CONTAINS).toBe('contains');
      expect(SEARCH_OPERATORS.STARTS_WITH).toBe('starts_with');
      expect(SEARCH_OPERATORS.BETWEEN).toBe('between');
    });
  });

  describe('APP_CONFIG sanity', () => {
    test('timeouts and sizes are positive', () => {
      expect(APP_CONFIG.MAX_UPLOAD_SIZE).toBeGreaterThan(0);
      expect(APP_CONFIG.SESSION_TIMEOUT).toBeGreaterThan(0);
    });
  });

  describe('API_ENDPOINTS shape', () => {
    test('AUTH endpoints include LOGIN/LOGOUT/REFRESH/PROFILE', () => {
      expect(API_ENDPOINTS.AUTH).toEqual(
        expect.objectContaining({
          LOGIN: expect.any(String),
          LOGOUT: expect.any(String),
          REFRESH: expect.any(String),
          PROFILE: expect.any(String),
        })
      );
    });
  });
});
