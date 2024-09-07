import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../../redux/actions/searchAction'; 
import { useTranslation } from 'react-i18next';

function Search() {
  const {t} = useTranslation();
  const [searchTerm, setSearchTermLocal] = useState('');
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTermLocal(term);
    dispatch(setSearchTerm(term));
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={t('form.search_product.placeholder')}
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control"
      />
    </div>
  );
}

export default Search;
