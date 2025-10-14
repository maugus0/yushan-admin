import api from './api';

// Generate mock comments data
const generateMockComments = () => {
  const comments = [];
  const usernames = [
    'bookworm_2024',
    'novel_lover',
    'fantasy_fan',
    'romance_reader',
    'action_seeker',
    'mystery_solver',
    'sci_fi_explorer',
    'horror_enthusiast',
    'drama_queen',
    'adventure_time',
    'reader_extraordinaire',
    'story_hunter',
    'chapter_chaser',
    'plot_analyzer',
    'character_critic',
  ];

  const commentTexts = [
    "This chapter was absolutely amazing! Can't wait for the next one.",
    'The character development is really impressive here.',
    "Plot twist! I didn't see that coming at all.",
    "The author's writing style is getting better with each chapter.",
    'This story keeps me on the edge of my seat.',
    'Love the detailed world-building in this novel.',
    'The dialogue feels so natural and engaging.',
    'This cliffhanger is killing me! Need more chapters.',
    'The romance subplot is developing beautifully.',
    'Such vivid descriptions, I can picture everything.',
    'The action scenes are so well written.',
    'This character reminds me of someone from another novel.',
    'The pacing of this story is perfect.',
    "I've been following this story since chapter 1, amazing journey!",
    'The emotional depth of this chapter brought tears to my eyes.',
    'When will the next chapter be released?',
    'This is definitely going into my favorites list.',
    'The plot is getting more complex and interesting.',
    'I love how the author handles multiple POVs.',
    'This story deserves more recognition!',
  ];

  // Generate comments for first 50 novels and their chapters
  for (let novelId = 1; novelId <= 50; novelId++) {
    const novelCommentCount = Math.floor(Math.random() * 200) + 50; // 50-250 comments per novel

    for (let i = 0; i < novelCommentCount; i++) {
      const createdDate = new Date(
        2023,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      );
      createdDate.setHours(createdDate.getHours() + i * 2); // Spread comments over time

      const hasReplies = Math.random() > 0.7;
      const isReply = Math.random() > 0.8 && comments.length > 0;
      const parentComment = isReply
        ? comments[Math.floor(Math.random() * Math.min(comments.length, 50))]
        : null;

      comments.push({
        id: comments.length + 1,
        novelId,
        chapterId: Math.floor(Math.random() * 50) + 1, // Random chapter within range
        userId: Math.floor(Math.random() * usernames.length) + 1,
        username: usernames[Math.floor(Math.random() * usernames.length)],
        userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${usernames[Math.floor(Math.random() * usernames.length)]}`,

        // Comment structure
        parentId: parentComment?.id || null,
        level: parentComment ? 1 : 0, // Simple 2-level structure
        threadId: parentComment?.threadId || comments.length + 1,

        // Content
        content: commentTexts[Math.floor(Math.random() * commentTexts.length)],
        originalContent: null, // For edited comments

        // Status and moderation
        status:
          Math.random() > 0.05
            ? 'approved'
            : Math.random() > 0.5
              ? 'pending'
              : 'rejected',
        isEdited: Math.random() > 0.9,
        isReported: Math.random() > 0.98,
        isSpam: Math.random() > 0.995,
        isPinned: Math.random() > 0.98,
        isAuthorReply: Math.random() > 0.95,

        // Engagement
        likes: Math.floor(Math.random() * 100) + 1,
        dislikes: Math.floor(Math.random() * 10),
        replyCount: hasReplies ? Math.floor(Math.random() * 5) + 1 : 0,

        // Moderation info
        reportCount:
          Math.random() > 0.98 ? Math.floor(Math.random() * 5) + 1 : 0,
        moderatedBy: Math.random() > 0.95 ? 'moderator_alex' : null,
        moderatedAt: Math.random() > 0.95 ? new Date().toISOString() : null,
        moderationReason: null,

        // User info
        userRole: Math.random() > 0.95 ? 'vip' : 'regular',
        userLevel: Math.floor(Math.random() * 50) + 1,

        // Metadata
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0 (compatible; YushanApp/1.0)',

        // Timestamps
        createdAt: createdDate.toISOString(),
        updatedAt: createdDate.toISOString(),
        editedAt:
          Math.random() > 0.9
            ? new Date(
                createdDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000
              ).toISOString()
            : null,
      });
    }
  }

  return comments;
};

const mockComments = generateMockComments();

export const commentService = {
  // Get all comments with filtering and pagination
  getAllComments: async (params = {}) => {
    try {
      await api.delay(500);

      const {
        page = 1,
        pageSize = 20,
        novelId = null,
        chapterId = null,
        userId = null,
        status = '',
        search = '',
        sortBy = 'createdAt',
        sortOrder = 'desc',
        isReported = null,
        includeReplies = true,
      } = params;

      let comments = [...mockComments];

      // Filter by novel
      if (novelId) {
        comments = comments.filter(
          (comment) => comment.novelId === parseInt(novelId)
        );
      }

      // Filter by chapter
      if (chapterId) {
        comments = comments.filter(
          (comment) => comment.chapterId === parseInt(chapterId)
        );
      }

      // Filter by user
      if (userId) {
        comments = comments.filter(
          (comment) => comment.userId === parseInt(userId)
        );
      }

      // Filter by status
      if (status) {
        comments = comments.filter((comment) => comment.status === status);
      }

      // Filter by reported status
      if (isReported !== null) {
        comments = comments.filter(
          (comment) => comment.isReported === isReported
        );
      }

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        comments = comments.filter(
          (comment) =>
            comment.content.toLowerCase().includes(searchLower) ||
            comment.username.toLowerCase().includes(searchLower)
        );
      }

      // Filter out replies if not requested
      if (!includeReplies) {
        comments = comments.filter((comment) => comment.parentId === null);
      }

      // Apply sorting
      comments.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === 'likes' || sortBy === 'replyCount') {
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
      const paginatedComments = comments.slice(start, end);

      return {
        success: true,
        data: paginatedComments,
        total: comments.length,
        page,
        pageSize,
        totalPages: Math.ceil(comments.length / pageSize),
      };
    } catch (error) {
      throw new Error('Failed to fetch comments');
    }
  },

  // Get comments by novel or chapter
  getCommentsByTarget: async (targetType, targetId, params = {}) => {
    try {
      await api.delay(400);

      const {
        page = 1,
        pageSize = 50,
        includeReplies = true,
        status = 'approved',
      } = params;

      let comments = mockComments.filter((comment) => {
        if (targetType === 'novel') {
          return comment.novelId === parseInt(targetId);
        } else if (targetType === 'chapter') {
          return comment.chapterId === parseInt(targetId);
        }
        return false;
      });

      // Filter by status
      if (status) {
        comments = comments.filter((comment) => comment.status === status);
      }

      // Build comment tree if including replies
      if (includeReplies) {
        const buildCommentTree = (comments) => {
          const commentMap = new Map();
          const rootComments = [];

          // Create map of all comments
          comments.forEach((comment) => {
            commentMap.set(comment.id, { ...comment, replies: [] });
          });

          // Build tree structure
          comments.forEach((comment) => {
            if (comment.parentId) {
              const parent = commentMap.get(comment.parentId);
              if (parent) {
                parent.replies.push(commentMap.get(comment.id));
              }
            } else {
              rootComments.push(commentMap.get(comment.id));
            }
          });

          return rootComments;
        };

        comments = buildCommentTree(comments);
      } else {
        comments = comments.filter((comment) => comment.parentId === null);
      }

      // Sort by creation date (newest first)
      comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Apply pagination
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedComments = comments.slice(start, end);

      return {
        success: true,
        data: paginatedComments,
        total: comments.length,
        page,
        pageSize,
      };
    } catch (error) {
      throw new Error('Failed to fetch comments by target');
    }
  },

  // Get comment by ID
  getCommentById: async (id) => {
    try {
      await api.delay(300);

      const comment = mockComments.find((c) => c.id === parseInt(id));

      if (!comment) {
        throw new Error('Comment not found');
      }

      // Get replies if this is a parent comment
      const replies = mockComments.filter((c) => c.parentId === comment.id);

      return {
        success: true,
        data: {
          ...comment,
          replies,
        },
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch comment');
    }
  },

  // Create new comment
  createComment: async (commentData) => {
    try {
      await api.delay(600);

      const newComment = {
        id: Math.max(...mockComments.map((c) => c.id)) + 1,
        ...commentData,
        threadId: commentData.parentId
          ? mockComments.find((c) => c.id === commentData.parentId)?.threadId
          : Math.max(...mockComments.map((c) => c.id)) + 1,
        level: commentData.parentId ? 1 : 0,
        likes: 0,
        dislikes: 0,
        replyCount: 0,
        isEdited: false,
        isReported: false,
        isSpam: false,
        isPinned: false,
        reportCount: 0,
        status: 'pending', // Default to pending for moderation
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockComments.push(newComment);

      // Update reply count for parent comment
      if (commentData.parentId) {
        const parentComment = mockComments.find(
          (c) => c.id === commentData.parentId
        );
        if (parentComment) {
          parentComment.replyCount += 1;
        }
      }

      return {
        success: true,
        data: newComment,
      };
    } catch (error) {
      throw new Error('Failed to create comment');
    }
  },

  // Update comment
  updateComment: async (id, updateData) => {
    try {
      await api.delay(500);

      const commentIndex = mockComments.findIndex((c) => c.id === parseInt(id));

      if (commentIndex === -1) {
        throw new Error('Comment not found');
      }

      const originalComment = mockComments[commentIndex];

      const updatedComment = {
        ...originalComment,
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      // Mark as edited if content changed
      if (
        updateData.content &&
        updateData.content !== originalComment.content
      ) {
        updatedComment.isEdited = true;
        updatedComment.editedAt = new Date().toISOString();
        updatedComment.originalContent = originalComment.content;
      }

      mockComments[commentIndex] = updatedComment;

      return {
        success: true,
        data: updatedComment,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to update comment');
    }
  },

  // Delete comment
  deleteComment: async (id) => {
    try {
      await api.delay(400);

      const commentIndex = mockComments.findIndex((c) => c.id === parseInt(id));

      if (commentIndex === -1) {
        throw new Error('Comment not found');
      }

      const deletedComment = mockComments[commentIndex];

      // Also delete all replies
      const repliesToDelete = mockComments.filter(
        (c) => c.parentId === parseInt(id)
      );
      repliesToDelete.forEach((reply) => {
        const replyIndex = mockComments.findIndex((c) => c.id === reply.id);
        if (replyIndex !== -1) {
          mockComments.splice(replyIndex, 1);
        }
      });

      // Remove the main comment
      mockComments.splice(commentIndex, 1);

      // Update parent reply count if this was a reply
      if (deletedComment.parentId) {
        const parentComment = mockComments.find(
          (c) => c.id === deletedComment.parentId
        );
        if (parentComment) {
          parentComment.replyCount = Math.max(0, parentComment.replyCount - 1);
        }
      }

      return {
        success: true,
        data: deletedComment,
        message: `Comment and ${repliesToDelete.length} replies deleted successfully`,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to delete comment');
    }
  },

  // Moderate comment (approve/reject)
  moderateComment: async (id, moderationData) => {
    try {
      await api.delay(400);

      const { status, reason, moderatorId } = moderationData;

      const commentIndex = mockComments.findIndex((c) => c.id === parseInt(id));

      if (commentIndex === -1) {
        throw new Error('Comment not found');
      }

      mockComments[commentIndex] = {
        ...mockComments[commentIndex],
        status,
        moderatedBy: moderatorId,
        moderatedAt: new Date().toISOString(),
        moderationReason: reason,
        updatedAt: new Date().toISOString(),
      };

      return {
        success: true,
        data: mockComments[commentIndex],
        message: `Comment ${status} successfully`,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to moderate comment');
    }
  },

  // Bulk moderate comments
  bulkModerateComments: async (ids, moderationData) => {
    try {
      await api.delay(800);

      const { status, reason, moderatorId } = moderationData;
      const moderatedComments = [];

      ids.forEach((id) => {
        const commentIndex = mockComments.findIndex(
          (c) => c.id === parseInt(id)
        );
        if (commentIndex !== -1) {
          mockComments[commentIndex] = {
            ...mockComments[commentIndex],
            status,
            moderatedBy: moderatorId,
            moderatedAt: new Date().toISOString(),
            moderationReason: reason,
            updatedAt: new Date().toISOString(),
          };
          moderatedComments.push(mockComments[commentIndex]);
        }
      });

      return {
        success: true,
        data: moderatedComments,
        message: `${moderatedComments.length} comments ${status} successfully`,
      };
    } catch (error) {
      throw new Error('Failed to bulk moderate comments');
    }
  },

  // Get comment statistics
  getCommentStats: async (novelId = null, period = '30d') => {
    try {
      await api.delay(400);

      let comments = [...mockComments];

      if (novelId) {
        comments = comments.filter((c) => c.novelId === parseInt(novelId));
      }

      const now = new Date();
      const periodDays = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      const startDate = new Date(
        now.getTime() - periodDays * 24 * 60 * 60 * 1000
      );

      const periodComments = comments.filter(
        (c) => new Date(c.createdAt) >= startDate
      );

      return {
        success: true,
        data: {
          total: comments.length,
          periodTotal: periodComments.length,
          approved: comments.filter((c) => c.status === 'approved').length,
          pending: comments.filter((c) => c.status === 'pending').length,
          rejected: comments.filter((c) => c.status === 'rejected').length,
          reported: comments.filter((c) => c.isReported).length,
          spam: comments.filter((c) => c.isSpam).length,
          averagePerDay: Math.round(periodComments.length / periodDays),
          topCommenters: comments.reduce((acc, comment) => {
            acc[comment.username] = (acc[comment.username] || 0) + 1;
            return acc;
          }, {}),
          engagementRate: (
            periodComments.reduce((sum, c) => sum + c.likes, 0) /
              periodComments.length || 0
          ).toFixed(1),
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch comment statistics');
    }
  },

  // Pin/unpin comment
  togglePinComment: async (id) => {
    try {
      await api.delay(300);

      const commentIndex = mockComments.findIndex((c) => c.id === parseInt(id));

      if (commentIndex === -1) {
        throw new Error('Comment not found');
      }

      mockComments[commentIndex].isPinned =
        !mockComments[commentIndex].isPinned;
      mockComments[commentIndex].updatedAt = new Date().toISOString();

      return {
        success: true,
        data: mockComments[commentIndex],
        message: `Comment ${mockComments[commentIndex].isPinned ? 'pinned' : 'unpinned'} successfully`,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to toggle pin status');
    }
  },

  // Get recent comments across all novels
  getRecentComments: async (limit = 20) => {
    try {
      await api.delay(400);

      const recentComments = mockComments
        .filter((comment) => comment.status === 'approved')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);

      return {
        success: true,
        data: recentComments,
      };
    } catch (error) {
      throw new Error('Failed to fetch recent comments');
    }
  },
};

export default commentService;
