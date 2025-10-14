import { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Space,
  Table,
  Tooltip,
  Avatar,
  Typography,
  Rate,
  Progress,
} from 'antd';
import {
  StarOutlined,
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  LikeOutlined,
  DislikeOutlined,
  FlagOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import {
  PageHeader,
  SearchBar,
  FilterPanel,
  StatusBadge,
  ActionButtons,
  EmptyState,
  LoadingSpinner,
} from '../../../components/admin/common';

const { Text, Paragraph } = Typography;

const Reviews = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({});

  // Mock data for reviews
  const mockReviews = [
    {
      id: 1,
      title: 'An Epic Journey Worth Reading',
      content:
        'This novel has captivated me from the very first chapter. The world-building is extraordinary, and the character development is top-notch. The cultivation system is well thought out and the progression feels natural. I particularly love how the author handles the relationship between the protagonist and supporting characters.',
      rating: 5,
      reviewer: 'epic_reader_99',
      novel: 'The Cultivation Path',
      status: 'approved',
      likes: 42,
      dislikes: 3,
      helpful: 38,
      reports: 0,
      spoilerFree: true,
      wordCount: 156,
      createdAt: '2024-09-20T14:30:00Z',
      updatedAt: '2024-09-20T14:30:00Z',
    },
    {
      id: 2,
      title: 'Disappointing After Great Start',
      content:
        'The first few chapters were promising, but the story quickly derailed. The pacing became too fast and character motivations became unclear. The author seems to have lost direction.',
      rating: 2,
      reviewer: 'honest_critic',
      novel: 'Dragon Emperor',
      status: 'approved',
      likes: 18,
      dislikes: 24,
      helpful: 12,
      reports: 2,
      spoilerFree: true,
      wordCount: 89,
      createdAt: '2024-09-19T16:45:00Z',
      updatedAt: '2024-09-19T16:45:00Z',
    },
    {
      id: 3,
      title: 'Contains Spoilers - Amazing Plot Twist',
      content:
        'I cannot believe the author killed off the main character in chapter 50! This was completely unexpected and changes everything about the story. The way they handled the resurrection was brilliant.',
      rating: 4,
      reviewer: 'spoiler_king',
      novel: 'Mystic Journey',
      status: 'flagged',
      likes: 5,
      dislikes: 28,
      helpful: 2,
      reports: 15,
      spoilerFree: false,
      wordCount: 134,
      createdAt: '2024-09-18T10:20:00Z',
      updatedAt: '2024-09-19T09:15:00Z',
    },
    {
      id: 4,
      title: 'Masterpiece of Modern Fantasy',
      content:
        'Every aspect of this novel is perfection. From the intricate magic system to the complex political intrigue, everything is masterfully crafted. This is definitely a must-read for any fantasy lover.',
      rating: 5,
      reviewer: 'fantasy_master',
      novel: 'Immortal Realm',
      status: 'approved',
      likes: 67,
      dislikes: 1,
      helpful: 58,
      reports: 0,
      spoilerFree: true,
      wordCount: 112,
      createdAt: '2024-09-17T12:10:00Z',
      updatedAt: '2024-09-17T12:10:00Z',
    },
    {
      id: 5,
      title: 'Needs Review - Potentially Inappropriate',
      content:
        'This review contains content that may violate our community guidelines and needs manual review before approval.',
      rating: 3,
      reviewer: 'review_needed',
      novel: 'Celestial Warrior',
      status: 'pending',
      likes: 1,
      dislikes: 0,
      helpful: 0,
      reports: 3,
      spoilerFree: true,
      wordCount: 67,
      createdAt: '2024-09-16T08:30:00Z',
      updatedAt: '2024-09-16T08:30:00Z',
    },
  ];

  // Fetch data
  const fetchData = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        let filteredData = mockReviews;

        // Apply search filter
        if (searchValue) {
          filteredData = filteredData.filter(
            (item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.content.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.reviewer.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.novel.toLowerCase().includes(searchValue.toLowerCase())
          );
        }

        // Apply filters
        if (filters.status) {
          filteredData = filteredData.filter(
            (item) => item.status === filters.status
          );
        }

        if (filters.rating) {
          filteredData = filteredData.filter(
            (item) => item.rating === filters.rating
          );
        }

        if (filters.spoilerFree !== undefined) {
          filteredData = filteredData.filter(
            (item) => item.spoilerFree === filters.spoilerFree
          );
        }

        if (filters.hasReports) {
          filteredData = filteredData.filter((item) => item.reports > 0);
        }

        const pageSize = params.pageSize || pagination.pageSize;
        const current = params.current || pagination.current;
        const startIndex = (current - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        setData(filteredData.slice(startIndex, endIndex));
        setPagination((prev) => ({
          ...prev,
          current: current,
          total: filteredData.length,
        }));
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchValue, filters, pagination.pageSize, pagination.current]
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, filters]);

  // Filter configuration
  const filterConfig = [
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'approved', label: 'Approved' },
        { value: 'pending', label: 'Pending Review' },
        { value: 'flagged', label: 'Flagged' },
        { value: 'rejected', label: 'Rejected' },
      ],
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'select',
      options: [
        { value: 5, label: '5 Stars' },
        { value: 4, label: '4 Stars' },
        { value: 3, label: '3 Stars' },
        { value: 2, label: '2 Stars' },
        { value: 1, label: '1 Star' },
      ],
    },
    {
      name: 'spoilerFree',
      label: 'Spoiler Status',
      type: 'select',
      options: [
        { value: true, label: 'Spoiler Free' },
        { value: false, label: 'Contains Spoilers' },
      ],
    },
    {
      name: 'hasReports',
      label: 'Has Reports',
      type: 'checkbox',
      options: [{ value: true, label: 'Show only reviews with reports' }],
    },
    {
      name: 'createdDateRange',
      label: 'Created Date Range',
      type: 'daterange',
    },
  ];

  // Table columns
  const columns = [
    {
      title: 'Review',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <Space>
            <Avatar size="small" icon={<UserOutlined />} />
            <Text strong>{record.reviewer}</Text>
            <Rate disabled value={record.rating} style={{ fontSize: '14px' }} />
            {!record.spoilerFree && (
              <Text
                type="warning"
                style={{
                  fontSize: '11px',
                  background: '#fff1b8',
                  padding: '0 4px',
                }}
              >
                SPOILERS
              </Text>
            )}
          </Space>
          <Text strong style={{ fontSize: '15px' }}>
            {text}
          </Text>
          <Paragraph
            ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
            style={{ margin: 0, maxWidth: 400 }}
          >
            {record.content}
          </Paragraph>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            <BookOutlined style={{ marginRight: 4 }} />
            {record.novel} • {record.wordCount} words
          </Text>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <StatusBadge status={status} />,
    },
    {
      title: 'Engagement',
      key: 'engagement',
      render: (_, record) => (
        <Space direction="vertical" size={4}>
          <Space>
            <LikeOutlined style={{ color: '#52c41a' }} />
            <span>{record.likes}</span>
            <DislikeOutlined style={{ color: '#ff4d4f' }} />
            <span>{record.dislikes}</span>
          </Space>
          <Space>
            <CheckOutlined style={{ color: '#1890ff' }} />
            <span>{record.helpful} helpful</span>
          </Space>
          {record.reports > 0 && (
            <Space>
              <FlagOutlined style={{ color: '#faad14' }} />
              <span style={{ color: '#faad14' }}>{record.reports} reports</span>
            </Space>
          )}
          <Progress
            percent={Math.round(
              (record.helpful / (record.likes + record.dislikes)) * 100
            )}
            size="small"
            format={() => 'Helpful'}
            strokeColor="#52c41a"
          />
        </Space>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => (
        <Tooltip title={new Date(date).toLocaleString()}>
          <Space>
            <CalendarOutlined />
            {new Date(date).toLocaleDateString()}
          </Space>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <ActionButtons
          record={record}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showMore={true}
          customActions={[
            {
              key: 'approve',
              icon: <CheckOutlined />,
              label: record.status === 'approved' ? 'Unapprove' : 'Approve',
            },
            {
              key: 'flag',
              icon: <FlagOutlined />,
              label: 'Flag as Inappropriate',
              danger: true,
            },
            {
              key: 'spoiler',
              icon: <StarOutlined />,
              label: record.spoilerFree
                ? 'Mark as Spoiler'
                : 'Mark as Spoiler-Free',
            },
          ]}
        />
      ),
    },
  ];

  // Handlers
  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleFilter = (filterValues) => {
    setFilters(filterValues);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchValue('');
  };

  const handleView = (record) => {
    console.log('View review:', record);
  };

  const handleEdit = (record) => {
    console.log('Edit review:', record);
  };

  const handleDelete = (record) => {
    console.log('Delete review:', record);
  };

  // Handlers removed: _handleAddNew (unused)

  const handleTableChange = (paginationInfo) => {
    fetchData(paginationInfo);
  };

  return (
    <div>
      <PageHeader
        title="Reviews Management"
        subtitle="Moderate and manage user reviews"
        breadcrumbs={[
          { title: 'Dashboard', href: '/admin/dashboard' },
          { title: 'Reviews' },
        ]}
        actions={[
          <Button key="flagged" type="default" icon={<FlagOutlined />}>
            Flagged ({data.filter((item) => item.status === 'flagged').length})
          </Button>,
          <Button key="pending" type="primary" icon={<StarOutlined />}>
            Pending ({data.filter((item) => item.status === 'pending').length})
          </Button>,
        ]}
      />

      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <SearchBar
          placeholder="Search reviews by title, content, reviewer, or novel..."
          onSearch={handleSearch}
          onClear={() => setSearchValue('')}
          searchValue={searchValue}
          showFilter={true}
          loading={loading}
        />

        <FilterPanel
          filters={filterConfig}
          onFilter={handleFilter}
          onClear={handleClearFilters}
          collapsed={true}
          showToggle={true}
        />

        {loading ? (
          <LoadingSpinner tip="Loading reviews..." />
        ) : data.length === 0 ? (
          <EmptyState
            title="No Reviews Found"
            description="No reviews match your current search and filter criteria."
            actions={[
              {
                children: 'Clear Filters',
                onClick: handleClearFilters,
              },
            ]}
          />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} reviews`,
            }}
            onChange={handleTableChange}
            loading={loading}
            rowKey="id"
            scroll={{ x: 1200 }}
          />
        )}
      </Space>
    </div>
  );
};

export default Reviews;
