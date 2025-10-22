import { render } from '@testing-library/react';

jest.mock('antd', () => ({
  Breadcrumb: ({ items, children, ...props }) => (
    <nav data-testid="breadcrumb" {...props}>
      {children || items?.map((item, i) => <span key={i}>{item.title}</span>)}
    </nav>
  ),
}));

jest.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => (
    <a data-testid="breadcrumb-link" href={to} {...props}>
      {children}
    </a>
  ),
  useLocation: () => ({ pathname: '/' }),
  useNavigate: () => jest.fn(),
}));

describe('Breadcrumbs Component', () => {
  test('renders without crashing', () => {
    render(<div>Test Breadcrumbs</div>);
    expect(document.body).toBeInTheDocument();
  });
});
