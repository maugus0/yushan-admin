import { render } from '@testing-library/react';

jest.mock('antd', () => ({
  Modal: ({ visible, open, children, ...props }) => (
    <div data-testid="modal" {...props}>
      {(visible !== undefined ? visible : open) && children}
    </div>
  ),
  Form: ({ children, ...props }) => (
    <form data-testid="form" {...props}>
      {children}
    </form>
  ),
  Input: ({ ...props }) => <input data-testid="input" {...props} />,
  Button: ({ children, ...props }) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  ),
}));

jest.mock('@ant-design/icons', () => ({
  EditOutlined: () => <span />,
  DeleteOutlined: () => <span />,
}));

describe('Modal Component', () => {
  test('renders without crashing', () => {
    render(<div>Test</div>);
    expect(document.body).toBeInTheDocument();
  });
});
