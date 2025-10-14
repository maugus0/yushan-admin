import api from './api';

// Generate mock chapters data
const generateMockChapters = () => {
  const chapters = [];
  const chapterTitles = [
    'The Beginning',
    'First Encounter',
    'Hidden Powers',
    'The Journey Starts',
    'Unexpected Allies',
    'Dark Secrets',
    'Training Arc',
    'The Tournament',
    'Betrayal',
    'Rising Storm',
    'Final Battle',
    'New Dawn',
    'Mystery Unveiled',
    'Power Awakening',
    'The Chosen One',
    'Ancient Prophecy',
    'Lost Memories',
    'Forbidden Love',
    'Epic Confrontation',
    'The Resolution',
  ];

  // Generate chapters for first 30 novels
  for (let novelId = 1; novelId <= 30; novelId++) {
    const chapterCount = Math.floor(Math.random() * 100) + 20; // 20-120 chapters per novel

    for (let chapterNum = 1; chapterNum <= chapterCount; chapterNum++) {
      const publishDate = new Date(
        2023,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      );
      publishDate.setHours(publishDate.getHours() + chapterNum * 24); // Spread chapters over time

      chapters.push({
        id: chapters.length + 1,
        novelId,
        chapterNumber: chapterNum,
        title: `Chapter ${chapterNum}: ${chapterTitles[Math.floor(Math.random() * chapterTitles.length)]}`,
        slug: `chapter-${chapterNum}-${chapterTitles[Math.floor(Math.random() * chapterTitles.length)].toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,

        // Content
        content: `This is the content of chapter ${chapterNum}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
        summary: `Chapter ${chapterNum} summary: Important events unfold as the story progresses.`,
        authorNotes:
          Math.random() > 0.7
            ? `Author's note for chapter ${chapterNum}: Thank you for reading!`
            : null,

        // Status and publishing
        status:
          Math.random() > 0.1
            ? 'published'
            : Math.random() > 0.5
              ? 'draft'
              : 'scheduled',
        isPublic: Math.random() > 0.2,
        isPremium: Math.random() > 0.8,
        isLocked: Math.random() > 0.9,
        unlockPrice:
          Math.random() > 0.9 ? Math.floor(Math.random() * 100) + 50 : 0,

        // Content metrics
        wordCount: Math.floor(Math.random() * 3000) + 1000,
        readingTime: Math.floor(Math.random() * 15) + 5, // minutes

        // Engagement stats
        views: Math.floor(Math.random() * 10000) + 100,
        uniqueViews: Math.floor(Math.random() * 8000) + 80,
        likes: Math.floor(Math.random() * 500) + 10,
        comments: Math.floor(Math.random() * 100) + 1,
        bookmarks: Math.floor(Math.random() * 200) + 5,

        // Publishing info
        publishedAt: publishDate.toISOString(),
        scheduledAt: null,
        lastEditedAt: new Date(
          publishDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000
        ).toISOString(),

        // Moderation
        isReported: Math.random() > 0.98,
        reportCount:
          Math.random() > 0.98 ? Math.floor(Math.random() * 5) + 1 : 0,
        moderationStatus: 'approved',
        moderationNotes: null,

        // SEO
        seoTitle: null,
        seoDescription: null,

        // Timestamps
        createdAt: publishDate.toISOString(),
        updatedAt: new Date(
          publishDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
      });
    }
  }

  return chapters;
};

const mockChapters = generateMockChapters();

export const chapterService = {
  // Get all chapters with filtering and pagination
  getAllChapters: async (params = {}) => {
    try {
      await api.delay(500);

      const {
        page = 1,
        pageSize = 20,
        novelId = null,
        search = '',
        status = '',
        sortBy = 'publishedAt',
        sortOrder = 'desc',
        isPremium = null,
        isReported = null,
      } = params;

      let chapters = [...mockChapters];

      // Filter by novel
      if (novelId) {
        chapters = chapters.filter(
          (chapter) => chapter.novelId === parseInt(novelId)
        );
      }

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        chapters = chapters.filter(
          (chapter) =>
            chapter.title.toLowerCase().includes(searchLower) ||
            chapter.content.toLowerCase().includes(searchLower)
        );
      }

      // Status filter
      if (status) {
        chapters = chapters.filter((chapter) => chapter.status === status);
      }

      // Premium filter
      if (isPremium !== null) {
        chapters = chapters.filter(
          (chapter) => chapter.isPremium === isPremium
        );
      }

      // Reported filter
      if (isReported !== null) {
        chapters = chapters.filter(
          (chapter) => chapter.isReported === isReported
        );
      }

      // Apply sorting
      chapters.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === 'chapterNumber') {
          aValue = parseInt(aValue);
          bValue = parseInt(bValue);
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      // Apply pagination
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedChapters = chapters.slice(start, end);

      return {
        success: true,
        data: paginatedChapters,
        total: chapters.length,
        page,
        pageSize,
        totalPages: Math.ceil(chapters.length / pageSize),
      };
    } catch (error) {
      throw new Error('Failed to fetch chapters');
    }
  },

  // Get chapters by novel ID
  getChaptersByNovel: async (novelId, params = {}) => {
    try {
      await api.delay(400);

      const {
        page = 1,
        pageSize = 50,
        includeContent = false,
        status = '',
      } = params;

      let chapters = mockChapters.filter(
        (chapter) => chapter.novelId === parseInt(novelId)
      );

      if (status) {
        chapters = chapters.filter((chapter) => chapter.status === status);
      }

      // Sort by chapter number
      chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);

      // Remove content if not requested (for performance)
      if (!includeContent) {
        chapters = chapters.map((chapter) => {
          // eslint-disable-next-line no-unused-vars
          const { content, ...chapterWithoutContent } = chapter;
          return chapterWithoutContent;
        });
      }

      // Apply pagination
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedChapters = chapters.slice(start, end);

      return {
        success: true,
        data: paginatedChapters,
        total: chapters.length,
        page,
        pageSize,
      };
    } catch (error) {
      throw new Error('Failed to fetch chapters by novel');
    }
  },

  // Get chapter by ID
  getChapterById: async (id) => {
    try {
      await api.delay(300);

      const chapter = mockChapters.find((c) => c.id === parseInt(id));

      if (!chapter) {
        throw new Error('Chapter not found');
      }

      return {
        success: true,
        data: chapter,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch chapter');
    }
  },

  // Create new chapter
  createChapter: async (chapterData) => {
    try {
      await api.delay(800);

      const { novelId } = chapterData;

      // Find the highest chapter number for this novel
      const existingChapters = mockChapters.filter(
        (c) => c.novelId === parseInt(novelId)
      );
      const maxChapterNumber =
        existingChapters.length > 0
          ? Math.max(...existingChapters.map((c) => c.chapterNumber))
          : 0;

      const newChapter = {
        id: Math.max(...mockChapters.map((c) => c.id)) + 1,
        chapterNumber: maxChapterNumber + 1,
        slug: chapterData.title
          ? chapterData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
          : `chapter-${maxChapterNumber + 1}`,
        ...chapterData,
        wordCount: chapterData.content
          ? chapterData.content.split(/\s+/).length
          : 0,
        readingTime: chapterData.content
          ? Math.ceil(chapterData.content.split(/\s+/).length / 200)
          : 0,
        views: 0,
        uniqueViews: 0,
        likes: 0,
        comments: 0,
        bookmarks: 0,
        isReported: false,
        reportCount: 0,
        moderationStatus: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt:
          chapterData.status === 'published' ? new Date().toISOString() : null,
        lastEditedAt: new Date().toISOString(),
      };

      mockChapters.push(newChapter);

      return {
        success: true,
        data: newChapter,
      };
    } catch (error) {
      throw new Error('Failed to create chapter');
    }
  },

  // Update chapter
  updateChapter: async (id, updateData) => {
    try {
      await api.delay(600);

      const chapterIndex = mockChapters.findIndex((c) => c.id === parseInt(id));

      if (chapterIndex === -1) {
        throw new Error('Chapter not found');
      }

      const updatedChapter = {
        ...mockChapters[chapterIndex],
        ...updateData,
        updatedAt: new Date().toISOString(),
        lastEditedAt: new Date().toISOString(),
      };

      // Update word count and reading time if content changed
      if (updateData.content) {
        updatedChapter.wordCount = updateData.content.split(/\s+/).length;
        updatedChapter.readingTime = Math.ceil(updatedChapter.wordCount / 200);
      }

      // Update publish date if status changed to published
      if (
        updateData.status === 'published' &&
        mockChapters[chapterIndex].status !== 'published'
      ) {
        updatedChapter.publishedAt = new Date().toISOString();
      }

      mockChapters[chapterIndex] = updatedChapter;

      return {
        success: true,
        data: updatedChapter,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to update chapter');
    }
  },

  // Delete chapter
  deleteChapter: async (id) => {
    try {
      await api.delay(400);

      const chapterIndex = mockChapters.findIndex((c) => c.id === parseInt(id));

      if (chapterIndex === -1) {
        throw new Error('Chapter not found');
      }

      const deletedChapter = mockChapters.splice(chapterIndex, 1)[0];

      return {
        success: true,
        data: deletedChapter,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to delete chapter');
    }
  },

  // Get chapter statistics
  getChapterStats: async (id) => {
    try {
      await api.delay(400);

      const chapter = mockChapters.find((c) => c.id === parseInt(id));

      if (!chapter) {
        throw new Error('Chapter not found');
      }

      // Generate mock analytics data
      const generateHourlyStats = (hours = 24) => {
        return Array.from({ length: hours }, (_, i) => {
          const date = new Date();
          date.setHours(date.getHours() - (hours - 1 - i));
          return {
            hour: date.toISOString(),
            views: Math.floor(Math.random() * 100) + 10,
            uniqueViews: Math.floor(Math.random() * 80) + 8,
            timeSpent: Math.floor(Math.random() * 300) + 60, // seconds
          };
        });
      };

      return {
        success: true,
        data: {
          id: chapter.id,
          title: chapter.title,
          chapterNumber: chapter.chapterNumber,
          hourlyStats: generateHourlyStats(24),
          engagement: {
            views: chapter.views,
            uniqueViews: chapter.uniqueViews,
            likes: chapter.likes,
            comments: chapter.comments,
            bookmarks: chapter.bookmarks,
            averageReadingTime: `${chapter.readingTime} minutes`,
            completionRate: `${(Math.random() * 30 + 70).toFixed(1)}%`,
            bounceRate: `${(Math.random() * 20 + 10).toFixed(1)}%`,
          },
          readerBehavior: {
            scrollDepth: `${(Math.random() * 20 + 80).toFixed(1)}%`,
            returnReaders: `${(Math.random() * 40 + 40).toFixed(1)}%`,
            shareRate: `${(Math.random() * 10 + 2).toFixed(1)}%`,
            commentRate: `${(Math.random() * 15 + 5).toFixed(1)}%`,
          },
        },
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch chapter statistics');
    }
  },

  // Bulk update chapters
  bulkUpdateChapters: async (ids, updateData) => {
    try {
      await api.delay(800);

      const updatedChapters = [];

      ids.forEach((id) => {
        const chapterIndex = mockChapters.findIndex(
          (c) => c.id === parseInt(id)
        );
        if (chapterIndex !== -1) {
          mockChapters[chapterIndex] = {
            ...mockChapters[chapterIndex],
            ...updateData,
            updatedAt: new Date().toISOString(),
          };
          updatedChapters.push(mockChapters[chapterIndex]);
        }
      });

      return {
        success: true,
        data: updatedChapters,
        message: `${updatedChapters.length} chapters updated successfully`,
      };
    } catch (error) {
      throw new Error('Failed to bulk update chapters');
    }
  },

  // Reorder chapters
  reorderChapters: async (novelId, chapterOrders) => {
    try {
      await api.delay(500);

      const novelChapters = mockChapters.filter(
        (c) => c.novelId === parseInt(novelId)
      );

      chapterOrders.forEach(({ chapterId, newOrder }) => {
        const chapter = novelChapters.find((c) => c.id === parseInt(chapterId));
        if (chapter) {
          chapter.chapterNumber = newOrder;
          chapter.updatedAt = new Date().toISOString();
        }
      });

      return {
        success: true,
        message: 'Chapters reordered successfully',
      };
    } catch (error) {
      throw new Error('Failed to reorder chapters');
    }
  },

  // Schedule chapter publication
  scheduleChapter: async (id, scheduledDate) => {
    try {
      await api.delay(300);

      const chapterIndex = mockChapters.findIndex((c) => c.id === parseInt(id));

      if (chapterIndex === -1) {
        throw new Error('Chapter not found');
      }

      mockChapters[chapterIndex].status = 'scheduled';
      mockChapters[chapterIndex].scheduledAt = scheduledDate;
      mockChapters[chapterIndex].updatedAt = new Date().toISOString();

      return {
        success: true,
        data: mockChapters[chapterIndex],
        message: 'Chapter scheduled successfully',
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to schedule chapter');
    }
  },

  // Get recent chapters across all novels
  getRecentChapters: async (limit = 20) => {
    try {
      await api.delay(400);

      const recentChapters = mockChapters
        .filter((chapter) => chapter.status === 'published')
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, limit);

      return {
        success: true,
        data: recentChapters,
      };
    } catch (error) {
      throw new Error('Failed to fetch recent chapters');
    }
  },
};

export default chapterService;
