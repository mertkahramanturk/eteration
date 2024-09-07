import React from 'react';
import Topbar from '../../components/Layout/Topbar';
import { Route, Routes } from 'react-router-dom';
const ProductListingPage = React.lazy(() => import('../../pages/Product/ProductListing'))
const ProductDetailPage = React.lazy(() => import('../../pages/Product/ProductDetail'))

const WrappedRoutes = () => {
  return (
    <React.Fragment>
      <Topbar />
      <Routes>
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/:product_name" element={<ProductDetailPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default WrappedRoutes;
