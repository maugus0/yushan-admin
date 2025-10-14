import { useState, useEffect, useCallback } from 'react';
import { Button, Space, Table, Tooltip, Avatar, Typography, Tag, Progress, Statistic } from 'antd';
import {
  TrophyOutlined,
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
  StarOutlined,
  FireOutlined,
  CrownOutlined,
  TeamOutlined,
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

const { Text } = Typography;

const Rankings = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('novels');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({});

  // Mock data for different ranking types
  const mockData = {
    novels: [
      {
        id: 1,
        rank: 1,
        prevRank: 1,
        title: 'The Cultivation Path',
        author: 'dragon_master',
        score: 9.8,
        views: 2847593,
        votes: 15847,
        rating: 4.9,
        chapters: 156,
        status: 'ongoing',
        category: 'Cultivation',
        lastUpdated: '2024-09-20T14:30:00Z',
        trend: 'stable',
      },
      {
        id: 2,
        rank: 2,
        prevRank: 4,
        title: 'Dragon Emperor',
        author: 'flame_writer',
        score: 9.6,
        views: 2156789,
        votes: 12934,
        rating: 4.8,
        chapters: 203,
        status: 'ongoing',
        category: 'Fantasy',
        lastUpdated: '2024-09-19T16:45:00Z',
        trend: 'rising',
      },
      {
        id: 3,
        rank: 3,
        prevRank: 2,
        title: 'Mystic Journey',
        author: 'sage_author',
        score: 9.4,
        views: 1987654,
        votes: 11567,
        rating: 4.7,
        chapters: 89,
        status: 'ongoing',
        category: 'Adventure',
        lastUpdated: '2024-09-18T10:20:00Z',
        trend: 'falling',
      },
      {
        id: 4,
        rank: 4,
        prevRank: 3,
        title: 'Immortal Realm',
        author: 'eternal_pen',
        score: 9.2,
        views: 1756432,
        votes: 9876,
        rating: 4.6,
        chapters: 134,
        status: 'ongoing',
        category: 'Xianxia',
        lastUpdated: '2024-09-17T12:10:00Z',
        trend: 'falling',
      },
      {
        id: 5,
        rank: 5,
        prevRank: 7,
        title: 'Celestial Warrior',
        author: 'star_scribe',
        score: 9.0,
        views: 1567890,
        votes: 8765,
        rating: 4.5,
        chapters: 67,
        status: 'ongoing',
        category: 'Action',
        lastUpdated: '2024-09-16T08:30:00Z',
        trend: 'rising',
      },
    ],
    authors: [
      {
        id: 1,
        rank: 1,
        prevRank: 1,
        name: 'dragon_master',
        novels: 3,
        totalViews: 8567432,
        totalVotes: 34567,
        avgRating: 4.8,
        followers: 45678,
        status: 'active',
        joinDate: '2023-01-15T00:00:00Z',
        trend: 'stable',
      },
      {
        id: 2,
        rank: 2,
        prevRank: 3,
        name: 'flame_writer',
        novels: 2,
        totalViews: 6234567,
        totalVotes: 28934,
        avgRating: 4.7,
        followers: 38765,
        status: 'active',
        joinDate: '2023-03-22T00:00:00Z',
        trend: 'rising',
      },
      {
        id: 3,
        rank: 3,
        prevRank: 2,
        name: 'sage_author',
        novels: 4,
        totalViews: 5987654,
        totalVotes: 25678,
        avgRating: 4.6,
        followers: 34567,
        status: 'active',
        joinDate: '2022-11-08T00:00:00Z',
        trend: 'falling',
      },
    ],
    readers: [
      {
        id: 1,
        rank: 1,
        prevRank: 1,
        username: 'epic_reader_99',
        readingTime: 2847,
        chaptersRead: 5678,
        reviews: 234,
        comments: 1567,
        points: 89567,
        level: 'Diamond',
        status: 'active',
        joinDate: '2023-01-01T00:00:00Z',
        trend: 'stable',
      },
      {
        id: 2,
        rank: 2,
        prevRank: 4,
        username: 'fantasy_lover',
        readingTime: 2156,
        chaptersRead: 4567,
        reviews: 189,
        comments: 1234,
        points: 76543,
        level: 'Platinum',
        status: 'active',
        joinDate: '2023-02-15T00:00:00Z',
        trend: 'rising',
      },
      {
        id: 3,
        rank: 3,
        prevRank: 2,
        username: 'cultivation_expert',
        readingTime: 1987,
        chaptersRead: 3987,
        reviews: 156,
        comments: 987,
        points: 65432,
        level: 'Gold',
        status: 'active',
        joinDate: '2023-03-10T00:00:00Z',
        trend: 'falling',
      },
    ],
  };

  // Fetch data
  const fetchData = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        let filteredData = mockData[activeTab] || [];

        // Apply search filter
        if (searchValue) {
          filteredData = filteredData.filter((item) => {
            if (activeTab === 'novels') {
              return (
                item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.author.toLowerCase().includes(searchValue.toLowerCase())
              );
            } else if (activeTab === 'authors') {
              return item.name.toLowerCase().includes(searchValue.toLowerCase());
            } else {
              return item.username.toLowerCase().includes(searchValue.toLowerCase());
            }
          });
        }

        // Apply filters
        if (filters.category && activeTab === 'novels') {
          filteredData = filteredData.filter((item) => item.category === filters.category);
        }

        if (filters.status) {
          filteredData = filteredData.filter((item) => item.status === filters.status);
        }

        if (filters.trend) {
          filteredData = filteredData.filter((item) => item.trend === filters.trend);
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
        console.error('Failed to fetch rankings:', error);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchValue, filters, pagination.pageSize, pagination.current, activeTab]
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, filters, activeTab]);

  // Filter configurations for different tabs
  const getFilterConfig = () => {
    const baseFilters = [
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
          { value: 'ongoing', label: 'Ongoing' },
          { value: 'completed', label: 'Completed' },
        ],
      },
      {
        name: 'trend',
        label: 'Trend',
        type: 'select',
        options: [
          { value: 'rising', label: 'Rising' },
          { value: 'falling', label: 'Falling' },
          { value: 'stable', label: 'Stable' },
        ],
      },
    ];

    if (activeTab === 'novels') {
      return [
        ...baseFilters,
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          options: [
            { value: 'Cultivation', label: 'Cultivation' },
            { value: 'Fantasy', label: 'Fantasy' },
            { value: 'Adventure', label: 'Adventure' },
            { value: 'Xianxia', label: 'Xianxia' },
            { value: 'Action', label: 'Action' },
          ],
        },
      ];
    }

    return baseFilters;
  };

  // Dynamic columns based on active tab
  const getColumns = () => {
    const baseColumns = [
      {
        title: 'Rank',
        dataIndex: 'rank',
        key: 'rank',
        width: 80,
        render: (rank, record) => (
          <Space>
            {rank <= 3 && (
              <CrownOutlined
                style={{
                  color: rank === 1 ? '#ffd700' : rank === 2 ? '#c0c0c0' : '#cd7f32',
                }}
              />
            )}
            <Text strong style={{ fontSize: '16px' }}>
              #{rank}
            </Text>
            {record.trend === 'rising' && <RiseOutlined style={{ color: '#52c41a' }} />}
            {record.trend === 'falling' && <FallOutlined style={{ color: '#ff4d4f' }} />}
          </Space>
        ),
      },
    ];

    if (activeTab === 'novels') {
      return [
        ...baseColumns,
        {
          title: 'Novel',
          key: 'novel',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Text strong style={{ fontSize: '15px' }}>
                {record.title}
              </Text>
              <Space>
                <UserOutlined />
                <Text type="secondary">{record.author}</Text>
                <Tag color="blue">{record.category}</Tag>
              </Space>
              <Space>
                <Text type="secondary">{record.chapters} chapters</Text>
                <StatusBadge status={record.status} />
              </Space>
            </Space>
          ),
        },
        {
          title: 'Performance',
          key: 'performance',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Statistic
                title="Score"
                value={record.score}
                precision={1}
                suffix="/10"
                valueStyle={{ fontSize: '14px' }}
              />
              <Space>
                <EyeOutlined />
                <Text>{record.views.toLocaleString()} views</Text>
              </Space>
              <Space>
                <StarOutlined />
                <Text>
                  {record.rating}/5 ({record.votes} votes)
                </Text>
              </Space>
            </Space>
          ),
        },
      ];
    } else if (activeTab === 'authors') {
      return [
        ...baseColumns,
        {
          title: 'Author',
          key: 'author',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Space>
                <Avatar icon={<UserOutlined />} />
                <Text strong style={{ fontSize: '15px' }}>
                  {record.name}
                </Text>
              </Space>
              <Space>
                <BookOutlined />
                <Text type="secondary">{record.novels} novels</Text>
                <TeamOutlined />
                <Text type="secondary">{record.followers.toLocaleString()} followers</Text>
              </Space>
              <StatusBadge status={record.status} />
            </Space>
          ),
        },
        {
          title: 'Statistics',
          key: 'stats',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Space>
                <EyeOutlined />
                <Text>{record.totalViews.toLocaleString()} total views</Text>
              </Space>
              <Space>
                <StarOutlined />
                <Text>{record.avgRating}/5 avg rating</Text>
              </Space>
              <Space>
                <Text type="secondary">{record.totalVotes.toLocaleString()} total votes</Text>
              </Space>
            </Space>
          ),
        },
      ];
    } else {
      return [
        ...baseColumns,
        {
          title: 'Reader',
          key: 'reader',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Space>
                <Avatar icon={<UserOutlined />} />
                <Text strong style={{ fontSize: '15px' }}>
                  {record.username}
                </Text>
              </Space>
              <Tag color="gold">{record.level}</Tag>
              <StatusBadge status={record.status} />
            </Space>
          ),
        },
        {
          title: 'Activity',
          key: 'activity',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Space>
                <BookOutlined />
                <Text>{record.chaptersRead.toLocaleString()} chapters</Text>
              </Space>
              <Space>
                <Text type="secondary">{record.readingTime}h reading time</Text>
              </Space>
              <Space>
                <Text type="secondary">
                  {record.reviews} reviews • {record.comments} comments
                </Text>
              </Space>
              <Progress
                percent={Math.min((record.points / 100000) * 100, 100)}
                size="small"
                format={() => `${record.points.toLocaleString()} pts`}
              />
            </Space>
          ),
        },
      ];
    }
  };

  // Tab configuration
  const tabs = [
    { key: 'novels', label: 'Novel Rankings', icon: <BookOutlined /> },
    { key: 'authors', label: 'Author Rankings', icon: <UserOutlined /> },
    { key: 'readers', label: 'Reader Rankings', icon: <TeamOutlined /> },
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
    console.log('View ranking:', record);
  };

  const handleEdit = (record) => {
    console.log('Edit ranking:', record);
  };

  const handleDelete = (record) => {
    console.log('Delete ranking:', record);
  };

  const handleTableChange = (paginationInfo) => {
    fetchData(paginationInfo);
  };

  const columns = [
    ...getColumns(),
    {
      title: 'Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
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
              key: 'feature',
              icon: <FireOutlined />,
              label: 'Feature',
            },
            {
              key: 'promote',
              icon: <TrophyOutlined />,
              label: 'Promote',
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Rankings Management"
        subtitle="Manage and moderate platform rankings"
        breadcrumbs={[{ title: 'Dashboard', href: '/admin/dashboard' }, { title: 'Rankings' }]}
        actions={[
          <Button key="refresh" type="default" icon={<TrophyOutlined />}>
            Update Rankings
          </Button>,
          <Button key="featured" type="primary" icon={<FireOutlined />}>
            Manage Featured
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
          <LoadingSpinner tip={`Loading ${activeTab} rankings...`} />
        ) : data.length === 0 ? (
          <EmptyState
            title="No Rankings Found"
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

export default Rankings;
