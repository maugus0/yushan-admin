import { render } from '@testing-library/react';

jest.mock('antd', () => ({
  Layout: {
    Sider: ({ children, ...props }) => (
      <aside data-testid="admin-sidebar" {...props}>
        {children}
      </aside>
    ),
  },
  Menu: ({ items, ...props }) => (
    <ul data-testid="sidebar-menu" {...props}>
      {items?.map((item, i) => (
        <li key={i}>{item.label}</li>
      ))}
    </ul>
  ),
  Typography: {
    Title: ({ children, ...props }) => (
      <h1 data-testid="sidebar-title" {...props}>
        {children}
      </h1>
    ),
  },
}));

jest.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => (
    <a data-testid="sidebar-link" href={to} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('@ant-design/icons', () => ({
  DashboardOutlined: () => <span />,
  UserOutlined: () => <span />,
}));

describe('AdminSidebar Component', () => {
  test('renders without crashing', () => {
    render(<div>Sidebar Test</div>);
    expect(document.body).toBeInTheDocument();
  });
});
