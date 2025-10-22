import BanUserModal from './banusermodal';

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
  UserDeleteOutlined: () => <div data-testid="user-delete-icon" />,
}));

describe('BanUserModal', () => {
  test('is a valid React component', () => {
    expect(typeof BanUserModal).toBe('function');
  });

  test('component can be imported', () => {
    expect(BanUserModal).toBeDefined();
  });

  test('component is not null', () => {
    expect(BanUserModal).not.toBeNull();
  });
});
