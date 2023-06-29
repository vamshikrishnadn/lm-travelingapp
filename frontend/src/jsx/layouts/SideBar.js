import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../../store/actions/AuthActions';
import {
  BagDashFill,
  BoxArrowRight,
  CalendarPlusFill,
  CarFrontFill,
  ChatLeftDotsFill,
  LockFill,
  Person,
  PersonFill,
  SendFill,
} from 'react-bootstrap-icons';

const SideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = location;

  const logout = () => {
    dispatch(handleLogout(navigate));
  };

  return (
    <>
      <div class='list-group'>
        <Link
          to='/dashboard'
          class={`list-group-item list-group-item-action text-capitalize ${
            pathname === '/dashboard' ? 'active' : ''
          }`}
        >
          <BagDashFill /> Dashboard
        </Link>
        <Link
          to='/travel/create'
          class={`list-group-item list-group-item-action text-capitalize ${
            pathname === '/travel/create' ? 'active' : ''
          }`}
        >
          <CalendarPlusFill /> Create travel
        </Link>
        <Link
          to='/travel/my'
          class={`list-group-item list-group-item-action text-capitalize ${
            pathname === '/travel/my' ? 'active' : ''
          }`}
        >
          <CarFrontFill /> My travels
        </Link>
        <Link
          to='/travel/requests'
          class={`list-group-item list-group-item-action text-capitalize ${
            pathname === '/travel/requests' ? 'active' : ''
          }`}
        >
          <CarFrontFill /> Travel requests
        </Link>
        <Link
          to='/travel/sent'
          class={`list-group-item list-group-item-action text-capitalize ${
            pathname === '/travel/sent' ? 'active' : ''
          }`}
        >
          <CarFrontFill /> Requested Travels
        </Link>
        <Link
          to='/travel/comment'
          class={`list-group-item list-group-item-action text-capitalize ${
            pathname === '/travel/comment' ? 'active' : ''
          }`}
        >
          <SendFill /> Add Review
        </Link>
        <Link
          to='/travel/reviews'
          class={`list-group-item list-group-item-action text-capitalize ${
            pathname === '/travel/reviews' ? 'active' : ''
          }`}
        >
          <ChatLeftDotsFill /> My Reviews
        </Link>
        <Link
          to='/update/password'
          class={`list-group-item list-group-item-action text-capitalize ${
            pathname === '/update/password' ? 'active' : ''
          }`}
        >
          <LockFill /> Update Password
        </Link>
        <Link
          to='/update/profile'
          class={`list-group-item list-group-item-action text-capitalize ${
            pathname === '/update/profile' ? 'active' : ''
          }`}
        >
          <PersonFill /> Update profile
        </Link>
        <a
          href='#'
          onClick={logout}
          class={`list-group-item list-group-item-action text-capitalize`}
        >
          <BoxArrowRight /> Logout
        </a>
      </div>
    </>
  );
};

export default SideBar;
