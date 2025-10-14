import { useState, useEffect, useCallback } from 'react';
import { Button, Space, Table, Tooltip, Badge, Rate, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  PlusOutlined,
  BookOutlined,
  UserOutlined,
  CalendarOutlined,
  EyeOutlined,
  FileTextOutlined,
  TagsOutlined,
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
import { novelService } from '../../../services/admin/novelservice';

const Novels = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({});

  // Fetch data
  const fetchData = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        const currentPage = params.current || 1;
        const currentPageSize = params.pageSize || 10;

        const response = await novelService.getAllNovels({
          page: currentPage,
          pageSize: currentPageSize,
          search: searchValue,
          ...filters,
        });

        setData(response.data);
        setPagination((prev) => ({
          ...prev,
          current: response.page,
          total: response.total,
          pageSize: response.pageSize,
        }));
      } catch (error) {
        console.error('Failed to fetch novels:', error);
        message.error('Failed to fetch novels');
      } finally {
        setLoading(false);
      }
    },
    [searchValue, filters]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        { value: 'completed', label: 'Completed' },
        { value: 'suspended', label: 'Suspended' },
      ],
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'Fantasy', label: 'Fantasy' },
        { value: 'Romance', label: 'Romance' },
        { value: 'Action', label: 'Action' },
        { value: 'Sci-Fi', label: 'Science Fiction' },
        { value: 'Mystery', label: 'Mystery' },
        { value: 'Horror', label: 'Horror' },
      ],
    },
    {
      name: 'language',
      label: 'Language',
      type: 'select',
      options: [
        { value: 'English', label: 'English' },
        { value: 'Chinese', label: 'Chinese' },
        { value: 'Japanese', label: 'Japanese' },
        { value: 'Korean', label: 'Korean' },
        { value: 'Spanish', label: 'Spanish' },
      ],
    },
    {
      name: 'isOriginal',
      label: 'Type',
      type: 'select',
      options: [
        { value: true, label: 'Original' },
        { value: false, label: 'Translation' },
      ],
    },
  ];

  // Table columns
  const columns = [
    {
      title: 'Novel',
      dataIndex: 'title',
      key: 'title',
      width: 300,
      render: (text, record) => (
        <Space>
          <img
            src={record.coverImage}
            alt={text}
            style={{
              width: 40,
              height: 60,
              objectFit: 'cover',
              borderRadius: 4,
              border: '1px solid #f0f0f0',
            }}
          />
          <div>
            <div style={{ fontWeight: 500, marginBottom: 2 }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              <UserOutlined style={{ marginRight: 4 }} />
              by {record.author}
            </div>
            <div style={{ fontSize: '11px', color: '#999' }}>
              {record.language} • {record.isOriginal ? 'Original' : 'Translation'}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => <StatusBadge status={status} />,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category) => (
        <Space>
          <TagsOutlined />
          {category}
        </Space>
      ),
    },
    {
      title: 'Stats',
      key: 'stats',
      width: 200,
      render: (_, record) => (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '12px' }}>
              <FileTextOutlined style={{ marginRight: 4 }} />
              {record.chaptersCount} chapters
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '12px' }}>
              <EyeOutlined style={{ marginRight: 4 }} />
              {record.views.toLocaleString()} views
            </span>
          </div>
          <div>
            <Rate disabled value={parseFloat(record.rating)} size="small" />
            <span style={{ fontSize: '11px', color: '#666', marginLeft: 4 }}>
              ({record.rating})
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Engagement',
      key: 'engagement',
      width: 150,
      render: (_, record) => (
        <div>
          <div style={{ fontSize: '12px', marginBottom: 2 }}>
            <span style={{ color: '#1890ff' }}>{record.likes.toLocaleString()}</span> likes
          </div>
          <div style={{ fontSize: '12px', marginBottom: 2 }}>
            <span style={{ color: '#52c41a' }}>{record.bookmarks.toLocaleString()}</span> bookmarks
          </div>
          <div style={{ fontSize: '12px' }}>
            <span style={{ color: '#fa8c16' }}>{record.comments.toLocaleString()}</span> comments
          </div>
        </div>
      ),
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      width: 100,
      render: (revenue, record) => (
        <div>
          {record.isPremium && <Badge color="gold" text="Premium" style={{ marginBottom: 4 }} />}
          {revenue > 0 ? (
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#52c41a' }}>
              ${revenue.toLocaleString()}
            </div>
          ) : (
            <div style={{ fontSize: '12px', color: '#999' }}>Free</div>
          )}
        </div>
      ),
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 120,
      render: (date) => (
        <Tooltip title={new Date(date).toLocaleString()}>
          <div style={{ fontSize: '12px' }}>
            <CalendarOutlined style={{ marginRight: 4 }} />
            {new Date(date).toLocaleDateString()}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <ActionButtons
          record={record}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showMore={true}
          customActions={[
            {
              key: 'chapters',
              icon: <FileTextOutlined />,
              label: 'View Chapters',
              onClick: () => handleViewChapters(record),
            },
            {
              key: 'feature',
              icon: <BookOutlined />,
              label: record.isFeatured ? 'Unfeature' : 'Feature',
              onClick: () => handleToggleFeature(record),
            },
          ]}
        />
      ),
    },
  ];

  // Handlers
  const handleSearch = (value) => {
    setSearchValue(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleFilter = (filterValues) => {
    setFilters(filterValues);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchValue('');
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleView = (record) => {
    navigate(`/admin/novels/${record.id}`);
  };

  const handleEdit = (record) => {
    navigate(`/admin/novels/${record.id}/edit`);
  };

  const handleDelete = async (record) => {
    try {
      await novelService.deleteNovel(record.id);
      message.success('Novel deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Failed to delete novel:', error);
      message.error('Failed to delete novel');
    }
  };

  const handleViewChapters = (record) => {
    navigate(`/admin/novels/${record.id}/chapters`);
  };

  const handleToggleFeature = async (record) => {
    try {
      const response = await novelService.toggleFeatureNovel(record.id);
      message.success(response.message);
      fetchData();
    } catch (error) {
      console.error('Failed to toggle feature:', error);
      message.error('Failed to update feature status');
    }
  };

  const handleAddNew = () => {
    navigate('/admin/novels/new');
  };

  const handleTableChange = (paginationInfo) => {
    fetchData(paginationInfo);
  };

  return (
    <div>
      <PageHeader
        title="Novels Management"
        subtitle="Manage and monitor novels on the platform"
        breadcrumbs={[{ title: 'Dashboard', href: '/admin/dashboard' }, { title: 'Novels' }]}
        actions={[
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
            Add Novel
          </Button>,
        ]}
      />

      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <SearchBar
          placeholder="Search novels by title, author, or description..."
          onSearch={handleSearch}
          onClear={() => setSearchValue('')}
          searchValue={searchValue}
          showFilter={true}
          showCategoryFilter={true}
          categories={[
            { value: 'Fantasy', label: 'Fantasy' },
            { value: 'Romance', label: 'Romance' },
            { value: 'Action', label: 'Action' },
            { value: 'Sci-Fi', label: 'Science Fiction' },
            { value: 'Mystery', label: 'Mystery' },
            { value: 'Horror', label: 'Horror' },
          ]}
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
          <LoadingSpinner tip="Loading novels..." />
        ) : data.length === 0 ? (
          <EmptyState
            type="novels"
            title="No Novels Found"
            description="No novels match your current search and filter criteria."
            onDefaultAction={handleAddNew}
            defaultActionText="Add First Novel"
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
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} novels`,
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

export default Novels;
