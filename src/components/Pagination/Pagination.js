import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const maxPageNumbersToShow = 3;
  
  const renderPageNumbers = () => {
    if (totalPages <= maxPageNumbersToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= maxPageNumbersToShow) {
        for (let i = 1; i <= maxPageNumbersToShow; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage > totalPages - maxPageNumbersToShow) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - maxPageNumbersToShow + 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
  };

  renderPageNumbers();

  return (
    <nav>
      <ul className='pagination d-flex justify-content-center mt-4'>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className='page-link'
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>

        {pageNumbers.map((number, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
          >
            {number === '...' ? (
              <span className='page-link'>...</span>
            ) : (
              <button onClick={() => paginate(number)} className='page-link'>
                {number}
              </button>
            )}
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className='page-link'
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  productsPerPage: PropTypes.number.isRequired,
  totalProducts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
