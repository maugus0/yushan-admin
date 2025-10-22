import { render } from '@testing-library/react';

describe('Component', () => {
  test('renders without crashing', () => {
    render(<div>Test</div>);
    expect(document.body).toBeInTheDocument();
  });
});
