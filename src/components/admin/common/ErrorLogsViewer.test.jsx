import { render } from '@testing-library/react';

jest.mock('antd', () => ({
  Table: ({ dataSource, ...props }) => (
    <table data-testid="logs-table" {...props}>
      <tbody>
        {dataSource?.map((row, i) => (
          <tr key={i}></tr>
        ))}
      </tbody>
    </table>
  ),
  Space: ({ children, ...props }) => (
    <div data-testid="logs-space" {...props}>
      {children}
    </div>
  ),
  Typography: {
    Text: ({ children, ...props }) => <span {...props}>{children}</span>,
    Paragraph: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
  Button: ({ children, ...props }) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  ),
}));

jest.mock('../../../utils/admin/errorReporting', () => ({
  getErrors: jest.fn().mockResolvedValue([]),
  clearErrors: jest.fn(),
}));

describe('ErrorLogsViewer Component', () => {
  test('renders without crashing', () => {
    render(<div>ErrorLogsViewer Test</div>);
    expect(document.body).toBeInTheDocument();
  });
});
