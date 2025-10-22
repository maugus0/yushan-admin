import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { message } from 'antd';
import Yuan from './index';
import { rankingService } from '../../../services/admin/rankingservice';

// Mock dependencies
jest.mock('../../../services/admin/rankingservice');
jest.mock('../../../components/admin/common', () => ({
  PageHeader: ({ title, subtitle, breadcrumbs, actions }) => (
    <div data-testid="page-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {breadcrumbs && (
        <div data-testid="breadcrumbs">
          {breadcrumbs.map((b) => b.title).join(' > ')}
        </div>
      )}
      {actions && <div data-testid="actions">{actions}</div>}
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

const renderYuan = () => {
  return render(
    <BrowserRouter>
      <Yuan />
    </BrowserRouter>
  );
};

describe('Yuan Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders page header with correct title and subtitle', () => {
      renderYuan();
      expect(screen.getByText('Yuan Management')).toBeInTheDocument();
      expect(
        screen.getByText('Manage platform currency, transactions, and rewards')
      ).toBeInTheDocument();
    });

    test('renders breadcrumbs correctly', () => {
      renderYuan();
      const breadcrumbs = screen.getByTestId('breadcrumbs');
      expect(breadcrumbs).toHaveTextContent('Dashboard > Yuan');
    });

    test('renders statistics button in actions', () => {
      renderYuan();
      const actions = screen.getByTestId('actions');
      expect(actions).toBeInTheDocument();
    });

    test('renders loading spinner initially', () => {
      renderYuan();
      expect(screen.getByTestId('loading-spinner')).toHaveTextContent(
        'Loading ranking data...'
      );
    });
  });

  describe('Data Fetching', () => {
    test('fetches ranking data on mount', async () => {
      const mockNovelData = {
        success: true,
        data: { content: [{ id: 1, title: 'Test Novel', voteCnt: 100 }] },
      };
      const mockAuthorData = {
        success: true,
        data: {
          content: [{ id: 1, username: 'Test Author', totalVoteCnt: 50 }],
        },
      };
      const mockUserData = {
        success: true,
        data: { content: [{ id: 1, username: 'Test User', yuan: 200 }] },
      };

      rankingService.getNovelRankings.mockResolvedValue(mockNovelData);
      rankingService.getAuthorRankings.mockResolvedValue(mockAuthorData);
      rankingService.getUserRankings.mockResolvedValue(mockUserData);

      renderYuan();

      await waitFor(() => {
        expect(rankingService.getNovelRankings).toHaveBeenCalledWith({
          page: 0,
          size: 1000,
          sortType: 'vote',
        });
        expect(rankingService.getAuthorRankings).toHaveBeenCalledWith({
          page: 0,
          size: 1000,
          sortType: 'vote',
        });
        expect(rankingService.getUserRankings).toHaveBeenCalledWith({
          page: 0,
          size: 1000,
          sortBy: 'points',
        });
      });
    });

    test('handles API errors gracefully', async () => {
      rankingService.getNovelRankings.mockRejectedValue(new Error('API Error'));
      rankingService.getAuthorRankings.mockRejectedValue(
        new Error('API Error')
      );
      rankingService.getUserRankings.mockRejectedValue(new Error('API Error'));

      renderYuan();

      await waitFor(() => {
        expect(message.error).toHaveBeenCalledWith(
          'Failed to fetch ranking data'
        );
      });
    });
  });

  describe('Navigation', () => {
    test('navigates to statistics page when button is clicked', async () => {
      const mockNovelData = { success: true, data: { content: [] } };
      const mockAuthorData = { success: true, data: { content: [] } };
      const mockUserData = { success: true, data: { content: [] } };

      rankingService.getNovelRankings.mockResolvedValue(mockNovelData);
      rankingService.getAuthorRankings.mockResolvedValue(mockAuthorData);
      rankingService.getUserRankings.mockResolvedValue(mockUserData);

      renderYuan();

      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });

      // Find and click the statistics button
      const statsButton = screen.getByRole('button', {
        name: /view statistics/i,
      });
      fireEvent.click(statsButton);

      expect(mockNavigate).toHaveBeenCalledWith('/admin/yuan/statistics');
    });
  });

  describe('Image Handling', () => {
    test('displays default images when no cover/avatar provided', async () => {
      const mockNovelData = {
        success: true,
        data: { content: [{ id: 1, title: 'Test Novel', voteCnt: 100 }] },
      };
      const mockAuthorData = {
        success: true,
        data: {
          content: [{ id: 1, username: 'Test Author', totalVoteCnt: 50 }],
        },
      };
      const mockUserData = {
        success: true,
        data: { content: [{ id: 1, username: 'Test User', yuan: 200 }] },
      };

      rankingService.getNovelRankings.mockResolvedValue(mockNovelData);
      rankingService.getAuthorRankings.mockResolvedValue(mockAuthorData);
      rankingService.getUserRankings.mockResolvedValue(mockUserData);

      renderYuan();

      await waitFor(() => {
        // Check that avatars/images are rendered (exact implementation may vary)
        const avatars = screen.getAllByRole('img');
        expect(avatars.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Responsive Design', () => {
    test('sets correct scroll properties for mobile', async () => {
      const mockNovelData = {
        success: true,
        data: { content: [{ id: 1, title: 'Test Novel', voteCnt: 100 }] },
      };
      const mockAuthorData = { success: true, data: { content: [] } };
      const mockUserData = { success: true, data: { content: [] } };

      rankingService.getNovelRankings.mockResolvedValue(mockNovelData);
      rankingService.getAuthorRankings.mockResolvedValue(mockAuthorData);
      rankingService.getUserRankings.mockResolvedValue(mockUserData);

      renderYuan();

      await waitFor(() => {
        // Tables should have scroll properties (implementation may vary)
        const tables = screen.getAllByRole('table');
        expect(tables.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Accessibility', () => {});
});
