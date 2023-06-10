import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const App = () => {
  const renderRoutes = () => {
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
      {/* {userType && (
          <>
            <NavBar />
          </>
        )} */}
      <Routes>{renderRoutes()}</Routes>
    </BrowserRouter>
  );
};

export default App;
