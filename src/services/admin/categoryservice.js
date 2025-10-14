import api from './api';

// Mock categories data
const generateMockCategories = () => {
  return [
    {
      id: 1,
      name: 'Fantasy',
      slug: 'fantasy',
      description: 'Epic tales of magic, dragons, and mythical creatures',
      parentId: null,
      level: 0,
      order: 1,
      isActive: true,
      novelCount: 856,
      icon: 'crown',
      color: '#722ed1',
      seoTitle: 'Fantasy Novels - Yushan',
      seoDescription:
        'Discover amazing fantasy novels with magic, adventure, and mythical creatures.',
      createdAt: '2023-01-15T00:00:00.000Z',
      updatedAt: '2024-10-01T00:00:00.000Z',
      children: [
        {
          id: 11,
          name: 'Epic Fantasy',
          slug: 'epic-fantasy',
          description: 'Grand adventures in vast fantasy worlds',
          parentId: 1,
          level: 1,
          order: 1,
          isActive: true,
          novelCount: 234,
          createdAt: '2023-02-01T00:00:00.000Z',
          updatedAt: '2024-09-15T00:00:00.000Z',
        },
        {
          id: 12,
          name: 'Urban Fantasy',
          slug: 'urban-fantasy',
          description: 'Magic in modern city settings',
          parentId: 1,
          level: 1,
          order: 2,
          isActive: true,
          novelCount: 187,
          createdAt: '2023-02-01T00:00:00.000Z',
          updatedAt: '2024-09-20T00:00:00.000Z',
        },
        {
          id: 13,
          name: 'Dark Fantasy',
          slug: 'dark-fantasy',
          description: 'Fantasy with horror and dark themes',
          parentId: 1,
          level: 1,
          order: 3,
          isActive: true,
          novelCount: 145,
          createdAt: '2023-02-01T00:00:00.000Z',
          updatedAt: '2024-09-10T00:00:00.000Z',
        },
      ],
    },
    {
      id: 2,
      name: 'Romance',
      slug: 'romance',
      description: 'Love stories that touch the heart',
      parentId: null,
      level: 0,
      order: 2,
      isActive: true,
      novelCount: 623,
      icon: 'heart',
      color: '#eb2f96',
      seoTitle: 'Romance Novels - Yushan',
      seoDescription: 'Read heartwarming romance novels and love stories.',
      createdAt: '2023-01-15T00:00:00.000Z',
      updatedAt: '2024-10-01T00:00:00.000Z',
      children: [
        {
          id: 21,
          name: 'Contemporary Romance',
          slug: 'contemporary-romance',
          description: 'Modern day love stories',
          parentId: 2,
          level: 1,
          order: 1,
          isActive: true,
          novelCount: 198,
          createdAt: '2023-02-01T00:00:00.000Z',
          updatedAt: '2024-09-25T00:00:00.000Z',
        },
        {
          id: 22,
          name: 'Historical Romance',
          slug: 'historical-romance',
          description: 'Romance set in historical periods',
          parentId: 2,
          level: 1,
          order: 2,
          isActive: true,
          novelCount: 176,
          createdAt: '2023-02-01T00:00:00.000Z',
          updatedAt: '2024-09-18T00:00:00.000Z',
        },
        {
          id: 23,
          name: 'Paranormal Romance',
          slug: 'paranormal-romance',
          description: 'Romance with supernatural elements',
          parentId: 2,
          level: 1,
          order: 3,
          isActive: true,
          novelCount: 134,
          createdAt: '2023-02-01T00:00:00.000Z',
          updatedAt: '2024-09-12T00:00:00.000Z',
        },
      ],
    },
    {
      id: 3,
      name: 'Action',
      slug: 'action',
      description: 'Fast-paced adventures and thrilling battles',
      parentId: null,
      level: 0,
      order: 3,
      isActive: true,
      novelCount: 445,
      icon: 'fire',
      color: '#fa541c',
      seoTitle: 'Action Novels - Yushan',
      seoDescription: 'Experience thrilling action and adventure novels.',
      createdAt: '2023-01-15T00:00:00.000Z',
      updatedAt: '2024-10-01T00:00:00.000Z',
      children: [
        {
          id: 31,
          name: 'Military Action',
          slug: 'military-action',
          description: 'Military combat and warfare stories',
          parentId: 3,
          level: 1,
          order: 1,
          isActive: true,
          novelCount: 123,
          createdAt: '2023-02-01T00:00:00.000Z',
          updatedAt: '2024-09-08T00:00:00.000Z',
        },
        {
          id: 32,
          name: 'Martial Arts',
          slug: 'martial-arts',
          description: 'Stories focused on martial arts mastery',
          parentId: 3,
          level: 1,
          order: 2,
          isActive: true,
          novelCount: 167,
          createdAt: '2023-02-01T00:00:00.000Z',
          updatedAt: '2024-09-22T00:00:00.000Z',
        },
      ],
    },
    {
      id: 4,
      name: 'Sci-Fi',
      slug: 'sci-fi',
      description: 'Science fiction and futuristic adventures',
      parentId: null,
      level: 0,
      order: 4,
      isActive: true,
      novelCount: 234,
      icon: 'rocket',
      color: '#1890ff',
      seoTitle: 'Science Fiction Novels - Yushan',
      seoDescription: 'Explore futuristic worlds and advanced technology.',
      createdAt: '2023-01-15T00:00:00.000Z',
      updatedAt: '2024-10-01T00:00:00.000Z',
      children: [
        {
          id: 41,
          name: 'Space Opera',
          slug: 'space-opera',
          description: 'Epic space adventures',
          parentId: 4,
          level: 1,
          order: 1,
          isActive: true,
          novelCount: 87,
          createdAt: '2023-02-01T00:00:00.000Z',
          updatedAt: '2024-09-14T00:00:00.000Z',
        },
        {
          id: 42,
          name: 'Cyberpunk',
          slug: 'cyberpunk',
          description: 'High-tech, low-life futures',
          parentId: 4,
          level: 1,
          order: 2,
          isActive: true,
          novelCount: 56,
          createdAt: '2023-02-01T00:00:00.000Z',
          updatedAt: '2024-09-05T00:00:00.000Z',
        },
      ],
    },
    {
      id: 5,
      name: 'Mystery',
      slug: 'mystery',
      description: 'Puzzles, detectives, and suspenseful investigations',
      parentId: null,
      level: 0,
      order: 5,
      isActive: true,
      novelCount: 183,
      icon: 'search',
      color: '#52c41a',
      seoTitle: 'Mystery Novels - Yushan',
      seoDescription: 'Solve mysteries and follow detective stories.',
      createdAt: '2023-01-15T00:00:00.000Z',
      updatedAt: '2024-10-01T00:00:00.000Z',
      children: [
        {
          id: 51,
          name: 'Detective Fiction',
          slug: 'detective-fiction',
          description: 'Classic detective stories',
          parentId: 5,
          level: 1,
          order: 1,
          isActive: true,
          novelCount: 89,
          createdAt: '2023-02-01T00:00:00.000Z',
          updatedAt: '2024-09-11T00:00:00.000Z',
        },
        {
          id: 52,
          name: 'Psychological Thriller',
          slug: 'psychological-thriller',
          description: 'Mind-bending psychological mysteries',
          parentId: 5,
          level: 1,
          order: 2,
          isActive: true,
          novelCount: 67,
          createdAt: '2023-02-01T00:00:00.000Z',
          updatedAt: '2024-09-07T00:00:00.000Z',
        },
      ],
    },
    {
      id: 6,
      name: 'Horror',
      slug: 'horror',
      description: 'Scary stories and supernatural terror',
      parentId: null,
      level: 0,
      order: 6,
      isActive: true,
      novelCount: 97,
      icon: 'ghost',
      color: '#f5222d',
      seoTitle: 'Horror Novels - Yushan',
      seoDescription: 'Experience spine-chilling horror stories.',
      createdAt: '2023-01-15T00:00:00.000Z',
      updatedAt: '2024-10-01T00:00:00.000Z',
      children: [],
    },
    {
      id: 7,
      name: 'Drama',
      slug: 'drama',
      description: 'Emotional and character-driven stories',
      parentId: null,
      level: 0,
      order: 7,
      isActive: false,
      novelCount: 45,
      icon: 'mask',
      color: '#faad14',
      seoTitle: 'Drama Novels - Yushan',
      seoDescription: 'Read emotional drama and character stories.',
      createdAt: '2023-01-15T00:00:00.000Z',
      updatedAt: '2024-10-01T00:00:00.000Z',
      children: [],
    },
  ];
};

