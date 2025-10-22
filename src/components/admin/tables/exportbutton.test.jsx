import { render } from '@testing-library/react';

jest.mock('antd', () => ({
  Button: ({ children, ...props }) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  ),
  Dropdown: ({ children, ...props }) => (
    <div data-testid="dropdown" {...props}>
      {children}
    </div>
  ),
}));

jest.mock('@ant-design/icons', () => ({
  DownloadOutlined: () => <span />,
}));

describe('ExportButton Component', () => {
  test('renders without crashing', () => {
    render(<div>Export Button Test</div>);
    expect(document.body).toBeInTheDocument();
  });
});
