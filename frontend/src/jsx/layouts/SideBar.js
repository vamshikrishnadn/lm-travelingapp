import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <div class='list-group'>
        <Link
          to='/dashboard'
          class={`list-group-item list-group-item-action text-capitalize ${
            pathname === '/dashboard' ? 'active' : ''
          }`}
        >
          Dashboard
        </Link>
        <Link
          to='/travel/create'
          class={`list-group-item list-group-item-action text-capitalize ${
            pathname === '/travel/create' ? 'active' : ''
          }`}
        >
          Create travel
        </Link>
        <Link
          to='/travel/my'
          class={`list-group-item list-group-item-action text-capitalize ${
            pathname === '/travel/my' ? 'active' : ''
          }`}
        >
          My travels
        </Link>
        <Link
          to='/travel/requests'
          class={`list-group-item list-group-item-action text-capitalize ${
            pathname === '/travel/requests' ? 'active' : ''
          }`}
        >
          Travel requests
        </Link>
      </div>
    </>
  );
};

export default SideBar;
