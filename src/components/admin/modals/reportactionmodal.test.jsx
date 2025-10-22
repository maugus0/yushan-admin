import ReportActionModal from './reportactionmodal';

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
  FlagOutlined: () => <div data-testid="flag-icon" />,
  UserOutlined: () => <div data-testid="user-icon" />,
  CloseOutlined: () => <div data-testid="close-icon" />,
  ExclamationCircleOutlined: () => <div data-testid="exclamation-icon" />,
  EyeOutlined: () => <div data-testid="eye-icon" />,
}));

describe('ReportActionModal', () => {
  test('is a valid React component', () => {
    expect(typeof ReportActionModal).toBe('function');
  });

  test('component can be imported', () => {
    expect(ReportActionModal).toBeDefined();
  });

  test('component is not null', () => {
    expect(ReportActionModal).not.toBeNull();
  });
});
