// Mock data for development
const generateMockReaders = () => {
  const readers = [];
  const statuses = ['active', 'inactive', 'suspended'];
  const names = [
    'Alice Johnson',
    'Bob Smith',
    'Carol Davis',
    'David Wilson',
    'Emma Brown',
    'Frank Miller',
    'Grace Lee',
    'Henry Taylor',
    'Iris Chen',
    'Jack Anderson',
    'Kate Thompson',
    'Leo Garcia',
    'Mia Rodriguez',
    'Noah Martinez',
    'Olivia White',
  ];

  for (let i = 0; i < 15; i++) {
    const joinDate = new Date(
      2023,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    );
    const lastActive = new Date(
      2024,
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 28) + 1
    );

    readers.push({
      id: `reader_${i + 1}`,
      username: names[i],
      email: `${names[i].toLowerCase().replace(' ', '.')}@example.com`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      joinDate: joinDate.toISOString(),
      lastActive: lastActive.toISOString(),
      userType: 'reader',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${names[i]}`,
      profile: {
        bio: `Avid reader who loves ${['fantasy', 'romance', 'sci-fi', 'mystery', 'thriller'][Math.floor(Math.random() * 5)]} novels.`,
        location: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][
          Math.floor(Math.random() * 5)
        ],
        favoriteGenres: ['Fantasy', 'Romance', 'Sci-Fi'].slice(
          0,
          Math.floor(Math.random() * 3) + 1
        ),
        readingStats: {
          booksRead: Math.floor(Math.random() * 100) + 10,
          chaptersRead: Math.floor(Math.random() * 1000) + 100,
          timeSpent: Math.floor(Math.random() * 500) + 50, // hours
          favoriteAuthors: Math.floor(Math.random() * 10) + 1,
        },
      },
      preferences: {
        notifications: Math.random() > 0.5,
        newsletter: Math.random() > 0.3,
        publicProfile: Math.random() > 0.7,
      },
    });
  }
  return readers;
};

const generateMockWriters = () => {
  const writers = [];
  const statuses = ['active', 'inactive', 'suspended', 'pending'];
  const names = ['Sarah Connor', 'Michael Scott', 'Elena Vasquez', 'James Park', 'Luna Rivera'];

  for (let i = 0; i < 5; i++) {
    const joinDate = new Date(
      2023,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    );
    const lastActive = new Date(
      2024,
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 28) + 1
    );

    writers.push({
      id: `writer_${i + 1}`,
      username: names[i],
      email: `${names[i].toLowerCase().replace(' ', '.')}@example.com`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      joinDate: joinDate.toISOString(),
      lastActive: lastActive.toISOString(),
      userType: 'writer',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${names[i]}`,
      profile: {
        bio: `Professional writer specializing in ${['fantasy', 'romance', 'sci-fi', 'mystery', 'thriller'][Math.floor(Math.random() * 5)]} novels.`,
        location: ['Seattle', 'Austin', 'Denver', 'Portland', 'San Francisco'][
          Math.floor(Math.random() * 5)
        ],
        genres: ['Fantasy', 'Romance', 'Sci-Fi'].slice(0, Math.floor(Math.random() * 3) + 1),
        writingStats: {
          novelsPublished: Math.floor(Math.random() * 10) + 1,
          chaptersWritten: Math.floor(Math.random() * 200) + 50,
          wordsWritten: Math.floor(Math.random() * 500000) + 100000,
          followers: Math.floor(Math.random() * 5000) + 100,
        },
      },
      verification: {
        verified: Math.random() > 0.3,
        verifiedAt: Math.random() > 0.3 ? new Date().toISOString() : null,
        documents: ['ID Card', 'Author Bio'].filter(() => Math.random() > 0.5),
      },
      earnings: {
        totalEarned: Math.floor(Math.random() * 10000) + 1000,
        thisMonth: Math.floor(Math.random() * 1000) + 100,
        currency: 'USD',
      },
    });
  }
  return writers;
};

const mockReaders = generateMockReaders();
const mockWriters = generateMockWriters();
const mockUsers = [...mockReaders, ...mockWriters];

export const userService = {
  // Get all users
  getAllUsers: async (params = {}) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      let filteredUsers = [...mockUsers];

      // Apply filters
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filteredUsers = filteredUsers.filter(
          (user) =>
            user.username.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower)
        );
      }

      if (params.status) {
        filteredUsers = filteredUsers.filter((user) => user.status === params.status);
      }

      if (params.userType) {
        filteredUsers = filteredUsers.filter((user) => user.userType === params.userType);
      }

      // Apply pagination
      const page = params.page || 1;
      const pageSize = params.pageSize || 10;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      return {
        data: filteredUsers.slice(start, end),
        total: filteredUsers.length,
        page,
        pageSize,
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get readers only
  getReaders: async (params = {}) => {
    try {
      const allParams = { ...params, userType: 'reader' };
      return await userService.getAllUsers(allParams);
    } catch (error) {
      console.error('Error fetching readers:', error);
      throw error;
    }
  },

  // Get writers only
  getWriters: async (params = {}) => {
    try {
      const allParams = { ...params, userType: 'writer' };
      return await userService.getAllUsers(allParams);
    } catch (error) {
      console.error('Error fetching writers:', error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const user = mockUsers.find((u) => u.id === id);
      if (!user) {
        throw new Error('User not found');
      }
      return { data: user };
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Create user
  createUser: async (userData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const newUser = {
        id: `${userData.userType}_${Date.now()}`,
        ...userData,
        joinDate: new Date().toISOString(),
        lastActive: new Date().toISOString(),
      };
      mockUsers.push(newUser);
      return { data: newUser };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const userIndex = mockUsers.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
      return { data: mockUsers[userIndex] };
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const userIndex = mockUsers.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      const deletedUser = mockUsers.splice(userIndex, 1)[0];
      return { data: deletedUser };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Suspend user
  suspendUser: async (id, suspensionData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const userIndex = mockUsers.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      mockUsers[userIndex].status = 'suspended';
      mockUsers[userIndex].suspension = {
        ...suspensionData,
        suspendedAt: new Date().toISOString(),
      };
      return { data: mockUsers[userIndex] };
    } catch (error) {
      console.error('Error suspending user:', error);
      throw error;
    }
  },

  // Ban user
  banUser: async (id, banData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const userIndex = mockUsers.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      mockUsers[userIndex].status = 'banned';
      mockUsers[userIndex].ban = {
        ...banData,
        bannedAt: new Date().toISOString(),
      };
      return { data: mockUsers[userIndex] };
    } catch (error) {
      console.error('Error banning user:', error);
      throw error;
    }
  },

  // Bulk actions
  bulkUpdateUsers: async (ids, updateData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedUsers = [];
      ids.forEach((id) => {
        const userIndex = mockUsers.findIndex((u) => u.id === id);
        if (userIndex !== -1) {
          mockUsers[userIndex] = { ...mockUsers[userIndex], ...updateData };
          updatedUsers.push(mockUsers[userIndex]);
        }
      });
      return { data: updatedUsers };
    } catch (error) {
      console.error('Error bulk updating users:', error);
      throw error;
    }
  },

  bulkDeleteUsers: async (ids) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const deletedUsers = [];
      ids.forEach((id) => {
        const userIndex = mockUsers.findIndex((u) => u.id === id);
        if (userIndex !== -1) {
          deletedUsers.push(...mockUsers.splice(userIndex, 1));
        }
      });
      return { data: deletedUsers };
    } catch (error) {
      console.error('Error bulk deleting users:', error);
      throw error;
    }
  },
};

export default userService;
