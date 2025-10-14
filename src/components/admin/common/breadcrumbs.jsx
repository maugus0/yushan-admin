import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const Breadcrumbs = ({
  items = [],
  showHome = true,
  homeIcon = <HomeOutlined />,
  homePath = '/admin/dashboard',
  homeTitle = 'Dashboard',
  separator = '/',
  style = {},
  className = '',
  autoGenerate = false,
  ...props
}) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from current path
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // Add home breadcrumb
    if (showHome) {
      breadcrumbs.push({
        title: (
          <Link to={homePath}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {homeIcon}
              {homeTitle}
            </span>
          </Link>
        ),
      });
    }

    // Generate breadcrumbs from path
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Skip the first 'admin' segment for cleaner display
      if (segment === 'admin') return;

      const isLast = index === pathSegments.length - 1;
      const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/[-_]/g, ' ');

      if (isLast) {
        // Last item should not be a link
        breadcrumbs.push({ title });
      } else {
        breadcrumbs.push({
          title: <Link to={currentPath}>{title}</Link>,
        });
      }
    });

    return breadcrumbs;
  };

  // Use provided items or auto-generate
  const breadcrumbItems = items.length > 0 ? items : autoGenerate ? generateBreadcrumbs() : [];

  // If no items and not auto-generating, don't render
  if (breadcrumbItems.length === 0) {
    return null;
  }

  // Process items to ensure proper Link components
  const processedItems = breadcrumbItems.map((item, _index) => {
    if (typeof item === 'string') {
      return { title: item };
    }

    if (item.href && !item.title.props) {
      return {
        ...item,
        title: <Link to={item.href}>{item.title}</Link>,
      };
    }

    return item;
  });

  return (
    <Breadcrumb
      items={processedItems}
      separator={separator}
      style={{
        margin: '8px 0',
        fontSize: '14px',
        ...style,
      }}
      className={className}
      {...props}
    />
  );
};

export default Breadcrumbs;
