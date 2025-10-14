import { Space, Typography, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Breadcrumbs from './breadcrumbs';

const { Title, Text } = Typography;

const PageHeader = ({
  title,
  subtitle,
  onBack,
  showBackButton = false,
  breadcrumbs = [],
  showBreadcrumbs = true,
  extra,
  actions = [],
  tags,
  avatar,
  footer,
  style = {},
  className = '',
  children,
  ..._props
}) => {
  const backIcon = showBackButton ? <ArrowLeftOutlined /> : null;

  const headerExtra = (
    <Space size="middle">
      {actions.map((action, index) => (
        <span key={index}>{action}</span>
      ))}
      {extra}
    </Space>
  );

  return (
    <div style={{ marginBottom: '24px', ...style }} className={className}>
      {/* Breadcrumbs */}
      {showBreadcrumbs && breadcrumbs.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}

      {/* Main Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: footer ? '16px' : '0',
        }}
      >
        <div style={{ flex: 1 }}>
          <Space align="start" size="middle">
            {showBackButton && (
              <span
                onClick={onBack}
                style={{
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: '#1890ff',
                  display: 'flex',
                  alignItems: 'center',
                  height: '32px',
                }}
              >
                {backIcon}
              </span>
            )}

            {avatar && <div>{avatar}</div>}

            <div>
              <Title level={2} style={{ margin: 0, lineHeight: 1.2 }}>
                {title}
              </Title>
              {subtitle && (
                <Text
                  type="secondary"
                  style={{
                    fontSize: '14px',
                    display: 'block',
                    marginTop: '4px',
                  }}
                >
                  {subtitle}
                </Text>
              )}
              {tags && <div style={{ marginTop: '8px' }}>{tags}</div>}
            </div>
          </Space>
        </div>

        {(actions.length > 0 || extra) && (
          <div style={{ marginLeft: '16px' }}>{headerExtra}</div>
        )}
      </div>

      {/* Footer */}
      {footer && (
        <>
          <Divider style={{ margin: '16px 0' }} />
          <div>{footer}</div>
        </>
      )}

      {/* Children Content */}
      {children && (
        <>
          <Divider style={{ margin: '16px 0' }} />
          <div>{children}</div>
        </>
      )}
    </div>
  );
};

export default PageHeader;
