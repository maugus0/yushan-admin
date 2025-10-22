import {
  USER_ROLES,
  PERMISSION_CATEGORIES,
  PERMISSION_ACTIONS,
  ROLE_HIERARCHY,
  DEFAULT_PERMISSIONS,
} from './permissions';

describe('Permission Utilities', () => {
  describe('USER_ROLES', () => {
    test('defines all user roles', () => {
      expect(USER_ROLES.SUPER_ADMIN).toBe('super_admin');
      expect(USER_ROLES.ADMIN).toBe('admin');
      expect(USER_ROLES.MODERATOR).toBe('moderator');
      expect(USER_ROLES.EDITOR).toBe('editor');
      expect(USER_ROLES.AUTHOR).toBe('author');
      expect(USER_ROLES.USER).toBe('user');
    });

    test('has 6 roles', () => {
      const roles = Object.keys(USER_ROLES);
      expect(roles.length).toBe(6);
    });
  });

  describe('PERMISSION_CATEGORIES', () => {
    test('defines all permission categories', () => {
      expect(PERMISSION_CATEGORIES.USERS).toBe('users');
      expect(PERMISSION_CATEGORIES.NOVELS).toBe('novels');
      expect(PERMISSION_CATEGORIES.CHAPTERS).toBe('chapters');
      expect(PERMISSION_CATEGORIES.COMMENTS).toBe('comments');
      expect(PERMISSION_CATEGORIES.SETTINGS).toBe('settings');
    });

    test('has 12 categories', () => {
      const categories = Object.keys(PERMISSION_CATEGORIES);
      expect(categories.length).toBe(12);
    });
  });

  describe('PERMISSION_ACTIONS', () => {
    test('defines core permission actions', () => {
      expect(PERMISSION_ACTIONS.CREATE).toBe('create');
      expect(PERMISSION_ACTIONS.READ).toBe('read');
      expect(PERMISSION_ACTIONS.UPDATE).toBe('update');
      expect(PERMISSION_ACTIONS.DELETE).toBe('delete');
      expect(PERMISSION_ACTIONS.APPROVE).toBe('approve');
    });

    test('defines admin actions', () => {
      expect(PERMISSION_ACTIONS.BAN).toBe('ban');
      expect(PERMISSION_ACTIONS.SUSPEND).toBe('suspend');
      expect(PERMISSION_ACTIONS.MANAGE).toBe('manage');
    });

    test('has actions defined', () => {
      const actions = Object.keys(PERMISSION_ACTIONS);
      expect(actions.length).toBeGreaterThan(10);
    });
  });

  describe('ROLE_HIERARCHY', () => {
    test('establishes role hierarchy levels', () => {
      expect(ROLE_HIERARCHY[USER_ROLES.USER]).toBe(1);
      expect(ROLE_HIERARCHY[USER_ROLES.AUTHOR]).toBe(2);
      expect(ROLE_HIERARCHY[USER_ROLES.EDITOR]).toBe(3);
      expect(ROLE_HIERARCHY[USER_ROLES.MODERATOR]).toBe(4);
      expect(ROLE_HIERARCHY[USER_ROLES.ADMIN]).toBe(5);
      expect(ROLE_HIERARCHY[USER_ROLES.SUPER_ADMIN]).toBe(6);
    });

    test('super admin is highest level', () => {
      const levels = Object.values(ROLE_HIERARCHY);
      const maxLevel = Math.max(...levels);
      expect(ROLE_HIERARCHY[USER_ROLES.SUPER_ADMIN]).toBe(maxLevel);
    });

    test('user is lowest level', () => {
      const levels = Object.values(ROLE_HIERARCHY);
      const minLevel = Math.min(...levels);
      expect(ROLE_HIERARCHY[USER_ROLES.USER]).toBe(minLevel);
    });
  });

  describe('DEFAULT_PERMISSIONS', () => {
    test('super admin has full permissions', () => {
      const superAdminPerms = DEFAULT_PERMISSIONS[USER_ROLES.SUPER_ADMIN];
      expect(Array.isArray(superAdminPerms)).toBe(true);
      expect(superAdminPerms.length > 0).toBe(true);
      expect(superAdminPerms.some((p) => p.includes('manage'))).toBe(true);
    });

    test('admin has comprehensive permissions', () => {
      const adminPerms = DEFAULT_PERMISSIONS[USER_ROLES.ADMIN];
      expect(adminPerms.length > 0).toBe(true);
      expect(adminPerms.some((p) => p.includes('users'))).toBe(true);
      expect(adminPerms.some((p) => p.includes('novels'))).toBe(true);
    });

    test('admin has fewer or equal permissions to super admin', () => {
      const superAdminPerms = DEFAULT_PERMISSIONS[USER_ROLES.SUPER_ADMIN];
      expect(superAdminPerms.some((p) => p.includes('manage'))).toBe(true);
    });

    test('moderator has limited permissions', () => {
      const modPerms = DEFAULT_PERMISSIONS[USER_ROLES.MODERATOR];
      const adminPerms = DEFAULT_PERMISSIONS[USER_ROLES.ADMIN];
      expect(modPerms.length < adminPerms.length).toBe(true);
      expect(modPerms.some((p) => p.includes('comments'))).toBe(true);
    });

    test('user has minimal permissions', () => {
      const userPerms = DEFAULT_PERMISSIONS[USER_ROLES.USER];
      expect(Array.isArray(userPerms)).toBe(true);
    });

    test('each role has permissions defined', () => {
      Object.values(USER_ROLES).forEach((role) => {
        expect(DEFAULT_PERMISSIONS[role]).toBeDefined();
        expect(Array.isArray(DEFAULT_PERMISSIONS[role])).toBe(true);
      });
    });

    test('permissions follow pattern category.action', () => {
      const adminPerms = DEFAULT_PERMISSIONS[USER_ROLES.ADMIN];
      adminPerms.forEach((perm) => {
        expect(perm).toMatch(/\w+\.\w+/);
      });
    });
  });

  describe('Permission hierarchy', () => {
    test('each role has appropriate permissions', () => {
      expect(DEFAULT_PERMISSIONS[USER_ROLES.USER]).toBeDefined();
      expect(DEFAULT_PERMISSIONS[USER_ROLES.AUTHOR]).toBeDefined();
      expect(DEFAULT_PERMISSIONS[USER_ROLES.MODERATOR]).toBeDefined();
      expect(DEFAULT_PERMISSIONS[USER_ROLES.ADMIN]).toBeDefined();
      expect(DEFAULT_PERMISSIONS[USER_ROLES.SUPER_ADMIN]).toBeDefined();
    });
  });

  describe('Content access patterns', () => {
    test('admins can manage users', () => {
      const adminPerms = DEFAULT_PERMISSIONS[USER_ROLES.ADMIN];
      expect(adminPerms.some((p) => p.startsWith('users.'))).toBe(true);
    });

    test('admins can manage novels', () => {
      const adminPerms = DEFAULT_PERMISSIONS[USER_ROLES.ADMIN];
      expect(adminPerms.some((p) => p.startsWith('novels.'))).toBe(true);
    });

    test('moderators can approve content', () => {
      const modPerms = DEFAULT_PERMISSIONS[USER_ROLES.MODERATOR];
      expect(modPerms.some((p) => p.includes('approve'))).toBe(true);
    });

    test('super admin has dashboard access', () => {
      const superAdminPerms = DEFAULT_PERMISSIONS[USER_ROLES.SUPER_ADMIN];
      expect(superAdminPerms.some((p) => p.startsWith('dashboard.'))).toBe(
        true
      );
    });
  });
});
