import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Button, 
  Space, 
  Typography,
  List,
  Avatar,
  Tag
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  EditOutlined,
  PlusOutlined,
  BookOutlined,
  DollarOutlined,
  TrophyOutlined,
  RiseOutlined
} from '@ant-design/icons';

// Import components
import { userService } from '../../../services/admin/userservice';
import PageHeader from '../../../components/admin/common/pageheader';
import Breadcrumbs from '../../../components/admin/common/breadcrumbs';
import StatusBadge from '../../../components/admin/common/statusbadge';

const { Text } = Typography;

const UsersOverview = () => {
  const navigate = useNavigate();
  
  // State management
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReaders: 0,
    totalWriters: 0,
    activeUsers: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);

  // Fetch overview data
  const fetchOverviewData = async () => {
    setLoading(true);
    try {
      // Fetch recent users
      const [readersResponse, writersResponse] = await Promise.all([
        userService.getReaders({ page: 1, pageSize: 5 }),
        userService.getWriters({ page: 1, pageSize: 5 })
      ]);

      const allReaders = await userService.getReaders({ page: 1, pageSize: 100 });
      const allWriters = await userService.getWriters({ page: 1, pageSize: 100 });

      // Calculate statistics
      const totalReaders = allReaders.total;
      const totalWriters = allWriters.total;
      const activeReaders = allReaders.data.filter(user => user.status === 'active').length;
      const activeWriters = allWriters.data.filter(user => user.status === 'active').length;

      setStats({
        totalUsers: totalReaders + totalWriters,
        totalReaders,
        totalWriters,
        activeUsers: activeReaders + activeWriters,
      });

      // Combine recent users
      const combinedUsers = [
        ...readersResponse.data.map(user => ({ ...user, userType: 'reader' })),
        ...writersResponse.data.map(user => ({ ...user, userType: 'writer' }))
      ].sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate)).slice(0, 6);

      setRecentUsers(combinedUsers);
    } catch (error) {
      console.error('Failed to fetch overview data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  // Mock top performers data
  const topReaders = [
    { id: 1, name: 'Alice Johnson', booksRead: 156, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
    { id: 2, name: 'Bob Smith', booksRead: 134, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
    { id: 3, name: 'Carol Davis', booksRead: 98, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol' },
  ];

  const topWriters = [
    { id: 1, name: 'Sarah Connor', earnings: 15420, novels: 12, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { id: 2, name: 'Michael Scott', earnings: 12890, novels: 8, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
    { id: 3, name: 'Elena Vasquez', earnings: 9650, novels: 6, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
  ];

  const breadcrumbItems = [
    { title: 'Admin' },
    { title: 'User Management' },
    { title: 'Overview' },
  ];

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      
      <PageHeader
        title="User Management"
        subtitle="Overview of readers and writers on the platform"
        extra={[
          <Button
            key="readers"
            icon={<UserOutlined />}
            onClick={() => navigate('/admin/users/readers')}
          >
            Manage Readers
          </Button>,
          <Button
            key="writers"
            icon={<EditOutlined />}
            onClick={() => navigate('/admin/users/writers')}
          >
            Manage Writers
          </Button>
        ]}
      />

      {/* Statistics Overview */}
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={stats.totalUsers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Readers"
              value={stats.totalReaders}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Writers"
              value={stats.totalWriters}
              prefix={<EditOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={stats.activeUsers}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={24}>
        {/* Recent Users */}
        <Col span={8}>
          <Card 
            title="Recent Users" 
            extra={
              <Button 
                type="link" 
                onClick={() => navigate('/admin/users/readers')}
              >
                View All
              </Button>
            }
          >
            <List
              dataSource={recentUsers}
              loading={loading}
              renderItem={user => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        src={user.avatar} 
                        icon={<UserOutlined />}
                      />
                    }
                    title={
                      <Space>
                        {user.username}
                        <Tag color={user.userType === 'reader' ? 'blue' : 'purple'}>
                          {user.userType}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Space>
                        <StatusBadge status={user.status} />
                        <Text type="secondary">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Top Readers */}
        <Col span={8}>
          <Card title="Top Readers" extra={<TrophyOutlined style={{ color: '#faad14' }} />}>
            <List
              dataSource={topReaders}
              renderItem={(reader, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Space>
                        <Text strong style={{ color: '#faad14' }}>#{index + 1}</Text>
                        <Avatar src={reader.avatar} icon={<UserOutlined />} />
                      </Space>
                    }
                    title={reader.name}
                    description={
                      <Space>
                        <BookOutlined />
                        <Text>{reader.booksRead} books read</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Top Writers */}
        <Col span={8}>
          <Card title="Top Writers" extra={<TrophyOutlined style={{ color: '#faad14' }} />}>
            <List
              dataSource={topWriters}
              renderItem={(writer, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Space>
                        <Text strong style={{ color: '#faad14' }}>#{index + 1}</Text>
                        <Avatar src={writer.avatar} icon={<EditOutlined />} />
                      </Space>
                    }
                    title={writer.name}
                    description={
                      <Space direction="vertical" size="small">
                        <Space>
                          <DollarOutlined />
                          <Text>${writer.earnings}</Text>
                        </Space>
                        <Space>
                          <BookOutlined />
                          <Text>{writer.novels} novels</Text>
                        </Space>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Card title="Quick Actions" style={{ marginTop: 24 }}>
        <Row gutter={16}>
          <Col span={6}>
            <Button 
              block 
              size="large" 
              icon={<PlusOutlined />}
              onClick={() => navigate('/admin/users/readers/new')}
            >
              Add New Reader
            </Button>
          </Col>
          <Col span={6}>
            <Button 
              block 
              size="large" 
              icon={<PlusOutlined />}
              onClick={() => navigate('/admin/users/writers/new')}
            >
              Add New Writer
            </Button>
          </Col>
          <Col span={6}>
            <Button 
              block 
              size="large" 
              icon={<UserOutlined />}
              onClick={() => navigate('/admin/users/readers')}
            >
              Manage Readers
            </Button>
          </Col>
          <Col span={6}>
            <Button 
              block 
              size="large" 
              icon={<EditOutlined />}
              onClick={() => navigate('/admin/users/writers')}
            >
              Manage Writers
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UsersOverview;
