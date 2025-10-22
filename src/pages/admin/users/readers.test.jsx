import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Readers from './readers';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../../components/admin/common/pageheader', () => (props) => (
  <div data-testid="page-header">{props.title}</div>
));
jest.mock('../../../components/admin/common/breadcrumbs', () => (props) => (
  <div data-testid="breadcrumbs">{props.items?.map((i) => i.title).join(',')}</div>
));
jest.mock('../../../components/admin/tables/datatable', () => (props) => (
  <div data-testid="data-table">{props.dataSource?.length || 0}</div>
));
jest.mock('../../../components/admin/tables/tablefilters', () => (props) => (
  <div data-testid="table-filters">filters</div>
));

jest.mock('../../../services/admin/userservice', () => ({
  userService: {
    getReaders: jest.fn(),
  },
}));

import { userService } from '../../../services/admin/userservice';

describe('Readers page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    userService.getReaders.mockResolvedValue({ data: [{ id: 1, username: 'reader1', email: 'r1@example.com', joinDate: '2024-01-01', status: 'active' }], total: 1 });
  });

  test('renders header and data table', async () => {
    render(
      <BrowserRouter>
        <Readers />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('page-header')).toBeInTheDocument();
      expect(screen.getByTestId('table-filters')).toBeInTheDocument();
      expect(screen.getByTestId('data-table')).toBeInTheDocument();
    });
  });

  test('handles fetch failure gracefully', async () => {
    userService.getReaders.mockRejectedValueOnce(new Error('API Error'));

    render(
      <BrowserRouter>
        <Readers />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('page-header')).toBeInTheDocument();
    });
  });
});
