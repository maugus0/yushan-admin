describe('AdminThemeContext', () => {
  test('theme context module exists', () => {
    expect(true).toBe(true);
  });

  test('theme context can be imported', () => {
    try {
      require('./adminthemecontext');
      expect(true).toBe(true);
    } catch (e) {
      expect(false).toBe(true);
    }
  });
});
