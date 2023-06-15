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
          class={`list-group-item list-group-item-action ${
            pathname === '/dashboard' ? 'active' : ''
          }`}
        >
          Dashboard
        </Link>
        <Link
          to='/travel/create'
          class={`list-group-item list-group-item-action ${
            pathname === '/travel/create' ? 'active' : ''
          }`}
        >
          Create travel
        </Link>
        <Link
          to='/travel/my'
          class={`list-group-item list-group-item-action ${
            pathname === '/travel/my' ? 'active' : ''
          }`}
        >
          My travel
        </Link>
        <Link
          to='/profile'
          class={`list-group-item list-group-item-action ${
            pathname === '/profile' ? 'active' : ''
          }`}
         >
         Profile
        </Link>

      </div>
    </>
  );
};

export default SideBar;
