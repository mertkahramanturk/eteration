import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from './router';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const Loader = () => (
    <div className="preloader-wrapper">
      <div className="preloader">
        <div className="spinner">
          <div className="spin spinner"></div>
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Provider store={store}>
        <BrowserRouter> 
          <Suspense fallback={<Loader />}>
            <Routers />
          </Suspense>
        </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
}

export default App;
