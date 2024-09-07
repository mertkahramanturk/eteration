import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';

function Filter({ onFilter }) {
  const {t} = useTranslation();
  const products = useSelector((state) => state.productList?.data || []); 
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const brands = [...new Set(products.map(product => product.brand))];

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    const checked = e.target.checked;

    let updatedSelectedBrands;
    if (checked) {
      updatedSelectedBrands = [...selectedBrands, brand]; 
    } else {
      updatedSelectedBrands = selectedBrands.filter((selectedBrand) => selectedBrand !== brand); 
    }

    setSelectedBrands(updatedSelectedBrands);
    onFilter(updatedSelectedBrands); 
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const clearFilters = () => {
    setSelectedBrands([]); 
    onFilter([]); 
    setIsSidebarOpen(false)
  };
  return (
    <div className="filter">
      <div className="filter-toggle d-md-none mb-2" onClick={toggleSidebar}>
        {t('buttons.filter')} <i className="fas fa-filter font-size-16"></i>
      </div>

      <div className='d-md-block d-none'>
        <h4 className='font-size-16 text-muted font-weight-400'>{t('form.brand_filter.field')}</h4>
        <Card>
          <CardBody className='product__filter-cartbody'>
            <input
              type="text"
              placeholder={t('form.brand_filter.placeholder')}
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-control mb-3"
            />
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand, index) => (
                <div key={index} className="d-flex gap-2 align-items-center ">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    value={brand}
                    checked={selectedBrands.includes(brand)}
                    onChange={handleBrandChange}
                    className='cursor-pointer'
                  />
                  <label htmlFor={`brand-${brand}`} className='cursor-pointer'>{brand}</label>
                </div>
              ))
            ) : (
              <p>No brands found</p>
            )}
          </CardBody>
        </Card>
      </div>

      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
      <div className={`sidebar pt-2 ${isSidebarOpen ? 'open' : ''}`}>
        <i className='fas fa-times font-size-20 cursor-pointer d-flex justify-content-end px-2' onClick={toggleSidebar} />
        <h4 className='font-size-16 px-2 text-muted font-weight-400'>{t('form.brand_filter.field')}</h4>
        <Card className='border-radius-0'>
          <CardBody className='product__filter-cartbody '>
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand, index) => (
                <div key={index} className="d-flex gap-2 align-items-center ">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    value={brand}
                    checked={selectedBrands.includes(brand)} 
                    onChange={handleBrandChange}
                    className='cursor-pointer'
                  />
                  <label htmlFor={`brand-${brand}`} className='cursor-pointer'>{brand}</label>
                </div>
              ))
            ) : (
              <p>{t('notifcation.no_brands_found')}</p>
            )}
          
          </CardBody>
        
        </Card>
        {selectedBrands.length > 0 && (
              <button className="btn btn-link mt-3" onClick={clearFilters}>
                {t('buttons.clear_all_filter')}
              </button>
            )}
      </div>
    </div>
  );
}

export default Filter;
