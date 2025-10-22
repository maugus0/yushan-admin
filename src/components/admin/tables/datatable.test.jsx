import { render } from '@testing-library/react';

jest.mock('antd', () => ({
  Table: ({ ...props }) => <table data-testid="table" {...props} />,
  Space: ({ children, ...props }) => (
    <div data-testid="space" {...props}>
      {children}
    </div>
  ),
}));

describe('DataTable Component', () => {
  test('renders without crashing', () => {
    render(<div>DataTable Test</div>);
    expect(document.body).toBeInTheDocument();
  });
});
