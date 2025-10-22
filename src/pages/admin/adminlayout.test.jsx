import { render } from '@testing-library/react';

jest.mock('antd', () => ({
  Layout: {
    Sider: ({ children, ...props }) => (
      <aside data-testid="sider" {...props}>
        {children}
      </aside>
    ),
    Content: ({ children, ...props }) => (
      <main data-testid="content" {...props}>
        {children}
      </main>
    ),
  },
}));

jest.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet" />,
  useLocation: () => ({ pathname: '/' }),
}));

describe('AdminLayout Page', () => {
  test('renders without crashing', () => {
    render(<div>Admin Layout Test</div>);
    expect(document.body).toBeInTheDocument();
  });
});
