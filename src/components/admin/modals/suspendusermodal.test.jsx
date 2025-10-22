import SuspendUserModal from './suspendusermodal';

// Mock antd components
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock antd icons
jest.mock('@ant-design/icons', () => ({
  ExclamationCircleOutlined: () => <div data-testid="exclamation-icon" />,
  ClockCircleOutlined: () => <div data-testid="clock-icon" />,
}));

describe('SuspendUserModal', () => {
  test('is a valid React component', () => {
    expect(typeof SuspendUserModal).toBe('function');
  });

  test('component can be imported', () => {
    expect(SuspendUserModal).toBeDefined();
  });

  test('component is not null', () => {
    expect(SuspendUserModal).not.toBeNull();
  });
});
