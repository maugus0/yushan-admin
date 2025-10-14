import api from './api';

// Generate realistic time-series data
const generateTimeSeriesData = (
  days = 30,
  baseValue = 1000,
  variance = 0.2
) => {
  const data = [];
  let currentValue = baseValue;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    // Add some realistic variation
    const change = (Math.random() - 0.5) * variance * baseValue;
    currentValue = Math.max(0, currentValue + change);

    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(currentValue),
    });
  }

  return data;
};

export const dashboardService = {
  // Get main dashboard statistics
  getDashboardStats: async () => {
    try {
      await api.delay(400);

      const now = new Date();
      // eslint-disable-next-line no-unused-vars
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      return {
        success: true,
        data: {
          // User statistics
          totalUsers: 15847,
          newUsersToday: 45,
          newUsersYesterday: 38,
          activeUsers: 12634,
          activeUsersChange: 5.2,

          // Content statistics
          totalNovels: 2341,
          newNovelsToday: 12,
          newNovelsYesterday: 8,
          publishedNovels: 1987,
          draftNovels: 354,

          totalChapters: 45623,
          newChaptersToday: 156,
          newChaptersYesterday: 142,

          // Engagement statistics
          totalViews: 1234567,
          viewsToday: 8945,
          viewsYesterday: 8234,
          viewsChange: 8.6,

          totalComments: 89234,
          newCommentsToday: 234,
          newCommentsYesterday: 198,

          totalReviews: 12456,
          newReviewsToday: 23,
          newReviewsYesterday: 19,

          // Revenue statistics (if applicable)
          totalRevenue: 45678.9,
          revenueToday: 234.56,
          revenueYesterday: 198.34,
          revenueChange: 18.3,

          // System statistics
          serverUptime: '99.9%',
          responseTime: '142ms',
          errorRate: '0.01%',

          // Last updated
          lastUpdated: now.toISOString(),
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch dashboard statistics');
    }
  },

  // Get recent activity feed
  getRecentActivity: async (limit = 20) => {
    try {
      await api.delay(300);

      const activities = [
        {
          id: 1,
          type: 'user_register',
          message: 'New user "bookworm_2024" registered',
          user: 'bookworm_2024',
          timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          icon: 'UserAddOutlined',
          color: 'green',
        },
        {
          id: 2,
          type: 'novel_publish',
          message: 'Novel "Dragon\'s Awakening" was published',
          user: 'fantasy_writer',
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          icon: 'BookOutlined',
          color: 'blue',
        },
        {
          id: 3,
          type: 'chapter_update',
          message: 'Chapter 245 of "Mystic Realm" was updated',
          user: 'author_zhang',
          timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          icon: 'EditOutlined',
          color: 'orange',
        },
        {
          id: 4,
          type: 'review_submit',
          message: 'New review submitted for "Love in Tokyo"',
          user: 'romance_reader',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          icon: 'StarOutlined',
          color: 'gold',
        },
        {
          id: 5,
          type: 'comment_report',
          message: 'Comment reported for inappropriate content',
          user: 'moderator_alex',
          timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
          icon: 'FlagOutlined',
          color: 'red',
        },
        {
          id: 6,
          type: 'user_suspend',
          message: 'User "spammer_123" was suspended',
          user: 'admin',
          timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
          icon: 'StopOutlined',
          color: 'red',
        },
        {
          id: 7,
          type: 'novel_feature',
          message: 'Novel "Epic Journey" was featured',
          user: 'editor_lisa',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          icon: 'TrophyOutlined',
          color: 'gold',
        },
        {
          id: 8,
          type: 'payment_complete',
          message: 'Writer payment of $234.56 completed',
          user: 'finance_bot',
          timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
          icon: 'DollarOutlined',
          color: 'green',
        },
        {
          id: 9,
          type: 'backup_complete',
          message: 'Daily backup completed successfully',
          user: 'system',
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          icon: 'CloudUploadOutlined',
          color: 'blue',
        },
        {
          id: 10,
          type: 'novel_translate',
          message: 'Novel "Ancient Legends" translation started',
          user: 'translator_kim',
          timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
          icon: 'GlobalOutlined',
          color: 'purple',
        },
        {
          id: 11,
          type: 'user_upgrade',
          message: 'User "premium_reader" upgraded to VIP',
          user: 'premium_reader',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          icon: 'CrownOutlined',
          color: 'gold',
        },
        {
          id: 12,
          type: 'contest_start',
          message: 'Monthly writing contest has started',
          user: 'contest_manager',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          icon: 'TrophyOutlined',
          color: 'orange',
        },
        {
          id: 13,
          type: 'maintenance',
          message: 'Scheduled maintenance completed',
          user: 'devops',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          icon: 'ToolOutlined',
          color: 'gray',
        },
        {
          id: 14,
          type: 'genre_add',
          message: 'New genre "Cyberpunk" added',
          user: 'admin',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          icon: 'TagOutlined',
          color: 'blue',
        },
        {
          id: 15,
          type: 'achievement',
          message: 'User "prolific_writer" earned "Century Club" badge',
          user: 'prolific_writer',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          icon: 'TrophyOutlined',
          color: 'gold',
        },
      ];

      return {
        success: true,
        data: activities.slice(0, limit),
      };
    } catch (error) {
      throw new Error('Failed to fetch recent activity');
    }
  },

  // Get user analytics
  getUserAnalytics: async (period = '30d') => {
    try {
      await api.delay(500);

      const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;

      return {
        success: true,
        data: {
          newUsers: generateTimeSeriesData(days, 50, 0.3),
          activeUsers: generateTimeSeriesData(days, 1200, 0.1),
          userRetention: generateTimeSeriesData(days, 85, 0.05),
          usersByType: {
            readers: 12456,
            writers: 3391,
            translators: 234,
            moderators: 45,
            admins: 12,
          },
          usersByRegion: [
            { region: 'North America', users: 5674, percentage: 35.8 },
            { region: 'Europe', users: 4123, percentage: 26.0 },
            { region: 'Asia', users: 3892, percentage: 24.6 },
            { region: 'South America', users: 1456, percentage: 9.2 },
            { region: 'Others', users: 702, percentage: 4.4 },
          ],
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch user analytics');
    }
  },

  // Get content analytics
  getContentAnalytics: async (period = '30d') => {
    try {
      await api.delay(500);

      const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;

      return {
        success: true,
        data: {
          novelsPublished: generateTimeSeriesData(days, 12, 0.4),
          chaptersPublished: generateTimeSeriesData(days, 150, 0.3),
          totalViews: generateTimeSeriesData(days, 8500, 0.2),
          averageRating: generateTimeSeriesData(days, 4.2, 0.02),
          topGenres: [
            { genre: 'Fantasy', novels: 856, views: 234567, percentage: 36.6 },
            { genre: 'Romance', novels: 623, views: 189234, percentage: 26.6 },
            { genre: 'Action', novels: 445, views: 156789, percentage: 19.0 },
            { genre: 'Sci-Fi', novels: 234, views: 98765, percentage: 10.0 },
            { genre: 'Mystery', novels: 183, views: 76543, percentage: 7.8 },
          ],
          contentModeration: {
            totalReports: 1234,
            resolvedReports: 1156,
            pendingReports: 78,
            autoModerated: 890,
            manualReview: 344,
          },
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch content analytics');
    }
  },

  // Get financial analytics
  getFinancialAnalytics: async (period = '30d') => {
    try {
      await api.delay(400);

      const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;

      return {
        success: true,
        data: {
          revenue: generateTimeSeriesData(days, 1500, 0.2),
          writerPayouts: generateTimeSeriesData(days, 800, 0.3),
          subscriptions: generateTimeSeriesData(days, 45, 0.4),
          revenueBySource: [
            { source: 'Subscriptions', amount: 23456.78, percentage: 45.2 },
            { source: 'Ad Revenue', amount: 12345.67, percentage: 23.8 },
            { source: 'Premium Content', amount: 8967.89, percentage: 17.3 },
            { source: 'Donations', amount: 4532.11, percentage: 8.7 },
            { source: 'Merchandise', amount: 2598.55, percentage: 5.0 },
          ],
          topEarningWriters: [
            { id: 1, name: 'Sarah Connor', earnings: 2345.67, novels: 12 },
            { id: 2, name: 'Michael Zhang', earnings: 1987.54, novels: 8 },
            { id: 3, name: 'Elena Rodriguez', earnings: 1765.43, novels: 15 },
            { id: 4, name: 'James Park', earnings: 1543.21, novels: 6 },
            { id: 5, name: 'Luna Kim', earnings: 1234.56, novels: 9 },
          ],
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch financial analytics');
    }
  },

  // Get system performance metrics
  getSystemMetrics: async () => {
    try {
      await api.delay(300);

      return {
        success: true,
        data: {
          uptime: '99.97%',
          responseTime: {
            average: 142,
            p95: 235,
            p99: 456,
          },
          requestsPerSecond: 1247,
          errorRate: 0.01,
          memoryUsage: 67.8,
          cpuUsage: 23.4,
          diskUsage: 45.6,
          databaseConnections: 145,
          cacheHitRate: 94.7,
          bandwidth: {
            incoming: 125.6, // MB/s
            outgoing: 234.8, // MB/s
          },
          alerts: [
            {
              id: 1,
              type: 'warning',
              message: 'High memory usage detected',
              timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            },
            {
              id: 2,
              type: 'info',
              message: 'Backup completed successfully',
              timestamp: new Date(
                Date.now() - 2 * 60 * 60 * 1000
              ).toISOString(),
            },
          ],
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch system metrics');
    }
  },

  // Get top content
  getTopContent: async (_type = 'novels', _period = '7d', limit = 10) => {
    try {
      await api.delay(400);

      const novels = [
        {
          id: 1,
          title: 'Dragon Realm Chronicles',
          author: 'Sarah Connor',
          views: 45623,
          rating: 4.8,
          comments: 1234,
        },
        {
          id: 2,
          title: 'Mystic Sword Master',
          author: 'Michael Zhang',
          views: 38945,
          rating: 4.7,
          comments: 987,
        },
        {
          id: 3,
          title: 'Love in Ancient Times',
          author: 'Elena Rodriguez',
          views: 32156,
          rating: 4.9,
          comments: 1567,
        },
        {
          id: 4,
          title: 'Cyber Ninja Academy',
          author: 'James Park',
          views: 28734,
          rating: 4.6,
          comments: 876,
        },
        {
          id: 5,
          title: 'Eternal Phoenix',
          author: 'Luna Kim',
          views: 25467,
          rating: 4.8,
          comments: 1098,
        },
        {
          id: 6,
          title: 'Shadow Hunter Guild',
          author: 'Alex Chen',
          views: 22891,
          rating: 4.5,
          comments: 743,
        },
        {
          id: 7,
          title: 'Moonlight Serenade',
          author: 'Grace Li',
          views: 20567,
          rating: 4.7,
          comments: 892,
        },
        {
          id: 8,
          title: 'Quantum Legends',
          author: 'David Kim',
          views: 18945,
          rating: 4.4,
          comments: 654,
        },
        {
          id: 9,
          title: 'Sacred Beast Tamer',
          author: 'Maria Santos',
          views: 17234,
          rating: 4.6,
          comments: 789,
        },
        {
          id: 10,
          title: 'Imperial Court Romance',
          author: 'Lisa Wang',
          views: 15678,
          rating: 4.8,
          comments: 1023,
        },
      ];

      return {
        success: true,
        data: novels.slice(0, limit),
      };
    } catch (error) {
      throw new Error('Failed to fetch top content');
    }
  },
};

export default dashboardService;
