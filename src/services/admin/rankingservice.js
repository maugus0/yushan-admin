import api from './api';

// Generate mock ranking data
const generateMockRankingData = () => {
  const rankings = [];
  const rankingTypes = [
    { id: 'trending', name: 'Trending Now', updateFrequency: 'hourly' },
    { id: 'popular', name: 'Most Popular', updateFrequency: 'daily' },
    { id: 'top_rated', name: 'Top Rated', updateFrequency: 'daily' },
    { id: 'most_viewed', name: 'Most Viewed', updateFrequency: 'daily' },
    { id: 'new_releases', name: 'New Releases', updateFrequency: 'daily' },
    { id: 'completed', name: 'Recently Completed', updateFrequency: 'weekly' },
    {
      id: 'editors_choice',
      name: "Editor's Choice",
      updateFrequency: 'weekly',
    },
    { id: 'rising_stars', name: 'Rising Stars', updateFrequency: 'daily' },
    {
      id: 'most_bookmarked',
      name: 'Most Bookmarked',
      updateFrequency: 'daily',
    },
    { id: 'most_commented', name: 'Most Commented', updateFrequency: 'daily' },
    {
      id: 'weekly_favorites',
      name: 'Weekly Favorites',
      updateFrequency: 'weekly',
    },
    { id: 'monthly_best', name: 'Monthly Best', updateFrequency: 'monthly' },
  ];

  const genres = [
    'fantasy',
    'romance',
    'action',
    'sci-fi',
    'mystery',
    'horror',
    'drama',
    'comedy',
    'adventure',
    'historical',
    'slice-of-life',
    'thriller',
  ];

  // Generate rankings for each type
  rankingTypes.forEach((rankingType) => {
    // Global ranking
    const globalRanking = {
      id: rankings.length + 1,
      type: rankingType.id,
      typeName: rankingType.name,
      category: 'global',
      genre: null,
      region: 'global',
      timeframe:
        rankingType.updateFrequency === 'hourly'
          ? '1h'
          : rankingType.updateFrequency === 'daily'
            ? '24h'
            : rankingType.updateFrequency === 'weekly'
              ? '7d'
              : '30d',
      entries: [],
      totalEntries: 100,
      lastUpdated: new Date().toISOString(),
      nextUpdate: getNextUpdateTime(rankingType.updateFrequency),
      isActive: true,
      isVisible: true,
      weight: Math.floor(Math.random() * 100) + 1,
      createdAt: new Date(2024, 0, 1).toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Generate entries for this ranking
    for (let position = 1; position <= 100; position++) {
      const entry = {
        id: `${globalRanking.id}_${position}`,
        rankingId: globalRanking.id,
        novelId: Math.floor(Math.random() * 150) + 1,
        novelTitle: `Novel Title ${Math.floor(Math.random() * 150) + 1}`,
        authorName: `Author ${Math.floor(Math.random() * 50) + 1}`,
        position,
        previousPosition: position + Math.floor(Math.random() * 10) - 5, // +/- 5 positions
        change: Math.floor(Math.random() * 20) - 10, // -10 to +10
        score: Math.floor(Math.random() * 10000) + 1000,

        // Metrics based on ranking type
        metrics: generateMetricsForRankingType(rankingType.id),

        // Additional data
        coverImage: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
        genre: genres[Math.floor(Math.random() * genres.length)],
        status: Math.random() > 0.2 ? 'ongoing' : 'completed',
        chapterCount: Math.floor(Math.random() * 200) + 10,

        // Time tracking
        enteredAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        lastPositionChange: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
        ).toISOString(),

        // Trending data
        isRising: Math.random() > 0.7,
        isFalling: Math.random() > 0.8,
        isNew: Math.random() > 0.9,
        daysInRanking: Math.floor(Math.random() * 100) + 1,
      };

      globalRanking.entries.push(entry);
    }

    rankings.push(globalRanking);

    // Generate genre-specific rankings
    genres.forEach((genre) => {
      const genreRanking = {
        id: rankings.length + 1,
        type: rankingType.id,
        typeName: `${rankingType.name} - ${genre.charAt(0).toUpperCase() + genre.slice(1)}`,
        category: 'genre',
        genre,
        region: 'global',
        timeframe: globalRanking.timeframe,
        entries: [],
        totalEntries: 50,
        lastUpdated: new Date().toISOString(),
        nextUpdate: getNextUpdateTime(rankingType.updateFrequency),
        isActive: true,
        isVisible: Math.random() > 0.2, // 80% visible
        weight: Math.floor(Math.random() * 100) + 1,
        createdAt: new Date(2024, 0, 1).toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Generate entries for genre ranking
      for (let position = 1; position <= 50; position++) {
        const entry = {
          id: `${genreRanking.id}_${position}`,
          rankingId: genreRanking.id,
          novelId: Math.floor(Math.random() * 150) + 1,
          novelTitle: `${genre.charAt(0).toUpperCase() + genre.slice(1)} Novel ${position}`,
          authorName: `Author ${Math.floor(Math.random() * 50) + 1}`,
          position,
          previousPosition: position + Math.floor(Math.random() * 6) - 3,
          change: Math.floor(Math.random() * 10) - 5,
          score: Math.floor(Math.random() * 5000) + 500,
          metrics: generateMetricsForRankingType(rankingType.id),
          coverImage: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
          genre,
          status: Math.random() > 0.2 ? 'ongoing' : 'completed',
          chapterCount: Math.floor(Math.random() * 200) + 10,
          enteredAt: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          lastPositionChange: new Date(
            Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
          isRising: Math.random() > 0.7,
          isFalling: Math.random() > 0.8,
          isNew: Math.random() > 0.9,
          daysInRanking: Math.floor(Math.random() * 50) + 1,
        };

        genreRanking.entries.push(entry);
      }

      rankings.push(genreRanking);
    });
  });

  return rankings;
};

// Helper function to generate metrics based on ranking type
function generateMetricsForRankingType(type) {
  const baseMetrics = {
    views: Math.floor(Math.random() * 100000) + 1000,
    likes: Math.floor(Math.random() * 10000) + 100,
    bookmarks: Math.floor(Math.random() * 5000) + 50,
    comments: Math.floor(Math.random() * 2000) + 20,
    rating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0
    reviews: Math.floor(Math.random() * 500) + 10,
  };

  switch (type) {
    case 'trending':
      return {
        ...baseMetrics,
        trendingScore: Math.floor(Math.random() * 1000) + 100,
        growthRate: (Math.random() * 200 + 50).toFixed(1), // 50-250%
        velocityScore: Math.floor(Math.random() * 500) + 50,
      };

    case 'popular':
      return {
        ...baseMetrics,
        popularityScore: Math.floor(Math.random() * 2000) + 200,
        userEngagement: (Math.random() * 50 + 20).toFixed(1), // 20-70%
        shareCount: Math.floor(Math.random() * 1000) + 10,
      };

    case 'top_rated':
      return {
        ...baseMetrics,
        rating: (Math.random() * 1 + 4).toFixed(1), // 4.0-5.0 for top rated
        ratingCount: Math.floor(Math.random() * 1000) + 100,
        qualityScore: Math.floor(Math.random() * 100) + 80, // 80-100
      };

    case 'most_viewed':
      return {
        ...baseMetrics,
        views: Math.floor(Math.random() * 500000) + 10000, // Higher views
        uniqueViews: Math.floor(Math.random() * 300000) + 5000,
        viewGrowth: (Math.random() * 100 + 10).toFixed(1), // 10-110%
      };

    case 'new_releases':
      return {
        ...baseMetrics,
        releaseDate: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        initialTraction: Math.floor(Math.random() * 1000) + 100,
        discoveryRate: (Math.random() * 30 + 5).toFixed(1), // 5-35%
      };

    default:
      return baseMetrics;
  }
}

// Helper function to calculate next update time
function getNextUpdateTime(frequency) {
  const now = new Date();
  switch (frequency) {
    case 'hourly':
      return new Date(now.getTime() + 60 * 60 * 1000).toISOString();
    case 'daily':
      return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
    case 'weekly':
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    case 'monthly':
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
    default:
      return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
  }
}

const mockRankings = generateMockRankingData();

export const rankingService = {
  // Get all rankings with filtering
  getAllRankings: async (params = {}) => {
    try {
      await api.delay(600);

      const {
        page = 1,
        pageSize = 20,
        type = '',
        category = '',
        genre = '',
        region = '',
        isActive = null,
        isVisible = null,
        search = '',
      } = params;

      let rankings = [...mockRankings];

      // Apply filters
      if (type) {
        rankings = rankings.filter((r) => r.type === type);
      }

      if (category) {
        rankings = rankings.filter((r) => r.category === category);
      }

      if (genre) {
        rankings = rankings.filter((r) => r.genre === genre);
      }

      if (region && region !== 'global') {
        rankings = rankings.filter((r) => r.region === region);
      }

      if (isActive !== null) {
        rankings = rankings.filter((r) => r.isActive === isActive);
      }

      if (isVisible !== null) {
        rankings = rankings.filter((r) => r.isVisible === isVisible);
      }

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        rankings = rankings.filter((r) =>
          r.typeName.toLowerCase().includes(searchLower)
        );
      }

      // Sort by last updated (newest first)
      rankings.sort(
        (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
      );

      // Apply pagination
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedRankings = rankings.slice(start, end);

      return {
        success: true,
        data: paginatedRankings,
        total: rankings.length,
        page,
        pageSize,
        totalPages: Math.ceil(rankings.length / pageSize),
      };
    } catch (error) {
      throw new Error('Failed to fetch rankings');
    }
  },

  // Get ranking by ID with full entries
  getRankingById: async (id) => {
    try {
      await api.delay(500);

      const ranking = mockRankings.find((r) => r.id === parseInt(id));

      if (!ranking) {
        throw new Error('Ranking not found');
      }

      return {
        success: true,
        data: ranking,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch ranking');
    }
  },

  // Get ranking entries with pagination
  getRankingEntries: async (rankingId, params = {}) => {
    try {
      await api.delay(400);

      const { page = 1, pageSize = 50, search = '' } = params;

      const ranking = mockRankings.find((r) => r.id === parseInt(rankingId));

      if (!ranking) {
        throw new Error('Ranking not found');
      }

      let entries = [...ranking.entries];

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        entries = entries.filter(
          (entry) =>
            entry.novelTitle.toLowerCase().includes(searchLower) ||
            entry.authorName.toLowerCase().includes(searchLower)
        );
      }

      // Apply pagination
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedEntries = entries.slice(start, end);

      return {
        success: true,
        data: {
          ranking: {
            id: ranking.id,
            type: ranking.type,
            typeName: ranking.typeName,
            category: ranking.category,
            genre: ranking.genre,
            lastUpdated: ranking.lastUpdated,
            nextUpdate: ranking.nextUpdate,
          },
          entries: paginatedEntries,
          total: entries.length,
          page,
          pageSize,
        },
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch ranking entries');
    }
  },

  // Get trending novels (shortcut for trending ranking)
  getTrendingNovels: async (params = {}) => {
    try {
      await api.delay(400);

      const { genre = null, limit = 20 } = params;

      let trendingRanking;
      if (genre) {
        trendingRanking = mockRankings.find(
          (r) => r.type === 'trending' && r.genre === genre
        );
      } else {
        trendingRanking = mockRankings.find(
          (r) => r.type === 'trending' && r.category === 'global'
        );
      }

      if (!trendingRanking) {
        throw new Error('Trending ranking not found');
      }

      const entries = trendingRanking.entries.slice(0, limit);

      return {
        success: true,
        data: {
          ranking: trendingRanking,
          entries,
        },
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch trending novels');
    }
  },

  // Get popular novels (shortcut for popular ranking)
  getPopularNovels: async (params = {}) => {
    try {
      await api.delay(400);

      const { genre = null, limit = 20, timeframe = '24h' } = params;

      let popularRanking;
      if (genre) {
        popularRanking = mockRankings.find(
          (r) =>
            r.type === 'popular' &&
            r.genre === genre &&
            r.timeframe === timeframe
        );
      } else {
        popularRanking = mockRankings.find(
          (r) =>
            r.type === 'popular' &&
            r.category === 'global' &&
            r.timeframe === timeframe
        );
      }

      if (!popularRanking) {
        // Fallback to any popular ranking
        popularRanking = mockRankings.find((r) => r.type === 'popular');
      }

      if (!popularRanking) {
        throw new Error('Popular ranking not found');
      }

      const entries = popularRanking.entries.slice(0, limit);

      return {
        success: true,
        data: {
          ranking: popularRanking,
          entries,
        },
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch popular novels');
    }
  },

  // Update ranking
  updateRanking: async (id, updateData) => {
    try {
      await api.delay(500);

      const rankingIndex = mockRankings.findIndex((r) => r.id === parseInt(id));

      if (rankingIndex === -1) {
        throw new Error('Ranking not found');
      }

      mockRankings[rankingIndex] = {
        ...mockRankings[rankingIndex],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      return {
        success: true,
        data: mockRankings[rankingIndex],
        message: 'Ranking updated successfully',
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to update ranking');
    }
  },

  // Toggle ranking visibility
  toggleRankingVisibility: async (id) => {
    try {
      await api.delay(300);

      const rankingIndex = mockRankings.findIndex((r) => r.id === parseInt(id));

      if (rankingIndex === -1) {
        throw new Error('Ranking not found');
      }

      mockRankings[rankingIndex].isVisible =
        !mockRankings[rankingIndex].isVisible;
      mockRankings[rankingIndex].updatedAt = new Date().toISOString();

      return {
        success: true,
        data: mockRankings[rankingIndex],
        message: `Ranking ${mockRankings[rankingIndex].isVisible ? 'shown' : 'hidden'} successfully`,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to toggle ranking visibility');
    }
  },

  // Refresh ranking (simulate recalculation)
  refreshRanking: async (id) => {
    try {
      await api.delay(1000); // Longer delay to simulate computation

      const rankingIndex = mockRankings.findIndex((r) => r.id === parseInt(id));

      if (rankingIndex === -1) {
        throw new Error('Ranking not found');
      }

      // Simulate position changes
      mockRankings[rankingIndex].entries.forEach((entry) => {
        const oldPosition = entry.position;
        entry.previousPosition = oldPosition;

        // Random position change (mostly small movements)
        const change = Math.floor(Math.random() * 6) - 3; // -3 to +3
        entry.position = Math.max(1, Math.min(entry.position + change, 100));
        entry.change = oldPosition - entry.position; // Positive = moved up

        // Update score
        entry.score += Math.floor(Math.random() * 200) - 100; // +/- 100
        entry.score = Math.max(0, entry.score);

        entry.lastPositionChange = new Date().toISOString();
      });

      // Re-sort entries by position
      mockRankings[rankingIndex].entries.sort(
        (a, b) => a.position - b.position
      );

      mockRankings[rankingIndex].lastUpdated = new Date().toISOString();
      mockRankings[rankingIndex].updatedAt = new Date().toISOString();

      return {
        success: true,
        data: mockRankings[rankingIndex],
        message: 'Ranking refreshed successfully',
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to refresh ranking');
    }
  },

  // Get ranking statistics
  getRankingStats: async () => {
    try {
      await api.delay(400);

      const totalRankings = mockRankings.length;
      const activeRankings = mockRankings.filter((r) => r.isActive).length;
      const visibleRankings = mockRankings.filter((r) => r.isVisible).length;

      const rankingsByType = mockRankings.reduce((acc, ranking) => {
        acc[ranking.type] = (acc[ranking.type] || 0) + 1;
        return acc;
      }, {});

      const rankingsByCategory = mockRankings.reduce((acc, ranking) => {
        acc[ranking.category] = (acc[ranking.category] || 0) + 1;
        return acc;
      }, {});

      const lastUpdateTimes = mockRankings.map((r) => new Date(r.lastUpdated));
      const oldestUpdate = new Date(Math.min(...lastUpdateTimes));
      const newestUpdate = new Date(Math.max(...lastUpdateTimes));

      const averageEntries =
        mockRankings.reduce((sum, r) => sum + r.totalEntries, 0) /
        totalRankings;

      return {
        success: true,
        data: {
          totalRankings,
          activeRankings,
          visibleRankings,
          inactiveRankings: totalRankings - activeRankings,
          hiddenRankings: totalRankings - visibleRankings,
          rankingsByType,
          rankingsByCategory,
          averageEntries: Math.round(averageEntries),
          oldestUpdate: oldestUpdate.toISOString(),
          newestUpdate: newestUpdate.toISOString(),
          needsUpdate: mockRankings.filter(
            (r) => new Date(r.nextUpdate) <= new Date()
          ).length,
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch ranking statistics');
    }
  },

  // Get novel ranking history (track a novel's position over time)
  getNovelRankingHistory: async (
    novelId,
    rankingType = 'trending',
    period = '30d'
  ) => {
    try {
      await api.delay(500);

      // Simulate historical data
      const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      const history = [];

      for (let i = days; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const position = Math.floor(Math.random() * 50) + 1; // Random position 1-50
        const score = Math.floor(Math.random() * 5000) + 1000;

        history.push({
          date: date.toISOString().split('T')[0],
          position,
          score,
          change:
            i < days
              ? position - history[history.length - 1]?.position || 0
              : 0,
        });
      }

      return {
        success: true,
        data: {
          novelId: parseInt(novelId),
          rankingType,
          period,
          history,
          currentPosition: history[history.length - 1]?.position,
          bestPosition: Math.min(...history.map((h) => h.position)),
          worstPosition: Math.max(...history.map((h) => h.position)),
          averagePosition: Math.round(
            history.reduce((sum, h) => sum + h.position, 0) / history.length
          ),
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch novel ranking history');
    }
  },

  // Get ranking types and categories
  getRankingTypes: async () => {
    try {
      await api.delay(200);

      const types = [
        {
          id: 'trending',
          name: 'Trending Now',
          description: 'Novels gaining popularity rapidly',
        },
        {
          id: 'popular',
          name: 'Most Popular',
          description: 'Novels with highest engagement',
        },
        {
          id: 'top_rated',
          name: 'Top Rated',
          description: 'Highest rated novels by users',
        },
        {
          id: 'most_viewed',
          name: 'Most Viewed',
          description: 'Novels with most page views',
        },
        {
          id: 'new_releases',
          name: 'New Releases',
          description: 'Recently published novels',
        },
        {
          id: 'completed',
          name: 'Recently Completed',
          description: 'Novels that finished recently',
        },
        {
          id: 'editors_choice',
          name: "Editor's Choice",
          description: 'Curated by editorial team',
        },
        {
          id: 'rising_stars',
          name: 'Rising Stars',
          description: 'Up and coming novels',
        },
        {
          id: 'most_bookmarked',
          name: 'Most Bookmarked',
          description: 'Most saved by readers',
        },
        {
          id: 'most_commented',
          name: 'Most Commented',
          description: 'Novels with most discussion',
        },
        {
          id: 'weekly_favorites',
          name: 'Weekly Favorites',
          description: 'Top picks of the week',
        },
        {
          id: 'monthly_best',
          name: 'Monthly Best',
          description: 'Best novels of the month',
        },
      ];

      const categories = [
        {
          id: 'global',
          name: 'Global',
          description: 'All novels across all genres',
        },
        {
          id: 'genre',
          name: 'Genre',
          description: 'Specific to individual genres',
        },
        {
          id: 'region',
          name: 'Regional',
          description: 'Specific to geographical regions',
        },
      ];

      return {
        success: true,
        data: {
          types,
          categories,
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch ranking types');
    }
  },
};

export default rankingService;
