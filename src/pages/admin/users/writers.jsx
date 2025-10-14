import React, { useState, useEffect, useCallback } from 'react';
import { Button, Space, Tooltip, message, Avatar, Tag, Dropdown } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  BookOutlined,
  FileTextOutlined,
  EyeOutlined,
  DeleteOutlined,
  MoreOutlined,
  StopOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// Import components
import PageHeader from '../../../components/admin/common/pageheader';
import StatusBadge from '../../../components/admin/common/statusbadge';
import Breadcrumbs from '../../../components/admin/common/breadcrumbs';
import DataTable from '../../../components/admin/tables/datatable';
import TableFilters from '../../../components/admin/tables/tablefilters';
import EditModal from '../../../components/admin/modals/editmodal';
import DeleteConfirm from '../../../components/admin/modals/deleteconfirm';
import SuspendUserModal from '../../../components/admin/modals/suspendusermodal';
import BanUserModal from '../../../components/admin/modals/banusermodal';

// Import services and utilities
import { userService } from '../../../services/admin/userservice';
import { commonFilters, fieldTypes } from '../../../utils/admin/constants';

const Writers = () => {
  const navigate = useNavigate();

  // State management
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({});

  // Modal states
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [suspendModalVisible, setSuspendModalVisible] = useState(false);
  const [banModalVisible, setBanModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch data
  const fetchData = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        const response = await userService.getWriters({
          page: params.current || 1,
          pageSize: params.pageSize || 10,
          ...filters,
        });

        setData(response.data);
        setPagination((prev) => ({
          ...prev,
          current: response.page,
          total: response.total,
        }));
      } catch (error) {
        message.error('Failed to fetch writers');
        console.error('Failed to fetch writers:', error);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    fetchData({ current: pagination.current, pageSize: pagination.pageSize });
  }, [fetchData, pagination.current, pagination.pageSize]); // eslint-disable-line react-hooks/exhaustive-deps

  // Filter configuration
  const filterConfig = [
    {
      ...commonFilters.search,
      key: 'search',
      placeholder: 'Search writers...',
    },
    {
      ...commonFilters.status,
      key: 'status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Suspended', value: 'suspended' },
        { label: 'Pending', value: 'pending' },
      ],
    },
    {
      key: 'joinDateRange',
      label: 'Join Date Range',
      type: 'daterange',
      quickFilter: false,
      span: 8,
    },
  ];

  // Table columns
  const columns = [
    {
      title: 'Writer',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} size="default" />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              <MailOutlined style={{ marginRight: 4 }} />
              {record.email}
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
      title: 'Writing Stats',
      key: 'writingStats',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Space>
            <BookOutlined />
            <span>{record.profile?.writingStats?.novelsPublished || 0} novels</span>
          </Space>
          <Space>
            <FileTextOutlined />
            <span>{record.profile?.writingStats?.chaptersWritten || 0} chapters</span>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Genres',
      dataIndex: ['profile', 'genres'],
      key: 'genres',
      render: (genres) => (
        <Space wrap>
          {genres?.slice(0, 2).map((genre) => (
            <Tag key={genre} color="purple" size="small">
              {genre}
            </Tag>
          ))}
          {genres?.length > 2 && (
            <Tag color="default" size="small">
              +{genres.length - 2}
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Verification',
      key: 'verification',
      render: (_, record) => (
        <Tag color={record.verification?.verified ? 'green' : 'orange'}>
          {record.verification?.verified ? 'Verified' : 'Unverified'}
        </Tag>
      ),
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
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
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            title="View Details"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            title="Edit Writer"
          />
          <Dropdown
            menu={{
              items: [
                {
                  key: 'suspend',
                  icon: <StopOutlined />,
                  label: 'Suspend User',
                  onClick: () => handleSuspend(record),
                },
                {
                  key: 'ban',
                  icon: <UserDeleteOutlined />,
                  label: 'Ban User',
                  danger: true,
                  onClick: () => handleBan(record),
                },
                {
                  type: 'divider',
                },
                {
                  key: 'delete',
                  icon: <DeleteOutlined />,
                  label: 'Delete User',
                  danger: true,
                  onClick: () => handleDelete(record),
                },
              ],
            }}
            trigger={['click']}
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Event handlers
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleTableChange = (paginationInfo) => {
    setPagination(paginationInfo);
  };

  const handleView = (record) => {
    navigate(`/admin/users/writers/${record.id}`);
  };

  const handleEdit = (record) => {
    setSelectedUser(record);
    setEditModalVisible(true);
  };

  const handleDelete = (record) => {
    setSelectedUser(record);
    setDeleteModalVisible(true);
  };

  const handleSuspend = (record) => {
    setSelectedUser(record);
    setSuspendModalVisible(true);
  };

  const handleBan = (record) => {
    setSelectedUser(record);
    setBanModalVisible(true);
  };

  const handleAddNew = () => {
    navigate('/admin/users/writers/new');
  };

  // Modal handlers
  const handleEditSave = async (formData) => {
    try {
      await userService.updateUser(selectedUser.id, formData);
      message.success('Writer updated successfully');
      setEditModalVisible(false);
      setSelectedUser(null);
      fetchData();
    } catch (error) {
      message.error('Failed to update writer');
      console.error('Update error:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await userService.deleteUser(selectedUser.id);
      message.success('Writer deleted successfully');
      setDeleteModalVisible(false);
      setSelectedUser(null);
      fetchData();
    } catch (error) {
      message.error('Failed to delete writer');
      console.error('Delete error:', error);
    }
  };

  const handleSuspendConfirm = async (suspensionData) => {
    try {
      await userService.suspendUser(selectedUser.id, suspensionData);
      message.success('Writer suspended successfully');
      setSuspendModalVisible(false);
      setSelectedUser(null);
      fetchData();
    } catch (error) {
      message.error('Failed to suspend writer');
      console.error('Suspend error:', error);
    }
  };

  const handleBanConfirm = async (banData) => {
    try {
      await userService.banUser(selectedUser.id, banData);
      message.success('Writer banned successfully');
      setBanModalVisible(false);
      setSelectedUser(null);
      fetchData();
    } catch (error) {
      message.error('Failed to ban writer');
      console.error('Ban error:', error);
    }
  };

  const handleBulkAction = async (actionKey, selectedKeys, selectedRows) => {
    try {
      if (actionKey === 'delete') {
        await userService.bulkDeleteUsers(selectedKeys);
        message.success(`${selectedKeys.length} writers deleted successfully`);
      } else if (actionKey === 'suspend') {
        await userService.bulkUpdateUsers(selectedKeys, { status: 'suspended' });
        message.success(`${selectedKeys.length} writers suspended successfully`);
      } else if (actionKey === 'activate') {
        await userService.bulkUpdateUsers(selectedKeys, { status: 'active' });
        message.success(`${selectedKeys.length} writers activated successfully`);
      }
      fetchData();
    } catch (error) {
      message.error('Failed to perform bulk action');
      console.error('Bulk action error:', error);
    }
  };

  // Field configurations for modals
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

  const breadcrumbItems = [{ title: 'Admin' }, { title: 'User Management' }, { title: 'Writers' }];

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />

      <PageHeader
        title="Writers"
        subtitle="Manage writer accounts and their publications"
        extra={[
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
            Add Writer
          </Button>,
        ]}
      />

      <TableFilters
        filters={filterConfig}
        onFiltersChange={handleFiltersChange}
        onReset={() => setFilters({})}
        showAdvanced={true}
        showQuickFilters={true}
      />

      <DataTable
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} writers`,
        }}
        onChange={handleTableChange}
        enableSelection={true}
        onBulkAction={handleBulkAction}
        enableColumnSelector={true}
        columnStorageKey="writers-table-columns"
        enableExport={true}
        exportFilename="writers"
        rowKey="id"
        scroll={{ x: 1200 }}
      />

      {/* Modals */}
      <EditModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onSave={handleEditSave}
        title={`Edit Writer - ${selectedUser?.username}`}
        data={selectedUser}
        fields={editFields}
        width={700}
      />

      <DeleteConfirm
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Writer"
        itemName={selectedUser?.username}
        itemType="writer"
        dangerLevel="high"
        requireConfirmation={true}
        confirmationText={selectedUser?.username}
        cascadeInfo={[
          'All published novels will be archived',
          'All chapters and drafts will be preserved',
          'All earnings data will be retained for tax purposes',
          'This action cannot be undone',
        ]}
      />

      <SuspendUserModal
        visible={suspendModalVisible}
        onCancel={() => setSuspendModalVisible(false)}
        onConfirm={handleSuspendConfirm}
        user={selectedUser}
      />

      <BanUserModal
        visible={banModalVisible}
        onCancel={() => setBanModalVisible(false)}
        onConfirm={handleBanConfirm}
        user={selectedUser}
      />
    </div>
  );
};

export default Writers;
