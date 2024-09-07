import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../../redux/actions/searchAction'; 

function Search() {
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
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control"
      />
    </div>
  );
}

export default Search;
