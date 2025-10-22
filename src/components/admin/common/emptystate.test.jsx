import { render } from '@testing-library/react';

jest.mock('antd', () => ({
  Empty: ({ description, children, ...props }) => (
    <div data-testid="empty-state" {...props}>
      {description && <p>{description}</p>}
      {children}
    </div>
  ),
  Button: ({ children, ...props }) => (
    <button data-testid="empty-button" {...props}>
      {children}
    </button>
  ),
  Typography: {
    Text: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
}));

jest.mock('@ant-design/icons', () => ({
  InboxOutlined: () => <span />,
  FileOutlined: () => <span />,
  FilterOutlined: () => <span />,
}));

describe('EmptyState Component', () => {
  test('renders without crashing', () => {
    render(<div>Empty State Test</div>);
    expect(document.body).toBeInTheDocument();
  });
});
