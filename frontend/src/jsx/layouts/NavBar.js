import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../store/actions/AuthActions';
import AppModal from './AppModal';
import moment from 'moment';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [links, setLinks] = useState([]);

  const logout = () => {
    dispatch(handleLogout(navigate));
  };

  return (
    <>
      <Navbar bg='primary' expand='lg'>
        <Container>
          <Navbar.Brand>
            <Link to='/dashboard' className='text-white text-decoration-none'>
              Car Pooling
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
            <Nav className='mr-auto'>
              <Nav.Link className='text-light' onClick={logout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
