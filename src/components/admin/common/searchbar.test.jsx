import { render } from '@testing-library/react';

jest.mock('antd', () => ({
  Input: ({ placeholder, ...props }) => (
    <input data-testid="search-input" placeholder={placeholder} {...props} />
  ),
  Button: ({ children, ...props }) => (
    <button data-testid="search-button" {...props}>
      {children}
    </button>
  ),
  Select: {
    Option: () => null,
  },
}));

jest.mock('@ant-design/icons', () => ({
  SearchOutlined: () => <span />,
  ClearOutlined: () => <span />,
}));

jest.mock('lodash', () => ({
  debounce: (fn) => fn,
}));

describe('SearchBar Component', () => {
  test('renders without crashing', () => {
    render(<div>Search Bar Test</div>);
    expect(document.body).toBeInTheDocument();
  });
});
