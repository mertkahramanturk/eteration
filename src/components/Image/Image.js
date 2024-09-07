import React from 'react';
import PropTypes from 'prop-types';

const Image = ({
  src,
  alt = 'Image',
  width = '100%',
  height = 'auto',
  objectFit = 'cover',
  aspectRatio,
  style = {},
  loading = 'lazy',
  classNames,
  ...props
}) => {
  const aspectRatioStyle = aspectRatio
    ? { aspectRatio: aspectRatio, width: '100%', height: 'auto' }
    : { width, height };

  return (
    <div style={{ ...aspectRatioStyle, ...style }} {...props}>
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: objectFit }}
        loading={loading}
        className={classNames}
      />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  objectFit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none', 'scale-down']),
  aspectRatio: PropTypes.string,
  style: PropTypes.object,
};

export default Image;
