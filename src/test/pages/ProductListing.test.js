import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductListing from '../../pages/Product/ProductListing/ProductListing';
import { getRequest } from '../../redux/actions/getRequestAction';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../redux/actions/getRequestAction', () => ({
  getRequest: jest.fn(),
}));

jest.mock('../../pages/Product/ProductListing/ProductItem', () => () => <div data-testid="product-item" />);
jest.mock('../../components/SkeletonLoading', () => () => <div data-testid="skeleton-loading" />);

describe('ProductListing Component', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockImplementation((selector) => {
      if (selector.name === 'selectLoading') {
        return true;
      }
      return { data: [], loading: true };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('dispatches getRequest when component mounts', () => {
    render(<ProductListing />);
    expect(mockDispatch).toHaveBeenCalledWith(getRequest('products'));
  });

  test('renders SkeletonLoading while loading', () => {
    useSelector.mockReturnValueOnce({
      data: [],
      loading: true,
    });

    render(<ProductListing />);

    const skeletons = screen.getAllByTestId('skeleton-loading');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
