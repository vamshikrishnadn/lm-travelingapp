import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

import '../../../assets/css/auth.css';

import { registerUser } from '../../../store/actions/AuthActions';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [data, setData] = useState({ role: 'employee' });
  const [showPassword, setShowPassword] = useState(false);

  // selectors
  const { btnLoader } = useSelector(state => state.app);

  const handleChange = e => {
    console.log('evalue', e);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      return toast.error('Password and confirm password should be the same.');
    }

    console.log('data', data);
    dispatch(registerUser(data, navigate));
  };

  return (
    <section className='login_section'>
      <div className='col-10 col-lg-8 form_container'>
        <h4 className='text-center mb-4'>Register</h4>
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
                  Email<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter your email'
                  name='email'
                  value={data?.['email']}
                  required
                  onChange={handleChange}
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
                  placeholder='Password'
                  name='occupation'
                  value={data?.['occupation']}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className='col-12 col-lg-6'>
              <Form.Group className='mb-3 position-relative' controlId='formBasicPassword'>
                <Form.Label>
                  Password<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  name='password'
                  value={data?.['password']}
                  onChange={handleChange}
                />
                <div className='eye_icon' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </div>
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

            <div className='col-12 col-lg-6 mx-auto'>
              <button className='login_btn my-3 mt-4' type='submit'>
                {btnLoader ? <Spinner animation='border' size='sm' /> : 'Register'}
              </button>
            </div>
            <div className='text-center'>
              <span className='text-muted'>Already have account?</span>{' '}
              <Link to='/login' className='text-green login_link'>
                Sign in
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Register;
