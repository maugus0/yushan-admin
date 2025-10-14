import { useState } from 'react';
import { Layout } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/admin/adminauthcontext';
import { AdminHeader, AdminSidebar, ErrorBoundary } from '../../components/admin/common';

const { Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  // Mock notifications data
  const mockNotifications = [
    {
      title: 'New User Registration',
      description: 'John Doe has registered as a reader',
      time: '2 minutes ago',
      type: 'user',
    },
    {
      title: 'Novel Submitted for Review',
      description: 'Jane Smith submitted "Dragon Chronicles" for review',
      time: '5 minutes ago',
      type: 'novel',
    },
    {
      title: 'Comment Reported',
      description: 'Inappropriate comment reported on Chapter 45',
      time: '10 minutes ago',
      type: 'report',
    },
    {
      title: 'New Review Posted',
      description: 'Alice rated "Mystic Journey" 5 stars',
      time: '15 minutes ago',
      type: 'review',
    },
  ];

  const sidebarNotifications = {
    users: 3,
    novels: 2,
    comments: 5,
    reviews: 1,
    reports: 2,
  };

  const handleToggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleUserMenuClick = (key) => {
    switch (key) {
      case 'profile':
        navigate('/admin/profile');
        break;
      case 'settings':
        navigate('/admin/account-settings');
        break;
      case 'logout':
        // Logout is handled in AdminHeader
        break;
      default:
        break;
    }
  };

  const handleNotificationClick = (notification) => {
    if (notification === 'view-all') {
      navigate('/admin/notifications');
    } else {
      // Handle individual notification click
      console.log('Notification clicked:', notification);
    }
  };

  return (
    <ErrorBoundary>
      <Layout style={{ minHeight: '100vh' }}>
        <AdminSidebar collapsed={collapsed} notifications={sidebarNotifications} />

        <Layout>
          <AdminHeader
            collapsed={collapsed}
            onToggleCollapsed={handleToggleCollapsed}
            notifications={mockNotifications}
            unreadCount={sidebarNotifications.users + sidebarNotifications.reports}
            onUserMenuClick={handleUserMenuClick}
            onNotificationClick={handleNotificationClick}
            showSearch={true}
            showNotifications={true}
            showFullscreen={true}
          />

          <Content
            style={{
              margin: '24px',
              padding: '24px',
              background: '#fff',
              borderRadius: '8px',
              minHeight: 280,
            }}
          >
            <ErrorBoundary
              title="Page Error"
              subTitle="Something went wrong while loading this page."
              showHomeButton={false}
            >
              <Outlet key={location.pathname} />
            </ErrorBoundary>
          </Content>
        </Layout>
      </Layout>
    </ErrorBoundary>
  );
};

export default AdminLayout;
