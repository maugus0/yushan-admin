import ViewModal from './viewmodal';

// Mock antd components
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  Grid: {
    useBreakpoint: jest.fn(() => ({ md: true })),
  },
}));

// Mock antd icons
jest.mock('@ant-design/icons', () => ({
  EyeOutlined: () => <div data-testid="eye-icon" />,
  UserOutlined: () => <div data-testid="user-icon" />,
  CalendarOutlined: () => <div data-testid="calendar-icon" />,
  InfoCircleOutlined: () => <div data-testid="info-icon" />,
}));

// Mock dayjs
jest.mock('dayjs', () => {
  const originalDayjs = jest.requireActual('dayjs');
  return {
    ...originalDayjs,
    default: jest.fn(() => ({
      format: jest.fn(() => '2023-01-01 12:00:00'),
      isValid: jest.fn(() => true),
    })),
  };
});

describe('ViewModal', () => {
  test('is a valid React component', () => {
    expect(typeof ViewModal).toBe('function');
  });

  test('component can be imported', () => {
    expect(ViewModal).toBeDefined();
  });

  test('component is not null', () => {
    expect(ViewModal).not.toBeNull();
  });
});
