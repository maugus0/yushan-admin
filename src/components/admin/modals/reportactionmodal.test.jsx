import ReportActionModal from './reportactionmodal';

describe('ReportActionModal', () => {
  test('module can be imported', () => {
    expect(ReportActionModal).toBeDefined();
  });

  test('is a valid React component', () => {
    expect(typeof ReportActionModal).toBe('function');
  });

  test('component is exported correctly', () => {
    expect(ReportActionModal).not.toBeNull();
  });
});
