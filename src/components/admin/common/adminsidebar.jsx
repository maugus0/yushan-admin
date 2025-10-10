import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Badge } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  FileTextOutlined,
  TagsOutlined,
  MessageOutlined,
  StarOutlined,
  ReadOutlined,
  TrophyOutlined,
  LikeOutlined,
  FlagOutlined,
  SettingOutlined,
  EditOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { Title } = Typography;

const AdminSidebar = ({
  collapsed = false,
  width = 250,
  theme = 'light',
  style = {},
  className = '',
  notifications = {},
  onMenuClick,
  ...props
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState([]);

  const menuItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: (
        <span>
          Users
          {notifications.users > 0 && (
            <Badge count={notifications.users} size="small" style={{ marginLeft: 8 }} />
          )}
        </span>
      ),
      children: [
        {
          key: '/admin/users',
          icon: <UserOutlined />,
          label: 'Overview',
        },
        {
          key: '/admin/users/readers',
          icon: <UserOutlined />,
          label: 'Readers',
        },
        {
          key: '/admin/users/writers',
          icon: <EditOutlined />,
          label: 'Writers',
        },
      ],
    },
    {
      key: '/admin/novels',
      icon: <BookOutlined />,
      label: (
        <span>
          Novels
          {notifications.novels > 0 && (
            <Badge count={notifications.novels} size="small" style={{ marginLeft: 8 }} />
          )}
        </span>
      ),
    },
    {
      key: '/admin/chapters',
      icon: <FileTextOutlined />,
      label: 'Chapters',
    },
    {
      key: '/admin/categories',
      icon: <TagsOutlined />,
      label: 'Categories',
    },
    {
      key: '/admin/comments',
      icon: <MessageOutlined />,
      label: (
        <span>
          Comments
          {notifications.comments > 0 && (
            <Badge count={notifications.comments} size="small" style={{ marginLeft: 8 }} />
          )}
        </span>
      ),
    },
    {
      key: '/admin/reviews',
      icon: <StarOutlined />,
      label: (
        <span>
          Reviews
          {notifications.reviews > 0 && (
            <Badge count={notifications.reviews} size="small" style={{ marginLeft: 8 }} />
          )}
        </span>
      ),
    },
    {
      key: '/admin/library',
      icon: <ReadOutlined />,
      label: 'Library',
    },
    {
      key: '/admin/rankings',
      icon: <TrophyOutlined />,
      label: 'Rankings',
    },
    {
      key: '/admin/yuan',
      icon: <LikeOutlined />,
      label: 'Yuan System',
    },
    {
      key: '/admin/reports',
      icon: <FlagOutlined />,
      label: (
        <span>
          Reports
          {notifications.reports > 0 && (
            <Badge count={notifications.reports} size="small" style={{ marginLeft: 8 }} />
          )}
        </span>
      ),
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  // Initialize openKeys based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/users')) {
      setOpenKeys(['users']);
    } else {
      setOpenKeys([]);
    }
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    // Use replace: true to ensure proper navigation
    navigate(key, { replace: false });
    if (onMenuClick) {
      onMenuClick(key);
    }
  };

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const getSelectedKeys = () => {
    const path = location.pathname;
    
    // Handle nested routes
    if (path.includes('/users/readers/') || path === '/admin/users/readers') return ['/admin/users/readers'];
    if (path.includes('/users/writers/') || path === '/admin/users/writers') return ['/admin/users/writers'];
    if (path === '/admin/users') return ['/admin/users'];
    
    return [path];
  };

  const getOpenKeys = () => {
    return openKeys;
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={width}
      theme={theme}
      style={{
        background: theme === 'light' ? '#fff' : undefined,
        borderRight: theme === 'light' ? '1px solid #f0f0f0' : undefined,
        ...style
      }}
      className={className}
      {...props}
    >
      {/* Logo/Brand Section */}
      <div style={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: theme === 'light' ? '1px solid #f0f0f0' : '1px solid #303030',
        background: theme === 'light' ? '#1890ff' : '#001529',
      }}>
        <Title
          level={4}
          style={{
            color: 'white',
            margin: 0,
            fontSize: collapsed ? '16px' : '20px',
            transition: 'font-size 0.2s',
          }}
        >
          {collapsed ? 'Y' : 'Yushan'}
        </Title>
      </div>
      
      {/* Navigation Menu */}
      <Menu
        mode="inline"
        theme={theme}
        selectedKeys={getSelectedKeys()}
        openKeys={getOpenKeys()}
        onOpenChange={handleOpenChange}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ 
          border: 'none',
          height: 'calc(100vh - 64px)',
          overflowY: 'auto'
        }}
      />
    </Sider>
  );
};

export default AdminSidebar;