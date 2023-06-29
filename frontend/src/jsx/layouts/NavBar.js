import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout, userDetails } from '../../store/actions/AuthActions';
import AppModal from './AppModal';
import moment from 'moment';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [links, setLinks] = useState([]);
  // const { user } = useSelector(state => state.auth?.authDetails);
  const { token } = useSelector(state => state.auth?.authDetails);
  const user = useSelector(state => state.auth?.profile);
  console.log('🚀 ~ file: NavBar.js:20 ~ NavBar ~ user:', user);

  useEffect(() => {
    dispatch(userDetails(token));
  }, []);

  const logout = () => {
    dispatch(handleLogout(navigate));
  };

  return (
    <>
      <Navbar bg='primary' expand='lg' fixed='top'>
        <Container>
          <Navbar.Brand>
            <Link to='/dashboard' className='text-white text-decoration-none'>
              Car Pooling
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
            <Nav className='mr-auto'>
              {user?.name && (
                <Nav.Link className='text-light text-capitalize'>Hi, {user?.name}</Nav.Link>
              )}
              <img
                src={
                  user?.file?.filename
                    ? `http://localhost:5000/${user?.file?.filename}`
                    : 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'
                }
                style={{ width: '40px', borderRadius: '50%', marginLeft: '10px' }}
              />
              {/* <Nav.Link className='text-light' onClick={logout}>
                Logout
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ height: '9vh' }} />
    </>
  );
}

export default NavBar;
