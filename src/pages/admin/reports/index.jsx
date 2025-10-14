import { useState, useEffect, useCallback } from 'react';
import { Button, Space, Table, Tooltip, Avatar, Typography, Tag } from 'antd';
import {
  FlagOutlined,
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  WarningOutlined,
  SafetyOutlined,
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

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({});

  // Mock data for reports
  const mockReports = [
    {
      id: 1,
      type: 'inappropriate_content',
      reportedContentType: 'comment',
      reportedContent:
        'This is spam content with inappropriate links and promotional material that violates our community guidelines.',
      reportedItem: 'Comment #1234',
      reportedBy: 'concerned_user',
      reportedUser: 'spam_user',
      reason: 'Contains spam and inappropriate promotional content',
      status: 'pending',
      priority: 'high',
      category: 'spam',
      evidence: 'Screenshot attached',
      moderatorNotes: '',
      resolution: '',
      createdAt: '2024-09-20T14:30:00Z',
      updatedAt: '2024-09-20T14:30:00Z',
      assignedTo: 'mod_alice',
    },
    {
      id: 2,
      type: 'harassment',
      reportedContentType: 'review',
      reportedContent:
        'This review contains personal attacks against the author and uses inappropriate language.',
      reportedItem: 'Review #5678',
      reportedBy: 'author_defender',
      reportedUser: 'toxic_reviewer',
      reason: 'Personal attacks and harassment towards author',
      status: 'investigating',
      priority: 'critical',
      category: 'harassment',
      evidence: 'Multiple user reports',
      moderatorNotes: 'Confirmed pattern of behavior',
      resolution: '',
      createdAt: '2024-09-19T16:45:00Z',
      updatedAt: '2024-09-20T10:15:00Z',
      assignedTo: 'mod_bob',
    },
    {
      id: 3,
      type: 'copyright_violation',
      reportedContentType: 'novel',
      reportedContent: 'This novel appears to be plagiarized from an existing published work.',
      reportedItem: 'Novel: Stolen Dreams',
      reportedBy: 'original_author',
      reportedUser: 'plagiarist_writer',
      reason: 'Copyright infringement - copied from published work',
      status: 'resolved',
      priority: 'critical',
      category: 'copyright',
      evidence: 'Original work links provided',
      moderatorNotes: 'Confirmed plagiarism through content comparison',
      resolution: 'Content removed, user suspended for 30 days',
      createdAt: '2024-09-18T10:20:00Z',
      updatedAt: '2024-09-19T14:30:00Z',
      assignedTo: 'mod_charlie',
    },
    {
      id: 4,
      type: 'inappropriate_content',
      reportedContentType: 'chapter',
      reportedContent: 'Chapter contains explicit content not marked with appropriate warnings.',
      reportedItem: 'Chapter 15: The Forbidden Ritual',
      reportedBy: 'parent_user',
      reportedUser: 'edge_writer',
      reason: 'Explicit content without proper content warnings',
      status: 'resolved',
      priority: 'medium',
      category: 'content_warning',
      evidence: 'Content review completed',
      moderatorNotes: 'Added content warnings',
      resolution: 'Content warnings added, author educated on guidelines',
      createdAt: '2024-09-17T12:10:00Z',
      updatedAt: '2024-09-18T09:20:00Z',
      assignedTo: 'mod_alice',
    },
    {
      id: 5,
      type: 'misinformation',
      reportedContentType: 'comment',
      reportedContent:
        'Comment spreads false information about the platform and author payment systems.',
      reportedItem: 'Comment #9876',
      reportedBy: 'fact_checker',
      reportedUser: 'misinform_user',
      reason: 'Spreading false information about platform policies',
      status: 'dismissed',
      priority: 'low',
      category: 'misinformation',
      evidence: 'Platform policy clarification',
      moderatorNotes: 'Information was incorrect but not malicious',
      resolution: 'Dismissed - user corrected their understanding',
      createdAt: '2024-09-16T08:30:00Z',
      updatedAt: '2024-09-17T11:45:00Z',
      assignedTo: 'mod_bob',
    },
  ];

  // Fetch data
  const fetchData = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        let filteredData = mockReports;

        // Apply search filter
        if (searchValue) {
          filteredData = filteredData.filter(
            (item) =>
              item.reportedContent.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.reportedBy.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.reportedUser.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.reportedItem.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.reason.toLowerCase().includes(searchValue.toLowerCase())
          );
        }

        // Apply filters
        if (filters.status) {
          filteredData = filteredData.filter((item) => item.status === filters.status);
        }

        if (filters.type) {
          filteredData = filteredData.filter((item) => item.type === filters.type);
        }

        if (filters.priority) {
          filteredData = filteredData.filter((item) => item.priority === filters.priority);
        }

        if (filters.category) {
          filteredData = filteredData.filter((item) => item.category === filters.category);
        }

        if (filters.assignedTo) {
          filteredData = filteredData.filter((item) => item.assignedTo === filters.assignedTo);
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
        console.error('Failed to fetch reports:', error);
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

  // Get priority color and icon
  const getPriorityDisplay = (priority) => {
    const config = {
      critical: { color: '#ff4d4f', icon: <ExclamationCircleOutlined /> },
      high: { color: '#fa8c16', icon: <WarningOutlined /> },
      medium: { color: '#fadb14', icon: <ExclamationCircleOutlined /> },
      low: { color: '#52c41a', icon: <SafetyOutlined /> },
    };
    return config[priority] || config.medium;
  };

  // Get category display
  const getCategoryColor = (category) => {
    const colors = {
      spam: 'red',
      harassment: 'magenta',
      copyright: 'purple',
      content_warning: 'orange',
      misinformation: 'yellow',
    };
    return colors[category] || 'default';
  };

  // Filter configuration
  const filterConfig = [
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'investigating', label: 'Investigating' },
        { value: 'resolved', label: 'Resolved' },
        { value: 'dismissed', label: 'Dismissed' },
      ],
    },
    {
      name: 'type',
      label: 'Report Type',
      type: 'select',
      options: [
        { value: 'inappropriate_content', label: 'Inappropriate Content' },
        { value: 'harassment', label: 'Harassment' },
        { value: 'copyright_violation', label: 'Copyright Violation' },
        { value: 'misinformation', label: 'Misinformation' },
        { value: 'spam', label: 'Spam' },
      ],
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      options: [
        { value: 'critical', label: 'Critical' },
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' },
      ],
    },
    {
      name: 'assignedTo',
      label: 'Assigned To',
      type: 'select',
      options: [
        { value: 'mod_alice', label: 'Alice (Moderator)' },
        { value: 'mod_bob', label: 'Bob (Moderator)' },
        { value: 'mod_charlie', label: 'Charlie (Moderator)' },
      ],
    },
    {
      name: 'createdDateRange',
      label: 'Report Date Range',
      type: 'daterange',
    },
  ];

  // Table columns
  const columns = [
    {
      title: 'Report Details',
      key: 'details',
      render: (_, record) => {
        const priorityDisplay = getPriorityDisplay(record.priority);
        return (
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <Space>
              <Avatar size="small" icon={<UserOutlined />} />
              <Text strong>{record.reportedBy}</Text>
              <Text type="secondary">reported</Text>
              <Text strong>{record.reportedUser}</Text>
            </Space>
            <Space>
              <span style={{ color: priorityDisplay.color }}>{priorityDisplay.icon}</span>
              <Text strong style={{ color: priorityDisplay.color }}>
                {record.priority.toUpperCase()}
              </Text>
              <Tag color={getCategoryColor(record.category)}>
                {record.category.replace('_', ' ').toUpperCase()}
              </Tag>
            </Space>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              <BookOutlined style={{ marginRight: 4 }} />
              {record.reportedItem}
            </Text>
            <Paragraph
              ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
              style={{ margin: 0, maxWidth: 400 }}
            >
              <Text strong>Reason:</Text> {record.reason}
            </Paragraph>
          </Space>
        );
      },
    },
    {
      title: 'Content',
      dataIndex: 'reportedContent',
      key: 'content',
      render: (text) => (
        <Paragraph
          ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}
          style={{ margin: 0, maxWidth: 300 }}
        >
          {text}
        </Paragraph>
      ),
    },
    {
      title: 'Status & Progress',
      key: 'status',
      render: (_, record) => (
        <Space direction="vertical" size={4}>
          <StatusBadge status={record.status} />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Assigned to: {record.assignedTo}
          </Text>
          {record.moderatorNotes && (
            <Text type="secondary" style={{ fontSize: '11px' }}>
              Notes: {record.moderatorNotes}
            </Text>
          )}
          {record.resolution && (
            <Text type="success" style={{ fontSize: '11px' }}>
              Resolution: {record.resolution}
            </Text>
          )}
        </Space>
      ),
    },
    {
      title: 'Evidence',
      dataIndex: 'evidence',
      key: 'evidence',
      render: (evidence) => (
        <Text type="secondary" style={{ fontSize: '12px' }}>
          {evidence}
        </Text>
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
              key: 'resolve',
              icon: <CheckOutlined />,
              label: 'Resolve',
              disabled: record.status === 'resolved',
            },
            {
              key: 'dismiss',
              icon: <CloseOutlined />,
              label: 'Dismiss',
              disabled: record.status === 'dismissed',
            },
            {
              key: 'investigate',
              icon: <EyeOutlined />,
              label: 'Investigate',
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
    console.log('View report:', record);
  };

  const handleEdit = (record) => {
    console.log('Edit report:', record);
  };

  const handleDelete = (record) => {
    console.log('Delete report:', record);
  };

  const handleTableChange = (paginationInfo) => {
    fetchData(paginationInfo);
  };

  // Calculate statistics
  const getStats = () => {
    const pending = mockReports.filter((r) => r.status === 'pending').length;
    const investigating = mockReports.filter((r) => r.status === 'investigating').length;
    const critical = mockReports.filter((r) => r.priority === 'critical').length;
    return { pending, investigating, critical };
  };

  const stats = getStats();

  return (
    <div>
      <PageHeader
        title="Reports Management"
        subtitle="Review and resolve user reports and violations"
        breadcrumbs={[{ title: 'Dashboard', href: '/admin/dashboard' }, { title: 'Reports' }]}
        actions={[
          <Button key="critical" type="default" danger icon={<ExclamationCircleOutlined />}>
            Critical ({stats.critical})
          </Button>,
          <Button key="investigating" type="default" icon={<EyeOutlined />}>
            Investigating ({stats.investigating})
          </Button>,
          <Button key="pending" type="primary" icon={<FlagOutlined />}>
            Pending ({stats.pending})
          </Button>,
        ]}
      />

      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <SearchBar
          placeholder="Search reports by content, users, reason, or reported item..."
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
          <LoadingSpinner tip="Loading reports..." />
        ) : data.length === 0 ? (
          <EmptyState
            title="No Reports Found"
            description="No reports match your current search and filter criteria."
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
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} reports`,
            }}
            onChange={handleTableChange}
            loading={loading}
            rowKey="id"
            scroll={{ x: 1400 }}
          />
        )}
      </Space>
    </div>
  );
};

export default Reports;
