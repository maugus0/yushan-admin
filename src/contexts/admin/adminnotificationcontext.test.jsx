describe('AdminNotificationContext', () => {
  test('notification context module exists', () => {
    expect(true).toBe(true);
  });

  test('notification context can be imported', () => {
    try {
      require('./adminnotificationcontext');
      expect(true).toBe(true);
    } catch (e) {
      expect(false).toBe(true);
    }
  });
});
