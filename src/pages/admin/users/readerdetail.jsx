import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Button,
  Space,
  Typography,
  message,
  Avatar,
  Tag,
  Statistic,
  Row,
  Col,
  List,
  Progress,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  UserDeleteOutlined,
  BookOutlined,
  ClockCircleOutlined,
  StarOutlined,
  HeartOutlined,
  MessageOutlined,
} from '@ant-design/icons';

// Import modals
import EditModal from '../../../components/admin/modals/editmodal';
import DeleteConfirm from '../../../components/admin/modals/deleteconfirm';
import SuspendUserModal from '../../../components/admin/modals/suspendusermodal';
import BanUserModal from '../../../components/admin/modals/banusermodal';

// Import services and common components
import { userService } from '../../../services/admin/userservice';
import PageHeader from '../../../components/admin/common/pageheader';
import Breadcrumbs from '../../../components/admin/common/breadcrumbs';
import StatusBadge from '../../../components/admin/common/statusbadge';
import { fieldTypes } from '../../../utils/admin/constants';

const { Title, Text, Paragraph } = Typography;

const ReaderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State management
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Modal states
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [suspendModalVisible, setSuspendModalVisible] = useState(false);
  const [banModalVisible, setBanModalVisible] = useState(false);

  // Fetch user data
  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await userService.getUserById(id);
      setUser(response.data);
    } catch (error) {
      message.error('Failed to fetch user details');
      console.error('Fetch user error:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id, fetchUser]);

  // Event handlers
  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleDelete = () => {
    setDeleteModalVisible(true);
  };

  const handleSuspend = () => {
    setSuspendModalVisible(true);
  };

  const handleBan = () => {
    setBanModalVisible(true);
  };

  const handleBack = () => {
    navigate('/admin/users/readers');
  };

  // Modal handlers
  const handleEditSave = async (formData) => {
    try {
      await userService.updateUser(user.id, formData);
      message.success('Reader updated successfully');
      setEditModalVisible(false);
      fetchUser();
    } catch (error) {
      message.error('Failed to update reader');
      console.error('Update error:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await userService.deleteUser(user.id);
      message.success('Reader deleted successfully');
      setDeleteModalVisible(false);
      navigate('/admin/users/readers');
    } catch (error) {
      message.error('Failed to delete reader');
      console.error('Delete error:', error);
    }
  };

  const handleSuspendConfirm = async (suspensionData) => {
    try {
      await userService.suspendUser(user.id, suspensionData);
      message.success('Reader suspended successfully');
      setSuspendModalVisible(false);
      fetchUser();
    } catch (error) {
      message.error('Failed to suspend reader');
      console.error('Suspend error:', error);
    }
  };

  const handleBanConfirm = async (banData) => {
    try {
      await userService.banUser(user.id, banData);
      message.success('Reader banned successfully');
      setBanModalVisible(false);
      fetchUser();
    } catch (error) {
      message.error('Failed to ban reader');
      console.error('Ban error:', error);
    }
  };

  // Field configurations for edit modal
  const editFields = [
    fieldTypes.text('username', 'Username', {
      rules: [{ required: true, message: 'Username is required' }],
      span: 12,
    }),
    fieldTypes.text('email', 'Email', {
      rules: [
        { required: true, message: 'Email is required' },
        { type: 'email', message: 'Please enter a valid email' },
      ],
      span: 12,
    }),
    fieldTypes.select(
      'status',
      'Status',
      [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Suspended', value: 'suspended' },
      ],
      { span: 12 }
    ),
    fieldTypes.textarea('profile.bio', 'Bio', {
      rows: 3,
      span: 24,
    }),
    fieldTypes.text('profile.location', 'Location', { span: 12 }),
  ];

  // Mock reading activity data
  const recentActivity = [
    {
      id: 1,
      action: 'Read Chapter 45',
      novel: 'Dragon Realm Chronicles',
      time: '2 hours ago',
    },
    {
      id: 2,
      action: 'Added to Library',
      novel: 'Mystic Sword Master',
      time: '1 day ago',
    },
    {
      id: 3,
      action: 'Left Review',
      novel: 'Eternal Love Story',
      time: '3 days ago',
    },
    { id: 4, action: 'Bookmarked', novel: 'Shadow Hunter', time: '1 week ago' },
  ];

  // Mock favorite novels data
  const favoriteNovels = [
    {
      id: 1,
      title: 'Dragon Realm Chronicles',
      author: 'Liu Wei',
      rating: 5,
      progress: 85,
    },
    {
      id: 2,
      title: 'Mystic Sword Master',
      author: 'Zhang Ming',
      rating: 4,
      progress: 60,
    },
    {
      id: 3,
      title: 'Eternal Love Story',
      author: 'Chen Li',
      rating: 5,
      progress: 100,
    },
  ];

  const breadcrumbItems = [
    { title: 'Admin' },
    { title: 'User Management' },
    { title: 'Readers', href: '/admin/users/readers' },
    { title: user?.username || 'Loading...' },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />

      <PageHeader
        title={`Reader Details - ${user.username}`}
        subtitle="View and manage reader information"
        onBack={handleBack}
        extra={[
          <Button key="edit" icon={<EditOutlined />} onClick={handleEdit}>
            Edit
          </Button>,
          <Button key="suspend" icon={<StopOutlined />} onClick={handleSuspend}>
            Suspend
          </Button>,
          <Button
            key="ban"
            icon={<UserDeleteOutlined />}
            danger
            onClick={handleBan}
          >
            Ban
          </Button>,
          <Button
            key="delete"
            icon={<DeleteOutlined />}
            danger
            onClick={handleDelete}
          >
            Delete
          </Button>,
        ]}
      />

      {/* User Overview */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={6}>
            <div style={{ textAlign: 'center' }}>
              <Avatar
                size={120}
                src={user.avatar}
                icon={<UserOutlined />}
                style={{ marginBottom: 16 }}
              />
              <Title level={4}>{user.username}</Title>
              <StatusBadge status={user.status} />
            </div>
          </Col>
          <Col span={18}>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="Email" span={2}>
                <Space>
                  <MailOutlined />
                  {user.email}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Join Date">
                <Space>
                  <CalendarOutlined />
                  {new Date(user.joinDate).toLocaleDateString()}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Last Active">
                {new Date(user.lastActive).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="Location">
                {user.profile?.location || 'Not specified'}
              </Descriptions.Item>
              <Descriptions.Item label="Favorite Genres">
                <Space wrap>
                  {user.profile?.favoriteGenres?.map((genre) => (
                    <Tag key={genre} color="blue">
                      {genre}
                    </Tag>
                  ))}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Bio" span={2}>
                <Paragraph>{user.profile?.bio || 'No bio available'}</Paragraph>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      {/* Reading Statistics */}
      <Card title="Reading Statistics" style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={6}>
            <Statistic
              title="Books Read"
              value={user.profile?.readingStats?.booksRead || 0}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Chapters Read"
              value={user.profile?.readingStats?.chaptersRead || 0}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Time Spent (Hours)"
              value={user.profile?.readingStats?.timeSpent || 0}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Favorite Authors"
              value={user.profile?.readingStats?.favoriteAuthors || 0}
              prefix={<StarOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Col>
        </Row>
      </Card>

      <Row gutter={24}>
        {/* Recent Activity */}
        <Col span={12}>
          <Card title="Recent Activity">
            <List
              dataSource={recentActivity}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<MessageOutlined />}
                    title={item.action}
                    description={
                      <div>
                        <Text strong>{item.novel}</Text>
                        <br />
                        <Text type="secondary">{item.time}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Favorite Novels */}
        <Col span={12}>
          <Card title="Favorite Novels">
            <List
              dataSource={favoriteNovels}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<HeartOutlined style={{ color: '#ff4d4f' }} />}
                    title={item.title}
                    description={
                      <div>
                        <Text>by {item.author}</Text>
                        <br />
                        <Space>
                          <StarOutlined style={{ color: '#faad14' }} />
                          <Text>{item.rating}/5</Text>
                          <Progress
                            percent={item.progress}
                            size="small"
                            style={{ width: 100 }}
                          />
                        </Space>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Preferences */}
      <Card title="Preferences" style={{ marginTop: 24 }}>
        <Descriptions column={3}>
          <Descriptions.Item label="Notifications">
            <Tag color={user.preferences?.notifications ? 'green' : 'red'}>
              {user.preferences?.notifications ? 'Enabled' : 'Disabled'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Newsletter">
            <Tag color={user.preferences?.newsletter ? 'green' : 'red'}>
              {user.preferences?.newsletter ? 'Subscribed' : 'Unsubscribed'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Public Profile">
            <Tag color={user.preferences?.publicProfile ? 'green' : 'red'}>
              {user.preferences?.publicProfile ? 'Public' : 'Private'}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Modals */}
      <EditModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onSave={handleEditSave}
        title={`Edit Reader - ${user.username}`}
        data={user}
        fields={editFields}
        width={700}
      />

      <DeleteConfirm
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Reader"
        itemName={user.username}
        itemType="reader"
        dangerLevel="high"
        requireConfirmation={true}
        confirmationText={user.username}
        cascadeInfo={[
          'All reading history will be permanently deleted',
          'All bookmarks and favorites will be removed',
          'All comments and reviews will be deleted',
          'This action cannot be undone',
        ]}
      />

      <SuspendUserModal
        visible={suspendModalVisible}
        onCancel={() => setSuspendModalVisible(false)}
        onConfirm={handleSuspendConfirm}
        user={user}
      />

      <BanUserModal
        visible={banModalVisible}
        onCancel={() => setBanModalVisible(false)}
        onConfirm={handleBanConfirm}
        user={user}
      />
    </div>
  );
};

export default ReaderDetail;
