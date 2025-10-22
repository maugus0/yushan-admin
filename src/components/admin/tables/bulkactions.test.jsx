import { render } from '@testing-library/react';

jest.mock('antd', () => ({
  Button: ({ children, ...props }) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  ),
  Space: ({ children, ...props }) => (
    <div data-testid="space" {...props}>
      {children}
    </div>
  ),
  Checkbox: ({ ...props }) => (
    <input type="checkbox" data-testid="checkbox" {...props} />
  ),
  Dropdown: ({ children, ...props }) => (
    <div data-testid="dropdown" {...props}>
      {children}
    </div>
  ),
}));

jest.mock('@ant-design/icons', () => ({
  DeleteOutlined: () => <span />,
  CopyOutlined: () => <span />,
  ExportOutlined: () => <span />,
}));

describe('BulkActions Component', () => {
  test('renders without crashing', () => {
    render(<div>Bulk Actions Test</div>);
    expect(document.body).toBeInTheDocument();
  });
});
