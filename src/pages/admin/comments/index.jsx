import { useState, useEffect, useCallback } from 'react';
import { Button, Space, Table, Tooltip, Avatar, Typography } from 'antd';
import {
  MessageOutlined,
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  LikeOutlined,
  DislikeOutlined,
  FlagOutlined,
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

const Comments = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({});

  // Mock data for comments
  const mockComments = [
    {
      id: 1,
      content:
        "This chapter was absolutely amazing! The character development is incredible and I can't wait to see what happens next.",
      author: 'john_reader',
      novel: 'The Cultivation Path',
      chapter: 'Chapter 5: The First Trial',
      status: 'approved',
      likes: 24,
      dislikes: 2,
      reports: 0,
      createdAt: '2024-09-20T14:30:00Z',
      updatedAt: '2024-09-20T14:30:00Z',
    },
    {
      id: 2,
      content:
        'I disagree with the direction this story is taking. The protagonist seems too overpowered.',
      author: 'critic_reader',
      novel: 'The Cultivation Path',
      chapter: 'Chapter 6: Power Unleashed',
      status: 'approved',
      likes: 8,
      dislikes: 15,
      reports: 1,
      createdAt: '2024-09-19T16:45:00Z',
      updatedAt: '2024-09-19T16:45:00Z',
    },
    {
      id: 3,
      content: 'This is spam content with inappropriate links and promotional material.',
      author: 'spam_user',
      novel: 'Dragon Emperor',
      chapter: 'Chapter 1: The Beginning',
      status: 'flagged',
      likes: 0,
      dislikes: 12,
      reports: 8,
      createdAt: '2024-09-18T10:20:00Z',
      updatedAt: '2024-09-19T09:15:00Z',
    },
    {
      id: 4,
      content:
        'Great world-building in this chapter! The author really knows how to paint a vivid picture.',
      author: 'fantasy_lover',
      novel: 'Mystic Journey',
      chapter: 'Chapter 3: The Enchanted Forest',
      status: 'approved',
      likes: 31,
      dislikes: 1,
      reports: 0,
      createdAt: '2024-09-17T12:10:00Z',
      updatedAt: '2024-09-17T12:10:00Z',
    },
    {
      id: 5,
      content: 'Please check this comment for potential policy violations.',
      author: 'review_needed',
      novel: 'Immortal Realm',
      chapter: 'Chapter 2: The Awakening',
      status: 'pending',
      likes: 3,
      dislikes: 1,
      reports: 2,
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

        let filteredData = mockComments;

        // Apply search filter
        if (searchValue) {
          filteredData = filteredData.filter(
            (item) =>
              item.content.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.author.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.novel.toLowerCase().includes(searchValue.toLowerCase())
          );
        }

        // Apply filters
        if (filters.status) {
          filteredData = filteredData.filter((item) => item.status === filters.status);
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
        console.error('Failed to fetch comments:', error);
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
      name: 'hasReports',
      label: 'Has Reports',
      type: 'checkbox',
      options: [{ value: true, label: 'Show only comments with reports' }],
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
      title: 'Comment',
      dataIndex: 'content',
      key: 'content',
      render: (text, record) => (
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <Space>
            <Avatar size="small" icon={<UserOutlined />} />
            <Text strong>{record.author}</Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              on {record.novel}
            </Text>
          </Space>
          <Paragraph
            ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
            style={{ margin: 0, maxWidth: 400 }}
          >
            {text}
          </Paragraph>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            <BookOutlined style={{ marginRight: 4 }} />
            {record.chapter}
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
        <Space direction="vertical" size={0}>
          <Space>
            <LikeOutlined style={{ color: '#52c41a' }} />
            <span>{record.likes}</span>
            <DislikeOutlined style={{ color: '#ff4d4f' }} />
            <span>{record.dislikes}</span>
          </Space>
          {record.reports > 0 && (
            <Space>
              <FlagOutlined style={{ color: '#faad14' }} />
              <span style={{ color: '#faad14' }}>{record.reports} reports</span>
            </Space>
          )}
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
              icon: <MessageOutlined />,
              label: record.status === 'approved' ? 'Unapprove' : 'Approve',
            },
            {
              key: 'flag',
              icon: <FlagOutlined />,
              label: 'Flag as Inappropriate',
              danger: true,
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
    console.log('View comment:', record);
  };

  const handleEdit = (record) => {
    console.log('Edit comment:', record);
  };

  const handleDelete = (record) => {
    console.log('Delete comment:', record);
  };

  // Handlers removed: _handleAddNew (unused)

  const handleTableChange = (paginationInfo) => {
    fetchData(paginationInfo);
  };

  return (
    <div>
      <PageHeader
        title="Comments Management"
        subtitle="Moderate and manage user comments"
        breadcrumbs={[{ title: 'Dashboard', href: '/admin/dashboard' }, { title: 'Comments' }]}
        actions={[
          <Button key="flagged" type="default" icon={<FlagOutlined />}>
            View Flagged ({data.filter((item) => item.status === 'flagged').length})
          </Button>,
          <Button key="pending" type="primary" icon={<MessageOutlined />}>
            Review Pending ({data.filter((item) => item.status === 'pending').length})
          </Button>,
        ]}
      />

      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <SearchBar
          placeholder="Search comments by content, author, or novel..."
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
          <LoadingSpinner tip="Loading comments..." />
        ) : data.length === 0 ? (
          <EmptyState
            title="No Comments Found"
            description="No comments match your current search and filter criteria."
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
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} comments`,
            }}
            onChange={handleTableChange}
            loading={loading}
            rowKey="id"
            scroll={{ x: 1000 }}
          />
        )}
      </Space>
    </div>
  );
};

export default Comments;
