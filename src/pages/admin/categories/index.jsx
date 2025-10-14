import { useState, useEffect, useCallback } from 'react';
import { Button, Space, Table, Tooltip, Badge } from 'antd';
import {
  PlusOutlined,
  TagsOutlined,
  BookOutlined,
  CalendarOutlined,
  FolderOutlined,
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

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({});

  // Mock data for categories
  const mockCategories = [
    {
      id: 1,
      name: 'Fantasy',
      description: 'Stories with magical elements, mythical creatures, and supernatural powers',
      novelCount: 450,
      status: 'active',
      color: '#722ed1',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-09-20T14:20:00Z',
    },
    {
      id: 2,
      name: 'Romance',
      description: 'Love stories and romantic relationships',
      novelCount: 320,
      status: 'active',
      color: '#eb2f96',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-09-18T09:15:00Z',
    },
    {
      id: 3,
      name: 'Action',
      description: 'Fast-paced stories with adventure and combat',
      novelCount: 280,
      status: 'active',
      color: '#fa8c16',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-09-15T16:45:00Z',
    },
    {
      id: 4,
      name: 'Sci-Fi',
      description: 'Science fiction and futuristic stories',
      novelCount: 180,
      status: 'active',
      color: '#1890ff',
      createdAt: '2024-02-01T08:20:00Z',
      updatedAt: '2024-09-10T11:30:00Z',
    },
    {
      id: 5,
      name: 'Horror',
      description: 'Scary and supernatural thriller stories',
      novelCount: 95,
      status: 'active',
      color: '#f5222d',
      createdAt: '2024-02-15T12:10:00Z',
      updatedAt: '2024-08-30T13:25:00Z',
    },
    {
      id: 6,
      name: 'Mystery',
      description: 'Detective and mystery stories',
      novelCount: 65,
      status: 'inactive',
      color: '#52c41a',
      createdAt: '2024-03-01T15:40:00Z',
      updatedAt: '2024-07-20T10:15:00Z',
    },
  ];

  // Fetch data
  const fetchData = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        let filteredData = mockCategories;

        // Apply search filter
        if (searchValue) {
          filteredData = filteredData.filter(
            (item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.description.toLowerCase().includes(searchValue.toLowerCase())
          );
        }

        // Apply status filter
        if (filters.status) {
          filteredData = filteredData.filter((item) => item.status === filters.status);
        }

        // Apply novel count filter
        if (filters.novelCountRange) {
          const [min, max] = filters.novelCountRange;
          filteredData = filteredData.filter(
            (item) => item.novelCount >= (min || 0) && item.novelCount <= (max || Infinity)
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
        console.error('Failed to fetch categories:', error);
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
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
    },
    {
      name: 'novelCountRange',
      label: 'Novel Count Range',
      type: 'numberrange',
      min: { placeholder: 'Min novels' },
      max: { placeholder: 'Max novels' },
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
      title: 'Category',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: record.color,
            }}
          />
          <FolderOutlined style={{ color: record.color }} />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#666', maxWidth: 200 }}>
              {record.description}
            </div>
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
      title: 'Novel Count',
      dataIndex: 'novelCount',
      key: 'novelCount',
      render: (count) => (
        <Badge count={count} showZero style={{ backgroundColor: '#1890ff' }}>
          <BookOutlined style={{ fontSize: '18px', color: '#1890ff' }} />
        </Badge>
      ),
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      render: (color) => (
        <Space>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              backgroundColor: color,
              border: '1px solid #d9d9d9',
            }}
          />
          <code style={{ fontSize: '11px' }}>{color}</code>
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
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => (
        <Tooltip title={new Date(date).toLocaleString()}>
          {new Date(date).toLocaleDateString()}
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
              key: 'novels',
              icon: <BookOutlined />,
              label: 'View Novels',
            },
            {
              key: 'toggle',
              icon: <TagsOutlined />,
              label: record.status === 'active' ? 'Deactivate' : 'Activate',
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
    console.log('View category:', record);
  };

  const handleEdit = (record) => {
    console.log('Edit category:', record);
  };

  const handleDelete = (record) => {
    console.log('Delete category:', record);
  };

  const handleAddNew = () => {
    console.log('Add new category');
  };

  const handleTableChange = (paginationInfo) => {
    fetchData(paginationInfo);
  };

  return (
    <div>
      <PageHeader
        title="Categories Management"
        subtitle="Manage novel categories and genres"
        breadcrumbs={[{ title: 'Dashboard', href: '/admin/dashboard' }, { title: 'Categories' }]}
        actions={[
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
            Add Category
          </Button>,
        ]}
      />

      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <SearchBar
          placeholder="Search categories by name or description..."
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
          <LoadingSpinner tip="Loading categories..." />
        ) : data.length === 0 ? (
          <EmptyState
            title="No Categories Found"
            description="No categories match your current search and filter criteria."
            onDefaultAction={handleAddNew}
            defaultActionText="Add First Category"
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
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} categories`,
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

export default Categories;
