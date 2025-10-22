import ConfirmDialog from './confirmdialog';

describe('ConfirmDialog', () => {
  test('module can be imported', () => {
    expect(ConfirmDialog).toBeDefined();
  });

  test('is a valid React component', () => {
    expect(typeof ConfirmDialog).toBe('function');
  });

  test('component is exported correctly', () => {
    expect(ConfirmDialog).not.toBeNull();
  });
});
