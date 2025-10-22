import ViewModal from './viewmodal';

describe('ViewModal', () => {
  test('module can be imported', () => {
    expect(ViewModal).toBeDefined();
  });

  test('is a valid React component', () => {
    expect(typeof ViewModal).toBe('function');
  });

  test('component is exported correctly', () => {
    expect(ViewModal).not.toBeNull();
  });
});
