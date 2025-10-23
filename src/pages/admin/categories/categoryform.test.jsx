import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';
import CategoryForm from './categoryform';
import { categoryService } from '../../../services/admin/categoryservice';

// Mock the category service
jest.mock('../../../services/admin/categoryservice', () => ({
  categoryService: {
    getCategoryById: jest.fn(),
    createCategory: jest.fn(),
    updateCategory: jest.fn(),
  },
}));

// Mock antd message
jest.mock('antd', () => {
  const antd = jest.requireActual('antd');
  return {
    ...antd,
    message: {
      success: jest.fn(),
      error: jest.fn(),
    },
  };
});

const mockOnSuccess = jest.fn();
const mockOnCancel = jest.fn();

describe('CategoryForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Create Mode', () => {
    test('renders create form correctly', () => {
      render(
        <CategoryForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />
      );

      expect(screen.getByText('Create New Category')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(
          'Enter category name (e.g., Fantasy, Romance)'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(
          'Enter a brief description of this category'
        )
      ).toBeInTheDocument();
      expect(screen.getByText('Create Category')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('submits create form successfully', async () => {
      const user = userEvent.setup();
      categoryService.createCategory.mockResolvedValue({
        success: true,
        data: { id: 1, name: 'Test Category' },
      });

      await act(async () => {
        render(
          <CategoryForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />
        );
      });

      const nameInput = screen.getByPlaceholderText(
        'Enter category name (e.g., Fantasy, Romance)'
      );
      const descriptionInput = screen.getByPlaceholderText(
        'Enter a brief description of this category'
      );
      const submitButton = screen.getByText('Create Category');

      // Type into the form fields with act wrapping
      await act(async () => {
        await user.type(nameInput, 'Test Category');
        await user.type(descriptionInput, 'Test description for category');
      });

      // Wait for form validation to pass
      await waitFor(() => {
        expect(nameInput).toHaveValue('Test Category');
        expect(descriptionInput).toHaveValue('Test description for category');
      });

      // Click submit and wait for the async operation
      await act(async () => {
        await user.click(submitButton);
      });

      // Wait for the service call and success callback
      await waitFor(
        () => {
          expect(categoryService.createCategory).toHaveBeenCalledWith({
            name: 'Test Category',
            description: 'Test description for category',
            isActive: true,
          });
          expect(mockOnSuccess).toHaveBeenCalledWith({
            id: 1,
            name: 'Test Category',
          });
        },
        { timeout: 3000 }
      );
    });

    test('handles create form submission error', async () => {
      const user = userEvent.setup();
      const error = new Error('API Error');
      categoryService.createCategory.mockRejectedValue(error);

      await act(async () => {
        render(
          <CategoryForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />
        );
      });

      const nameInput = screen.getByPlaceholderText(
        'Enter category name (e.g., Fantasy, Romance)'
      );
      const descriptionInput = screen.getByPlaceholderText(
        'Enter a brief description of this category'
      );
      const submitButton = screen.getByText('Create Category');

      // Type into the form fields with act wrapping
      await act(async () => {
        await user.type(nameInput, 'Test Category');
        await user.type(descriptionInput, 'Test description');
      });

      // Click submit with act wrapping
      await act(async () => {
        await user.click(submitButton);
      });

      await waitFor(() => {
        expect(categoryService.createCategory).toHaveBeenCalled();
        expect(require('antd').message.error).toHaveBeenCalledWith(
          'Failed to create category: API Error'
        );
      });
    });
  });

  describe('Edit Mode', () => {
    test('loads category data in edit mode', async () => {
      categoryService.getCategoryById.mockResolvedValue({
        success: true,
        data: {
          name: 'Existing Category',
          description: 'Existing description',
          isActive: false,
        },
      });

      await act(async () => {
        render(
          <CategoryForm
            categoryId={1}
            mode="edit"
            onSuccess={mockOnSuccess}
            onCancel={mockOnCancel}
          />
        );
      });

      // Wait for loading to complete and form to render
      await waitFor(() => {
        expect(categoryService.getCategoryById).toHaveBeenCalledWith(1);
      });

      // Wait for the loading state to disappear and form to appear
      await waitFor(() => {
        expect(screen.getByText('Edit Category')).toBeInTheDocument();
      });

      expect(screen.getByDisplayValue('Existing Category')).toBeInTheDocument();
      expect(
        screen.getByDisplayValue('Existing description')
      ).toBeInTheDocument();
    });

    test('submits edit form successfully', async () => {
      const user = userEvent.setup();
      categoryService.getCategoryById.mockResolvedValue({
        success: true,
        data: {
          name: 'Existing Category',
          description: 'Existing description',
          isActive: true,
        },
      });
      categoryService.updateCategory.mockResolvedValue({
        success: true,
        data: { id: 1, name: 'Updated Category' },
      });

      await act(async () => {
        render(
          <CategoryForm
            categoryId={1}
            mode="edit"
            onSuccess={mockOnSuccess}
            onCancel={mockOnCancel}
          />
        );
      });

      await waitFor(() => {
        expect(categoryService.getCategoryById).toHaveBeenCalledWith(1);
      });

      // Wait for the form to load
      await waitFor(() => {
        expect(screen.getByText('Edit Category')).toBeInTheDocument();
      });

      const nameInput = screen.getByDisplayValue('Existing Category');

      await act(async () => {
        await user.clear(nameInput);
        await user.type(nameInput, 'Updated Category');
      });

      await act(async () => {
        await user.click(screen.getByText('Update Category'));
      });

      await waitFor(() => {
        expect(categoryService.updateCategory).toHaveBeenCalledWith(1, {
          name: 'Updated Category',
          description: 'Existing description',
          isActive: true,
        });
        expect(mockOnSuccess).toHaveBeenCalledWith({
          id: 1,
          name: 'Updated Category',
        });
      });
    });
  });

  describe('Form Validation', () => {
    test('shows validation errors for empty required fields', async () => {
      const user = userEvent.setup();

      await act(async () => {
        render(
          <CategoryForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />
        );
      });

      await act(async () => {
        await user.click(screen.getByText('Create Category'));
      });

      await waitFor(() => {
        expect(
          screen.getByText('Please enter category name')
        ).toBeInTheDocument();
        expect(
          screen.getByText('Please enter category description')
        ).toBeInTheDocument();
      });
    });

    test('shows validation errors for minimum length', async () => {
      const user = userEvent.setup();

      await act(async () => {
        render(
          <CategoryForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />
        );
      });

      await act(async () => {
        await user.type(
          screen.getByPlaceholderText(
            'Enter category name (e.g., Fantasy, Romance)'
          ),
          'A'
        );
        await user.type(
          screen.getByPlaceholderText(
            'Enter a brief description of this category'
          ),
          'Short'
        );
      });

      await act(async () => {
        await user.click(screen.getByText('Create Category'));
      });

      await waitFor(() => {
        expect(
          screen.getByText('Name must be at least 2 characters')
        ).toBeInTheDocument();
        expect(
          screen.getByText('Description must be at least 10 characters')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Loading States', () => {
    test('shows loading spinner when loading category data', async () => {
      categoryService.getCategoryById.mockImplementation(
        () => new Promise(() => {})
      ); // Never resolves

      await act(async () => {
        render(
          <CategoryForm
            categoryId={1}
            mode="edit"
            onSuccess={mockOnSuccess}
            onCancel={mockOnCancel}
          />
        );
      });

      // Check for the presence of the loading spinner by looking for the spin container
      expect(document.querySelector('.ant-spin')).toBeInTheDocument();
    });
  });

  describe('Cancel Functionality', () => {
    test('calls onCancel when cancel button is clicked', async () => {
      const user = userEvent.setup();

      await act(async () => {
        render(
          <CategoryForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />
        );
      });

      await act(async () => {
        await user.click(screen.getByText('Cancel'));
      });

      expect(mockOnCancel).toHaveBeenCalled();
    });
  });
});
