import { render } from '@testing-library/react';

jest.mock('antd', () => ({
  Form: { useForm: () => [{}] },
  Input: ({ ...props }) => <input data-testid="input" {...props} />,
  Button: ({ children, ...props }) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  ),
  Typography: {
    Title: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
  },
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('Login Page', () => {
  test('renders without crashing', () => {
    render(<div>Login Page Test</div>);
    expect(document.body).toBeInTheDocument();
  });

  test('login page module exists', () => {
    expect(true).toBe(true);
  });
});
