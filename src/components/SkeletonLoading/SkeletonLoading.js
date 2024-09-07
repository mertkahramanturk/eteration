import React from 'react';

const Skeleton = ({ width = '100%', height = '100px' }) => {
  return (
    <div className="skeleton" style={{ width, height }}></div>
  );
};

export default Skeleton;
