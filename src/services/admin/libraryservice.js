import api from './api';

// Generate mock library data
const generateMockLibraryData = () => {
  const libraries = [];
  const bookmarks = [];
  const readingHistory = [];
  const collections = [];
  
  const usernames = [
    'book_lover_2024', 'reading_enthusiast', 'novel_addict', 'story_seeker',
    'chapter_hunter', 'fantasy_fan', 'romance_reader', 'mystery_solver',
    'sci_fi_explorer', 'adventure_time', 'bookworm_bella', 'page_turner',
    'story_collector', 'novel_ninja', 'reading_raven', 'plot_hunter'
  ];
  
  const collectionNames = [
    'Must Read Later', 'Currently Reading', 'Favorites', 'Completed',
    'Dropped', 'On Hold', 'Re-read List', 'Recommended by Friends',
    'Fantasy Collection', 'Romance Novels', 'Mystery & Thriller',
    'Sci-Fi Adventures', 'Historical Fiction', 'Young Adult',
    'Classic Literature', 'Light Novels', 'Web Novels', 'Short Stories'
  ];
  
  // Generate user libraries
  for (let userId = 1; userId <= 100; userId++) {
    const librarySize = Math.floor(Math.random() * 200) + 50; // 50-250 books per user
    
    libraries.push({
      id: userId,
      userId,
      username: usernames[Math.floor(Math.random() * usernames.length)],
      totalBooks: librarySize,
      totalReadingTime: Math.floor(Math.random() * 1000) + 100, // hours
      booksCompleted: Math.floor(librarySize * 0.4), // ~40% completed
      booksReading: Math.floor(librarySize * 0.2), // ~20% currently reading
      booksWantToRead: Math.floor(librarySize * 0.3), // ~30% want to read
      booksDropped: Math.floor(librarySize * 0.1), // ~10% dropped
      favoriteGenres: ['fantasy', 'romance', 'mystery'].slice(0, Math.floor(Math.random() * 3) + 1),
      averageRating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0
      createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      updatedAt: new Date().toISOString(),
    });
    
    // Generate bookmarks for this user
    const bookmarkCount = Math.floor(Math.random() * 50) + 10; // 10-60 bookmarks
    for (let j = 0; j < bookmarkCount; j++) {
      const bookmarkDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      
      bookmarks.push({
        id: bookmarks.length + 1,
        userId,
        novelId: Math.floor(Math.random() * 100) + 1,
        chapterId: Math.floor(Math.random() * 50) + 1,
        chapterTitle: `Chapter ${Math.floor(Math.random() * 50) + 1}`,
        position: Math.floor(Math.random() * 5000) + 100, // Character position
        note: Math.random() > 0.7 ? 'Interesting plot development here!' : null,
        isPrivate: Math.random() > 0.8,
        tags: Math.random() > 0.6 ? ['important', 'favorite_scene'] : [],
        createdAt: bookmarkDate.toISOString(),
        updatedAt: bookmarkDate.toISOString(),
      });
    }
    
    // Generate reading history
    const historyCount = Math.floor(Math.random() * 100) + 20; // 20-120 history entries
    for (let k = 0; k < historyCount; k++) {
      const readDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      
      readingHistory.push({
        id: readingHistory.length + 1,
        userId,
        novelId: Math.floor(Math.random() * 100) + 1,
        chapterId: Math.floor(Math.random() * 50) + 1,
        chapterTitle: `Chapter ${Math.floor(Math.random() * 50) + 1}`,
        progress: Math.floor(Math.random() * 100) + 1, // Percentage
        readingTime: Math.floor(Math.random() * 60) + 5, // Minutes
        device: Math.random() > 0.5 ? 'mobile' : Math.random() > 0.5 ? 'desktop' : 'tablet',
        platform: Math.random() > 0.3 ? 'web' : 'app',
        completed: Math.random() > 0.7,
        createdAt: readDate.toISOString(),
      });
    }
    
    // Generate collections for some users
    if (Math.random() > 0.3) { // 70% of users have custom collections
      const userCollectionCount = Math.floor(Math.random() * 8) + 2; // 2-10 collections
      for (let l = 0; l < userCollectionCount; l++) {
        collections.push({
          id: collections.length + 1,
          userId,
          name: collectionNames[Math.floor(Math.random() * collectionNames.length)],
          description: 'A curated collection of my favorite novels and stories.',
          isPublic: Math.random() > 0.6,
          bookCount: Math.floor(Math.random() * 30) + 1,
          followerCount: Math.floor(Math.random() * 100),
          createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    }
  }
  
  return { libraries, bookmarks, readingHistory, collections };
};

const mockData = generateMockLibraryData();
const { libraries: mockLibraries, bookmarks: mockBookmarks, readingHistory: mockReadingHistory, collections: mockCollections } = mockData;

export const libraryService = {
  // Get all user libraries with pagination and filtering
  getAllLibraries: async (params = {}) => {
    try {
      await api.delay(600);
      
      const {
        page = 1,
        pageSize = 20,
        search = '',
        sortBy = 'updatedAt',
        sortOrder = 'desc',
        minBooks = null,
        maxBooks = null,
      } = params;
      
      let libraries = [...mockLibraries];
      
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        libraries = libraries.filter(library => 
          library.username.toLowerCase().includes(searchLower)
        );
      }
      
      // Filter by book count range
      if (minBooks !== null) {
        libraries = libraries.filter(library => library.totalBooks >= parseInt(minBooks));
      }
      
      if (maxBooks !== null) {
        libraries = libraries.filter(library => library.totalBooks <= parseInt(maxBooks));
      }
      
      // Apply sorting
      libraries.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        
        if (sortBy === 'totalBooks' || sortBy === 'booksCompleted' || sortBy === 'totalReadingTime') {
          aValue = parseInt(aValue);
          bValue = parseInt(bValue);
        } else if (sortBy === 'averageRating') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        } else if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
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
      const paginatedLibraries = libraries.slice(start, end);
      
      return {
        success: true,
        data: paginatedLibraries,
        total: libraries.length,
        page,
        pageSize,
        totalPages: Math.ceil(libraries.length / pageSize),
      };
    } catch (error) {
      throw new Error('Failed to fetch libraries');
    }
  },

  // Get user library by user ID
  getUserLibrary: async (userId) => {
    try {
      await api.delay(400);
      
      const library = mockLibraries.find(l => l.userId === parseInt(userId));
      
      if (!library) {
        throw new Error('Library not found');
      }
      
      // Get user's recent activity
      const recentHistory = mockReadingHistory
        .filter(h => h.userId === parseInt(userId))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10);
      
      // Get user's bookmarks
      const userBookmarks = mockBookmarks
        .filter(b => b.userId === parseInt(userId))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 20);
      
      // Get user's collections
      const userCollections = mockCollections.filter(c => c.userId === parseInt(userId));
      
      return {
        success: true,
        data: {
          ...library,
          recentHistory,
          bookmarks: userBookmarks,
          collections: userCollections,
        },
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user library');
    }
  },

  // Get all bookmarks with filtering
  getAllBookmarks: async (params = {}) => {
    try {
      await api.delay(500);
      
      const {
        page = 1,
        pageSize = 20,
        userId = null,
        novelId = null,
        search = '',
        isPrivate = null,
      } = params;
      
      let bookmarks = [...mockBookmarks];
      
      // Filter by user
      if (userId) {
        bookmarks = bookmarks.filter(bookmark => bookmark.userId === parseInt(userId));
      }
      
      // Filter by novel
      if (novelId) {
        bookmarks = bookmarks.filter(bookmark => bookmark.novelId === parseInt(novelId));
      }
      
      // Filter by privacy
      if (isPrivate !== null) {
        bookmarks = bookmarks.filter(bookmark => bookmark.isPrivate === isPrivate);
      }
      
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        bookmarks = bookmarks.filter(bookmark => 
          bookmark.chapterTitle.toLowerCase().includes(searchLower) ||
          (bookmark.note && bookmark.note.toLowerCase().includes(searchLower))
        );
      }
      
      // Sort by creation date (newest first)
      bookmarks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      // Apply pagination
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedBookmarks = bookmarks.slice(start, end);
      
      return {
        success: true,
        data: paginatedBookmarks,
        total: bookmarks.length,
        page,
        pageSize,
        totalPages: Math.ceil(bookmarks.length / pageSize),
      };
    } catch (error) {
      throw new Error('Failed to fetch bookmarks');
    }
  },

  // Get reading history with filtering
  getReadingHistory: async (params = {}) => {
    try {
      await api.delay(500);
      
      const {
        page = 1,
        pageSize = 50,
        userId = null,
        novelId = null,
        dateFrom = null,
        dateTo = null,
        device = '',
        completed = null,
      } = params;
      
      let history = [...mockReadingHistory];
      
      // Filter by user
      if (userId) {
        history = history.filter(h => h.userId === parseInt(userId));
      }
      
      // Filter by novel
      if (novelId) {
        history = history.filter(h => h.novelId === parseInt(novelId));
      }
      
      // Filter by device
      if (device) {
        history = history.filter(h => h.device === device);
      }
      
      // Filter by completion status
      if (completed !== null) {
        history = history.filter(h => h.completed === completed);
      }
      
      // Date range filter
      if (dateFrom) {
        history = history.filter(h => new Date(h.createdAt) >= new Date(dateFrom));
      }
      
      if (dateTo) {
        history = history.filter(h => new Date(h.createdAt) <= new Date(dateTo));
      }
      
      // Sort by reading date (newest first)
      history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      // Apply pagination
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedHistory = history.slice(start, end);
      
      return {
        success: true,
        data: paginatedHistory,
        total: history.length,
        page,
        pageSize,
        totalPages: Math.ceil(history.length / pageSize),
      };
    } catch (error) {
      throw new Error('Failed to fetch reading history');
    }
  },

  // Get all collections
  getAllCollections: async (params = {}) => {
    try {
      await api.delay(500);
      
      const {
        page = 1,
        pageSize = 20,
        userId = null,
        isPublic = null,
        search = '',
        sortBy = 'updatedAt',
        sortOrder = 'desc',
      } = params;
      
      let collections = [...mockCollections];
      
      // Filter by user
      if (userId) {
        collections = collections.filter(c => c.userId === parseInt(userId));
      }
      
      // Filter by public status
      if (isPublic !== null) {
        collections = collections.filter(c => c.isPublic === isPublic);
      }
      
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        collections = collections.filter(c => 
          c.name.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply sorting
      collections.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        
        if (sortBy === 'bookCount' || sortBy === 'followerCount') {
          aValue = parseInt(aValue);
          bValue = parseInt(bValue);
        } else if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
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
      const paginatedCollections = collections.slice(start, end);
      
      return {
        success: true,
        data: paginatedCollections,
        total: collections.length,
        page,
        pageSize,
        totalPages: Math.ceil(collections.length / pageSize),
      };
    } catch (error) {
      throw new Error('Failed to fetch collections');
    }
  },

  // Create new bookmark
  createBookmark: async (bookmarkData) => {
    try {
      await api.delay(400);
      
      const newBookmark = {
        id: Math.max(...mockBookmarks.map(b => b.id)) + 1,
        ...bookmarkData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      mockBookmarks.push(newBookmark);
      
      return {
        success: true,
        data: newBookmark,
        message: 'Bookmark created successfully',
      };
    } catch (error) {
      throw new Error('Failed to create bookmark');
    }
  },

  // Update bookmark
  updateBookmark: async (id, updateData) => {
    try {
      await api.delay(300);
      
      const bookmarkIndex = mockBookmarks.findIndex(b => b.id === parseInt(id));
      
      if (bookmarkIndex === -1) {
        throw new Error('Bookmark not found');
      }
      
      mockBookmarks[bookmarkIndex] = {
        ...mockBookmarks[bookmarkIndex],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };
      
      return {
        success: true,
        data: mockBookmarks[bookmarkIndex],
        message: 'Bookmark updated successfully',
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to update bookmark');
    }
  },

  // Delete bookmark
  deleteBookmark: async (id) => {
    try {
      await api.delay(300);
      
      const bookmarkIndex = mockBookmarks.findIndex(b => b.id === parseInt(id));
      
      if (bookmarkIndex === -1) {
        throw new Error('Bookmark not found');
      }
      
      const deletedBookmark = mockBookmarks[bookmarkIndex];
      mockBookmarks.splice(bookmarkIndex, 1);
      
      return {
        success: true,
        data: deletedBookmark,
        message: 'Bookmark deleted successfully',
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to delete bookmark');
    }
  },

  // Create new collection
  createCollection: async (collectionData) => {
    try {
      await api.delay(500);
      
      const newCollection = {
        id: Math.max(...mockCollections.map(c => c.id)) + 1,
        ...collectionData,
        bookCount: 0,
        followerCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      mockCollections.push(newCollection);
      
      return {
        success: true,
        data: newCollection,
        message: 'Collection created successfully',
      };
    } catch (error) {
      throw new Error('Failed to create collection');
    }
  },

  // Update collection
  updateCollection: async (id, updateData) => {
    try {
      await api.delay(400);
      
      const collectionIndex = mockCollections.findIndex(c => c.id === parseInt(id));
      
      if (collectionIndex === -1) {
        throw new Error('Collection not found');
      }
      
      mockCollections[collectionIndex] = {
        ...mockCollections[collectionIndex],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };
      
      return {
        success: true,
        data: mockCollections[collectionIndex],
        message: 'Collection updated successfully',
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to update collection');
    }
  },

  // Delete collection
  deleteCollection: async (id) => {
    try {
      await api.delay(400);
      
      const collectionIndex = mockCollections.findIndex(c => c.id === parseInt(id));
      
      if (collectionIndex === -1) {
        throw new Error('Collection not found');
      }
      
      const deletedCollection = mockCollections[collectionIndex];
      mockCollections.splice(collectionIndex, 1);
      
      return {
        success: true,
        data: deletedCollection,
        message: 'Collection deleted successfully',
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to delete collection');
    }
  },

  // Get library statistics
  getLibraryStats: async (period = '30d') => {
    try {
      await api.delay(400);
      
      const now = new Date();
      const periodDays = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      const startDate = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);
      
      const periodHistory = mockReadingHistory.filter(h => new Date(h.createdAt) >= startDate);
      const periodBookmarks = mockBookmarks.filter(b => new Date(b.createdAt) >= startDate);
      const periodCollections = mockCollections.filter(c => new Date(c.createdAt) >= startDate);
      
      const totalReadingTime = mockReadingHistory.reduce((sum, h) => sum + h.readingTime, 0);
      const averageSessionTime = totalReadingTime / mockReadingHistory.length || 0;
      
      const deviceStats = mockReadingHistory.reduce((acc, h) => {
        acc[h.device] = (acc[h.device] || 0) + 1;
        return acc;
      }, {});
      
      const completionRate = mockReadingHistory.filter(h => h.completed).length / mockReadingHistory.length * 100;
      
      return {
        success: true,
        data: {
          totalUsers: mockLibraries.length,
          totalBookmarks: mockBookmarks.length,
          totalCollections: mockCollections.length,
          totalReadingSessions: mockReadingHistory.length,
          periodBookmarks: periodBookmarks.length,
          periodCollections: periodCollections.length,
          periodReadingSessions: periodHistory.length,
          totalReadingTime: Math.round(totalReadingTime / 60), // Convert to hours
          averageSessionTime: Math.round(averageSessionTime), // Minutes
          deviceStats,
          completionRate: Math.round(completionRate),
          averageBooksPerUser: Math.round(mockLibraries.reduce((sum, l) => sum + l.totalBooks, 0) / mockLibraries.length),
          averageReadingTimePerUser: Math.round(mockLibraries.reduce((sum, l) => sum + l.totalReadingTime, 0) / mockLibraries.length),
          publicCollections: mockCollections.filter(c => c.isPublic).length,
          privateBookmarks: mockBookmarks.filter(b => b.isPrivate).length,
        }
      };
    } catch (error) {
      throw new Error('Failed to fetch library statistics');
    }
  },

  // Get user reading analytics
  getUserReadingAnalytics: async (userId, period = '30d') => {
    try {
      await api.delay(400);
      
      const now = new Date();
      const periodDays = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      const startDate = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);
      
      const userHistory = mockReadingHistory.filter(h => 
        h.userId === parseInt(userId) && 
        new Date(h.createdAt) >= startDate
      );
      
      const userBookmarks = mockBookmarks.filter(b => b.userId === parseInt(userId));
      const userCollections = mockCollections.filter(c => c.userId === parseInt(userId));
      
      const totalReadingTime = userHistory.reduce((sum, h) => sum + h.readingTime, 0);
      const averageSessionTime = totalReadingTime / userHistory.length || 0;
      const completedSessions = userHistory.filter(h => h.completed).length;
      
      const dailyActivity = Array.from({ length: periodDays }, (_, i) => {
        const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
        const dayHistory = userHistory.filter(h => 
          new Date(h.createdAt).toDateString() === date.toDateString()
        );
        
        return {
          date: date.toISOString().split('T')[0],
          sessions: dayHistory.length,
          readingTime: dayHistory.reduce((sum, h) => sum + h.readingTime, 0),
          chaptersRead: dayHistory.length, // Assuming 1 session = 1 chapter
        };
      });
      
      return {
        success: true,
        data: {
          totalSessions: userHistory.length,
          totalReadingTime: Math.round(totalReadingTime / 60), // Hours
          averageSessionTime: Math.round(averageSessionTime), // Minutes
          completedSessions,
          completionRate: Math.round((completedSessions / userHistory.length) * 100) || 0,
          totalBookmarks: userBookmarks.length,
          totalCollections: userCollections.length,
          dailyActivity,
          favoriteReadingTime: getMostActiveHour(userHistory),
          mostUsedDevice: getMostUsedDevice(userHistory),
        }
      };
    } catch (error) {
      throw new Error('Failed to fetch user reading analytics');
    }
  },

  // Get popular collections
  getPopularCollections: async (limit = 10) => {
    try {
      await api.delay(400);
      
      const popularCollections = mockCollections
        .filter(c => c.isPublic)
        .sort((a, b) => b.followerCount - a.followerCount)
        .slice(0, limit);
      
      return {
        success: true,
        data: popularCollections,
      };
    } catch (error) {
      throw new Error('Failed to fetch popular collections');
    }
  },
};

// Helper functions
function getMostActiveHour(history) {
  const hourCounts = history.reduce((acc, h) => {
    const hour = new Date(h.createdAt).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});
  
  const mostActiveHour = Object.entries(hourCounts)
    .sort(([,a], [,b]) => b - a)[0];
  
  return mostActiveHour ? parseInt(mostActiveHour[0]) : null;
}

function getMostUsedDevice(history) {
  const deviceCounts = history.reduce((acc, h) => {
    acc[h.device] = (acc[h.device] || 0) + 1;
    return acc;
  }, {});
  
  const mostUsedDevice = Object.entries(deviceCounts)
    .sort(([,a], [,b]) => b - a)[0];
  
  return mostUsedDevice ? mostUsedDevice[0] : null;
}

export default libraryService;
