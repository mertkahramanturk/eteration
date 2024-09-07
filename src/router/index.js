import React from 'react';
const WrappedRoutes = React.lazy(() => import("./WrappedRoutes"));


const Router = () => {

  return (
   <React.Fragment>
     <WrappedRoutes />
   </React.Fragment>
  );
};

export default Router;
