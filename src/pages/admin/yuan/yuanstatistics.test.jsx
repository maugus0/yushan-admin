import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { message } from 'antd';
import YuanStatistics from './yuanstatistics';
import { rankingService } from '../../../services/admin/rankingservice';

// Mock dependencies
jest.mock('../../../services/admin/rankingservice');
jest.mock('../../../components/admin/common', () => ({
  PageHeader: ({ title, subtitle, onBack, breadcrumbs }) => (
    <div data-testid="page-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {onBack && (
        <button data-testid="back-button" onClick={onBack}>
          Back
        </button>
      )}
      {breadcrumbs && (
        <div data-testid="breadcrumbs">
          {breadcrumbs.map((b) => b.title).join(' > ')}
        </div>
      )}
    </div>
  ),
  LoadingSpinner: ({ tip }) => <div data-testid="loading-spinner">{tip}</div>,
}));
jest.mock(
  '../../../assets/images/novel_default.png',
  () => 'novel-default-mock'
);
jest.mock('../../../assets/images/user.png', () => 'user-default-mock');

// Mock antd message
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    error: jest.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderYuanStatistics = () => {
  return render(
    <BrowserRouter>
      <YuanStatistics />
    </BrowserRouter>
  );
};

describe('YuanStatistics Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders loading spinner initially', () => {
      renderYuanStatistics();
      expect(screen.getByTestId('loading-spinner')).toHaveTextContent(
        'Loading yuan statistics...'
      );
    });
  });

  describe('Data Fetching', () => {
    test('fetches statistics data on mount', async () => {
      const mockNovelData = {
        success: true,
        data: [{ id: 1, title: 'Test Novel', voteCnt: 100 }],
      };
      const mockAuthorData = {
        success: true,
        data: [{ id: 1, username: 'Test Author', totalVoteCnt: 50 }],
      };
      const mockUserData = {
        success: true,
        data: [{ id: 1, username: 'Test User', yuan: 200 }],
      };

      rankingService.getNovelRankings.mockResolvedValue(mockNovelData);
      rankingService.getAuthorRankings.mockResolvedValue(mockAuthorData);
      rankingService.getUserRankings.mockResolvedValue(mockUserData);

      renderYuanStatistics();

      await waitFor(() => {
        expect(rankingService.getNovelRankings).toHaveBeenCalledWith({
          page: 0,
          size: 10,
          sortType: 'vote',
        });
        expect(rankingService.getAuthorRankings).toHaveBeenCalledWith({
          page: 0,
          size: 10,
          sortType: 'vote',
        });
        expect(rankingService.getUserRankings).toHaveBeenCalledWith({
          page: 0,
          size: 10,
          sortBy: 'points',
        });
      });
    });

    test('handles successful data loading and displays statistics', async () => {
      const mockNovelData = {
        success: true,
        data: [
          { id: 1, title: 'Novel 1', voteCnt: 100 },
          { id: 2, title: 'Novel 2', voteCnt: 200 },
        ],
      };
      const mockAuthorData = {
        success: true,
        data: [{ id: 1, username: 'Author 1', totalVoteCnt: 50 }],
      };
      const mockUserData = {
        success: true,
        data: [
          { id: 1, username: 'User 1', yuan: 150 },
          { id: 2, username: 'User 2', yuan: 250 },
        ],
      };

      rankingService.getNovelRankings.mockResolvedValue(mockNovelData);
      rankingService.getAuthorRankings.mockResolvedValue(mockAuthorData);
      rankingService.getUserRankings.mockResolvedValue(mockUserData);

      renderYuanStatistics();

      await waitFor(() => {
        expect(rankingService.getNovelRankings).toHaveBeenCalled();
        expect(rankingService.getAuthorRankings).toHaveBeenCalled();
        expect(rankingService.getUserRankings).toHaveBeenCalled();
      });
    });

    test('handles partial API failures', async () => {
      const mockNovelData = {
        success: true,
        data: [{ id: 1, title: 'Test Novel', voteCnt: 100 }],
      };
      rankingService.getNovelRankings.mockResolvedValue(mockNovelData);
      rankingService.getAuthorRankings.mockRejectedValue(
        new Error('API Error')
      );
      rankingService.getUserRankings.mockRejectedValue(new Error('API Error'));

      renderYuanStatistics();

      await waitFor(() => {
        expect(message.error).toHaveBeenCalledWith('Failed to load statistics');
      });
    });
  });

  describe('Statistics Cards', () => {
    test('displays total votes statistic', async () => {
      const mockNovelData = {
        success: true,
        data: [{ id: 1, title: 'Test Novel', voteCnt: 100 }],
      };
      const mockAuthorData = { success: true, data: [] };
      const mockUserData = { success: true, data: [] };

      rankingService.getNovelRankings.mockResolvedValue(mockNovelData);
      rankingService.getAuthorRankings.mockResolvedValue(mockAuthorData);
      rankingService.getUserRankings.mockResolvedValue(mockUserData);

      renderYuanStatistics();

      await waitFor(() => {
        expect(screen.getByText('Total Votes')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(
          screen.getByText('Total number of votes based on response')
        ).toBeInTheDocument();
      });
    });

    test('displays total yuan statistic', async () => {
      const mockNovelData = { success: true, data: [] };
      const mockAuthorData = { success: true, data: [] };
      const mockUserData = {
        success: true,
        data: [{ id: 1, username: 'Test User', yuan: 200 }],
      };

      rankingService.getNovelRankings.mockResolvedValue(mockNovelData);
      rankingService.getAuthorRankings.mockResolvedValue(mockAuthorData);
      rankingService.getUserRankings.mockResolvedValue(mockUserData);

      renderYuanStatistics();

      await waitFor(() => {
        expect(screen.getByText('Total Yuan')).toBeInTheDocument();
        expect(screen.getByText('200')).toBeInTheDocument();
        expect(
          screen.getByText('Total number of yuan based on response')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Loading States', () => {
    test('shows loading spinner while fetching data', () => {
      // Mock pending promises
      rankingService.getNovelRankings.mockImplementation(
        () => new Promise(() => {})
      );
      rankingService.getAuthorRankings.mockImplementation(
        () => new Promise(() => {})
      );
      rankingService.getUserRankings.mockImplementation(
        () => new Promise(() => {})
      );

      renderYuanStatistics();

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      expect(
        screen.getByText('Loading yuan statistics...')
      ).toBeInTheDocument();
    });

    test('hides loading spinner after data loads', async () => {
      const mockNovelData = { success: true, data: [] };
      const mockAuthorData = { success: true, data: [] };
      const mockUserData = { success: true, data: [] };

      rankingService.getNovelRankings.mockResolvedValue(mockNovelData);
      rankingService.getAuthorRankings.mockResolvedValue(mockAuthorData);
      rankingService.getUserRankings.mockResolvedValue(mockUserData);

      renderYuanStatistics();

      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });
    });
  });
});
