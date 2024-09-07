import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Topbar from '../../../../components/Layout/Topbar/Topbar'; 

jest.mock('../../../../components/Layout/Topbar/Search', () => () => <div data-testid="search-component" />);
jest.mock('../../../../components/Layout/Topbar/TopbarRight', () => () => <div data-testid="topbar-right" />);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Topbar Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders Topbar with all elements', () => {
    render(
      <Router>
        <Topbar />
      </Router>
    );

    const brandElements = screen.getAllByText(/eteration/i);
    expect(brandElements.length).toBe(2); 

    expect(screen.getByTestId('search-component')).toBeInTheDocument();

    expect(screen.getByTestId('topbar-right')).toBeInTheDocument();
  });

});