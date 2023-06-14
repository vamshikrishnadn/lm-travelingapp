import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

import '../../../assets/css/auth.css';
import AppCard from '../../layouts/AppCard';
import { registerUser, updatePassword } from '../../../store/actions/AuthActions';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [data, setData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // selectors
  const { btnLoader } = useSelector(state => state.app);
  const { token } = useSelector(state => state.auth?.authDetails);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      return toast.error('Password and confirm password should be the same.');
    }

    console.log('data', data);
    dispatch(updatePassword(data, token, navigate));
  };

  return (
    <AppCard>
      {' '}
      <div>
        <h4 className='mb-4 text-primary text-capitalize'>Update Password</h4>
        <Form onSubmit={handleSubmit}>
          {' '}
          <div className='col-12 col-lg-6'>
            <Form.Group className='mb-3 position-relative' controlId='formBasicPassword'>
              <Form.Label>
                Old Password<span className='text-danger'>*</span>
              </Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                name='oldPassword'
                value={data?.['oldPassword']}
                onChange={handleChange}
                required
              />
              <div className='eye_icon' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </div>
            </Form.Group>
          </div>
          <div className='col-12 col-lg-6'>
            <Form.Group className='mb-3 position-relative' controlId='formBasicPassword'>
              <Form.Label>
                New Password<span className='text-danger'>*</span>
              </Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                name='password'
                value={data?.['password']}
                required
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div className='col-12 col-lg-6'>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>
                Confirm Password<span className='text-danger'>*</span>
              </Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter you password'
                name='confirmPassword'
                value={data?.['confirmPassword']}
                required
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <button className='btn btn-primary' type='submit'>
            {' '}
            {btnLoader ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
        </Form>
      </div>
    </AppCard>
  );
};

export default UpdatePassword;
