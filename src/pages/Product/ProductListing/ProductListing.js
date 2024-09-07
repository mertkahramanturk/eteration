/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRequest } from '../../../redux/actions/getRequestAction';
import { Col, Container, Row } from 'reactstrap';
import Filter from './Filter';
import ProductItem from './ProductItem';
import Pagination from '../../../components/Pagination';
import SkeletonLoading from '../../../components/SkeletonLoading';

function ProductListing() {

  const dispatch = useDispatch();
  const data = useSelector(state => state.productList?.data || []);
  const loading = useSelector(state => state.productList?.loading);
  const searchTerm = useSelector(state => state.search.searchTerm);
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const handleFilter = (selectedBrands) => {
    setSelectedBrands(selectedBrands);
  };

  const applyFilters = useCallback(() => {
    let filtered = data;

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (searchTerm !== '') {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);

    if (filteredProducts.length !== filtered.length) {
      setCurrentPage(1);
    }
  }, [data, selectedBrands, searchTerm]);


  useEffect(() => {
    if (data.length > 0) {
      applyFilters();
    }
  }, [data, searchTerm, selectedBrands]);

  useEffect(() => {
    dispatch(getRequest('products'));
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.length > 0 && filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <React.Fragment>
      <Container className="product__list-root mt-4">
        <Row>
          <Col xs={2} md={2} lg={2}>
            {loading ?
              <SkeletonLoading width="100%" height="300px" /> :
              <div data-testid="filter">
                <Filter onFilter={handleFilter} />
              </div>

            }
          </Col>
          <Col xs={8} md={8} lg={8}>
            <div className="product__list-wrapper">
              {loading ? (
                [...Array(productsPerPage)].map((_, index) => (
                  <Col key={index} xs={12} md={12} lg={12}>
                    <SkeletonLoading width="100%" height="250px" />
                  </Col>
                ))
              ) : (
                currentProducts && currentProducts?.length > 0 && currentProducts?.map((product) => (
                  <ProductItem key={product.id} item={product} />
                ))
              )}
            </div>
            {loading ?
              <div className='mt-4 d-flex justify-content-center'>
                <SkeletonLoading width='300px' height='40px' />
              </div>
              :
              <div data-testid="pagination">
                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={filteredProducts.length}
                  paginate={paginate}
                  currentPage={currentPage}

                />
              </div>

            }
          </Col>
          <Col xs={2} md={2} lg={2}></Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default ProductListing;
