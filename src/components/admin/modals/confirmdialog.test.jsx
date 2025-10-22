import ConfirmDialog from './confirmdialog';

// Mock antd icons
jest.mock('@ant-design/icons', () => ({
  ExclamationCircleOutlined: () => <div data-testid="exclamation-icon" />,
  QuestionCircleOutlined: () => <div data-testid="question-icon" />,
  InfoCircleOutlined: () => <div data-testid="info-icon" />,
  CheckCircleOutlined: () => <div data-testid="check-icon" />,
  CloseCircleOutlined: () => <div data-testid="close-icon" />,
}));

describe('ConfirmDialog', () => {
  test('is a valid React component', () => {
    expect(typeof ConfirmDialog).toBe('function');
  });

  test('component can be imported', () => {
    expect(ConfirmDialog).toBeDefined();
  });

  test('component is not null', () => {
    expect(ConfirmDialog).not.toBeNull();
  });
});
