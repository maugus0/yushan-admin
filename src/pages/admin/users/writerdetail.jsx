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
  Table,
  Badge,
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
  DollarOutlined,
  TeamOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
  EyeOutlined,
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

const WriterDetail = () => {
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
    navigate('/admin/users/writers');
  };

  // Modal handlers
  const handleEditSave = async (formData) => {
    try {
      await userService.updateUser(user.id, formData);
      message.success('Writer updated successfully');
      setEditModalVisible(false);
      fetchUser();
    } catch (error) {
      message.error('Failed to update writer');
      console.error('Update error:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await userService.deleteUser(user.id);
      message.success('Writer deleted successfully');
      setDeleteModalVisible(false);
      navigate('/admin/users/writers');
    } catch (error) {
      message.error('Failed to delete writer');
      console.error('Delete error:', error);
    }
  };

  const handleSuspendConfirm = async (suspensionData) => {
    try {
      await userService.suspendUser(user.id, suspensionData);
      message.success('Writer suspended successfully');
      setSuspendModalVisible(false);
      fetchUser();
    } catch (error) {
      message.error('Failed to suspend writer');
      console.error('Suspend error:', error);
    }
  };

  const handleBanConfirm = async (banData) => {
    try {
      await userService.banUser(user.id, banData);
      message.success('Writer banned successfully');
      setBanModalVisible(false);
      fetchUser();
    } catch (error) {
      message.error('Failed to ban writer');
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
        { label: 'Pending', value: 'pending' },
      ],
      { span: 12 }
    ),
    fieldTypes.textarea('profile.bio', 'Bio', {
      rows: 3,
      span: 24,
    }),
    fieldTypes.text('profile.location', 'Location', { span: 12 }),
  ];

  // Mock novels data
  const writerNovels = [
    {
      id: 1,
      title: 'Dragon Realm Chronicles',
      status: 'published',
      chapters: 245,
      views: 125000,
      rating: 4.8,
      revenue: 2500,
    },
    {
      id: 2,
      title: 'Mystic Sword Master',
      status: 'ongoing',
      chapters: 156,
      views: 89000,
      rating: 4.6,
      revenue: 1800,
    },
    {
      id: 3,
      title: 'Shadow Hunter',
      status: 'draft',
      chapters: 23,
      views: 0,
      rating: 0,
      revenue: 0,
    },
  ];

  // Mock recent activity
  const recentActivity = [
    {
      id: 1,
      action: 'Published Chapter 245',
      novel: 'Dragon Realm Chronicles',
      time: '2 hours ago',
    },
    {
      id: 2,
      action: 'Updated Chapter 156',
      novel: 'Mystic Sword Master',
      time: '1 day ago',
    },
    {
      id: 3,
      action: 'Created new novel',
      novel: 'Shadow Hunter',
      time: '3 days ago',
    },
    {
      id: 4,
      action: 'Responded to review',
      novel: 'Dragon Realm Chronicles',
      time: '1 week ago',
    },
  ];

  const novelColumns = [
    {
      title: 'Novel Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          <BookOutlined />
          <span style={{ fontWeight: 500 }}>{text}</span>
          <Badge
            status={
              record.status === 'published'
                ? 'success'
                : record.status === 'ongoing'
                  ? 'processing'
                  : 'default'
            }
            text={record.status}
          />
        </Space>
      ),
    },
    {
      title: 'Chapters',
      dataIndex: 'chapters',
      key: 'chapters',
      render: (chapters) => (
        <Space>
          <FileTextOutlined />
          {chapters}
        </Space>
      ),
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views',
      render: (views) => (
        <Space>
          <EyeOutlined />
          {views.toLocaleString()}
        </Space>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <Space>
          <StarOutlined style={{ color: '#faad14' }} />
          {rating}/5
        </Space>
      ),
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue) => (
        <Space>
          <DollarOutlined style={{ color: '#52c41a' }} />${revenue}
        </Space>
      ),
    },
  ];

  const breadcrumbItems = [
    { title: 'Admin' },
    { title: 'User Management' },
    { title: 'Writers', href: '/admin/users/writers' },
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
        title={`Writer Details - ${user.username}`}
        subtitle="View and manage writer information"
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
              <Title level={4}>
                {user.username}
                {user.verification?.verified && (
                  <CheckCircleOutlined
                    style={{ color: '#52c41a', marginLeft: 8 }}
                    title="Verified Writer"
                  />
                )}
              </Title>
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
              <Descriptions.Item label="Verification Status">
                <Tag color={user.verification?.verified ? 'green' : 'orange'}>
                  {user.verification?.verified ? 'Verified' : 'Unverified'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Genres" span={2}>
                <Space wrap>
                  {user.profile?.genres?.map((genre) => (
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

      {/* Writing Statistics */}
      <Card title="Writing Statistics" style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={6}>
            <Statistic
              title="Novels Published"
              value={user.profile?.writingStats?.novelsPublished || 0}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Chapters Written"
              value={user.profile?.writingStats?.chaptersWritten || 0}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Words Written"
              value={user.profile?.writingStats?.wordsWritten || 0}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Followers"
              value={user.profile?.writingStats?.followers || 0}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Col>
        </Row>
      </Card>

      {/* Earnings */}
      <Card title="Earnings Overview" style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={8}>
            <Statistic
              title="Total Earned"
              value={user.earnings?.totalEarned || 0}
              prefix={<DollarOutlined />}
              suffix="USD"
              valueStyle={{ color: '#3f8600' }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="This Month"
              value={user.earnings?.thisMonth || 0}
              prefix={<DollarOutlined />}
              suffix="USD"
              valueStyle={{ color: '#1890ff' }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Currency"
              value={user.earnings?.currency || 'USD'}
              valueStyle={{ color: '#722ed1' }}
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
                    avatar={<FileTextOutlined />}
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

        {/* Verification Info */}
        <Col span={12}>
          <Card title="Verification Details">
            <Descriptions column={1}>
              <Descriptions.Item label="Verification Status">
                <Tag color={user.verification?.verified ? 'green' : 'orange'}>
                  {user.verification?.verified
                    ? 'Verified'
                    : 'Pending Verification'}
                </Tag>
              </Descriptions.Item>
              {user.verification?.verifiedAt && (
                <Descriptions.Item label="Verified Date">
                  {new Date(user.verification.verifiedAt).toLocaleDateString()}
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Documents Submitted">
                <Space wrap>
                  {user.verification?.documents?.length > 0 ? (
                    user.verification.documents.map((doc) => (
                      <Tag key={doc} color="blue">
                        {doc}
                      </Tag>
                    ))
                  ) : (
                    <Text type="secondary">No documents submitted</Text>
                  )}
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      {/* Novels Table */}
      <Card title="Published Novels" style={{ marginTop: 24 }}>
        <Table
          dataSource={writerNovels}
          columns={novelColumns}
          rowKey="id"
          pagination={false}
          size="middle"
        />
      </Card>

      {/* Modals */}
      <EditModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onSave={handleEditSave}
        title={`Edit Writer - ${user.username}`}
        data={user}
        fields={editFields}
        width={700}
      />

      <DeleteConfirm
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Writer"
        itemName={user.username}
        itemType="writer"
        dangerLevel="high"
        requireConfirmation={true}
        confirmationText={user.username}
        cascadeInfo={[
          'All published novels will be archived',
          'All earnings history will be preserved but inaccessible',
          'All comments and interactions will be deleted',
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

export default WriterDetail;
