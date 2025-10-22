import { renderHook, act } from '@testing-library/react';
import { useSearch } from './usesearch';

// Mock lodash debounce - must be at the top level
jest.mock('lodash', () => ({
  debounce: jest.fn((fn, _delay) => {
    // Return a function that calls the original function immediately
    const debouncedFn = (...args) => fn(...args);
    debouncedFn.cancel = jest.fn();
    debouncedFn.flush = jest.fn();
    return debouncedFn;
  }),
}));

describe('useSearch Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    test('initializes with correct default values', () => {
      const { result } = renderHook(() => useSearch());

      expect(result.current.query).toBe('');
      expect(result.current.isSearching).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  describe('Basic Functionality', () => {
    test('sets search query', () => {
      const { result } = renderHook(() => useSearch());

      act(() => {
        result.current.setSearchQuery('John');
      });

      expect(result.current.query).toBe('John');
    });

    test('clears search', () => {
      const { result } = renderHook(() => useSearch());

      act(() => {
        result.current.setSearchQuery('John');
      });

      act(() => {
        result.current.clearSearch();
      });

      expect(result.current.query).toBe('');
    });
  });
});
