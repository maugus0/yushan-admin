import { Row, Col, Typography, Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  BookOutlined,
  MessageOutlined,
  StarOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import {
  StatCard,
  LineChart,
  AreaChart,
  BarChart,
  PieChart,
} from '../../../components/admin/charts';

const { Title } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data - in real app, this would come from your API
  const stats = {
    totalUsers: 15847,
    totalNovels: 2341,
    totalChapters: 45623,
    totalComments: 89234,
    totalReviews: 12456,
    totalViews: 1234567,
  };

  // Chart data
  const userGrowthData = [
    { name: 'Jan', users: 4000, novels: 240 },
    { name: 'Feb', users: 5000, novels: 320 },
    { name: 'Mar', users: 6000, novels: 380 },
    { name: 'Apr', users: 7000, novels: 420 },
    { name: 'May', users: 8500, novels: 480 },
    { name: 'Jun', users: 10000, novels: 520 },
  ];

  const categoryData = [
    { name: 'Fantasy', value: 45 },
    { name: 'Romance', value: 30 },
    { name: 'Action', value: 15 },
    { name: 'Drama', value: 10 },
  ];

  const activityData = [
    { name: 'Mon', views: 12000, comments: 800, reviews: 120 },
    { name: 'Tue', views: 15000, comments: 950, reviews: 150 },
    { name: 'Wed', views: 18000, comments: 1200, reviews: 180 },
    { name: 'Thu', views: 16000, comments: 1000, reviews: 160 },
    { name: 'Fri', views: 22000, comments: 1400, reviews: 220 },
    { name: 'Sat', views: 25000, comments: 1600, reviews: 250 },
    { name: 'Sun', views: 20000, comments: 1300, reviews: 200 },
  ];

  const topNovelsData = [
    { name: 'The Cultivation Path', value: 25000 },
    { name: 'Immortal Realm', value: 18000 },
    { name: 'Dragon Emperor', value: 15000 },
    { name: 'Mystic Journey', value: 12000 },
    { name: 'Sword Master', value: 10000 },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New user registered',
      user: 'john_reader',
      time: '2 minutes ago',
    },
    {
      id: 2,
      action: 'Novel published',
      user: 'author_jane',
      time: '5 minutes ago',
    },
    {
      id: 3,
      action: 'Chapter updated',
      user: 'writer_bob',
      time: '10 minutes ago',
    },
    {
      id: 4,
      action: 'Review submitted',
      user: 'reviewer_alice',
      time: '15 minutes ago',
    },
  ];

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>Dashboard Overview</Title>
          <p>
            Welcome to Yushan Admin Panel. Here's what's happening on your
            platform.
          </p>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8} xl={4}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
              trend={{ value: 12.5, isPositive: true }}
            />
          </Col>

          <Col xs={24} sm={12} lg={8} xl={4}>
            <StatCard
              title="Total Novels"
              value={stats.totalNovels}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#1890ff' }}
              trend={{ value: 8.2, isPositive: true }}
            />
          </Col>

          <Col xs={24} sm={12} lg={8} xl={4}>
            <StatCard
              title="Total Chapters"
              value={stats.totalChapters}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#722ed1' }}
              trend={{ value: 15.3, isPositive: true }}
            />
          </Col>

          <Col xs={24} sm={12} lg={8} xl={4}>
            <StatCard
              title="Comments"
              value={stats.totalComments}
              prefix={<MessageOutlined />}
              valueStyle={{ color: '#fa8c16' }}
              trend={{ value: 3.1, isPositive: false }}
            />
          </Col>

          <Col xs={24} sm={12} lg={8} xl={4}>
            <StatCard
              title="Reviews"
              value={stats.totalReviews}
              prefix={<StarOutlined />}
              valueStyle={{ color: '#eb2f96' }}
              trend={{ value: 6.7, isPositive: true }}
            />
          </Col>

          <Col xs={24} sm={12} lg={8} xl={4}>
            <StatCard
              title="Total Views"
              value={stats.totalViews}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#52c41a' }}
              trend={{ value: 22.4, isPositive: true }}
            />
          </Col>
        </Row>

        {/* Charts Row 1 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <LineChart
              title="User & Novel Growth"
              subtitle="Monthly growth trends"
              data={userGrowthData}
              lines={[
                { dataKey: 'users', stroke: '#1890ff', name: 'Users' },
                { dataKey: 'novels', stroke: '#52c41a', name: 'Novels' },
              ]}
              height={350}
            />
          </Col>

          <Col xs={24} lg={8}>
            <PieChart
              title="Novel Categories"
              subtitle="Distribution by genre"
              data={categoryData}
              height={350}
            />
          </Col>
        </Row>

        {/* Charts Row 2 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <AreaChart
              title="Weekly Activity"
              subtitle="Views, comments and reviews"
              data={activityData}
              areas={[
                { dataKey: 'views', fill: '#1890ff', name: 'Views' },
                { dataKey: 'comments', fill: '#52c41a', name: 'Comments' },
                { dataKey: 'reviews', fill: '#faad14', name: 'Reviews' },
              ]}
              height={350}
              stackId="activity"
            />
          </Col>

          <Col xs={24} lg={12}>
            <BarChart
              title="Top Novels by Views"
              subtitle="Most popular novels this month"
              data={topNovelsData}
              bars={[{ dataKey: 'value', fill: '#722ed1', name: 'Views' }]}
              layout="vertical"
              height={350}
            />
          </Col>
        </Row>

        {/* Quick Actions & Recent Activity */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <StatCard
              title="Quick Actions"
              value=""
              extra={
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button
                    type="primary"
                    icon={<UserOutlined />}
                    block
                    onClick={() => navigate('/admin/users')}
                  >
                    Manage Users
                  </Button>
                  <Button
                    icon={<BookOutlined />}
                    block
                    onClick={() => navigate('/admin/novels')}
                  >
                    Add New Novel
                  </Button>
                  <Button
                    icon={<MessageOutlined />}
                    block
                    onClick={() => navigate('/admin/comments')}
                  >
                    Review Comments
                  </Button>
                  <Button
                    icon={<StarOutlined />}
                    block
                    onClick={() => navigate('/admin/reviews')}
                  >
                    Check Reviews
                  </Button>
                </Space>
              }
            />
          </Col>

          <Col xs={24} lg={12}>
            <StatCard
              title="Recent Activity"
              value=""
              extra={
                <Space direction="vertical" style={{ width: '100%' }}>
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      style={{
                        padding: '8px 0',
                        borderBottom: '1px solid #f0f0f0',
                      }}
                    >
                      <div style={{ fontWeight: 500 }}>{activity.action}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        by {activity.user} • {activity.time}
                      </div>
                    </div>
                  ))}
                </Space>
              }
            />
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default Dashboard;
