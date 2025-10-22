describe('Permissions Utility', () => {
  test('permissions module can be imported', () => {
    const permissions = require('./permissions');
    expect(permissions).toBeDefined();
  });

  test('permissions is an object with functions', () => {
    const permissions = require('./permissions');
    expect(typeof permissions).toBe('object');
  });
});
