import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Travel/Dashboard';
import NavBar from './layouts/NavBar';
import SideBar from './layouts/SideBar';
import CreateTravel from './components/Travel/CreateTravel';
import MyTravels from './components/Travel/MyTravels';
import TravelDetails from './components/Travel/TravelDetails';

const App = () => {
  // selectors
  const user = useSelector(state => state.auth?.authDetails?.user);

  const renderRoutes = () => {
    if (user) {
      return (
        <>
          <Route path='/dashboard' element={<Dashboard />} />;
          <Route path='/travel/create' element={<CreateTravel />} />;
          <Route path='/travel/edit/:id' element={<CreateTravel />} />;
          <Route path='/travel/view/:id' element={<TravelDetails />} />;
          <Route path='/travel/my' element={<MyTravels />} />;
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
        <div className='row dashboard position-relative'>
          <div className='col-12 col-lg-2 mx-auto sidebar position-relative'>
            <div className='side_sticky bg-white '>
              <SideBar />
            </div>
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
