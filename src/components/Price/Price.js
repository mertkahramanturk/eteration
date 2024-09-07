import React from 'react';
import PropTypes from 'prop-types';

const Price = ({ amount, currency = 'USD', locale = 'en-US', style = {}, className, ...props }) => {
  const formattedPrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol' 
  }).format(amount);

  return (
    <span style={style} {...props} className={className}>
      {formattedPrice}
    </span>
  );
};

Price.propTypes = {
  amount: PropTypes.number.isRequired, 
  currency: PropTypes.string,
  locale: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string
};

export default Price;
