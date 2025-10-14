import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Space,
  Typography,
  Statistic,
  Button,
  Select,
  Table,
  Progress,
  Tabs,
  message,
} from 'antd';
import {
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  UserOutlined,
  TrophyOutlined,
  ShoppingCartOutlined,
  GiftOutlined,
  WalletOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { PageHeader, LoadingSpinner } from '../../../components/admin/common';
import {
  LineChart,
  AreaChart,
  BarChart,
  PieChart,
} from '../../../components/admin/charts';
import { yuanService } from '../../../services/admin/yuanservice';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const YuanStatistics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [period, setPeriod] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch statistics data
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await yuanService.getYuanStats(period);
        setStats(response.data);
      } catch (error) {
        message.error('Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [period]);

  const handleBack = () => {
    navigate('/admin/yuan');
  };

  if (loading) {
    return <LoadingSpinner tip="Loading yuan statistics..." />;
  }

  if (!stats) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>Failed to load statistics</Title>
        <Button onClick={handleBack}>Back to Yuan Management</Button>
      </div>
    );
  }

  // Prepare chart data
  const transactionTypeData = Object.entries(
    stats.transactionsByType || {}
  ).map(([type, count]) => ({
    name: type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    value: count,
  }));

  const flowData = [
    { name: 'Income', value: stats.periodIncome, fill: '#52c41a' },
    { name: 'Expenses', value: stats.periodExpenses, fill: '#ff4d4f' },
  ];

  // Mock daily data for charts (in real app, this would come from the service)
  const dailyData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      income: Math.floor(Math.random() * 50000) + 10000,
      expenses: Math.floor(Math.random() * 40000) + 8000,
      transactions: Math.floor(Math.random() * 500) + 100,
      activeUsers: Math.floor(Math.random() * 1000) + 200,
    };
  });

  // Top spenders columns
  const topSpendersColumns = [
    {
      title: 'Rank',
      key: 'rank',
      render: (_, __, index) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {index < 3 ? (
            <TrophyOutlined
              style={{
                color:
                  index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32',
                marginRight: 8,
              }}
            />
          ) : (
            <span style={{ marginRight: 8, fontWeight: 'bold' }}>
              {index + 1}
            </span>
          )}
        </div>
      ),
      width: 60,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (username) => (
        <Space>
          <UserOutlined />
          <Text strong>{username}</Text>
        </Space>
      ),
    },
    {
      title: 'Lifetime Spent',
      dataIndex: 'lifetimeSpent',
      key: 'lifetimeSpent',
      render: (amount) => (
        <Text strong style={{ color: '#ff4d4f' }}>
          {amount.toLocaleString()} 元
        </Text>
      ),
    },
    {
      title: 'Current Balance',
      dataIndex: 'currentBalance',
      key: 'currentBalance',
      render: (balance) => (
        <Text style={{ color: '#52c41a' }}>{balance.toLocaleString()} 元</Text>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Yuan Statistics"
        subtitle="Analytics and insights for platform currency"
        onBack={handleBack}
        breadcrumbs={[
          { title: 'Dashboard', href: '/admin/dashboard' },
          { title: 'Yuan', href: '/admin/yuan' },
          { title: 'Statistics' },
        ]}
        actions={[
          <Select
            key="period"
            value={period}
            onChange={setPeriod}
            style={{ width: 120 }}
          >
            <Option value="7d">Last 7 days</Option>
            <Option value="30d">Last 30 days</Option>
            <Option value="90d">Last 90 days</Option>
          </Select>,
        ]}
      />

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Overview" key="overview">
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            {/* Key Metrics */}
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Balance in System"
                    value={stats.totalBalance}
                    suffix="元"
                    valueStyle={{ color: '#1890ff' }}
                    prefix={<WalletOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Period Income"
                    value={stats.periodIncome}
                    suffix="元"
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<RiseOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Period Expenses"
                    value={stats.periodExpenses}
                    suffix="元"
                    valueStyle={{ color: '#ff4d4f' }}
                    prefix={<FallOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Net Flow"
                    value={stats.netFlow}
                    suffix="元"
                    valueStyle={{
                      color: stats.netFlow >= 0 ? '#52c41a' : '#ff4d4f',
                    }}
                    prefix={
                      stats.netFlow >= 0 ? <RiseOutlined /> : <FallOutlined />
                    }
                  />
                </Card>
              </Col>
            </Row>

            {/* Additional Metrics */}
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Transactions"
                    value={stats.totalTransactions}
                    prefix={<BarChartOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Avg Transaction Value"
                    value={stats.averageTransactionValue}
                    suffix="元"
                    prefix={<DollarOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Active Users"
                    value={stats.activeUsers}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Package Revenue"
                    value={stats.packageRevenue}
                    prefix="$"
                    precision={2}
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Charts */}
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={16}>
                <Card title="Daily Yuan Flow">
                  <AreaChart
                    data={dailyData}
                    areas={[
                      { dataKey: 'income', fill: '#52c41a', name: 'Income' },
                      {
                        dataKey: 'expenses',
                        fill: '#ff4d4f',
                        name: 'Expenses',
                      },
                    ]}
                    height={300}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card title="Transaction Types">
                  <PieChart data={transactionTypeData} height={300} />
                </Card>
              </Col>
            </Row>

            {/* Income vs Expenses Comparison */}
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card title="Income vs Expenses">
                  <BarChart
                    data={flowData}
                    bars={[
                      { dataKey: 'value', fill: '#8884d8', name: 'Amount' },
                    ]}
                    height={250}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Daily Active Users & Transactions">
                  <LineChart
                    data={dailyData}
                    lines={[
                      {
                        dataKey: 'activeUsers',
                        stroke: '#1890ff',
                        name: 'Active Users',
                      },
                      {
                        dataKey: 'transactions',
                        stroke: '#52c41a',
                        name: 'Transactions',
                      },
                    ]}
                    height={250}
                  />
                </Card>
              </Col>
            </Row>
          </Space>
        </TabPane>

        <TabPane tab="Top Spenders" key="spenders">
          <Card title="Top Spenders by Lifetime Spending">
            <Table
              columns={topSpendersColumns}
              dataSource={stats.topSpenders}
              pagination={false}
              rowKey="username"
            />
          </Card>
        </TabPane>

        <TabPane tab="Rewards" key="rewards">
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Card>
                  <Statistic
                    title="Total Reward Claims"
                    value={stats.rewardStats.totalClaims}
                    prefix={<GiftOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12}>
                <Card>
                  <Statistic
                    title="Total Yuan Awarded"
                    value={stats.rewardStats.totalAwarded}
                    suffix="元"
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<TrophyOutlined />}
                  />
                </Card>
              </Col>
            </Row>

            <Card title="Reward Distribution">
              <Text type="secondary">
                Reward programs have distributed a total of{' '}
                {stats.rewardStats.totalAwarded.toLocaleString()} Yuan across{' '}
                {stats.rewardStats.totalClaims.toLocaleString()} claims.
              </Text>
              <div style={{ marginTop: 16 }}>
                <Progress
                  percent={75}
                  status="active"
                  strokeColor="#52c41a"
                  format={() => 'Active Programs'}
                />
              </div>
            </Card>
          </Space>
        </TabPane>

        <TabPane tab="Packages" key="packages">
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Card>
                  <Statistic
                    title="Total Package Sales"
                    value={stats.packageSales}
                    prefix={<ShoppingCartOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12}>
                <Card>
                  <Statistic
                    title="Package Revenue (USD)"
                    value={stats.packageRevenue}
                    prefix="$"
                    precision={2}
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Card>
              </Col>
            </Row>

            <Card title="Package Performance">
              <Text type="secondary">
                Yuan packages have generated $
                {stats.packageRevenue.toLocaleString()} in revenue from{' '}
                {stats.packageSales.toLocaleString()} total sales.
              </Text>
              <div style={{ marginTop: 16 }}>
                <Progress
                  percent={Math.min((stats.packageSales / 10000) * 100, 100)}
                  status="active"
                  strokeColor="#722ed1"
                  format={(percent) => `${percent?.toFixed(1)}% of target`}
                />
              </div>
            </Card>
          </Space>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default YuanStatistics;