const mockCategories = generateMockCategories();

export const categoryService = {
  // Get all categories
  getAllCategories: async (params = {}) => {
    try {
      await api.delay(400);

      const {
        includeInactive = false,
        includeChildren = true,
        search = '',
        page = 1,
        pageSize = 50,
      } = params;

      let categories = [...mockCategories];

      // Filter by active status
      if (!includeInactive) {
        categories = categories.filter((cat) => cat.isActive);
      }

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        categories = categories.filter(
          (cat) =>
            cat.name.toLowerCase().includes(searchLower) ||
            cat.description.toLowerCase().includes(searchLower)
        );
      }

      // Remove children if not requested
      if (!includeChildren) {
        categories = categories.map((cat) => {
          // eslint-disable-next-line no-unused-vars
          const { children, ...categoryWithoutChildren } = cat;
          return categoryWithoutChildren;
        });
      }

      // Apply pagination
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedCategories = categories.slice(start, end);

      return {
        success: true,
        data: paginatedCategories,
        total: categories.length,
        page,
        pageSize,
      };
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  },

  // Get category by ID
  getCategoryById: async (id) => {
    try {
      await api.delay(300);

      const findCategory = (categories, targetId) => {
        for (const category of categories) {
          if (category.id === parseInt(targetId)) {
            return category;
          }
          if (category.children) {
            const found = findCategory(category.children, targetId);
            if (found) return found;
          }
        }
        return null;
      };

      const category = findCategory(mockCategories, id);

      if (!category) {
        throw new Error('Category not found');
      }

      return {
        success: true,
        data: category,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch category');
    }
  },

  // Create new category
  createCategory: async (categoryData) => {
    try {
      await api.delay(600);

      const newCategory = {
        id: Math.max(...mockCategories.map((c) => c.id)) + 1,
        ...categoryData,
        novelCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        children: [],
      };

      if (categoryData.parentId) {
        // Add as child category
        const findAndAddChild = (categories, parentId, child) => {
          for (const category of categories) {
            if (category.id === parentId) {
              category.children.push(child);
              return true;
            }
            if (
              category.children &&
              findAndAddChild(category.children, parentId, child)
            ) {
              return true;
            }
          }
          return false;
        };

        findAndAddChild(mockCategories, categoryData.parentId, newCategory);
      } else {
        // Add as top-level category
        mockCategories.push(newCategory);
      }

      return {
        success: true,
        data: newCategory,
      };
    } catch (error) {
      throw new Error('Failed to create category');
    }
  },

  // Update category
  updateCategory: async (id, updateData) => {
    try {
      await api.delay(500);

      const findAndUpdateCategory = (categories, targetId, data) => {
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].id === parseInt(targetId)) {
            categories[i] = {
              ...categories[i],
              ...data,
              updatedAt: new Date().toISOString(),
            };
            return categories[i];
          }
          if (categories[i].children) {
            const updated = findAndUpdateCategory(
              categories[i].children,
              targetId,
              data
            );
            if (updated) return updated;
          }
        }
        return null;
      };

      const updatedCategory = findAndUpdateCategory(
        mockCategories,
        id,
        updateData
      );

      if (!updatedCategory) {
        throw new Error('Category not found');
      }

      return {
        success: true,
        data: updatedCategory,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to update category');
    }
  },

  // Delete category
  deleteCategory: async (id) => {
    try {
      await api.delay(400);

      const findAndDeleteCategory = (categories, targetId) => {
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].id === parseInt(targetId)) {
            const deleted = categories.splice(i, 1)[0];
            return deleted;
          }
          if (categories[i].children) {
            const deleted = findAndDeleteCategory(
              categories[i].children,
              targetId
            );
            if (deleted) return deleted;
          }
        }
        return null;
      };

      const deletedCategory = findAndDeleteCategory(mockCategories, id);

      if (!deletedCategory) {
        throw new Error('Category not found');
      }

      return {
        success: true,
        data: deletedCategory,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to delete category');
    }
  },

  // Get category tree (hierarchical structure)
  getCategoryTree: async () => {
    try {
      await api.delay(300);

      return {
        success: true,
        data: mockCategories.filter((cat) => cat.isActive),
      };
    } catch (error) {
      throw new Error('Failed to fetch category tree');
    }
  },

  // Reorder categories
  reorderCategories: async (reorderData) => {
    try {
      await api.delay(400);

      const { parentId, categoryIds } = reorderData;

      if (parentId) {
        // Reorder children of a specific parent
        const findAndReorderChildren = (
          categories,
          targetParentId,
          newOrder
        ) => {
          for (const category of categories) {
            if (category.id === targetParentId && category.children) {
              const reorderedChildren = newOrder
                .map((id) => category.children.find((child) => child.id === id))
                .filter(Boolean);

              category.children = reorderedChildren.map((child, index) => ({
                ...child,
                order: index + 1,
                updatedAt: new Date().toISOString(),
              }));

              return true;
            }
            if (
              category.children &&
              findAndReorderChildren(
                category.children,
                targetParentId,
                newOrder
              )
            ) {
              return true;
            }
          }
          return false;
        };

        findAndReorderChildren(mockCategories, parentId, categoryIds);
      } else {
        // Reorder top-level categories
        const reorderedCategories = categoryIds
          .map((id) => mockCategories.find((cat) => cat.id === id))
          .filter(Boolean);

        mockCategories.length = 0;
        mockCategories.push(
          ...reorderedCategories.map((cat, index) => ({
            ...cat,
            order: index + 1,
            updatedAt: new Date().toISOString(),
          }))
        );
      }

      return {
        success: true,
        message: 'Categories reordered successfully',
      };
    } catch (error) {
      throw new Error('Failed to reorder categories');
    }
  },

  // Get category statistics
  getCategoryStats: async (id) => {
    try {
      await api.delay(300);

      const category = await categoryService.getCategoryById(id);

      return {
        success: true,
        data: {
          totalNovels: category.data.novelCount,
          totalViews: Math.floor(Math.random() * 500000) + 100000,
          averageRating: (Math.random() * 2 + 3).toFixed(1),
          totalChapters: Math.floor(Math.random() * 10000) + 5000,
          activeWriters: Math.floor(Math.random() * 200) + 50,
          recentActivity: Math.floor(Math.random() * 50) + 10,
          trending: Math.random() > 0.5,
          growthRate: ((Math.random() - 0.5) * 20).toFixed(1),
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch category statistics');
    }
  },
};

export default categoryService;
