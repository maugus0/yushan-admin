import { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Space,
  Table,
  Tooltip,
  Avatar,
  Typography,
  Tag,
  Progress,
  Grid,
  Card,
} from 'antd';
import {
  BookOutlined,
  UserOutlined,
  HeartOutlined,
  EyeOutlined,
  CalendarOutlined,
  FolderOutlined,
  StarOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  BarsOutlined,
  TeamOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import {
  PageHeader,
  SearchBar,
  FilterPanel,
  ActionButtons,
  EmptyState,
  LoadingSpinner,
} from '../../../components/admin/common';

const { Text } = Typography;
const { useBreakpoint } = Grid;

const Library = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('collections');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({});

  // Mock data for different library sections
  const mockData = {
    collections: [
      {
        id: 1,
        collectionId: 'COL_001',
        name: 'Cultivation Favorites',
        description: 'My favorite cultivation novels of all time',
        owner: 'epic_reader_99',
        novelCount: 15,
        followerCount: 1247,
        isPublic: true,
        status: 'active',
        novels: ['The Cultivation Path', 'Dragon Emperor', 'Immortal Realm'],
        tags: ['cultivation', 'xianxia', 'favorites'],
        createdAt: '2024-09-01T10:30:00Z',
        updatedAt: '2024-09-20T14:30:00Z',
        views: 5674,
      },
      {
        id: 2,
        collectionId: 'COL_002',
        name: 'Fantasy Adventures',
        description: 'Epic fantasy adventures and magical worlds',
        owner: 'fantasy_lover',
        novelCount: 23,
        followerCount: 892,
        isPublic: true,
        status: 'active',
        novels: ['Mystic Journey', 'Celestial Warrior', 'Magic Academy'],
        tags: ['fantasy', 'adventure', 'magic'],
        createdAt: '2024-08-15T16:45:00Z',
        updatedAt: '2024-09-19T11:20:00Z',
        views: 3456,
      },
      {
        id: 3,
        collectionId: 'COL_003',
        name: 'Private Reading List',
        description: 'Personal reading queue - currently reading',
        owner: 'private_reader',
        novelCount: 8,
        followerCount: 0,
        isPublic: false,
        status: 'active',
        novels: ['Secret Novel', 'Hidden Story', 'Private Tale'],
        tags: ['personal', 'reading', 'queue'],
        createdAt: '2024-09-10T08:15:00Z',
        updatedAt: '2024-09-18T19:45:00Z',
        views: 0,
      },
    ],
    bookmarks: [
      {
        id: 1,
        bookmarkId: 'BMK_001',
        user: 'epic_reader_99',
        novel: 'The Cultivation Path',
        chapter: 'Chapter 47: The Breaking Point',
        chapterNumber: 47,
        bookmarkType: 'reading_progress',
        note: 'Amazing cliff-hanger! Need to continue tomorrow.',
        isPrivate: false,
        createdAt: '2024-09-20T22:30:00Z',
        lastAccessed: '2024-09-20T22:30:00Z',
      },
      {
        id: 2,
        bookmarkId: 'BMK_002',
        user: 'fantasy_lover',
        novel: 'Mystic Journey',
        chapter: 'Chapter 12: The Enchanted Forest',
        chapterNumber: 12,
        bookmarkType: 'favorite_scene',
        note: 'This scene was so beautifully written!',
        isPrivate: false,
        createdAt: '2024-09-19T18:45:00Z',
        lastAccessed: '2024-09-20T10:15:00Z',
      },
      {
        id: 3,
        bookmarkId: 'BMK_003',
        user: 'careful_reader',
        novel: 'Dragon Emperor',
        chapter: 'Chapter 89: The Final Battle',
        chapterNumber: 89,
        bookmarkType: 'important_plot',
        note: 'Key plot point - remember this for later!',
        isPrivate: true,
        createdAt: '2024-09-18T14:20:00Z',
        lastAccessed: '2024-09-19T16:30:00Z',
      },
    ],
    reading_history: [
      {
        id: 1,
        historyId: 'HIS_001',
        user: 'epic_reader_99',
        novel: 'The Cultivation Path',
        lastChapter: 47,
        totalChapters: 156,
        readingProgress: 30.1,
        timeSpent: 1247, // minutes
        lastRead: '2024-09-20T22:30:00Z',
        startedReading: '2024-08-15T10:00:00Z',
        status: 'reading',
        rating: 5,
        bookmarked: true,
      },
      {
        id: 2,
        historyId: 'HIS_002',
        user: 'fantasy_lover',
        novel: 'Mystic Journey',
        lastChapter: 89,
        totalChapters: 89,
        readingProgress: 100,
        timeSpent: 2156,
        lastRead: '2024-09-19T20:45:00Z',
        startedReading: '2024-07-20T14:30:00Z',
        status: 'completed',
        rating: 4,
        bookmarked: false,
      },
      {
        id: 3,
        historyId: 'HIS_003',
        user: 'casual_reader',
        novel: 'Dragon Emperor',
        lastChapter: 15,
        totalChapters: 203,
        readingProgress: 7.4,
        timeSpent: 245,
        lastRead: '2024-09-10T16:20:00Z',
        startedReading: '2024-09-05T12:00:00Z',
        status: 'paused',
        rating: null,
        bookmarked: true,
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
            if (activeTab === 'collections') {
              return (
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.description
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                item.owner.toLowerCase().includes(searchValue.toLowerCase())
              );
            } else if (activeTab === 'bookmarks') {
              return (
                item.user.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.novel.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.note.toLowerCase().includes(searchValue.toLowerCase())
              );
            } else {
              return (
                item.user.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.novel.toLowerCase().includes(searchValue.toLowerCase())
              );
            }
          });
        }

        // Apply filters
        if (filters.status) {
          filteredData = filteredData.filter(
            (item) => item.status === filters.status
          );
        }

        if (filters.isPublic !== undefined && activeTab === 'collections') {
          filteredData = filteredData.filter(
            (item) => item.isPublic === filters.isPublic
          );
        }

        if (filters.bookmarkType && activeTab === 'bookmarks') {
          filteredData = filteredData.filter(
            (item) => item.bookmarkType === filters.bookmarkType
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
        console.error('Failed to fetch library data:', error);
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

  // Get bookmark type display
  const getBookmarkTypeDisplay = (type) => {
    const config = {
      reading_progress: { color: 'blue', icon: <ClockCircleOutlined /> },
      favorite_scene: { color: 'red', icon: <HeartOutlined /> },
      important_plot: { color: 'orange', icon: <StarOutlined /> },
    };
    return config[type] || { color: 'default', icon: <BookOutlined /> };
  };

  // Get reading status color
  const getReadingStatusColor = (status) => {
    const colors = {
      reading: 'processing',
      completed: 'success',
      paused: 'warning',
      dropped: 'error',
    };
    return colors[status] || 'default';
  };

  // Filter configurations for different tabs
  const getFilterConfig = () => {
    const baseFilters = [
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'reading', label: 'Reading' },
          { value: 'completed', label: 'Completed' },
          { value: 'paused', label: 'Paused' },
          { value: 'dropped', label: 'Dropped' },
        ],
      },
    ];

    if (activeTab === 'collections') {
      return [
        ...baseFilters,
        {
          name: 'isPublic',
          label: 'Visibility',
          type: 'select',
          options: [
            { value: true, label: 'Public' },
            { value: false, label: 'Private' },
          ],
        },
      ];
    } else if (activeTab === 'bookmarks') {
      return [
        {
          name: 'bookmarkType',
          label: 'Bookmark Type',
          type: 'select',
          options: [
            { value: 'reading_progress', label: 'Reading Progress' },
            { value: 'favorite_scene', label: 'Favorite Scene' },
            { value: 'important_plot', label: 'Important Plot' },
          ],
        },
      ];
    }

    return baseFilters;
  };

  // Dynamic columns based on active tab
  const getColumns = () => {
    if (activeTab === 'collections') {
      return [
        {
          title: 'Collection',
          key: 'collection',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Text strong style={{ fontSize: '15px' }}>
                {record.name}
              </Text>
              <Text type="secondary">{record.description}</Text>
              <Space>
                <Avatar size="small" icon={<UserOutlined />} />
                <Text>{record.owner}</Text>
                {!record.isPublic && <Tag color="orange">Private</Tag>}
              </Space>
              <Space>
                {record.tags.map((tag) => (
                  <Tag key={tag} color="blue">
                    {tag}
                  </Tag>
                ))}
              </Space>
            </Space>
          ),
        },
        {
          title: 'Statistics',
          key: 'stats',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Space>
                <BookOutlined />
                <Text>{record.novelCount} novels</Text>
              </Space>
              <Space>
                <TeamOutlined />
                <Text>{record.followerCount.toLocaleString()} followers</Text>
              </Space>
              <Space>
                <EyeOutlined />
                <Text>{record.views.toLocaleString()} views</Text>
              </Space>
            </Space>
          ),
        },
        {
          title: 'Sample Novels',
          key: 'novels',
          render: (_, record) => (
            <Space direction="vertical" size={2}>
              {record.novels.slice(0, 3).map((novel, index) => (
                <Text key={index} type="secondary" style={{ fontSize: '12px' }}>
                  • {novel}
                </Text>
              ))}
              {record.novels.length > 3 && (
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  +{record.novels.length - 3} more...
                </Text>
              )}
            </Space>
          ),
        },
      ];
    } else if (activeTab === 'bookmarks') {
      return [
        {
          title: 'Bookmark',
          key: 'bookmark',
          render: (_, record) => {
            const typeDisplay = getBookmarkTypeDisplay(record.bookmarkType);
            return (
              <Space direction="vertical" size={4}>
                <Space>
                  <Avatar size="small" icon={<UserOutlined />} />
                  <Text strong>{record.user}</Text>
                  {record.isPrivate && <Tag color="orange">Private</Tag>}
                </Space>
                <Text strong>{record.novel}</Text>
                <Space>
                  <span style={{ color: typeDisplay.color }}>
                    {typeDisplay.icon}
                  </span>
                  <Tag color={typeDisplay.color}>
                    {record.bookmarkType.replace('_', ' ').toUpperCase()}
                  </Tag>
                </Space>
              </Space>
            );
          },
        },
        {
          title: 'Chapter & Note',
          key: 'chapter',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Text strong>
                Ch. {record.chapterNumber}: {record.chapter}
              </Text>
              <Text type="secondary" style={{ fontStyle: 'italic' }}>
                "{record.note}"
              </Text>
            </Space>
          ),
        },
      ];
    } else {
      return [
        {
          title: 'Reader & Novel',
          key: 'reader',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Space>
                <Avatar icon={<UserOutlined />} />
                <Text strong>{record.user}</Text>
              </Space>
              <Text strong style={{ fontSize: '15px' }}>
                {record.novel}
              </Text>
              <Tag color={getReadingStatusColor(record.status)}>
                {record.status.toUpperCase()}
              </Tag>
            </Space>
          ),
        },
        {
          title: 'Progress',
          key: 'progress',
          render: (_, record) => (
            <Space direction="vertical" size={4} style={{ width: '100%' }}>
              <Text>
                Chapter {record.lastChapter} / {record.totalChapters}
              </Text>
              <Progress
                percent={Math.round(record.readingProgress)}
                size="small"
                status={record.status === 'completed' ? 'success' : 'active'}
              />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                <ClockCircleOutlined /> {Math.round(record.timeSpent / 60)}h{' '}
                {record.timeSpent % 60}m
              </Text>
            </Space>
          ),
        },
        {
          title: 'Reading Info',
          key: 'info',
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Started: {new Date(record.startedReading).toLocaleDateString()}
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Last read: {new Date(record.lastRead).toLocaleDateString()}
              </Text>
              {record.rating && (
                <Space>
                  <StarOutlined style={{ color: '#fadb14' }} />
                  <Text>{record.rating}/5</Text>
                </Space>
              )}
              {record.bookmarked && (
                <Tag color="blue">
                  <BookOutlined /> Bookmarked
                </Tag>
              )}
            </Space>
          ),
        },
      ];
    }
  };

  // Tab configuration
  const tabs = [
    { key: 'collections', label: 'Collections', icon: <FolderOutlined /> },
    { key: 'bookmarks', label: 'Bookmarks', icon: <BookOutlined /> },
    {
      key: 'reading_history',
      label: 'Reading History',
      icon: <BarsOutlined />,
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
    console.log('View library record:', record);
  };

  const handleEdit = (record) => {
    console.log('Edit library record:', record);
  };

  const handleDelete = (record) => {
    console.log('Delete library record:', record);
  };

  const handleTableChange = (paginationInfo) => {
    fetchData(paginationInfo);
  };

  // Mobile Card Components
  const CollectionCard = ({ collection }) => (
    <Card
      size="small"
      style={{ marginBottom: 16 }}
      actions={[
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => handleView(collection)}
          key="view"
        >
          View
        </Button>,
        <Button
          type="text"
          icon={<ShareAltOutlined />}
          onClick={() => console.log('Share', collection)}
          key="share"
        >
          Share
        </Button>,
        <Button type="text" icon={<MoreOutlined />} key="more">
          More
        </Button>,
      ]}
    >
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 500, fontSize: '16px', marginBottom: 4 }}>
          {collection.name}
        </div>
        <div style={{ color: '#666', fontSize: '14px', marginBottom: 8 }}>
          {collection.description}
        </div>
        <Space size="middle" wrap style={{ marginBottom: 8 }}>
          <Space size="small">
            <Avatar size="small" icon={<UserOutlined />} />
            <Text style={{ fontSize: '14px' }}>{collection.owner}</Text>
          </Space>
          {!collection.isPublic && <Tag color="orange">Private</Tag>}
        </Space>
        <Space size="middle" wrap style={{ marginBottom: 8 }}>
          <Space size="small">
            <BookOutlined />
            <Text style={{ fontSize: '12px' }}>
              {collection.novelCount} novels
            </Text>
          </Space>
          <Space size="small">
            <TeamOutlined />
            <Text style={{ fontSize: '12px' }}>
              {collection.followerCount.toLocaleString()} followers
            </Text>
          </Space>
        </Space>
        <Space wrap>
          {collection.tags.map((tag) => (
            <Tag key={tag} color="blue" style={{ fontSize: '11px' }}>
              {tag}
            </Tag>
          ))}
        </Space>
      </div>
      <div style={{ fontSize: '12px', color: '#999' }}>
        Updated: {new Date(collection.updatedAt).toLocaleDateString()}
      </div>
    </Card>
  );

  const BookmarkCard = ({ bookmark }) => {
    const typeDisplay = getBookmarkTypeDisplay(bookmark.bookmarkType);
    return (
      <Card
        size="small"
        style={{ marginBottom: 16 }}
        actions={[
          <Button
            type="text"
            icon={<BookOutlined />}
            onClick={() => console.log('Go to chapter', bookmark)}
            key="goto"
          >
            Go to
          </Button>,
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(bookmark)}
            key="edit"
          >
            Edit
          </Button>,
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(bookmark)}
            key="delete"
          >
            Delete
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 12 }}>
          <Space style={{ marginBottom: 8 }}>
            <Avatar size="small" icon={<UserOutlined />} />
            <Text strong style={{ fontSize: '14px' }}>
              {bookmark.user}
            </Text>
            {bookmark.isPrivate && <Tag color="orange">Private</Tag>}
          </Space>
          <div style={{ fontWeight: 500, fontSize: '16px', marginBottom: 4 }}>
            {bookmark.novel}
          </div>
          <div style={{ fontSize: '14px', marginBottom: 8, color: '#666' }}>
            Ch. {bookmark.chapterNumber}: {bookmark.chapter}
          </div>
          <Space style={{ marginBottom: 8 }}>
            <span style={{ color: typeDisplay.color }}>{typeDisplay.icon}</span>
            <Tag color={typeDisplay.color} style={{ fontSize: '11px' }}>
              {bookmark.bookmarkType.replace('_', ' ').toUpperCase()}
            </Tag>
          </Space>
          <div style={{ fontSize: '13px', fontStyle: 'italic', color: '#666' }}>
            "{bookmark.note}"
          </div>
        </div>
        <div style={{ fontSize: '12px', color: '#999' }}>
          Last accessed: {new Date(bookmark.lastAccessed).toLocaleDateString()}
        </div>
      </Card>
    );
  };

  const HistoryCard = ({ history }) => (
    <Card
      size="small"
      style={{ marginBottom: 16 }}
      actions={[
        <Button
          type="text"
          icon={<BookOutlined />}
          onClick={() => console.log('Resume reading', history)}
          key="resume"
        >
          Resume
        </Button>,
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => handleView(history)}
          key="view"
        >
          View
        </Button>,
        <Button type="text" icon={<MoreOutlined />} key="more">
          More
        </Button>,
      ]}
    >
      <div style={{ marginBottom: 12 }}>
        <Space style={{ marginBottom: 8 }}>
          <Avatar size="small" icon={<UserOutlined />} />
          <Text strong style={{ fontSize: '14px' }}>
            {history.user}
          </Text>
        </Space>
        <div style={{ fontWeight: 500, fontSize: '16px', marginBottom: 4 }}>
          {history.novel}
        </div>
        <Tag
          color={getReadingStatusColor(history.status)}
          style={{ marginBottom: 8 }}
        >
          {history.status.toUpperCase()}
        </Tag>
        <div style={{ marginBottom: 8 }}>
          <Text style={{ fontSize: '14px', marginBottom: 4, display: 'block' }}>
            Chapter {history.lastChapter} / {history.totalChapters}
          </Text>
          <Progress
            percent={Math.round(history.readingProgress)}
            size="small"
            status={history.status === 'completed' ? 'success' : 'active'}
          />
        </div>
        <Space size="middle" wrap>
          <Space size="small">
            <ClockCircleOutlined />
            <Text style={{ fontSize: '12px' }}>
              {Math.round(history.timeSpent / 60)}h {history.timeSpent % 60}m
            </Text>
          </Space>
          {history.rating && (
            <Space size="small">
              <StarOutlined style={{ color: '#fadb14' }} />
              <Text style={{ fontSize: '12px' }}>{history.rating}/5</Text>
            </Space>
          )}
        </Space>
      </div>
      <div style={{ fontSize: '12px', color: '#999' }}>
        Last read: {new Date(history.lastRead).toLocaleDateString()}
      </div>
    </Card>
  );

  const renderMobileCards = () => {
    return (
      <div>
        {data.map((item) => {
          if (activeTab === 'collections') {
            return <CollectionCard key={item.id} collection={item} />;
          } else if (activeTab === 'bookmarks') {
            return <BookmarkCard key={item.id} bookmark={item} />;
          } else {
            return <HistoryCard key={item.id} history={item} />;
          }
        })}
        {/* Mobile Pagination */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button
            disabled={pagination.current <= 1}
            onClick={() =>
              handleTableChange({
                ...pagination,
                current: pagination.current - 1,
              })
            }
            style={{ marginRight: 8 }}
          >
            Previous
          </Button>
          <span style={{ margin: '0 16px' }}>
            {pagination.current} /{' '}
            {Math.ceil(pagination.total / pagination.pageSize)}
          </span>
          <Button
            disabled={
              pagination.current >=
              Math.ceil(pagination.total / pagination.pageSize)
            }
            onClick={() =>
              handleTableChange({
                ...pagination,
                current: pagination.current + 1,
              })
            }
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

  const columns = [
    ...getColumns(),
    {
      title: activeTab === 'reading_history' ? 'Last Read' : 'Updated',
      dataIndex:
        activeTab === 'reading_history'
          ? 'lastRead'
          : activeTab === 'bookmarks'
            ? 'lastAccessed'
            : 'updatedAt',
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
            activeTab === 'collections'
              ? [
                  {
                    key: 'share',
                    icon: <ShareAltOutlined />,
                    label: 'Share Collection',
                  },
                  {
                    key: 'export',
                    icon: <DownloadOutlined />,
                    label: 'Export',
                  },
                ]
              : activeTab === 'bookmarks'
                ? [
                    {
                      key: 'goto',
                      icon: <BookOutlined />,
                      label: 'Go to Chapter',
                    },
                  ]
                : [
                    {
                      key: 'resume',
                      icon: <BookOutlined />,
                      label: 'Resume Reading',
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
        title="Library Management"
        subtitle="Manage user collections, bookmarks, and reading history"
        breadcrumbs={[
          { title: 'Dashboard', href: '/admin/dashboard' },
          { title: 'Library' },
        ]}
        actions={[
          <Button key="export" type="default" icon={<DownloadOutlined />}>
            Export Data
          </Button>,
          <Button key="analytics" type="primary" icon={<BarsOutlined />}>
            Reading Analytics
          </Button>,
        ]}
      />

      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {/* Tab Navigation */}
        <Space
          wrap
          style={{
            width: '100%',
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}
        >
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              type={activeTab === tab.key ? 'primary' : 'default'}
              icon={tab.icon}
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontSize: isMobile ? '12px' : '14px',
                padding: isMobile ? '4px 8px' : undefined,
              }}
            >
              {isMobile ? tab.icon : tab.label}
            </Button>
          ))}
        </Space>

        <SearchBar
          placeholder={`Search ${activeTab.replace('_', ' ')}...`}
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
          <LoadingSpinner tip={`Loading ${activeTab.replace('_', ' ')}...`} />
        ) : data.length === 0 ? (
          <EmptyState
            title="No Data Found"
            description={`No ${activeTab.replace('_', ' ')} match your current search and filter criteria.`}
            actions={[
              {
                children: 'Clear Filters',
                onClick: handleClearFilters,
              },
            ]}
          />
        ) : isMobile ? (
          renderMobileCards()
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} ${activeTab.replace('_', ' ')}`,
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

export default Library;
