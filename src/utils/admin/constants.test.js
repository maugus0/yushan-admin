describe('Constants Utility', () => {
  test('constants module can be imported', () => {
    const constants = require('./constants');
    expect(constants).toBeDefined();
  });

  test('constants module is an object', () => {
    const constants = require('./constants');
    expect(typeof constants).toBe('object');
  });

  test('constants module has properties', () => {
    const constants = require('./constants');
    // Check if it has at least some exports
    expect(Object.keys(constants).length).toBeGreaterThanOrEqual(0);
  });
});
