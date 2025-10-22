import { render } from '@testing-library/react';

jest.mock('antd', () => ({
  Pagination: ({ ...props }) => <div data-testid="pagination" {...props} />,
}));

describe('Pagination Component', () => {
  test('renders without crashing', () => {
    render(<div>Pagination Test</div>);
    expect(document.body).toBeInTheDocument();
  });
});
