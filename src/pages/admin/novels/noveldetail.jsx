import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Space,
  Typography,
  Tag,
  Rate,
  Statistic,
  Button,
  Descriptions,
  Image,
  Divider,
  Table,
  Tabs,
  message,
} from 'antd';
import {
  EditOutlined,
  StarOutlined,
  EyeOutlined,
  BookOutlined,
  HeartOutlined,
  CalendarOutlined,
  UserOutlined,
  GlobalOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { novelService } from '../../../services/admin/novelservice';
import {
  PageHeader,
  LoadingSpinner,
  StatusBadge,
} from '../../../components/admin/common';
import { LineChart, AreaChart } from '../../../components/admin/charts';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const NovelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [novel, setNovel] = useState(null);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch novel data
  useEffect(() => {
    const fetchNovelData = async () => {
      setLoading(true);
      try {
        const [novelResponse, statsResponse] = await Promise.all([
          novelService.getNovelById(id),
          novelService.getNovelStats(id),
        ]);

        setNovel(novelResponse.data);
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Failed to fetch novel data:', error);
        message.error('Failed to load novel details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNovelData();
    }
  }, [id]);

  // Handle actions
  const handleEdit = () => {
    navigate(`/admin/novels/${id}/edit`);
  };

  const handleToggleFeature = async () => {
    try {
      const response = await novelService.toggleFeatureNovel(id);
      message.success(response.message);
      setNovel((prev) => ({ ...prev, isFeatured: !prev.isFeatured }));
    } catch (error) {
      message.error('Failed to update feature status');
    }
  };

  const handleBack = () => {
    navigate('/admin/novels');
  };

  if (loading) {
    return <LoadingSpinner tip="Loading novel details..." />;
  }

  if (!novel) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>Novel not found</Title>
        <Button onClick={handleBack}>Back to Novels</Button>
      </div>
    );
  }

  // Prepare chart data
  const viewsChartData =
    stats?.dailyStats?.map((stat) => ({
      date: stat.date,
      views: stat.views,
      uniqueViews: stat.uniqueViews,
    })) || [];

  const engagementChartData =
    stats?.dailyStats?.map((stat) => ({
      date: stat.date,
      likes: stat.likes,
      comments: stat.comments,
      bookmarks: stat.bookmarks,
    })) || [];

  // Demographics data for tables
  const ageGroupColumns = [
    { title: 'Age Group', dataIndex: 'range', key: 'range' },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (val) => `${val}%`,
    },
  ];

  const regionColumns = [
    { title: 'Region', dataIndex: 'region', key: 'region' },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (val) => `${val}%`,
    },
  ];

  return (
    <div>
      <PageHeader
        title={novel.title}
        subtitle={`by ${novel.author}`}
        onBack={handleBack}
        breadcrumbs={[
          { title: 'Dashboard', href: '/admin/dashboard' },
          { title: 'Novels', href: '/admin/novels' },
          { title: novel.title },
        ]}
        actions={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEdit}
          >
            Edit Novel
          </Button>,
          <Button
            key="feature"
            type={novel.isFeatured ? 'default' : 'primary'}
            onClick={handleToggleFeature}
          >
            {novel.isFeatured ? 'Unfeature' : 'Feature'}
          </Button>,
        ]}
      />

      <Row gutter={[24, 24]}>
        {/* Left Column - Novel Info */}
        <Col xs={24} lg={8}>
          <Card>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              {/* Cover Image */}
              <div style={{ textAlign: 'center' }}>
                <Image
                  src={novel.coverImage}
                  alt={novel.title}
                  width={200}
                  height={300}
                  style={{ borderRadius: 8 }}
                />
              </div>

              {/* Basic Info */}
              <div>
                <Title level={4}>{novel.title}</Title>
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: '100%' }}
                >
                  <Text>
                    <UserOutlined /> by <strong>{novel.author}</strong>
                  </Text>
                  <div>
                    <StatusBadge status={novel.status} />
                    {novel.isFeatured && (
                      <Tag color="gold" style={{ marginLeft: 8 }}>
                        <StarOutlined /> Featured
                      </Tag>
                    )}
                    {novel.isPremium && <Tag color="purple">Premium</Tag>}
                  </div>
                  <div>
                    <Rate disabled value={parseFloat(novel.rating)} allowHalf />
                    <Text style={{ marginLeft: 8 }}>
                      {novel.rating} ({novel.ratingCount} reviews)
                    </Text>
                  </div>
                </Space>
              </div>

              {/* Key Stats */}
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title="Views"
                    value={novel.views}
                    prefix={<EyeOutlined />}
                    formatter={(value) => value.toLocaleString()}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Chapters"
                    value={novel.chaptersCount}
                    prefix={<BookOutlined />}
                  />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title="Likes"
                    value={novel.likes}
                    prefix={<HeartOutlined />}
                    formatter={(value) => value.toLocaleString()}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Bookmarks"
                    value={novel.bookmarks}
                    prefix={<BookOutlined />}
                    formatter={(value) => value.toLocaleString()}
                  />
                </Col>
              </Row>

              {novel.revenue > 0 && (
                <Card size="small" style={{ backgroundColor: '#f6ffed' }}>
                  <Statistic
                    title="Revenue"
                    value={novel.revenue}
                    prefix={<DollarOutlined />}
                    formatter={(value) => `$${value.toLocaleString()}`}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              )}
            </Space>
          </Card>
        </Col>

        {/* Right Column - Detailed Info */}
        <Col xs={24} lg={16}>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Overview" key="overview">
              <Space
                direction="vertical"
                style={{ width: '100%' }}
                size="large"
              >
                {/* Description */}
                <Card title="Description">
                  <Paragraph>{novel.description}</Paragraph>

                  <Divider />

                  <Descriptions column={2} size="small">
                    <Descriptions.Item label="Category">
                      <Tag color="blue">{novel.category}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Language">
                      <GlobalOutlined /> {novel.language}
                    </Descriptions.Item>
                    <Descriptions.Item label="Type">
                      {novel.isOriginal ? 'Original' : 'Translation'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Age Rating">
                      {novel.ageRating}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Words">
                      {novel.totalWords.toLocaleString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Avg Words/Chapter">
                      {novel.averageWordsPerChapter.toLocaleString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created">
                      <CalendarOutlined />{' '}
                      {new Date(novel.createdAt).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Updated">
                      <CalendarOutlined />{' '}
                      {new Date(novel.updatedAt).toLocaleDateString()}
                    </Descriptions.Item>
                  </Descriptions>

                  {novel.tags && novel.tags.length > 0 && (
                    <>
                      <Divider />
                      <div>
                        <Text strong>Tags: </Text>
                        {novel.tags.map((tag) => (
                          <Tag key={tag} style={{ margin: '2px' }}>
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </>
                  )}
                </Card>

                {/* Engagement Stats */}
                <Row gutter={16}>
                  <Col span={12}>
                    <Card title="Engagement Overview">
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text>Comments</Text>
                          <Text strong>{novel.comments.toLocaleString()}</Text>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text>Reviews</Text>
                          <Text strong>{novel.reviews.toLocaleString()}</Text>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text>Weekly Views</Text>
                          <Text strong>
                            {novel.weeklyViews.toLocaleString()}
                          </Text>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text>Monthly Views</Text>
                          <Text strong>
                            {novel.monthlyViews.toLocaleString()}
                          </Text>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="Status Info">
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text>Completion</Text>
                          <Text strong>
                            {novel.isCompleted ? 'Completed' : 'Ongoing'}
                          </Text>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text>Trending</Text>
                          <Text strong>
                            {novel.trending
                              ? `Rank #${novel.trendingRank}`
                              : 'No'}
                          </Text>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text>Reports</Text>
                          <Text
                            strong
                            style={{
                              color:
                                novel.reportCount > 0 ? '#ff4d4f' : 'inherit',
                            }}
                          >
                            {novel.reportCount}
                          </Text>
                        </div>
                        {novel.publishedAt && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Text>Published</Text>
                            <Text strong>
                              {new Date(novel.publishedAt).toLocaleDateString()}
                            </Text>
                          </div>
                        )}
                      </Space>
                    </Card>
                  </Col>
                </Row>
              </Space>
            </TabPane>

            <TabPane tab="Analytics" key="analytics">
              <Space
                direction="vertical"
                style={{ width: '100%' }}
                size="large"
              >
                {/* Views Chart */}
                <Card title="Views Analytics">
                  <LineChart
                    title="Daily Views"
                    data={viewsChartData}
                    lines={[
                      {
                        dataKey: 'views',
                        stroke: '#1890ff',
                        name: 'Total Views',
                      },
                      {
                        dataKey: 'uniqueViews',
                        stroke: '#52c41a',
                        name: 'Unique Views',
                      },
                    ]}
                    height={300}
                  />
                </Card>

                {/* Engagement Chart */}
                <Card title="Engagement Analytics">
                  <AreaChart
                    title="Daily Engagement"
                    data={engagementChartData}
                    areas={[
                      { dataKey: 'likes', fill: '#ff7875', name: 'Likes' },
                      {
                        dataKey: 'comments',
                        fill: '#40a9ff',
                        name: 'Comments',
                      },
                      {
                        dataKey: 'bookmarks',
                        fill: '#73d13d',
                        name: 'Bookmarks',
                      },
                    ]}
                    height={300}
                  />
                </Card>

                {/* Reader Demographics */}
                <Row gutter={16}>
                  <Col span={12}>
                    <Card title="Age Demographics">
                      <Table
                        columns={ageGroupColumns}
                        dataSource={stats?.readerDemographics?.ageGroups || []}
                        pagination={false}
                        size="small"
                        rowKey="range"
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="Regional Distribution">
                      <Table
                        columns={regionColumns}
                        dataSource={stats?.readerDemographics?.regions || []}
                        pagination={false}
                        size="small"
                        rowKey="region"
                      />
                    </Card>
                  </Col>
                </Row>

                {/* Engagement Metrics */}
                {stats?.engagement && (
                  <Card title="Engagement Metrics">
                    <Row gutter={16}>
                      <Col span={6}>
                        <Statistic
                          title="Avg Reading Time"
                          value={stats.engagement.averageReadingTime}
                        />
                      </Col>
                      <Col span={6}>
                        <Statistic
                          title="Completion Rate"
                          value={stats.engagement.completionRate}
                        />
                      </Col>
                      <Col span={6}>
                        <Statistic
                          title="Retention Rate"
                          value={stats.engagement.retentionRate}
                        />
                      </Col>
                      <Col span={6}>
                        <Statistic
                          title="Share Rate"
                          value={stats.engagement.shareRate}
                        />
                      </Col>
                    </Row>
                  </Card>
                )}
              </Space>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default NovelDetail;
