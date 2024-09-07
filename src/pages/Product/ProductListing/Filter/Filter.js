import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';

function Filter({ onFilter }) {
  const products = useSelector((state) => state.productList?.data || []); 
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

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

  return (
    <div className="filter">
      <h4 className='font-size-16 text-muted font-weight-400'>Brands</h4>
      <Card>
        <CardBody className='product__filter-cartbody'>
        <input
        type="text"
        placeholder={"Search brands..."}
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
  );
}

export default Filter;
