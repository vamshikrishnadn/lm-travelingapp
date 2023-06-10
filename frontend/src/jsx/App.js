import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Travel/Dashboard';
import NavBar from './layouts/NavBar';
import SideBar from './layouts/SideBar';
import CreateTravel from './components/Travel/CreateTravel';

const App = () => {
  // selectors
  const user = useSelector(state => state.auth?.authDetails?.user);

  const renderRoutes = () => {
    if (user) {
      return (
        <>
          <Route path='/dashboard' element={<Dashboard />} />;
          <Route path='/travel/create' element={<CreateTravel />} />;
          <Route path='/login' element={<Login />} />;
          <Route path='*' element={<Navigate to='/dashboard' replace />} />
        </>
      );
    }
    return (
      <>
        <Route path='/login' element={<Login />} />;
        <Route path='/register' element={<Register />} />;
        <Route path='*' element={<Navigate to='/login' replace />} />
      </>
    );
  };
  return (
    <BrowserRouter>
      {user && (
        <>
          <NavBar />
        </>
      )}
      {user ? (
        <div className='row dashboard'>
          <div className='col-12 col-lg-2 mx-auto sidebar'>
            <SideBar />
          </div>
          <div className='col-12 col-lg-10'>
            <Routes>{renderRoutes()}</Routes>
          </div>
        </div>
      ) : (
        <Routes>{renderRoutes()}</Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
