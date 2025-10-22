import { exportToCSV, exportToExcel, exportToJSON } from './exportutils';

// Mock URL methods
global.URL.createObjectURL = jest.fn(() => 'blob:mock');
global.URL.revokeObjectURL = jest.fn();

describe('Export Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    console.warn.mockRestore();
    console.error.mockRestore();
  });

  describe('exportToCSV', () => {
    test('handles empty data', () => {
      exportToCSV([], [], 'test');
      expect(console.warn).toHaveBeenCalledWith('No data to export');
    });

    test('handles null data', () => {
      exportToCSV(null, [], 'test');
      expect(console.warn).toHaveBeenCalledWith('No data to export');
    });

    test('handles undefined data', () => {
      exportToCSV(undefined, [], 'test');
      expect(console.warn).toHaveBeenCalledWith('No data to export');
    });
  });

  describe('exportToExcel', () => {
    test('handles empty data', () => {
      exportToExcel([], [], 'test');
      expect(console.warn).toHaveBeenCalledWith('No data to export');
    });

    test('handles null data', () => {
      exportToExcel(null, [], 'test');
      expect(console.warn).toHaveBeenCalledWith('No data to export');
    });

    test('logs warning for missing xlsx', () => {
      const data = [{ id: 1 }];
      const columns = [{ key: 'id' }];
      exportToExcel(data, columns);
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe('exportToJSON', () => {
    test('handles empty data', () => {
      exportToJSON([], [], 'test');
      expect(console.warn).toHaveBeenCalledWith('No data to export');
    });

    test('handles null data', () => {
      exportToJSON(null, [], 'test');
      expect(console.warn).toHaveBeenCalledWith('No data to export');
    });

    test('handles undefined data', () => {
      exportToJSON(undefined, null, 'test');
      expect(console.warn).toHaveBeenCalledWith('No data to export');
    });
  });

  describe('Export error handling', () => {
    test('CSV logs warning on empty input', () => {
      exportToCSV([], []);
      expect(console.warn).toHaveBeenCalledWith('No data to export');
    });

    test('JSON logs warning on empty input', () => {
      exportToJSON([], []);
      expect(console.warn).toHaveBeenCalledWith('No data to export');
    });

    test('Excel logs warning on empty input', () => {
      exportToExcel([], []);
      expect(console.warn).toHaveBeenCalledWith('No data to export');
    });
  });
});
