import { useState, useEffect, useCallback } from 'react';
import { Button, Space, Table, Tooltip, Progress } from 'antd';
import {
  PlusOutlined,
  FileTextOutlined,
  BookOutlined,
  UserOutlined,
  CalendarOutlined,
  EyeOutlined,
  ClockCircleOutlined,
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

const Chapters = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({});

  // Mock data for chapters
  const mockChapters = [
    {
      id: 1,
      title: 'The Beginning of the Journey',
      chapterNumber: 1,
      novel: 'The Cultivation Path',
      author: 'author_jane',
      status: 'published',
      wordCount: 2500,
      views: 15420,
      publishedAt: '2024-09-01T10:30:00Z',
      createdAt: '2024-08-28T14:20:00Z',
      readingTime: 12,
    },
    {
      id: 2,
      title: 'First Steps into the Unknown',
      chapterNumber: 2,
      novel: 'The Cultivation Path',
      author: 'author_jane',
      status: 'published',
      wordCount: 3200,
      views: 12800,
      publishedAt: '2024-09-03T09:15:00Z',
      createdAt: '2024-08-30T16:45:00Z',
      readingTime: 15,
    },
    {
      id: 3,
      title: 'The Immortal Realm Awakens',
      chapterNumber: 1,
      novel: 'Immortal Realm',
      author: 'writer_bob',
      status: 'draft',
      wordCount: 1800,
      views: 0,
      publishedAt: null,
      createdAt: '2024-09-20T11:30:00Z',
      readingTime: 8,
    },
    {
      id: 4,
      title: "Dragon's First Flight",
      chapterNumber: 1,
      novel: 'Dragon Emperor',
      author: 'dragon_writer',
      status: 'reviewing',
      wordCount: 2800,
      views: 0,
      publishedAt: null,
      createdAt: '2024-09-18T13:25:00Z',
      readingTime: 13,
    },
    {
      id: 5,
      title: 'The Mystic Gateway Opens',
      chapterNumber: 1,
      novel: 'Mystic Journey',
      author: 'mystic_author',
      status: 'published',
      wordCount: 2200,
      views: 8900,
      publishedAt: '2024-09-15T15:40:00Z',
      createdAt: '2024-09-12T10:15:00Z',
      readingTime: 10,
    },
  ];

  // Fetch data
  const fetchData = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        let filteredData = mockChapters;

        // Apply search filter
        if (searchValue) {
          filteredData = filteredData.filter(
            (item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.novel.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.author.toLowerCase().includes(searchValue.toLowerCase())
          );
        }

        // Apply filters
        if (filters.status) {
          filteredData = filteredData.filter(
            (item) => item.status === filters.status
          );
        }

        if (filters.wordCountRange) {
          const [min, max] = filters.wordCountRange;
          filteredData = filteredData.filter(
            (item) =>
              item.wordCount >= (min || 0) &&
              item.wordCount <= (max || Infinity)
          );
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
        console.error('Failed to fetch chapters:', error);
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
        { value: 'published', label: 'Published' },
        { value: 'draft', label: 'Draft' },
        { value: 'reviewing', label: 'Reviewing' },
        { value: 'rejected', label: 'Rejected' },
      ],
    },
    {
      name: 'wordCountRange',
      label: 'Word Count Range',
      type: 'numberrange',
      min: { placeholder: 'Min words' },
      max: { placeholder: 'Max words' },
    },
    {
      name: 'publishedDateRange',
      label: 'Published Date Range',
      type: 'daterange',
    },
  ];

  // Table columns
  const columns = [
    {
      title: 'Chapter',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Space>
            <FileTextOutlined style={{ color: '#1890ff' }} />
            <div style={{ fontWeight: 500 }}>{text}</div>
          </Space>
          <div style={{ fontSize: '12px', color: '#666', marginLeft: 20 }}>
            <BookOutlined style={{ marginRight: 4 }} />
            {record.novel} - Chapter {record.chapterNumber}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginLeft: 20 }}>
            <UserOutlined style={{ marginRight: 4 }} />
            by {record.author}
          </div>
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
      title: 'Word Count',
      dataIndex: 'wordCount',
      key: 'wordCount',
      render: (count) => (
        <Space direction="vertical" size={0}>
          <div style={{ fontWeight: 500 }}>{count.toLocaleString()}</div>
          <Progress
            percent={Math.min((count / 3000) * 100, 100)}
            showInfo={false}
            size="small"
            strokeColor={
              count >= 3000 ? '#52c41a' : count >= 2000 ? '#faad14' : '#ff4d4f'
            }
          />
        </Space>
      ),
    },
    {
      title: 'Reading Time',
      dataIndex: 'readingTime',
      key: 'readingTime',
      render: (time) => (
        <Space>
          <ClockCircleOutlined />
          {time} min
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
      title: 'Published',
      dataIndex: 'publishedAt',
      key: 'publishedAt',
      render: (date) =>
        date ? (
          <Tooltip title={new Date(date).toLocaleString()}>
            <Space>
              <CalendarOutlined />
              {new Date(date).toLocaleDateString()}
            </Space>
          </Tooltip>
        ) : (
          <span style={{ color: '#999' }}>Not published</span>
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
              key: 'publish',
              icon: <FileTextOutlined />,
              label: record.status === 'published' ? 'Unpublish' : 'Publish',
            },
            {
              key: 'preview',
              icon: <EyeOutlined />,
              label: 'Preview',
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
    console.log('View chapter:', record);
  };

  const handleEdit = (record) => {
    console.log('Edit chapter:', record);
  };

  const handleDelete = (record) => {
    console.log('Delete chapter:', record);
  };

  const handleAddNew = () => {
    console.log('Add new chapter');
  };

  const handleTableChange = (paginationInfo) => {
    fetchData(paginationInfo);
  };

  return (
    <div>
      <PageHeader
        title="Chapters Management"
        subtitle="Manage and monitor novel chapters"
        breadcrumbs={[
          { title: 'Dashboard', href: '/admin/dashboard' },
          { title: 'Chapters' },
        ]}
        actions={[
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddNew}
          >
            Add Chapter
          </Button>,
        ]}
      />

      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <SearchBar
          placeholder="Search chapters by title, novel, or author..."
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
          <LoadingSpinner tip="Loading chapters..." />
        ) : data.length === 0 ? (
          <EmptyState
            title="No Chapters Found"
            description="No chapters match your current search and filter criteria."
            onDefaultAction={handleAddNew}
            defaultActionText="Add First Chapter"
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
                `${range[0]}-${range[1]} of ${total} chapters`,
            }}
            onChange={handleTableChange}
            loading={loading}
            rowKey="id"
            scroll={{ x: 1100 }}
          />
        )}
      </Space>
    </div>
  );
};

export default Chapters;
