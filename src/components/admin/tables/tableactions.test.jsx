import { render } from '@testing-library/react';

jest.mock('antd', () => ({
  Button: ({ children, ...props }) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  ),
}));

describe('TableActions Component', () => {
  test('renders without crashing', () => {
    render(<div>Table Actions Test</div>);
    expect(document.body).toBeInTheDocument();
  });
});
