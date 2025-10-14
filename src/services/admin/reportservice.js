import api from './api';

// Generate mock reports data
const generateMockReports = () => {
  const reports = [];
  const reportTypes = [
    { id: 'spam', name: 'Spam Content', priority: 'medium' },
    { id: 'inappropriate', name: 'Inappropriate Content', priority: 'high' },
    { id: 'plagiarism', name: 'Plagiarism', priority: 'high' },
    { id: 'harassment', name: 'Harassment', priority: 'high' },
    { id: 'violence', name: 'Violence/Gore', priority: 'medium' },
    { id: 'copyright', name: 'Copyright Infringement', priority: 'high' },
    { id: 'false_info', name: 'False Information', priority: 'low' },
    { id: 'adult_content', name: 'Adult Content', priority: 'medium' },
    { id: 'hate_speech', name: 'Hate Speech', priority: 'critical' },
    { id: 'scam', name: 'Scam/Fraud', priority: 'high' },
    { id: 'off_topic', name: 'Off-Topic', priority: 'low' },
    { id: 'duplicate', name: 'Duplicate Content', priority: 'low' },
  ];

  const reporterUsernames = [
    'vigilant_reader',
    'community_guardian',
    'book_protector',
    'fair_reader',
    'content_watcher',
    'novel_inspector',
    'story_keeper',
    'clean_reader',
    'safe_browser',
    'quality_seeker',
    'honest_reviewer',
    'concerned_user',
    'platform_helper',
    'content_curator',
    'reader_advocate',
  ];

  const reportReasons = {
    spam: [
      'Repetitive promotional content',
      'Multiple identical comments',
      'Excessive self-promotion',
      'Bot-like behavior',
    ],
    inappropriate: [
      'Sexual content',
      'Extreme violence',
      'Disturbing imagery',
      'Mature themes without warning',
    ],
    plagiarism: [
      'Copied from another novel',
      'Stolen artwork',
      'Uncredited translation',
      'Duplicate content',
    ],
    harassment: [
      'Personal attacks',
      'Bullying behavior',
      'Threatening language',
      'Targeted harassment',
    ],
    violence: ['Graphic violence', 'Detailed gore', 'Disturbing scenes', 'Excessive brutality'],
    copyright: [
      'Unauthorized use of content',
      'Stolen intellectual property',
      'Trademark violation',
      'Fair use violation',
    ],
    false_info: [
      'Misleading information',
      'False claims',
      'Misinformation spread',
      'Deceptive content',
    ],
    adult_content: [
      'Explicit sexual content',
      'Adult themes without warning',
      'NSFW material',
      'Age-inappropriate content',
    ],
    hate_speech: [
      'Racial discrimination',
      'Religious hatred',
      'Gender-based attacks',
      'Discriminatory language',
    ],
    scam: ['Fraudulent links', 'Phishing attempts', 'Fake promotions', 'Deceptive schemes'],
    off_topic: ['Unrelated discussion', 'Spam comments', 'Random content', 'Topic derailment'],
    duplicate: [
      'Repeated submission',
      'Multiple same posts',
      'Duplicate chapters',
      'Copied content',
    ],
  };

  // Generate reports for various content types
  for (let i = 1; i <= 500; i++) {
    const reportType = reportTypes[Math.floor(Math.random() * reportTypes.length)];
    const reportDate = new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    );
    const contentType = Math.random() > 0.3 ? 'comment' : Math.random() > 0.5 ? 'novel' : 'chapter';

    const report = {
      id: i,

      // Report details
      type: reportType.id,
      typeName: reportType.name,
      priority: reportType.priority,
      category:
        Math.random() > 0.7 ? 'content' : Math.random() > 0.5 ? 'user_behavior' : 'platform_abuse',

      // Content being reported
      contentType,
      contentId: Math.floor(Math.random() * 100) + 1,
      contentTitle:
        contentType === 'novel'
          ? `Novel Title ${Math.floor(Math.random() * 100) + 1}`
          : contentType === 'chapter'
            ? `Chapter ${Math.floor(Math.random() * 50) + 1}`
            : null,
      contentAuthorId: Math.floor(Math.random() * 50) + 1,
      contentAuthor: `author_${Math.floor(Math.random() * 50) + 1}`,

      // Reporter information
      reporterId: Math.floor(Math.random() * reporterUsernames.length) + 1,
      reporterUsername: reporterUsernames[Math.floor(Math.random() * reporterUsernames.length)],
      reporterEmail: `${reporterUsernames[Math.floor(Math.random() * reporterUsernames.length)]}@example.com`,
      reporterType: Math.random() > 0.8 ? 'verified' : 'regular',

      // Report content
      title: `${reportType.name} - ${contentType} content`,
      description:
        reportReasons[reportType.id][
          Math.floor(Math.random() * reportReasons[reportType.id].length)
        ],
      details: `Additional details about the ${reportType.name.toLowerCase()} issue. The reporter has provided specific context about why this content violates community guidelines.`,
      evidence: Math.random() > 0.6 ? ['screenshot1.jpg', 'evidence2.png'] : [],

      // Status and workflow
      status:
        Math.random() > 0.3
          ? 'pending'
          : Math.random() > 0.5
            ? 'in_review'
            : Math.random() > 0.6
              ? 'resolved'
              : 'dismissed',
      resolution: null,
      resolutionNote: null,

      // Assignment and moderation
      assignedTo:
        Math.random() > 0.7 ? 'moderator_alex' : Math.random() > 0.8 ? 'admin_sarah' : null,
      moderatorId: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : null,
      escalatedTo: Math.random() > 0.95 ? 'senior_moderator' : null,
      escalationReason: null,

      // Severity and impact
      severity:
        reportType.priority === 'critical'
          ? 'critical'
          : reportType.priority === 'high'
            ? Math.random() > 0.5
              ? 'high'
              : 'medium'
            : reportType.priority === 'medium'
              ? Math.random() > 0.5
                ? 'medium'
                : 'low'
              : 'low',
      impact: Math.random() > 0.7 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
      urgency:
        reportType.priority === 'critical'
          ? 'urgent'
          : reportType.priority === 'high'
            ? 'high'
            : 'normal',

      // Tracking and analytics
      viewCount: Math.floor(Math.random() * 20) + 1,
      actionsTaken: [],
      followUpRequired: Math.random() > 0.8,
      duplicateOf: Math.random() > 0.95 ? Math.floor(Math.random() * i) + 1 : null,
      relatedReports: Math.random() > 0.9 ? [Math.floor(Math.random() * i) + 1] : [],

      // User context
      reporterHistory: {
        totalReports: Math.floor(Math.random() * 10) + 1,
        validReports: Math.floor(Math.random() * 8) + 1,
        falseReports: Math.floor(Math.random() * 2),
        accuracy: Math.floor(Math.random() * 30) + 70, // 70-100%
      },

      // Content context
      contentStats: {
        viewCount: Math.floor(Math.random() * 10000) + 100,
        likeCount: Math.floor(Math.random() * 500) + 10,
        commentCount: Math.floor(Math.random() * 200) + 5,
        reportCount: Math.floor(Math.random() * 5) + 1,
      },

      // System information
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      userAgent: 'Mozilla/5.0 (compatible; YushanApp/1.0)',
      deviceInfo: Math.random() > 0.5 ? 'mobile' : 'desktop',
      location: Math.random() > 0.5 ? 'US' : Math.random() > 0.5 ? 'UK' : 'CA',

      // Timestamps
      createdAt: reportDate.toISOString(),
      updatedAt: new Date(
        reportDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
      reviewedAt:
        Math.random() > 0.7
          ? new Date(reportDate.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString()
          : null,
      resolvedAt:
        Math.random() > 0.6
          ? new Date(reportDate.getTime() + Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString()
          : null,

      // Metadata
      tags:
        Math.random() > 0.7
          ? ['urgent', 'community_concern']
          : Math.random() > 0.8
            ? ['repeat_offender']
            : [],
      internalNotes: Math.random() > 0.8 ? 'Internal note about this report case.' : null,
      publicResponse:
        Math.random() > 0.9 ? 'Thank you for your report. We have taken appropriate action.' : null,
    };

    // Set resolution details for resolved reports
    if (report.status === 'resolved') {
      const resolutions = [
        {
          action: 'content_removed',
          note: 'Content has been removed for violating community guidelines.',
        },
        { action: 'warning_issued', note: 'Warning issued to the content creator.' },
        { action: 'account_suspended', note: 'Account has been temporarily suspended.' },
        { action: 'no_action', note: 'No violation found after review.' },
        { action: 'content_edited', note: 'Content has been edited to comply with guidelines.' },
      ];
      const resolution = resolutions[Math.floor(Math.random() * resolutions.length)];
      report.resolution = resolution.action;
      report.resolutionNote = resolution.note;
      report.actionsTaken = [resolution.action];
    }

    reports.push(report);
  }

  return reports;
};

const mockReports = generateMockReports();

export const reportService = {
  // Get all reports with filtering and pagination
  getAllReports: async (params = {}) => {
    try {
      await api.delay(600);

      const {
        page = 1,
        pageSize = 20,
        status = '',
        type = '',
        priority = '',
        contentType = '',
        assignedTo = '',
        search = '',
        sortBy = 'createdAt',
        sortOrder = 'desc',
        dateFrom = null,
        dateTo = null,
      } = params;

      let reports = [...mockReports];

      // Apply filters
      if (status) {
        reports = reports.filter((report) => report.status === status);
      }

      if (type) {
        reports = reports.filter((report) => report.type === type);
      }

      if (priority) {
        reports = reports.filter((report) => report.priority === priority);
      }

      if (contentType) {
        reports = reports.filter((report) => report.contentType === contentType);
      }

      if (assignedTo) {
        reports = reports.filter((report) => report.assignedTo === assignedTo);
      }

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        reports = reports.filter(
          (report) =>
            report.title.toLowerCase().includes(searchLower) ||
            report.description.toLowerCase().includes(searchLower) ||
            report.reporterUsername.toLowerCase().includes(searchLower) ||
            report.contentAuthor.toLowerCase().includes(searchLower)
        );
      }

      // Date range filter
      if (dateFrom) {
        reports = reports.filter((report) => new Date(report.createdAt) >= new Date(dateFrom));
      }

      if (dateTo) {
        reports = reports.filter((report) => new Date(report.createdAt) <= new Date(dateTo));
      }

      // Apply sorting
      reports.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
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
      const paginatedReports = reports.slice(start, end);

      return {
        success: true,
        data: paginatedReports,
        total: reports.length,
        page,
        pageSize,
        totalPages: Math.ceil(reports.length / pageSize),
      };
    } catch (error) {
      throw new Error('Failed to fetch reports');
    }
  },

  // Get report by ID
  getReportById: async (id) => {
    try {
      await api.delay(400);

      const report = mockReports.find((r) => r.id === parseInt(id));

      if (!report) {
        throw new Error('Report not found');
      }

      // Get related reports
      const relatedReports = mockReports
        .filter(
          (r) =>
            r.contentId === report.contentId &&
            r.contentType === report.contentType &&
            r.id !== report.id
        )
        .slice(0, 5);

      return {
        success: true,
        data: {
          ...report,
          relatedReports,
        },
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch report');
    }
  },

  // Create new report
  createReport: async (reportData) => {
    try {
      await api.delay(800);

      const newReport = {
        id: Math.max(...mockReports.map((r) => r.id)) + 1,
        ...reportData,
        status: 'pending',
        viewCount: 0,
        actionsTaken: [],
        reporterHistory: {
          totalReports: 1,
          validReports: 0,
          falseReports: 0,
          accuracy: 100,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockReports.push(newReport);

      return {
        success: true,
        data: newReport,
        message: 'Report submitted successfully',
      };
    } catch (error) {
      throw new Error('Failed to create report');
    }
  },

  // Update report
  updateReport: async (id, updateData) => {
    try {
      await api.delay(500);

      const reportIndex = mockReports.findIndex((r) => r.id === parseInt(id));

      if (reportIndex === -1) {
        throw new Error('Report not found');
      }

      const updatedReport = {
        ...mockReports[reportIndex],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      // Set reviewed timestamp if status changed to in_review
      if (updateData.status === 'in_review' && mockReports[reportIndex].status !== 'in_review') {
        updatedReport.reviewedAt = new Date().toISOString();
      }

      // Set resolved timestamp if status changed to resolved
      if (updateData.status === 'resolved' && mockReports[reportIndex].status !== 'resolved') {
        updatedReport.resolvedAt = new Date().toISOString();
      }

      mockReports[reportIndex] = updatedReport;

      return {
        success: true,
        data: updatedReport,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to update report');
    }
  },

  // Assign report to moderator
  assignReport: async (id, assignmentData) => {
    try {
      await api.delay(400);

      const { assignedTo, moderatorId, note } = assignmentData;

      const reportIndex = mockReports.findIndex((r) => r.id === parseInt(id));

      if (reportIndex === -1) {
        throw new Error('Report not found');
      }

      mockReports[reportIndex] = {
        ...mockReports[reportIndex],
        assignedTo,
        moderatorId,
        status: 'in_review',
        reviewedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        internalNotes: note || mockReports[reportIndex].internalNotes,
      };

      return {
        success: true,
        data: mockReports[reportIndex],
        message: 'Report assigned successfully',
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to assign report');
    }
  },

  // Resolve report
  resolveReport: async (id, resolutionData) => {
    try {
      await api.delay(600);

      const { resolution, resolutionNote, actionsTaken, publicResponse } = resolutionData;

      const reportIndex = mockReports.findIndex((r) => r.id === parseInt(id));

      if (reportIndex === -1) {
        throw new Error('Report not found');
      }

      mockReports[reportIndex] = {
        ...mockReports[reportIndex],
        status: 'resolved',
        resolution,
        resolutionNote,
        actionsTaken: actionsTaken || [],
        publicResponse,
        resolvedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        success: true,
        data: mockReports[reportIndex],
        message: 'Report resolved successfully',
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to resolve report');
    }
  },

  // Bulk update reports
  bulkUpdateReports: async (ids, updateData) => {
    try {
      await api.delay(800);

      const updatedReports = [];

      ids.forEach((id) => {
        const reportIndex = mockReports.findIndex((r) => r.id === parseInt(id));
        if (reportIndex !== -1) {
          mockReports[reportIndex] = {
            ...mockReports[reportIndex],
            ...updateData,
            updatedAt: new Date().toISOString(),
          };
          updatedReports.push(mockReports[reportIndex]);
        }
      });

      return {
        success: true,
        data: updatedReports,
        message: `${updatedReports.length} reports updated successfully`,
      };
    } catch (error) {
      throw new Error('Failed to bulk update reports');
    }
  },

  // Get report statistics
  getReportStats: async (period = '30d') => {
    try {
      await api.delay(500);

      const now = new Date();
      const periodDays = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      const startDate = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);

      const periodReports = mockReports.filter((r) => new Date(r.createdAt) >= startDate);

      const statusCounts = mockReports.reduce((acc, report) => {
        acc[report.status] = (acc[report.status] || 0) + 1;
        return acc;
      }, {});

      const typeCounts = mockReports.reduce((acc, report) => {
        acc[report.type] = (acc[report.type] || 0) + 1;
        return acc;
      }, {});

      const priorityCounts = mockReports.reduce((acc, report) => {
        acc[report.priority] = (acc[report.priority] || 0) + 1;
        return acc;
      }, {});

      const resolutionTime = mockReports
        .filter((r) => r.resolvedAt)
        .map((r) => (new Date(r.resolvedAt) - new Date(r.createdAt)) / (1000 * 60 * 60)) // hours
        .reduce((sum, time, _, arr) => sum + time / arr.length, 0);

      return {
        success: true,
        data: {
          total: mockReports.length,
          periodTotal: periodReports.length,
          statusCounts,
          typeCounts,
          priorityCounts,
          averagePerDay: Math.round(periodReports.length / periodDays),
          averageResolutionTime: Math.round(resolutionTime || 0),
          pendingCount: statusCounts.pending || 0,
          overdueCount: mockReports.filter(
            (r) =>
              r.status === 'pending' && new Date() - new Date(r.createdAt) > 24 * 60 * 60 * 1000
          ).length,
          resolutionRate: Math.round(((statusCounts.resolved || 0) / mockReports.length) * 100),
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch report statistics');
    }
  },

  // Get reports by content
  getReportsByContent: async (contentType, contentId) => {
    try {
      await api.delay(400);

      const reports = mockReports.filter(
        (r) => r.contentType === contentType && r.contentId === parseInt(contentId)
      );

      return {
        success: true,
        data: reports,
        total: reports.length,
      };
    } catch (error) {
      throw new Error('Failed to fetch reports by content');
    }
  },

  // Get reports by user
  getReportsByUser: async (userId, type = 'reporter') => {
    try {
      await api.delay(400);

      let reports = [];

      if (type === 'reporter') {
        reports = mockReports.filter((r) => r.reporterId === parseInt(userId));
      } else if (type === 'content_author') {
        reports = mockReports.filter((r) => r.contentAuthorId === parseInt(userId));
      }

      return {
        success: true,
        data: reports,
        total: reports.length,
      };
    } catch (error) {
      throw new Error('Failed to fetch reports by user');
    }
  },

  // Get report types and categories
  getReportTypes: async () => {
    try {
      await api.delay(200);

      const types = [
        { id: 'spam', name: 'Spam Content', priority: 'medium', category: 'content' },
        {
          id: 'inappropriate',
          name: 'Inappropriate Content',
          priority: 'high',
          category: 'content',
        },
        { id: 'plagiarism', name: 'Plagiarism', priority: 'high', category: 'content' },
        { id: 'harassment', name: 'Harassment', priority: 'high', category: 'user_behavior' },
        { id: 'violence', name: 'Violence/Gore', priority: 'medium', category: 'content' },
        {
          id: 'copyright',
          name: 'Copyright Infringement',
          priority: 'high',
          category: 'platform_abuse',
        },
        { id: 'false_info', name: 'False Information', priority: 'low', category: 'content' },
        { id: 'adult_content', name: 'Adult Content', priority: 'medium', category: 'content' },
        { id: 'hate_speech', name: 'Hate Speech', priority: 'critical', category: 'user_behavior' },
        { id: 'scam', name: 'Scam/Fraud', priority: 'high', category: 'platform_abuse' },
        { id: 'off_topic', name: 'Off-Topic', priority: 'low', category: 'content' },
        { id: 'duplicate', name: 'Duplicate Content', priority: 'low', category: 'content' },
      ];

      return {
        success: true,
        data: types,
      };
    } catch (error) {
      throw new Error('Failed to fetch report types');
    }
  },

  // Escalate report
  escalateReport: async (id, escalationData) => {
    try {
      await api.delay(400);

      const { escalatedTo, escalationReason } = escalationData;

      const reportIndex = mockReports.findIndex((r) => r.id === parseInt(id));

      if (reportIndex === -1) {
        throw new Error('Report not found');
      }

      mockReports[reportIndex] = {
        ...mockReports[reportIndex],
        escalatedTo,
        escalationReason,
        priority: 'critical',
        urgency: 'urgent',
        updatedAt: new Date().toISOString(),
      };

      return {
        success: true,
        data: mockReports[reportIndex],
        message: 'Report escalated successfully',
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to escalate report');
    }
  },
};

export default reportService;
