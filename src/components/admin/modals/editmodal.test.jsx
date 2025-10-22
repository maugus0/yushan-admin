import EditModal from './editmodal';

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
  EditOutlined: () => <div data-testid="edit-icon" />,
  UploadOutlined: () => <div data-testid="upload-icon" />,
  SaveOutlined: () => <div data-testid="save-icon" />,
  ReloadOutlined: () => <div data-testid="reload-icon" />,
}));

// Mock dayjs
jest.mock('dayjs', () => {
  const originalDayjs = jest.requireActual('dayjs');
  return {
    ...originalDayjs,
    default: jest.fn(() => ({
      format: jest.fn(() => '2023-01-01'),
      isValid: jest.fn(() => true),
    })),
  };
});

describe('EditModal', () => {
  test('is a valid React component', () => {
    expect(typeof EditModal).toBe('function');
  });

  test('component can be imported', () => {
    expect(EditModal).toBeDefined();
  });

  test('component is not null', () => {
    expect(EditModal).not.toBeNull();
  });
});
