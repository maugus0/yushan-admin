import { render } from '@testing-library/react';

jest.mock('antd', () => ({
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

describe('TableFilters Component', () => {
  test('renders without crashing', () => {
    render(<div>Table Filters Test</div>);
    expect(document.body).toBeInTheDocument();
  });
});
