import api from './api';

// Generate mock reviews data
const generateMockReviews = () => {
  const reviews = [];
  const reviewerNames = [
    'BookLover2024', 'NovelAddict', 'StorySeeker', 'ChapterChaser', 'ReadingRainbow',
    'FantasyFan', 'RomanceReader', 'ActionHero', 'MysteryMaster', 'SciFiExplorer',
    'CriticCorner', 'BookwormBella', 'ReadingRaven', 'NovelNinja', 'StoryTeller',
    'PageTurner', 'BookBard', 'PlotPundit', 'CharacterCritic', 'GenreGuru'
  ];
  
  const reviewTitles = [
    'Amazing story with great character development',
    'Could not put this down!',
    'A masterpiece in the making',
    'Incredible world-building',
    'Emotional rollercoaster',
    'Perfect pacing and plot',
    'Characters feel so real',
    'Unique and refreshing take',
    'Exceeded all my expectations',
    'Simply brilliant writing',
    'Captivating from start to finish',
    'A must-read for everyone',
    'Outstanding storytelling',
    'Beautifully written',
    'Gripping and intense',
    'Love the character dynamics',
    'Such an engaging plot',
    'Wonderful character arcs',
    'Fantastic dialogue',
    'Great representation'
  ];
  
  const reviewContents = [
    'This novel has completely captured my attention from the very first chapter. The author has created a rich, immersive world that feels both familiar and completely unique. The character development is exceptional, with each character having their own distinct voice and motivations.',
    'I was skeptical at first, but this story quickly won me over. The plot twists are unexpected but feel organic to the story. The emotional depth of the characters really resonates with readers.',
    'The writing quality in this novel is outstanding. Every chapter leaves me wanting more, and the pacing is absolutely perfect. The author knows exactly when to reveal information and when to hold back.',
    'What I love most about this novel is how real the characters feel. They have flaws, they make mistakes, and they grow throughout the story. The relationships between characters are complex and beautifully written.',
    'This is easily one of the best novels I\'ve read this year. The world-building is incredible, and the magic system is both unique and well-explained. I can\'t wait to see where the story goes next.',
    'The author has created something truly special here. The emotional moments hit hard, and the action sequences are thrilling. This novel has everything you could want in a great story.',
    'I\'ve been following this story since the beginning, and it just keeps getting better. The character growth is remarkable, and the plot continues to surprise me with each new chapter.',
    'This novel tackles some deep themes while still being incredibly entertaining. The balance between humor and serious moments is perfect, and the dialogue feels natural and engaging.',
    'The attention to detail in this story is amazing. From the world-building to the character interactions, everything feels carefully crafted and purposeful. Highly recommend!',
    'I originally came for the premise but stayed for the characters. The relationships in this story are so well-developed, and the emotional payoffs are incredibly satisfying.'
  ];
  
  // Generate reviews for first 100 novels
  for (let novelId = 1; novelId <= 100; novelId++) {
    const reviewCount = Math.floor(Math.random() * 150) + 20; // 20-170 reviews per novel
    
    for (let i = 0; i < reviewCount; i++) {
      const createdDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      createdDate.setHours(createdDate.getHours() + (i * 3)); // Spread reviews over time
      
      const rating = Math.random() > 0.1 ? // 90% positive reviews
        (Math.random() > 0.3 ? 5 : 4) : // 70% are 5-star, 20% are 4-star
        (Math.random() > 0.5 ? 3 : Math.random() > 0.5 ? 2 : 1); // 10% lower ratings
      
      reviews.push({
        id: reviews.length + 1,
        
        // Review content
        novelId,
        rating,
        title: reviewTitles[Math.floor(Math.random() * reviewTitles.length)],
        content: reviewContents[Math.floor(Math.random() * reviewContents.length)],
        wordCount: Math.floor(Math.random() * 200) + 50, // 50-250 words
        
        // Reviewer information
        reviewerId: Math.floor(Math.random() * reviewerNames.length) + 1,
        reviewerName: reviewerNames[Math.floor(Math.random() * reviewerNames.length)],
        reviewerAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${reviewerNames[Math.floor(Math.random() * reviewerNames.length)]}`,
        reviewerLevel: Math.floor(Math.random() * 50) + 1,
        reviewerBadge: Math.random() > 0.8 ? 'verified' : Math.random() > 0.9 ? 'premium' : null,
        isVerifiedPurchase: Math.random() > 0.3, // 70% are verified
        
        // Review metadata
        chapterRead: Math.floor(Math.random() * 50) + 1, // How far they read
        readingProgress: Math.floor(Math.random() * 100) + 1, // Percentage read
        isCompleted: Math.random() > 0.6, // 40% completed the novel
        readingTime: Math.floor(Math.random() * 100) + 10, // Hours spent reading
        
        // Engagement metrics
        likes: Math.floor(Math.random() * 200) + 1,
        dislikes: Math.floor(Math.random() * 20),
        helpfulVotes: Math.floor(Math.random() * 150) + 1,
        notHelpfulVotes: Math.floor(Math.random() * 30),
        replyCount: Math.floor(Math.random() * 10),
        
        // Status and moderation
        status: Math.random() > 0.02 ? 'approved' : Math.random() > 0.5 ? 'pending' : 'rejected',
        isEdited: Math.random() > 0.85,
        isReported: Math.random() > 0.99,
        isFeatured: Math.random() > 0.98,
        isPinned: Math.random() > 0.995,
        isVerified: Math.random() > 0.95,
        
        // Quality indicators
        qualityScore: Math.floor(Math.random() * 40) + 60, // 60-100 quality score
        readabilityScore: Math.floor(Math.random() * 30) + 70, // 70-100 readability
        sentimentScore: rating >= 4 ? Math.random() * 0.4 + 0.6 : // Positive
                       rating === 3 ? Math.random() * 0.6 - 0.3 : // Neutral
                       Math.random() * -0.5 - 0.3, // Negative
        
        // Author interaction
        authorReplied: Math.random() > 0.95,
        authorLiked: Math.random() > 0.9,
        
        // Review categories/tags
        aspects: {
          plot: Math.floor(Math.random() * 5) + 1,
          characters: Math.floor(Math.random() * 5) + 1,
          worldBuilding: Math.floor(Math.random() * 5) + 1,
          writing: Math.floor(Math.random() * 5) + 1,
          pacing: Math.floor(Math.random() * 5) + 1,
        },
        
        // Reading context
        platform: Math.random() > 0.3 ? 'web' : Math.random() > 0.5 ? 'mobile' : 'tablet',
        location: Math.random() > 0.4 ? 'US' : Math.random() > 0.5 ? 'UK' : Math.random() > 0.5 ? 'CA' : 'AU',
        
        // Spoiler and content warnings
        containsSpoilers: Math.random() > 0.9,
        spoilerWarned: Math.random() > 0.95,
        contentWarnings: Math.random() > 0.98 ? ['violence', 'adult_content'] : [],
        
        // Moderation info
        moderatedBy: Math.random() > 0.98 ? 'moderator_jane' : null,
        moderatedAt: Math.random() > 0.98 ? new Date().toISOString() : null,
        moderationReason: null,
        
        // Analytics and tracking
        viewCount: Math.floor(Math.random() * 1000) + 10,
        clickThroughRate: Math.random() * 0.1 + 0.05, // 5-15%
        conversionRate: Math.random() * 0.05 + 0.02, // 2-7%
        
        // Metadata
        language: 'en',
        originalLanguage: Math.random() > 0.95 ? 'zh' : 'en',
        isTranslated: Math.random() > 0.95,
        
        // Timestamps
        createdAt: createdDate.toISOString(),
        updatedAt: createdDate.toISOString(),
        editedAt: Math.random() > 0.85 ? new Date(createdDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : null,
        lastViewedAt: new Date(createdDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      });
    }
  }
  
  return reviews;
};

const mockReviews = generateMockReviews();

export const reviewService = {
  // Get all reviews with filtering and pagination
  getAllReviews: async (params = {}) => {
    try {
      await api.delay(600);
      
      const {
        page = 1,
        pageSize = 20,
        novelId = null,
        rating = null,
        status = '',
        search = '',
        sortBy = 'createdAt',
        sortOrder = 'desc',
        isVerified = null,
        isFeatured = null,
        minRating = null,
        maxRating = null,
      } = params;
      
      let reviews = [...mockReviews];
      
      // Filter by novel
      if (novelId) {
        reviews = reviews.filter(review => review.novelId === parseInt(novelId));
      }
      
      // Filter by rating
      if (rating) {
        reviews = reviews.filter(review => review.rating === parseInt(rating));
      }
      
      // Filter by rating range
      if (minRating !== null) {
        reviews = reviews.filter(review => review.rating >= parseInt(minRating));
      }
      
      if (maxRating !== null) {
        reviews = reviews.filter(review => review.rating <= parseInt(maxRating));
      }
      
      // Filter by status
      if (status) {
        reviews = reviews.filter(review => review.status === status);
      }
      
      // Filter by verified status
      if (isVerified !== null) {
        reviews = reviews.filter(review => review.isVerified === isVerified);
      }
      
      // Filter by featured status
      if (isFeatured !== null) {
        reviews = reviews.filter(review => review.isFeatured === isFeatured);
      }
      
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        reviews = reviews.filter(review => 
          review.title.toLowerCase().includes(searchLower) ||
          review.content.toLowerCase().includes(searchLower) ||
          review.reviewerName.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply sorting
      reviews.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        
        if (sortBy === 'rating' || sortBy === 'likes' || sortBy === 'helpfulVotes') {
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
      const paginatedReviews = reviews.slice(start, end);
      
      return {
        success: true,
        data: paginatedReviews,
        total: reviews.length,
        page,
        pageSize,
        totalPages: Math.ceil(reviews.length / pageSize),
      };
    } catch (error) {
      throw new Error('Failed to fetch reviews');
    }
  },

  // Get reviews by novel
  getReviewsByNovel: async (novelId, params = {}) => {
    try {
      await api.delay(500);
      
      const {
        page = 1,
        pageSize = 20,
        sortBy = 'helpful',
        rating = null,
        verified = null,
      } = params;
      
      let reviews = mockReviews.filter(review => 
        review.novelId === parseInt(novelId) && 
        review.status === 'approved'
      );
      
      // Filter by rating
      if (rating) {
        reviews = reviews.filter(review => review.rating === parseInt(rating));
      }
      
      // Filter by verified status
      if (verified !== null) {
        reviews = reviews.filter(review => review.isVerifiedPurchase === verified);
      }
      
      // Apply sorting
      if (sortBy === 'helpful') {
        reviews.sort((a, b) => b.helpfulVotes - a.helpfulVotes);
      } else if (sortBy === 'recent') {
        reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortBy === 'rating_high') {
        reviews.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'rating_low') {
        reviews.sort((a, b) => a.rating - b.rating);
      }
      
      // Apply pagination
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedReviews = reviews.slice(start, end);
      
      return {
        success: true,
        data: paginatedReviews,
        total: reviews.length,
        page,
        pageSize,
      };
    } catch (error) {
      throw new Error('Failed to fetch reviews by novel');
    }
  },

  // Get review by ID
  getReviewById: async (id) => {
    try {
      await api.delay(400);
      
      const review = mockReviews.find(r => r.id === parseInt(id));
      
      if (!review) {
        throw new Error('Review not found');
      }
      
      // Get reviewer's other reviews
      const otherReviews = mockReviews
        .filter(r => r.reviewerId === review.reviewerId && r.id !== review.id)
        .slice(0, 5);
      
      return {
        success: true,
        data: {
          ...review,
          otherReviews,
        },
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch review');
    }
  },

  // Create new review
  createReview: async (reviewData) => {
    try {
      await api.delay(800);
      
      const newReview = {
        id: Math.max(...mockReviews.map(r => r.id)) + 1,
        ...reviewData,
        likes: 0,
        dislikes: 0,
        helpfulVotes: 0,
        notHelpfulVotes: 0,
        replyCount: 0,
        viewCount: 0,
        isEdited: false,
        isReported: false,
        isFeatured: false,
        isPinned: false,
        status: 'pending', // Default to pending for moderation
        qualityScore: Math.floor(Math.random() * 40) + 60,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      mockReviews.push(newReview);
      
      return {
        success: true,
        data: newReview,
        message: 'Review submitted successfully',
      };
    } catch (error) {
      throw new Error('Failed to create review');
    }
  },

  // Update review
  updateReview: async (id, updateData) => {
    try {
      await api.delay(500);
      
      const reviewIndex = mockReviews.findIndex(r => r.id === parseInt(id));
      
      if (reviewIndex === -1) {
        throw new Error('Review not found');
      }
      
      const originalReview = mockReviews[reviewIndex];
      
      const updatedReview = {
        ...originalReview,
        ...updateData,
        updatedAt: new Date().toISOString(),
      };
      
      // Mark as edited if content changed
      if ((updateData.content && updateData.content !== originalReview.content) ||
          (updateData.title && updateData.title !== originalReview.title) ||
          (updateData.rating && updateData.rating !== originalReview.rating)) {
        updatedReview.isEdited = true;
        updatedReview.editedAt = new Date().toISOString();
      }
      
      mockReviews[reviewIndex] = updatedReview;
      
      return {
        success: true,
        data: updatedReview,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to update review');
    }
  },

  // Delete review
  deleteReview: async (id) => {
    try {
      await api.delay(400);
      
      const reviewIndex = mockReviews.findIndex(r => r.id === parseInt(id));
      
      if (reviewIndex === -1) {
        throw new Error('Review not found');
      }
      
      const deletedReview = mockReviews[reviewIndex];
      mockReviews.splice(reviewIndex, 1);
      
      return {
        success: true,
        data: deletedReview,
        message: 'Review deleted successfully',
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to delete review');
    }
  },

  // Moderate review (approve/reject)
  moderateReview: async (id, moderationData) => {
    try {
      await api.delay(400);
      
      const { status, reason, moderatorId } = moderationData;
      
      const reviewIndex = mockReviews.findIndex(r => r.id === parseInt(id));
      
      if (reviewIndex === -1) {
        throw new Error('Review not found');
      }
      
      mockReviews[reviewIndex] = {
        ...mockReviews[reviewIndex],
        status,
        moderatedBy: moderatorId,
        moderatedAt: new Date().toISOString(),
        moderationReason: reason,
        updatedAt: new Date().toISOString(),
      };
      
      return {
        success: true,
        data: mockReviews[reviewIndex],
        message: `Review ${status} successfully`,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to moderate review');
    }
  },

  // Feature/unfeature review
  toggleFeatureReview: async (id) => {
    try {
      await api.delay(300);
      
      const reviewIndex = mockReviews.findIndex(r => r.id === parseInt(id));
      
      if (reviewIndex === -1) {
        throw new Error('Review not found');
      }
      
      mockReviews[reviewIndex].isFeatured = !mockReviews[reviewIndex].isFeatured;
      mockReviews[reviewIndex].updatedAt = new Date().toISOString();
      
      return {
        success: true,
        data: mockReviews[reviewIndex],
        message: `Review ${mockReviews[reviewIndex].isFeatured ? 'featured' : 'unfeatured'} successfully`,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to toggle feature status');
    }
  },

  // Get review statistics
  getReviewStats: async (novelId = null, period = '30d') => {
    try {
      await api.delay(500);
      
      let reviews = [...mockReviews];
      
      if (novelId) {
        reviews = reviews.filter(r => r.novelId === parseInt(novelId));
      }
      
      const now = new Date();
      const periodDays = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      const startDate = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);
      
      const periodReviews = reviews.filter(r => new Date(r.createdAt) >= startDate);
      
      const ratingDistribution = reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      }, {});
      
      const averageRating = reviews.length > 0 ? 
        (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;
      
      const averageAspectScores = reviews.length > 0 ? {
        plot: (reviews.reduce((sum, r) => sum + r.aspects.plot, 0) / reviews.length).toFixed(1),
        characters: (reviews.reduce((sum, r) => sum + r.aspects.characters, 0) / reviews.length).toFixed(1),
        worldBuilding: (reviews.reduce((sum, r) => sum + r.aspects.worldBuilding, 0) / reviews.length).toFixed(1),
        writing: (reviews.reduce((sum, r) => sum + r.aspects.writing, 0) / reviews.length).toFixed(1),
        pacing: (reviews.reduce((sum, r) => sum + r.aspects.pacing, 0) / reviews.length).toFixed(1),
      } : {};
      
      return {
        success: true,
        data: {
          total: reviews.length,
          periodTotal: periodReviews.length,
          averageRating: parseFloat(averageRating),
          ratingDistribution,
          averageAspectScores,
          approved: reviews.filter(r => r.status === 'approved').length,
          pending: reviews.filter(r => r.status === 'pending').length,
          rejected: reviews.filter(r => r.status === 'rejected').length,
          featured: reviews.filter(r => r.isFeatured).length,
          verified: reviews.filter(r => r.isVerifiedPurchase).length,
          averagePerDay: Math.round(periodReviews.length / periodDays),
          totalHelpfulVotes: reviews.reduce((sum, r) => sum + r.helpfulVotes, 0),
          averageQualityScore: reviews.length > 0 ? 
            Math.round(reviews.reduce((sum, r) => sum + r.qualityScore, 0) / reviews.length) : 0,
        }
      };
    } catch (error) {
      throw new Error('Failed to fetch review statistics');
    }
  },

  // Get top reviewers
  getTopReviewers: async (period = '30d', limit = 10) => {
    try {
      await api.delay(400);
      
      const now = new Date();
      const periodDays = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      const startDate = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);
      
      const periodReviews = mockReviews.filter(r => new Date(r.createdAt) >= startDate);
      
      const reviewerStats = periodReviews.reduce((acc, review) => {
        if (!acc[review.reviewerId]) {
          acc[review.reviewerId] = {
            reviewerId: review.reviewerId,
            reviewerName: review.reviewerName,
            reviewerAvatar: review.reviewerAvatar,
            reviewCount: 0,
            totalHelpfulVotes: 0,
            averageRating: 0,
            totalRating: 0,
            qualityScore: 0,
          };
        }
        
        acc[review.reviewerId].reviewCount++;
        acc[review.reviewerId].totalHelpfulVotes += review.helpfulVotes;
        acc[review.reviewerId].totalRating += review.rating;
        acc[review.reviewerId].qualityScore += review.qualityScore;
        
        return acc;
      }, {});
      
      const topReviewers = Object.values(reviewerStats)
        .map(reviewer => ({
          ...reviewer,
          averageRating: (reviewer.totalRating / reviewer.reviewCount).toFixed(1),
          averageQualityScore: Math.round(reviewer.qualityScore / reviewer.reviewCount),
        }))
        .sort((a, b) => b.totalHelpfulVotes - a.totalHelpfulVotes)
        .slice(0, limit);
      
      return {
        success: true,
        data: topReviewers,
      };
    } catch (error) {
      throw new Error('Failed to fetch top reviewers');
    }
  },

  // Bulk update reviews
  bulkUpdateReviews: async (ids, updateData) => {
    try {
      await api.delay(800);
      
      const updatedReviews = [];
      
      ids.forEach(id => {
        const reviewIndex = mockReviews.findIndex(r => r.id === parseInt(id));
        if (reviewIndex !== -1) {
          mockReviews[reviewIndex] = {
            ...mockReviews[reviewIndex],
            ...updateData,
            updatedAt: new Date().toISOString(),
          };
          updatedReviews.push(mockReviews[reviewIndex]);
        }
      });
      
      return {
        success: true,
        data: updatedReviews,
        message: `${updatedReviews.length} reviews updated successfully`,
      };
    } catch (error) {
      throw new Error('Failed to bulk update reviews');
    }
  },

  // Get recent reviews across all novels
  getRecentReviews: async (limit = 20) => {
    try {
      await api.delay(400);
      
      const recentReviews = mockReviews
        .filter(review => review.status === 'approved')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
      
      return {
        success: true,
        data: recentReviews,
      };
    } catch (error) {
      throw new Error('Failed to fetch recent reviews');
    }
  },
};

export default reviewService;
