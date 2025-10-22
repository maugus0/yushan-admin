import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Writers from './writers';
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
    getWriters: jest.fn(),
  },
}));

import { userService } from '../../../services/admin/userservice';

describe('Writers page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    userService.getWriters.mockResolvedValue({ data: [{ id: 2, username: 'writer1', email: 'w1@example.com', joinDate: '2024-02-01', status: 'active' }], total: 1 });
  });

  test('renders header and data table', async () => {
    render(
      <BrowserRouter>
        <Writers />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('page-header')).toBeInTheDocument();
      expect(screen.getByTestId('table-filters')).toBeInTheDocument();
      expect(screen.getByTestId('data-table')).toBeInTheDocument();
    });
  });
});
