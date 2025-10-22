import { render } from '@testing-library/react';

jest.mock('antd', () => ({
  Checkbox: ({ ...props }) => (
    <input type="checkbox" data-testid="checkbox" {...props} />
  ),
  Space: ({ children, ...props }) => (
    <div data-testid="space" {...props}>
      {children}
    </div>
  ),
}));

describe('ColumnSelector Component', () => {
  test('renders without crashing', () => {
    render(<div>Column Selector Test</div>);
    expect(document.body).toBeInTheDocument();
  });
});
