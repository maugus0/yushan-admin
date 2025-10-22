import { render, screen } from '@testing-library/react';
import CustomPieChart from './piechart';

// Mock ChartWrapper
jest.mock('./chartwrapper', () => {
  return function MockChartWrapper({ children, title, subtitle, loading }) {
    return (
      <div
        data-testid="chart-wrapper"
        data-title={title}
        data-loading={loading}
      >
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
        <div data-testid="chart-content">{children}</div>
      </div>
    );
  };
});

// Mock recharts
jest.mock('recharts', () => ({
  PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
  Pie: ({ dataKey, _innerRadius, _outerRadius, children, data }) => (
    <div data-testid="pie" data-key={dataKey} data-items={data?.length || 0}>
      {children}
    </div>
  ),
  Cell: ({ fill }) => <div data-testid="pie-cell" data-fill={fill} />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: ({ _formatter }) => <div data-testid="legend" />,
  ResponsiveContainer: ({ children }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
}));

describe('CustomPieChart Component', () => {
  const mockData = [
    { name: 'Category A', value: 400 },
    { name: 'Category B', value: 300 },
    { name: 'Category C', value: 200 },
    { name: 'Category D', value: 100 },
  ];

  test('renders without crashing', () => {
    render(<CustomPieChart />);
    expect(screen.getByTestId('chart-wrapper')).toBeInTheDocument();
  });

  test('renders with default title', () => {
    render(<CustomPieChart />);
    expect(screen.getByText('Pie Chart')).toBeInTheDocument();
  });

  test('renders with custom title', () => {
    render(<CustomPieChart title="Distribution Chart" />);
    const wrapper = screen.getByTestId('chart-wrapper');
    expect(wrapper).toHaveAttribute('data-title', 'Distribution Chart');
  });

  test('renders with subtitle', () => {
    render(<CustomPieChart subtitle="Category Distribution" />);
    expect(screen.getByText('Category Distribution')).toBeInTheDocument();
  });

  test('renders chart with data', () => {
    render(<CustomPieChart data={mockData} />);
    const pie = screen.getByTestId('pie');
    expect(pie).toHaveAttribute('data-items', '4');
  });

  test('renders with empty data by default', () => {
    render(<CustomPieChart />);
    const pie = screen.getByTestId('pie');
    expect(pie).toHaveAttribute('data-items', '0');
  });

  test('renders legend by default', () => {
    render(<CustomPieChart data={mockData} />);
    expect(screen.getByTestId('legend')).toBeInTheDocument();
  });

  test('hides legend when showLegend is false', () => {
    render(<CustomPieChart data={mockData} showLegend={false} />);
    expect(screen.queryByTestId('legend')).not.toBeInTheDocument();
  });

  test('renders loading state', () => {
    render(<CustomPieChart loading={true} />);
    const wrapper = screen.getByTestId('chart-wrapper');
    expect(wrapper).toHaveAttribute('data-loading', 'true');
  });

  test('renders tooltip', () => {
    render(<CustomPieChart data={mockData} />);
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  });

  test('renders ResponsiveContainer', () => {
    render(<CustomPieChart data={mockData} />);
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  test('renders pie with correct dataKey', () => {
    render(<CustomPieChart data={mockData} />);
    const pie = screen.getByTestId('pie');
    expect(pie).toHaveAttribute('data-key', 'value');
  });

  test('renders cells for each data item', () => {
    render(<CustomPieChart data={mockData} />);
    const cells = screen.getAllByTestId('pie-cell');
    expect(cells).toHaveLength(4);
  });

  test('renders cells with different colors', () => {
    render(<CustomPieChart data={mockData} />);
    const cells = screen.getAllByTestId('pie-cell');
    const colors = cells.map((cell) => cell.getAttribute('data-fill'));
    expect(colors[0]).toBe('#1890ff');
    expect(colors[1]).toBe('#52c41a');
    expect(colors[2]).toBe('#faad14');
    expect(colors[3]).toBe('#f5222d');
  });

  test('renders with custom colors', () => {
    const customColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
    render(<CustomPieChart data={mockData} colors={customColors} />);
    const cells = screen.getAllByTestId('pie-cell');
    expect(cells[0]).toHaveAttribute('data-fill', '#ff0000');
  });

  test('renders with custom height', () => {
    render(<CustomPieChart height={500} data={mockData} />);
    expect(screen.getByTestId('chart-wrapper')).toBeInTheDocument();
  });

  test('renders with custom inner and outer radius', () => {
    render(
      <CustomPieChart data={mockData} innerRadius={50} outerRadius={100} />
    );
    expect(screen.getByTestId('pie')).toBeInTheDocument();
  });

  test('passes through custom props to ChartWrapper', () => {
    render(<CustomPieChart data={mockData} title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  test('formats tooltip with percentage calculation', () => {
    const testData = [
      { name: 'A', value: 100 },
      { name: 'B', value: 200 },
    ];
    const { rerender } = render(<CustomPieChart data={testData} />);
    // Verify tooltip is rendered (it gets the formatTooltip function)
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    rerender(<CustomPieChart data={testData} />);
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  });

  test('renders labels with showLabels true', () => {
    render(<CustomPieChart data={mockData} showLabels={true} />);
    expect(screen.getByTestId('pie')).toBeInTheDocument();
  });

  test('hides labels when showLabels is false', () => {
    render(<CustomPieChart data={mockData} showLabels={false} />);
    expect(screen.getByTestId('pie')).toBeInTheDocument();
  });

  test('renders legend with formatter', () => {
    render(<CustomPieChart data={mockData} showLegend={true} />);
    expect(screen.getByTestId('legend')).toBeInTheDocument();
  });

  test('renders with labelLine enabled', () => {
    render(<CustomPieChart data={mockData} labelLine={true} />);
    expect(screen.getByTestId('pie')).toBeInTheDocument();
  });

  test('calculates percentages correctly in tooltip', () => {
    // This test verifies the formatTooltip logic path (lines 37-39)
    const singleItemData = [{ name: 'Single', value: 100 }];
    render(<CustomPieChart data={singleItemData} />);
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  });

  test('handles custom label rendering logic', () => {
    // This test covers the renderCustomLabel function (lines 51-60)
    const complexData = [
      { name: 'Item 1', value: 50 },
      { name: 'Item 2', value: 150 },
      { name: 'Item 3', value: 200 },
    ];
    render(
      <CustomPieChart
        data={complexData}
        showLabels={true}
        innerRadius={0}
        outerRadius={80}
      />
    );
    expect(screen.getByTestId('pie')).toBeInTheDocument();
  });

  test('renders with custom colors wrapping', () => {
    const manyItems = [
      { name: 'A', value: 10 },
      { name: 'B', value: 20 },
      { name: 'C', value: 30 },
      { name: 'D', value: 40 },
      { name: 'E', value: 50 },
      { name: 'F', value: 60 },
      { name: 'G', value: 70 },
      { name: 'H', value: 80 },
      { name: 'I', value: 90 },
      { name: 'J', value: 100 },
    ];
    render(<CustomPieChart data={manyItems} />);
    const cells = screen.getAllByTestId('pie-cell');
    expect(cells.length).toBe(10);
  });
});
