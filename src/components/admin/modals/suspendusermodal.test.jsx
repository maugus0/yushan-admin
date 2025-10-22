import SuspendUserModal from './suspendusermodal';

describe('SuspendUserModal', () => {
  test('module can be imported', () => {
    expect(SuspendUserModal).toBeDefined();
  });

  test('is a valid React component', () => {
    expect(typeof SuspendUserModal).toBe('function');
  });

  test('component is exported correctly', () => {
    expect(SuspendUserModal).not.toBeNull();
  });
});
