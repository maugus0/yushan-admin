describe('ExportUtils Utility', () => {
  test('export utils module can be imported', () => {
    const exportUtils = require('./exportutils');
    expect(exportUtils).toBeDefined();
  });

  test('export utils is an object', () => {
    const exportUtils = require('./exportutils');
    expect(typeof exportUtils).toBe('object');
  });
});
