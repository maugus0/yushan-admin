import EditModal from './editmodal';

describe('EditModal', () => {
  test('module can be imported', () => {
    expect(EditModal).toBeDefined();
  });

  test('is a valid React component', () => {
    expect(typeof EditModal).toBe('function');
  });

  test('component is exported correctly', () => {
    expect(EditModal).not.toBeNull();
  });
});
