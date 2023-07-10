import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

import '../../../assets/css/auth.css';
import AppCard from '../../layouts/AppCard';
import { updateProfile, userDetails } from '../../../store/actions/AuthActions';
import AppLoader from '../../layouts/AppLoader';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [data, setData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // selectors
  const { btnLoader } = useSelector(state => state.app);
  const { token } = useSelector(state => state.auth?.authDetails);
  const { profile } = useSelector(state => state.auth);
  console.log('🚀 ~ file: UpdateProfile.js:26 ~ UpdateProfile ~ profile:', profile);

  useEffect(() => {
    dispatch(userDetails(token));
  }, []);

  useEffect(() => {
    if (profile) {
      setData({ ...profile });
    }
  }, []);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log('data', data);
    delete data?._id;
    delete data?.email;
    dispatch(updateProfile(data, token, navigate));
  };

  return profile ? (
    <AppCard>
      <div>
        <h4 className='mb-4 text-primary text-capitalize'>Update Profile</h4>
        <Form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>
                  Full Name<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your full name'
                  name='name'
                  value={data?.['name']}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>
                  Contact number<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter your mobile number'
                  name='phone'
                  value={data?.['phone']}
                  required
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>
                  Age<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter your age'
                  name='age'
                  value={data?.['age']}
                  required
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>
                  Gender<span className='text-danger'>*</span>
                </Form.Label>
                <br />
                <Form.Check
                  inline
                  label='Male'
                  name='gender'
                  type={'radio'}
                  id={`gender-1`}
                  value='Male'
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label='Female'
                  name='gender'
                  type={'radio'}
                  id={`gender-2`}
                  value='Female'
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Occupation</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Occupation'
                  name='occupation'
                  value={data?.['occupation']}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>
                  City<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your city'
                  name='city'
                  value={data?.['city']}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>
                  State<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your state'
                  name='state'
                  value={data?.['state']}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>
                  Country<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your country'
                  name='country'
                  value={data?.['country']}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>
                  Pincode<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your pincode'
                  name='pincode'
                  value={data?.['pincode']}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <div className='col-12'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>
                  Address<span className='text-danger'>*</span>
                </Form.Label>
                <textarea
                  className='form-control'
                  id='exampleFormControlTextarea1'
                  rows='3'
                  name='address'
                  value={data?.['address']}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>
          <button className='btn btn-primary' type='submit'>
            {' '}
            {btnLoader ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
        </Form>
      </div>
    </AppCard>
  ) : (
    <AppLoader />
  );
};

export default UpdateProfile;
