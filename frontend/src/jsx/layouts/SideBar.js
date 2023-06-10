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
      </div>
    </>
  );
};

export default SideBar;
