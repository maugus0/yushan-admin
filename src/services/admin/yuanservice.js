import api from './api';

// Generate mock yuan data
const generateMockYuanData = () => {
  const yuanTransactions = [];
  const yuanBalances = [];
  const rewardRules = [];
  const yuanPackages = [];

  const transactionTypes = [
    { id: 'purchase', name: 'Purchase Yuan', category: 'income' },
    { id: 'reading_reward', name: 'Reading Reward', category: 'income' },
    { id: 'daily_login', name: 'Daily Login Bonus', category: 'income' },
    { id: 'chapter_unlock', name: 'Chapter Unlock', category: 'expense' },
    { id: 'gift_author', name: 'Gift to Author', category: 'expense' },
    { id: 'premium_feature', name: 'Premium Feature', category: 'expense' },
    { id: 'refund', name: 'Refund', category: 'income' },
    { id: 'bonus', name: 'Bonus Yuan', category: 'income' },
    { id: 'withdrawal', name: 'Withdrawal', category: 'expense' },
    { id: 'subscription', name: 'Subscription Payment', category: 'expense' },
    { id: 'tournament_prize', name: 'Tournament Prize', category: 'income' },
    { id: 'referral_bonus', name: 'Referral Bonus', category: 'income' },
  ];

  const usernames = [
    'reader_001',
    'bookworm_pro',
    'novel_enthusiast',
    'story_collector',
    'chapter_hunter',
    'yuan_saver',
    'premium_reader',
    'loyal_fan',
    'daily_reader',
    'generous_supporter',
    'author_patron',
    'vip_member',
  ];

  // Generate user balances
  for (let userId = 1; userId <= 200; userId++) {
    yuanBalances.push({
      id: userId,
      userId,
      username:
        usernames[Math.floor(Math.random() * usernames.length)] + '_' + userId,
      currentBalance: Math.floor(Math.random() * 10000) + 100, // 100-10,100 yuan
      lifetimeEarned: Math.floor(Math.random() * 50000) + 1000, // 1,000-51,000 yuan
      lifetimeSpent: Math.floor(Math.random() * 45000) + 500, // 500-45,500 yuan
      pendingBalance: Math.floor(Math.random() * 500), // 0-500 yuan pending

      // Subscription info
      isSubscriber: Math.random() > 0.7,
      subscriptionTier: Math.random() > 0.5 ? 'premium' : 'vip',
      subscriptionExpiresAt:
        Math.random() > 0.7
          ? new Date(
              Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000
            ).toISOString()
          : null,

      // Statistics
      totalTransactions: Math.floor(Math.random() * 500) + 50,
      averageMonthlySpending: Math.floor(Math.random() * 1000) + 50,
      favoriteExpenseCategory:
        transactionTypes[Math.floor(Math.random() * transactionTypes.length)]
          .id,

      // Account info
      accountStatus:
        Math.random() > 0.05
          ? 'active'
          : Math.random() > 0.5
            ? 'suspended'
            : 'limited',
      verificationLevel: Math.random() > 0.3 ? 'verified' : 'unverified',
      riskScore: Math.floor(Math.random() * 100), // 0-100 (lower is better)

      // Timestamps
      createdAt: new Date(
        2023,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toISOString(),
      lastTransactionAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  // Generate transactions for users
  for (let i = 0; i < 5000; i++) {
    const transactionDate = new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
    );
    const transactionType =
      transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    const userId = Math.floor(Math.random() * 200) + 1;

    yuanTransactions.push({
      id: i + 1,
      userId,
      username: `user_${userId}`,

      // Transaction details
      type: transactionType.id,
      typeName: transactionType.name,
      category: transactionType.category,
      amount: Math.floor(Math.random() * 1000) + 10, // 10-1,010 yuan

      // Related entities
      novelId: Math.random() > 0.5 ? Math.floor(Math.random() * 100) + 1 : null,
      chapterId:
        Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 1 : null,
      authorId: Math.random() > 0.6 ? Math.floor(Math.random() * 50) + 1 : null,
      packageId:
        Math.random() > 0.8 ? Math.floor(Math.random() * 10) + 1 : null,

      // Payment info
      paymentMethod:
        Math.random() > 0.3
          ? 'credit_card'
          : Math.random() > 0.5
            ? 'paypal'
            : Math.random() > 0.7
              ? 'bank_transfer'
              : 'crypto',
      paymentReference: `PAY_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,

      // Status and processing
      status:
        Math.random() > 0.05
          ? 'completed'
          : Math.random() > 0.5
            ? 'pending'
            : Math.random() > 0.8
              ? 'failed'
              : 'cancelled',
      processedAt: Math.random() > 0.1 ? transactionDate.toISOString() : null,

      // Balances
      balanceBefore: Math.floor(Math.random() * 5000) + 100,
      balanceAfter: Math.floor(Math.random() * 5000) + 100,

      // Additional data
      description: `${transactionType.name} transaction`,
      metadata: {
        userAgent: 'YushanApp/1.0',
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        platform:
          Math.random() > 0.5
            ? 'web'
            : Math.random() > 0.5
              ? 'mobile'
              : 'tablet',
      },

      // Flags
      isRefunded: Math.random() > 0.98,
      isReversed: Math.random() > 0.995,
      isFraudulent: Math.random() > 0.999,
      requiresReview: Math.random() > 0.95,

      // Timestamps
      createdAt: transactionDate.toISOString(),
      updatedAt: transactionDate.toISOString(),
    });
  }

  // Generate yuan packages
  const packageTypes = [
    { yuan: 100, price: 0.99, bonus: 0, popular: false },
    { yuan: 500, price: 4.99, bonus: 50, popular: false },
    { yuan: 1000, price: 9.99, bonus: 150, popular: true },
    { yuan: 2500, price: 24.99, bonus: 500, popular: false },
    { yuan: 5000, price: 49.99, bonus: 1200, popular: true },
    { yuan: 10000, price: 99.99, bonus: 3000, popular: false },
    { yuan: 25000, price: 249.99, bonus: 8000, popular: false },
    { yuan: 50000, price: 499.99, bonus: 18000, popular: false },
  ];

  packageTypes.forEach((pkg, index) => {
    yuanPackages.push({
      id: index + 1,
      name: `${pkg.yuan} Yuan Package`,
      description: `Purchase ${pkg.yuan} Yuan${pkg.bonus > 0 ? ` + ${pkg.bonus} bonus Yuan` : ''}`,
      yuanAmount: pkg.yuan,
      bonusYuan: pkg.bonus,
      totalYuan: pkg.yuan + pkg.bonus,
      price: pkg.price,
      currency: 'USD',

      // Package features
      isPopular: pkg.popular,
      isLimitedTime: Math.random() > 0.8,
      maxPurchasesPerUser: pkg.yuan >= 10000 ? 5 : null, // Limit large packages

      // Status
      isActive: Math.random() > 0.1, // 90% active
      isVisible: Math.random() > 0.05, // 95% visible

      // Sales data
      totalSales: Math.floor(Math.random() * 10000) + 100,
      revenue: (Math.floor(Math.random() * 10000) + 100) * pkg.price,

      // Timestamps
      createdAt: new Date(2024, 0, 1).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  });

  // Generate reward rules
  const rewardActions = [
    { action: 'daily_login', name: 'Daily Login', yuan: 10, cooldown: 86400 }, // 24 hours
    { action: 'read_chapter', name: 'Read Chapter', yuan: 2, cooldown: 0 },
    { action: 'leave_review', name: 'Write Review', yuan: 50, cooldown: 3600 }, // 1 hour
    {
      action: 'complete_novel',
      name: 'Complete Novel',
      yuan: 100,
      cooldown: 0,
    },
    { action: 'referral', name: 'Refer Friend', yuan: 500, cooldown: 0 },
    {
      action: 'first_purchase',
      name: 'First Purchase',
      yuan: 100,
      cooldown: 0,
    },
    {
      action: 'weekly_goal',
      name: 'Weekly Reading Goal',
      yuan: 200,
      cooldown: 604800,
    }, // 7 days
    {
      action: 'tournament_win',
      name: 'Tournament Victory',
      yuan: 1000,
      cooldown: 0,
    },
    { action: 'bug_report', name: 'Report Bug', yuan: 50, cooldown: 86400 },
    {
      action: 'beta_testing',
      name: 'Beta Testing',
      yuan: 200,
      cooldown: 2592000,
    }, // 30 days
  ];

  rewardActions.forEach((reward, index) => {
    rewardRules.push({
      id: index + 1,
      actionType: reward.action,
      actionName: reward.name,
      description: `Earn ${reward.yuan} Yuan by ${reward.name.toLowerCase()}`,
      yuanReward: reward.yuan,

      // Conditions
      maxPerUser:
        reward.action === 'first_purchase'
          ? 1
          : reward.action === 'referral'
            ? 10
            : null,
      maxPerDay:
        reward.action === 'daily_login'
          ? 1
          : reward.action === 'read_chapter'
            ? 50
            : null,
      cooldownSeconds: reward.cooldown,

      // Requirements
      minimumUserLevel: reward.yuan > 100 ? 5 : 1,
      requiresVerification: reward.yuan > 200,
      isSubscriberOnly: reward.action === 'beta_testing',

      // Status
      isActive: Math.random() > 0.1, // 90% active
      startDate: new Date(2024, 0, 1).toISOString(),
      endDate:
        Math.random() > 0.8
          ? new Date(
              Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000
            ).toISOString()
          : null,

      // Statistics
      totalClaims: Math.floor(Math.random() * 10000) + 100,
      totalYuanAwarded: (Math.floor(Math.random() * 10000) + 100) * reward.yuan,

      // Timestamps
      createdAt: new Date(2024, 0, 1).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  });

  return { yuanTransactions, yuanBalances, rewardRules, yuanPackages };
};

const mockData = generateMockYuanData();
const {
  yuanTransactions: mockTransactions,
  yuanBalances: mockBalances,
  rewardRules: mockRewards,
  yuanPackages: mockPackages,
} = mockData;

export const yuanService = {
  // Get all yuan transactions with filtering
  getAllTransactions: async (params = {}) => {
    try {
      await api.delay(600);

      const {
        page = 1,
        pageSize = 20,
        userId = null,
        type = '',
        category = '',
        status = '',
        search = '',
        dateFrom = null,
        dateTo = null,
        minAmount = null,
        maxAmount = null,
        sortBy = 'createdAt',
        sortOrder = 'desc',
      } = params;

      let transactions = [...mockTransactions];

      // Apply filters
      if (userId) {
        transactions = transactions.filter(
          (t) => t.userId === parseInt(userId)
        );
      }

      if (type) {
        transactions = transactions.filter((t) => t.type === type);
      }

      if (category) {
        transactions = transactions.filter((t) => t.category === category);
      }

      if (status) {
        transactions = transactions.filter((t) => t.status === status);
      }

      if (minAmount !== null) {
        transactions = transactions.filter(
          (t) => t.amount >= parseInt(minAmount)
        );
      }

      if (maxAmount !== null) {
        transactions = transactions.filter(
          (t) => t.amount <= parseInt(maxAmount)
        );
      }

      // Date range filter
      if (dateFrom) {
        transactions = transactions.filter(
          (t) => new Date(t.createdAt) >= new Date(dateFrom)
        );
      }

      if (dateTo) {
        transactions = transactions.filter(
          (t) => new Date(t.createdAt) <= new Date(dateTo)
        );
      }

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        transactions = transactions.filter(
          (t) =>
            t.username.toLowerCase().includes(searchLower) ||
            t.typeName.toLowerCase().includes(searchLower) ||
            t.description.toLowerCase().includes(searchLower) ||
            t.paymentReference.toLowerCase().includes(searchLower)
        );
      }

      // Apply sorting
      transactions.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === 'amount') {
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
      const paginatedTransactions = transactions.slice(start, end);

      return {
        success: true,
        data: paginatedTransactions,
        total: transactions.length,
        page,
        pageSize,
        totalPages: Math.ceil(transactions.length / pageSize),
      };
    } catch (error) {
      throw new Error('Failed to fetch yuan transactions');
    }
  },

  // Get all user yuan balances
  getAllBalances: async (params = {}) => {
    try {
      await api.delay(500);

      const {
        page = 1,
        pageSize = 20,
        search = '',
        accountStatus = '',
        isSubscriber = null,
        sortBy = 'currentBalance',
        sortOrder = 'desc',
        minBalance = null,
        maxBalance = null,
      } = params;

      let balances = [...mockBalances];

      // Apply filters
      if (accountStatus) {
        balances = balances.filter((b) => b.accountStatus === accountStatus);
      }

      if (isSubscriber !== null) {
        balances = balances.filter((b) => b.isSubscriber === isSubscriber);
      }

      if (minBalance !== null) {
        balances = balances.filter(
          (b) => b.currentBalance >= parseInt(minBalance)
        );
      }

      if (maxBalance !== null) {
        balances = balances.filter(
          (b) => b.currentBalance <= parseInt(maxBalance)
        );
      }

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        balances = balances.filter((b) =>
          b.username.toLowerCase().includes(searchLower)
        );
      }

      // Apply sorting
      balances.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (
          [
            'currentBalance',
            'lifetimeEarned',
            'lifetimeSpent',
            'totalTransactions',
          ].includes(sortBy)
        ) {
          aValue = parseInt(aValue);
          bValue = parseInt(bValue);
        } else if (sortBy === 'lastTransactionAt' || sortBy === 'createdAt') {
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
      const paginatedBalances = balances.slice(start, end);

      return {
        success: true,
        data: paginatedBalances,
        total: balances.length,
        page,
        pageSize,
        totalPages: Math.ceil(balances.length / pageSize),
      };
    } catch (error) {
      throw new Error('Failed to fetch yuan balances');
    }
  },

  // Get user balance by ID
  getUserBalance: async (userId) => {
    try {
      await api.delay(300);

      const balance = mockBalances.find((b) => b.userId === parseInt(userId));

      if (!balance) {
        throw new Error('User balance not found');
      }

      // Get recent transactions for this user
      const recentTransactions = mockTransactions
        .filter((t) => t.userId === parseInt(userId))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10);

      return {
        success: true,
        data: {
          ...balance,
          recentTransactions,
        },
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user balance');
    }
  },

  // Create yuan transaction
  createTransaction: async (transactionData) => {
    try {
      await api.delay(600);

      const newTransaction = {
        id: Math.max(...mockTransactions.map((t) => t.id)) + 1,
        ...transactionData,
        status: 'pending',
        paymentReference: `PAY_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        metadata: {
          userAgent: 'AdminPanel/1.0',
          ipAddress: '192.168.1.100',
          platform: 'admin',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockTransactions.push(newTransaction);

      // Update user balance if transaction is completed
      if (transactionData.status === 'completed') {
        const userBalance = mockBalances.find(
          (b) => b.userId === transactionData.userId
        );
        if (userBalance) {
          if (transactionData.category === 'income') {
            userBalance.currentBalance += transactionData.amount;
            userBalance.lifetimeEarned += transactionData.amount;
          } else {
            userBalance.currentBalance -= transactionData.amount;
            userBalance.lifetimeSpent += transactionData.amount;
          }
          userBalance.lastTransactionAt = new Date().toISOString();
          userBalance.updatedAt = new Date().toISOString();
        }
      }

      return {
        success: true,
        data: newTransaction,
        message: 'Transaction created successfully',
      };
    } catch (error) {
      throw new Error('Failed to create transaction');
    }
  },

  // Update transaction
  updateTransaction: async (id, updateData) => {
    try {
      await api.delay(400);

      const transactionIndex = mockTransactions.findIndex(
        (t) => t.id === parseInt(id)
      );

      if (transactionIndex === -1) {
        throw new Error('Transaction not found');
      }

      const originalTransaction = mockTransactions[transactionIndex];

      mockTransactions[transactionIndex] = {
        ...originalTransaction,
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      return {
        success: true,
        data: mockTransactions[transactionIndex],
        message: 'Transaction updated successfully',
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to update transaction');
    }
  },

  // Get yuan packages
  getYuanPackages: async () => {
    try {
      await api.delay(400);

      const activePackages = mockPackages.filter(
        (p) => p.isActive && p.isVisible
      );

      return {
        success: true,
        data: activePackages,
      };
    } catch (error) {
      throw new Error('Failed to fetch yuan packages');
    }
  },

  // Get all yuan packages (admin view)
  getAllYuanPackages: async () => {
    try {
      await api.delay(400);

      return {
        success: true,
        data: mockPackages,
      };
    } catch (error) {
      throw new Error('Failed to fetch all yuan packages');
    }
  },

  // Update yuan package
  updateYuanPackage: async (id, updateData) => {
    try {
      await api.delay(400);

      const packageIndex = mockPackages.findIndex((p) => p.id === parseInt(id));

      if (packageIndex === -1) {
        throw new Error('Package not found');
      }

      mockPackages[packageIndex] = {
        ...mockPackages[packageIndex],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      return {
        success: true,
        data: mockPackages[packageIndex],
        message: 'Package updated successfully',
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to update package');
    }
  },

  // Get reward rules
  getRewardRules: async () => {
    try {
      await api.delay(400);

      return {
        success: true,
        data: mockRewards,
      };
    } catch (error) {
      throw new Error('Failed to fetch reward rules');
    }
  },

  // Update reward rule
  updateRewardRule: async (id, updateData) => {
    try {
      await api.delay(400);

      const ruleIndex = mockRewards.findIndex((r) => r.id === parseInt(id));

      if (ruleIndex === -1) {
        throw new Error('Reward rule not found');
      }

      mockRewards[ruleIndex] = {
        ...mockRewards[ruleIndex],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      return {
        success: true,
        data: mockRewards[ruleIndex],
        message: 'Reward rule updated successfully',
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to update reward rule');
    }
  },

  // Get yuan statistics
  getYuanStats: async (period = '30d') => {
    try {
      await api.delay(500);

      const now = new Date();
      const periodDays = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      const startDate = new Date(
        now.getTime() - periodDays * 24 * 60 * 60 * 1000
      );

      const periodTransactions = mockTransactions.filter(
        (t) => new Date(t.createdAt) >= startDate
      );

      const income = periodTransactions
        .filter((t) => t.category === 'income' && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = periodTransactions
        .filter((t) => t.category === 'expense' && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);

      const totalBalance = mockBalances.reduce(
        (sum, b) => sum + b.currentBalance,
        0
      );
      const totalLifetimeEarned = mockBalances.reduce(
        (sum, b) => sum + b.lifetimeEarned,
        0
      );
      const totalLifetimeSpent = mockBalances.reduce(
        (sum, b) => sum + b.lifetimeSpent,
        0
      );

      const packageSales = mockPackages.reduce(
        (sum, p) => sum + p.totalSales,
        0
      );
      const packageRevenue = mockPackages.reduce(
        (sum, p) => sum + p.revenue,
        0
      );

      const activeUsers = mockBalances.filter(
        (b) => new Date(b.lastTransactionAt) >= startDate
      ).length;

      const transactionsByType = periodTransactions.reduce((acc, t) => {
        acc[t.type] = (acc[t.type] || 0) + 1;
        return acc;
      }, {});

      const averageTransactionValue =
        periodTransactions.length > 0
          ? Math.round(
              periodTransactions.reduce((sum, t) => sum + t.amount, 0) /
                periodTransactions.length
            )
          : 0;

      return {
        success: true,
        data: {
          totalBalance,
          totalLifetimeEarned,
          totalLifetimeSpent,
          periodIncome: income,
          periodExpenses: expenses,
          netFlow: income - expenses,
          totalTransactions: periodTransactions.length,
          averageTransactionValue,
          activeUsers,
          packageSales,
          packageRevenue,
          transactionsByType,
          topSpenders: mockBalances
            .sort((a, b) => b.lifetimeSpent - a.lifetimeSpent)
            .slice(0, 10)
            .map((b) => ({
              username: b.username,
              lifetimeSpent: b.lifetimeSpent,
              currentBalance: b.currentBalance,
            })),
          rewardStats: mockRewards.reduce(
            (acc, rule) => {
              acc.totalClaims += rule.totalClaims;
              acc.totalAwarded += rule.totalYuanAwarded;
              return acc;
            },
            { totalClaims: 0, totalAwarded: 0 }
          ),
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch yuan statistics');
    }
  },

  // Adjust user balance (admin function)
  adjustUserBalance: async (userId, adjustmentData) => {
    try {
      await api.delay(500);

      const { amount, reason, type = 'adjustment' } = adjustmentData;

      const userBalance = mockBalances.find(
        (b) => b.userId === parseInt(userId)
      );

      if (!userBalance) {
        throw new Error('User not found');
      }

      const oldBalance = userBalance.currentBalance;
      userBalance.currentBalance += amount;
      userBalance.updatedAt = new Date().toISOString();

      // Create transaction record
      const newTransaction = {
        id: Math.max(...mockTransactions.map((t) => t.id)) + 1,
        userId: parseInt(userId),
        username: userBalance.username,
        type: 'balance_adjustment',
        typeName: 'Balance Adjustment',
        category: amount > 0 ? 'income' : 'expense',
        amount: Math.abs(amount),
        description: reason || 'Admin balance adjustment',
        status: 'completed',
        balanceBefore: oldBalance,
        balanceAfter: userBalance.currentBalance,
        paymentMethod: 'admin',
        paymentReference: `ADJ_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        processedAt: new Date().toISOString(),
        metadata: {
          adjustmentType: type,
          adminAction: true,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockTransactions.push(newTransaction);

      return {
        success: true,
        data: {
          transaction: newTransaction,
          newBalance: userBalance.currentBalance,
          oldBalance,
          adjustment: amount,
        },
        message: `Balance adjusted by ${amount} yuan`,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to adjust user balance');
    }
  },

  // Get yuan conversion rates and settings
  getYuanSettings: async () => {
    try {
      await api.delay(300);

      return {
        success: true,
        data: {
          conversionRates: {
            usdToYuan: 100, // 1 USD = 100 Yuan
            eurToYuan: 110, // 1 EUR = 110 Yuan
            gbpToYuan: 125, // 1 GBP = 125 Yuan
          },
          settings: {
            minimumPurchase: 100, // Yuan
            maximumPurchase: 100000, // Yuan
            dailyPurchaseLimit: 10000, // Yuan
            withdrawalEnabled: true,
            minimumWithdrawal: 1000, // Yuan
            withdrawalFeePercent: 5,
            maxPendingTransactions: 10,
            autoProcessPayments: true,
            requireVerificationForLargeAmounts: true,
            largeAmountThreshold: 5000, // Yuan
          },
          fees: {
            transactionFeePercent: 2.9,
            fixedFeeAmount: 30, // cents
            currencyConversionFee: 1.5, // percent
            refundFeeAmount: 50, // cents
          },
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch yuan settings');
    }
  },
};

export default yuanService;
