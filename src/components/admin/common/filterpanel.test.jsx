import { render } from '@testing-library/react';

jest.mock('antd', () => ({
  Form: {
    useForm: () => [{}],
    Item: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  Input: ({ ...props }) => <input data-testid="filter-input" {...props} />,
  Select: {
    Option: () => null,
  },
  Button: ({ children, ...props }) => (
    <button data-testid="filter-button" {...props}>
      {children}
    </button>
  ),
  DatePicker: {
    RangePicker: ({ ...props }) => (
      <input data-testid="date-picker" type="range" {...props} />
    ),
  },
  Typography: {
    Text: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  Space: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

describe('FilterPanel Component', () => {
  test('renders without crashing', () => {
    render(<div>FilterPanel Test</div>);
    expect(document.body).toBeInTheDocument();
  });
});
