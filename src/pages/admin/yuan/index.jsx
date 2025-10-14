import { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Space,
  Table,
  Tooltip,
  Avatar,
  Typography,
  Tag,
  Statistic,
  Progress,
  message,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  DollarOutlined,
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  TrophyOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
  CrownOutlined,
  RiseOutlined,
  FallOutlined,
  WalletOutlined,
  TransactionOutlined,
  BarChartOutlined,
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
import { yuanService } from '../../../services/admin/yuanservice';

const { Text } = Typography;

const Yuan = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('transactions');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({});

  // Fetch data from yuanService
  const fetchData = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        const currentPage = params.current || 1;
        const currentPageSize = params.pageSize || 10;

        let response;

        if (activeTab === 'transactions') {
          response = await yuanService.getAllTransactions({
            page: currentPage,
            pageSize: currentPageSize,
            search: searchValue,
            ...filters,
          });
        } else if (activeTab === 'balances') {
          response = await yuanService.getAllBalances({
            page: currentPage,
            pageSize: currentPageSize,
            search: searchValue,
            ...filters,
          });
        } else if (activeTab === 'rewards') {
          response = await yuanService.getRewardRules();
          // For rewards, we don't have pagination in the service, so we'll handle it client-side
          const allRewards = response.data;
          let filteredRewards = allRewards;

          if (searchValue) {
            filteredRewards = allRewards.filter(
              (reward) =>
                reward.actionName.toLowerCase().includes(searchValue.toLowerCase()) ||
                reward.description.toLowerCase().includes(searchValue.toLowerCase())
            );
          }

          if (filters.isActive !== undefined) {
            filteredRewards = filteredRewards.filter(
              (reward) => reward.isActive === filters.isActive
            );
          }

          const startIndex = (currentPage - 1) * currentPageSize;
          const endIndex = startIndex + currentPageSize;

          response = {
            ...response,
            data: filteredRewards.slice(startIndex, endIndex),
            total: filteredRewards.length,
            page: currentPage,
            pageSize: currentPageSize,
          };
        }

        setData(response.data);
        setPagination((prev) => ({
          ...prev,
          current: response.page,
          total: response.total,
          pageSize: response.pageSize || currentPageSize,
        }));
      } catch (error) {
        message.error('Failed to fetch yuan data');
      } finally {
        setLoading(false);
      }
    },
    [searchValue, filters, activeTab]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Get transaction type display
  const getTransactionTypeDisplay = (type) => {
    const config = {
      purchase: { color: 'purple', icon: <ShoppingCartOutlined />, prefix: '+' },
      reading_reward: { color: 'green', icon: <GiftOutlined />, prefix: '+' },
      daily_login: { color: 'blue', icon: <CalendarOutlined />, prefix: '+' },
      chapter_unlock: { color: 'red', icon: <BookOutlined />, prefix: '-' },
      gift_author: { color: 'orange', icon: <TrophyOutlined />, prefix: '-' },
      premium_feature: { color: 'purple', icon: <CrownOutlined />, prefix: '-' },
      refund: { color: 'cyan', icon: <TransactionOutlined />, prefix: '+' },
      bonus: { color: 'green', icon: <GiftOutlined />, prefix: '+' },
      withdrawal: { color: 'red', icon: <WalletOutlined />, prefix: '-' },
      subscription: { color: 'blue', icon: <CrownOutlined />, prefix: '-' },
      tournament_prize: { color: 'gold', icon: <TrophyOutlined />, prefix: '+' },
      referral_bonus: { color: 'green', icon: <UserOutlined />, prefix: '+' },
      balance_adjustment: { color: 'gray', icon: <DollarOutlined />, prefix: '±' },
    };
    return config[type] || { color: 'default', icon: <DollarOutlined />, prefix: '' };
  };

  // Filter configurations for different tabs
  const getFilterConfig = () => {
    const baseFilters = [
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'completed', label: 'Completed' },
          { value: 'pending', label: 'Pending' },
          { value: 'failed', label: 'Failed' },
          { value: 'cancelled', label: 'Cancelled' },
        ],
      },
    ];

    if (activeTab === 'transactions') {
      return [
        ...baseFilters,
        {
          name: 'type',
          label: 'Transaction Type',
          type: 'select',
          options: [
            { value: 'purchase', label: 'Purchase Yuan' },
            { value: 'reading_reward', label: 'Reading Reward' },
            { value: 'daily_login', label: 'Daily Login' },
            { value: 'chapter_unlock', label: 'Chapter Unlock' },
            { value: 'gift_author', label: 'Gift to Author' },
            { value: 'premium_feature', label: 'Premium Feature' },
            { value: 'refund', label: 'Refund' },
            { value: 'bonus', label: 'Bonus Yuan' },
            { value: 'withdrawal', label: 'Withdrawal' },
            { value: 'subscription', label: 'Subscription' },
            { value: 'tournament_prize', label: 'Tournament Prize' },
            { value: 'referral_bonus', label: 'Referral Bonus' },
          ],
        },
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          options: [
            { value: 'income', label: 'Income' },
            { value: 'expense', label: 'Expense' },
          ],
        },
      ];
    } else if (activeTab === 'balances') {
      return [
        {
          name: 'accountStatus',
          label: 'Account Status',
          type: 'select',
          options: [
            { value: 'active', label: 'Active' },
            { value: 'suspended', label: 'Suspended' },
            { value: 'limited', label: 'Limited' },
          ],
        },
        {
          name: 'isSubscriber',
          label: 'Subscription',
          type: 'select',
          options: [
            { value: true, label: 'Subscriber' },
            { value: false, label: 'Non-subscriber' },
          ],
        },
        {
          name: 'verificationLevel',
          label: 'Verification',
          type: 'select',
          options: [
            { value: 'verified', label: 'Verified' },
            { value: 'unverified', label: 'Unverified' },
          ],
        },
      ];
    } else if (activeTab === 'rewards') {
      return [
        {
          name: 'isActive',
          label: 'Status',
          type: 'select',
          options: [
            { value: true, label: 'Active' },
            { value: false, label: 'Inactive' },
          ],
        },
      ];
    }

    return baseFilters;
  };

  // Dynamic columns based on active tab
  const getColumns = () => {
    if (activeTab === 'transactions') {
      return [
        {
          title: 'Transaction',
          key: 'transaction',
          render: (_, record) => {
            const typeDisplay = getTransactionTypeDisplay(record.type);
            return (
              <Space direction="vertical" size={4}>
                <Text strong>{record.paymentReference}</Text>
                <Space>
                  <Avatar size="small" icon={<UserOutlined />} />
                  <Text>{record.username}</Text>
                </Space>
                <Space>
                  <span style={{ color: typeDisplay.color }}>{typeDisplay.icon}</span>
                  <Tag color={typeDisplay.color}>
                    {record.typeName || record.type.replace('_', ' ').toUpperCase()}
                  </Tag>
                </Space>
              </Space>
            );
          },
        },
        {
          title: 'Amount & Balance',
          key: 'amount',
          render: (_, record) => {
            const isIncome = record.category === 'income';
            return (
              <Space direction="vertical" size={4}>
                <Text
                  strong
                  style={{
                    color: isIncome ? '#52c41a' : '#ff4d4f',
                    fontSize: '16px',
                  }}
                >
                  {isIncome ? '+' : '-'}
                  {record.amount.toLocaleString()} 元
                </Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Before: {record.balanceBefore.toLocaleString()} 元
                </Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  After: {record.balanceAfter.toLocaleString()} 元
                </Text>
              </Space>
            );
          },
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          render: (text, record) => (
            <Space direction="vertical" size={4}>
              <Text>{text}</Text>
              {record.novelId && (
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Novel ID: {record.novelId}
                </Text>
              )}
              {record.paymentMethod && (
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Method: {record.paymentMethod.replace('_', ' ')}
                </Text>
              )}
            </Space>
          ),
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (status) => <StatusBadge status={status} />,
        },
      ];
    } else if (activeTab === 'balances') {
      return [
        {
          title: 'User',
          key: 'user',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Space>
                <Avatar icon={<UserOutlined />} />
                <Text strong>{record.username}</Text>
              </Space>
              <Tag color={record.isSubscriber ? 'gold' : 'default'}>
                {record.isSubscriber ? `${record.subscriptionTier} Subscriber` : 'Free User'}
              </Tag>
              <StatusBadge status={record.accountStatus} />
            </Space>
          ),
        },
        {
          title: 'Current Balance',
          dataIndex: 'currentBalance',
          key: 'currentBalance',
          render: (balance) => (
            <Statistic
              value={balance}
              suffix="元"
              valueStyle={{ fontSize: '16px', fontWeight: 'bold' }}
            />
          ),
        },
        {
          title: 'Activity Summary',
          key: 'activity',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Space>
                <RiseOutlined style={{ color: '#52c41a' }} />
                <Text>Earned: {record.lifetimeEarned.toLocaleString()} 元</Text>
              </Space>
              <Space>
                <FallOutlined style={{ color: '#ff4d4f' }} />
                <Text>Spent: {record.lifetimeSpent.toLocaleString()} 元</Text>
              </Space>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Transactions: {record.totalTransactions}
              </Text>
            </Space>
          ),
        },
        {
          title: 'Verification',
          key: 'verification',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Tag color={record.verificationLevel === 'verified' ? 'green' : 'orange'}>
                {record.verificationLevel}
              </Tag>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Risk Score: {record.riskScore}
              </Text>
              {record.pendingBalance > 0 && (
                <Text type="warning" style={{ fontSize: '12px' }}>
                  Pending: {record.pendingBalance} 元
                </Text>
              )}
            </Space>
          ),
        },
      ];
    } else {
      return [
        {
          title: 'Reward Program',
          key: 'reward',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Text strong style={{ fontSize: '15px' }}>
                {record.actionName}
              </Text>
              <Text>{record.description}</Text>
              <Space>
                <Text strong>{record.yuanReward} 元</Text>
                <Tag color="blue">{record.actionType.replace('_', ' ').toUpperCase()}</Tag>
              </Space>
            </Space>
          ),
        },
        {
          title: 'Statistics',
          key: 'stats',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Statistic
                title="Total Claims"
                value={record.totalClaims}
                valueStyle={{ fontSize: '14px' }}
              />
              <Statistic
                title="Total Awarded"
                value={record.totalYuanAwarded}
                suffix="元"
                valueStyle={{ fontSize: '14px' }}
              />
              <Progress
                percent={Math.min((record.totalClaims / 10000) * 100, 100)}
                size="small"
                status="active"
              />
            </Space>
          ),
        },
        {
          title: 'Rules',
          key: 'rules',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              {record.maxPerUser && (
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Max per user: {record.maxPerUser}
                </Text>
              )}
              {record.maxPerDay && (
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Max per day: {record.maxPerDay}
                </Text>
              )}
              {record.cooldownSeconds > 0 && (
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Cooldown: {Math.floor(record.cooldownSeconds / 3600)}h
                </Text>
              )}
              {record.requiresVerification && (
                <Tag color="orange" size="small">
                  Verification Required
                </Tag>
              )}
            </Space>
          ),
        },
        {
          title: 'Status',
          dataIndex: 'isActive',
          key: 'status',
          render: (isActive) => <StatusBadge status={isActive ? 'active' : 'inactive'} />,
        },
      ];
    }
  };

  // Tab configuration
  const tabs = [
    { key: 'transactions', label: 'Transactions', icon: <TransactionOutlined /> },
    { key: 'balances', label: 'User Balances', icon: <WalletOutlined /> },
    { key: 'rewards', label: 'Reward Programs', icon: <GiftOutlined /> },
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
    if (activeTab === 'transactions') {
      // Navigate to transaction detail (if implemented)
      message.info('Transaction details view coming soon');
    } else if (activeTab === 'balances') {
      navigate(`/admin/users/${record.userId}`);
    } else {
      // Navigate to reward detail (if implemented)
      message.info('Reward details view coming soon');
    }
  };

  const handleEdit = (_record) => {
    // Handle edit functionality based on activeTab
    message.info('Edit functionality coming soon');
  };

  const handleDelete = async (_record) => {
    try {
      // Handle delete functionality based on activeTab
      message.info('Delete functionality coming soon');
      // fetchData();
    } catch (error) {
      message.error('Failed to delete record');
    }
  };

  const handleAdjustBalance = (_record) => {
    // TODO: Open modal for balance adjustment
    message.info('Balance adjustment modal coming soon');
  };

  const handleProcessRefund = (_record) => {
    // TODO: Handle refund processing
    message.info('Refund processing coming soon');
  };

  const handleToggleReward = async (record) => {
    try {
      await yuanService.updateRewardRule(record.id, { isActive: !record.isActive });
      message.success(`Reward ${record.isActive ? 'deactivated' : 'activated'} successfully`);
      fetchData();
    } catch (error) {
      message.error('Failed to update reward status');
    }
  };

  const handleTableChange = (paginationInfo) => {
    fetchData(paginationInfo);
  };

  const columns = [
    ...getColumns(),
    {
      title: 'Date',
      dataIndex:
        activeTab === 'balances'
          ? 'lastTransactionAt'
          : activeTab === 'rewards'
            ? 'updatedAt'
            : 'createdAt',
      key: 'date',
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
          customActions={
            activeTab === 'transactions'
              ? [
                  {
                    key: 'refund',
                    icon: <TransactionOutlined />,
                    label: 'Process Refund',
                    onClick: () => handleProcessRefund(record),
                  },
                ]
              : activeTab === 'balances'
                ? [
                    {
                      key: 'adjust',
                      icon: <DollarOutlined />,
                      label: 'Adjust Balance',
                      onClick: () => handleAdjustBalance(record),
                    },
                  ]
                : [
                    {
                      key: 'toggle',
                      icon: <GiftOutlined />,
                      label: record.isActive ? 'Deactivate' : 'Activate',
                      onClick: () => handleToggleReward(record),
                    },
                  ]
          }
        />
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Yuan Management"
        subtitle="Manage platform currency, transactions, and rewards"
        breadcrumbs={[{ title: 'Dashboard', href: '/admin/dashboard' }, { title: 'Yuan' }]}
        actions={[
          <Button
            key="statistics"
            type="default"
            icon={<BarChartOutlined />}
            onClick={() => navigate('/admin/yuan/statistics')}
          >
            View Statistics
          </Button>,
          <Button key="rewards" type="default" icon={<GiftOutlined />}>
            Manage Rewards
          </Button>,
          <Button key="transactions" type="primary" icon={<DollarOutlined />}>
            Process Transaction
          </Button>,
        ]}
      />

      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {/* Tab Navigation */}
        <Space>
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              type={activeTab === tab.key ? 'primary' : 'default'}
              icon={tab.icon}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </Button>
          ))}
        </Space>

        <SearchBar
          placeholder={`Search ${activeTab}...`}
          onSearch={handleSearch}
          onClear={() => setSearchValue('')}
          searchValue={searchValue}
          showFilter={true}
          loading={loading}
        />

        <FilterPanel
          filters={getFilterConfig()}
          onFilter={handleFilter}
          onClear={handleClearFilters}
          collapsed={true}
          showToggle={true}
        />

        {loading ? (
          <LoadingSpinner tip={`Loading ${activeTab}...`} />
        ) : data.length === 0 ? (
          <EmptyState
            title="No Data Found"
            description={`No ${activeTab} match your current search and filter criteria.`}
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
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} ${activeTab}`,
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

export default Yuan;
