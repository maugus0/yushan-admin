import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Table, Tooltip, Badge, Modal } from 'antd';
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
import { categoryService } from '../../../services/admin/categoryservice';
import CategoryForm from './categoryform';
import { message } from 'antd';

const Categories = () => {
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

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  // Fetch data from API
  const fetchData = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        const response = await categoryService.getAllCategories({
          includeInactive: true,
        });

        if (response.success) {
          let filteredData = response.data;

          // Apply search filter
          if (searchValue) {
            filteredData = filteredData.filter(
              (item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.description
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
            );
          }

          // Apply status filter - map isActive to status for UI
          if (filters.status) {
            const isActiveFilter = filters.status === 'active';
            filteredData = filteredData.filter(
              (item) => item.isActive === isActiveFilter
            );
          }

          // Apply date range filter
          if (
            filters.createdDateRange &&
            filters.createdDateRange.length === 2
          ) {
            const [startDate, endDate] = filters.createdDateRange;
            filteredData = filteredData.filter((item) => {
              const itemDate = new Date(item.createTime);
              return itemDate >= startDate && itemDate <= endDate;
            });
          }

          // Fetch novel counts for all categories
          const categoryIds = filteredData.map((item) => item.id);
          let countsResponse = { counts: {} };

          // Only fetch counts if we have categories
          if (categoryIds.length > 0) {
            try {
              countsResponse =
                await categoryService.getCategoryNovelCounts(categoryIds);
            } catch (countError) {
              console.warn(
                'Failed to fetch novel counts, using 0 for all:',
                countError
              );
              // Create empty counts map if fetch fails
              countsResponse = { counts: {} };
            }
          }

          // Map API response to match UI expectations
          const mappedData = filteredData.map((item) => ({
            ...item,
            status: item.isActive ? 'active' : 'inactive',
            novelCount: countsResponse.counts[item.id] || 0, // Use fetched count
            color: getRandomColor(), // Generate color for display
            createdAt: item.createTime,
            updatedAt: item.updateTime,
          }));

          // Apply pagination
          const pageSize = params.pageSize || pagination.pageSize;
          const current = params.current || pagination.current;
          const startIndex = (current - 1) * pageSize;
          const endIndex = startIndex + pageSize;

          setData(mappedData.slice(startIndex, endIndex));
          setPagination((prev) => ({
            ...prev,
            current: current,
            total: mappedData.length,
          }));
        }
      } catch (error) {
        message.error('Failed to fetch categories: ' + error.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchValue, filters, pagination.pageSize, pagination.current]
  );

  // Helper function to generate random colors for categories
  const getRandomColor = () => {
    const colors = [
      '#722ed1',
      '#eb2f96',
      '#fa8c16',
      '#1890ff',
      '#f5222d',
      '#52c41a',
      '#13c2c2',
      '#2f54eb',
      '#faad14',
      '#a0d911',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, filters]);

  // Remove mock data - replaced with API
  /* const mockCategories = [
    {
      id: 1,
      name: 'Fantasy',
      description:
        'Stories with magical elements, mythical creatures, and supernatural powers',
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
  ]; */

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
              onClick: () => handleViewNovels(record),
            },
            {
              key: 'toggle',
              icon: <TagsOutlined />,
              label: record.status === 'active' ? 'Deactivate' : 'Activate',
              onClick: () => handleToggleStatus(record),
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
    setSelectedCategory(record);
    setViewModalVisible(true);
  };

  const handleEdit = (record) => {
    setSelectedCategory(record);
    setModalMode('edit');
    setModalVisible(true);
  };

  const handleDelete = async (record) => {
    // Show confirmation modal with two delete options
    Modal.confirm({
      title: 'Delete Category',
      content: (
        <div>
          <p>Choose how to delete "{record.name}":</p>
          <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
            <li>
              <strong>Soft Delete:</strong> Mark as deleted (can be recovered
              later)
            </li>
            <li>
              <strong>Hard Delete:</strong> Permanently remove from database
              (cannot be undone)
            </li>
          </ul>
        </div>
      ),
      okText: 'Soft Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await categoryService.deleteCategory(record.id, false);
          message.success('Category soft deleted successfully');
          fetchData(); // Refresh the list
        } catch (error) {
          message.error('Failed to delete category: ' + error.message);
        }
      },
      footer: (_, { CancelBtn }) => (
        <>
          <CancelBtn />
          <Button
            danger
            onClick={async () => {
              Modal.destroyAll();
              try {
                await categoryService.deleteCategory(record.id, false);
                message.success('Category soft deleted successfully');
                fetchData();
              } catch (error) {
                message.error('Failed to soft delete: ' + error.message);
              }
            }}
          >
            Soft Delete
          </Button>
          <Button
            type="primary"
            danger
            onClick={async () => {
              Modal.destroyAll();
              // Extra confirmation for hard delete
              Modal.confirm({
                title: 'Confirm Hard Delete',
                content: `Are you absolutely sure? Hard deleting "${record.name}" is PERMANENT and cannot be undone!`,
                okText: 'Yes, Hard Delete',
                okType: 'danger',
                cancelText: 'Cancel',
                onOk: async () => {
                  try {
                    await categoryService.deleteCategory(record.id, true);
                    message.success('Category permanently deleted');
                    fetchData();
                  } catch (error) {
                    message.error('Failed to hard delete: ' + error.message);
                  }
                },
              });
            }}
          >
            Hard Delete
          </Button>
        </>
      ),
    });
  };

  const handleAddNew = () => {
    setSelectedCategory(null);
    setModalMode('create');
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedCategory(null);
  };

  const handleModalSuccess = () => {
    setModalVisible(false);
    setSelectedCategory(null);
    fetchData(); // Refresh the list after successful create/update
  };

  const handleViewModalClose = () => {
    setViewModalVisible(false);
    setSelectedCategory(null);
  };

  const handleToggleStatus = async (record) => {
    try {
      const newStatus = !record.isActive;
      await categoryService.toggleCategoryStatus(record.id, newStatus);
      message.success(
        `Category ${newStatus ? 'activated' : 'deactivated'} successfully`
      );
      fetchData(); // Refresh the list
    } catch (error) {
      message.error('Failed to toggle category status: ' + error.message);
    }
  };

  const handleTableChange = (paginationInfo) => {
    fetchData(paginationInfo);
  };

  const handleViewNovels = (record) => {
    // Navigate to novels page with category filter pre-applied
    navigate(
      `/admin/novels?category=${record.id}&categoryName=${encodeURIComponent(record.name)}`
    );
  };

  return (
    <div>
      <PageHeader
        title="Categories Management"
        subtitle="Manage novel categories and genres"
        breadcrumbs={[
          { title: 'Dashboard', href: '/admin/dashboard' },
          { title: 'Categories' },
        ]}
        actions={[
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddNew}
          >
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
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} categories`,
            }}
            onChange={handleTableChange}
            loading={loading}
            rowKey="id"
            scroll={{ x: 1000 }}
          />
        )}
      </Space>

      {/* Create/Edit Modal */}
      <Modal
        title={modalMode === 'edit' ? 'Edit Category' : 'Create New Category'}
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={600}
        destroyOnClose
      >
        <CategoryForm
          categoryId={selectedCategory?.id}
          mode={modalMode}
          onSuccess={handleModalSuccess}
          onCancel={handleModalClose}
        />
      </Modal>

      {/* View Modal */}
      <Modal
        title="Category Details"
        open={viewModalVisible}
        onCancel={handleViewModalClose}
        footer={[
          <Button key="close" onClick={handleViewModalClose}>
            Close
          </Button>,
          <Button
            key="edit"
            type="primary"
            onClick={() => {
              handleViewModalClose();
              handleEdit(selectedCategory);
            }}
          >
            Edit Category
          </Button>,
        ]}
        width={600}
      >
        {selectedCategory && (
          <div>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <Space>
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      backgroundColor: selectedCategory.color,
                    }}
                  />
                  <FolderOutlined
                    style={{
                      color: selectedCategory.color,
                      fontSize: '20px',
                    }}
                  />
                </Space>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#999',
                    marginBottom: '4px',
                  }}
                >
                  Category Name
                </div>
                <div style={{ fontSize: '18px', fontWeight: 500 }}>
                  {selectedCategory.name}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#999',
                    marginBottom: '4px',
                  }}
                >
                  Description
                </div>
                <div>{selectedCategory.description}</div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#999',
                    marginBottom: '4px',
                  }}
                >
                  Status
                </div>
                <StatusBadge status={selectedCategory.status} />
              </div>

              <div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#999',
                    marginBottom: '4px',
                  }}
                >
                  Slug
                </div>
                <code>{selectedCategory.slug}</code>
              </div>

              <Space size="large">
                <div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#999',
                      marginBottom: '4px',
                    }}
                  >
                    <CalendarOutlined /> Created
                  </div>
                  <div>
                    {new Date(selectedCategory.createdAt).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#999',
                      marginBottom: '4px',
                    }}
                  >
                    <CalendarOutlined /> Last Updated
                  </div>
                  <div>
                    {new Date(selectedCategory.updatedAt).toLocaleString()}
                  </div>
                </div>
              </Space>
            </Space>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Categories;
