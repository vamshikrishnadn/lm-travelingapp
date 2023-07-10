import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Star, StarFill } from 'react-bootstrap-icons';

import AppCard from '../../layouts/AppCard';
import AppLoader from '../../layouts/AppLoader';
import { addUserReview, reviewUsers } from '../../../store/actions/TravelActions';
import { toast } from 'react-toastify';

const CommentTravel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // states
  const [data, setData] = useState({});
  const [rating, setRating] = useState(1);

  // selectors
  const { token } = useSelector(state => state.auth?.authDetails);
  const users = useSelector(state => state.travel?.reviewUsers);
  const { btnLoader } = useSelector(state => state.app);

  useEffect(() => {
    dispatch(reviewUsers(token));
  }, []);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!data?.reviewedTo || data?.reviewedTo === 'Select User') {
      return toast.error('All fields are required.');
    }
    const submitData = {
      reviewedTo: data?.reviewedTo,
      rating,
      comment: data?.comment,
    };
    console.log('🚀 ~ file: CommentTravel.js:40 ~ handleSubmit ~ submitData:', submitData);
    dispatch(addUserReview(token, submitData, navigate));
  };

  return users ? (
    <AppCard>
      <h4 className='mb-4 text-primary text-capitalize'>Review your travel</h4>
      {users.length === 0 ? (
        <h5 className='text-danger'>You haven't completed any travels to review</h5>
      ) : (
        <Form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-12 col-lg-8'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>
                  Select user<span className='text-danger'>*</span>
                </Form.Label>
                <Form.Select
                  name='reviewedTo'
                  onChange={handleChange}
                  value={data?.['reviewedTo']}
                  required
                >
                  <option value={undefined}>Select User</option>
                  {users?.map((user, i) => (
                    <option key={i} value={user?._id}>
                      <span className='text-capitalize'>{user?.name}</span>
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            <div className='col-12 col-lg-8 mb-3'>
              <Form.Label>
                Rating<span className='text-danger'>*</span>
              </Form.Label>
              <br />
              {[...Array(5)].map((star, i) => (
                <span
                  key={i}
                  className='mx-1 cursor-pointer'
                  style={{ cursor: 'pointer' }}
                  onClick={() => setRating(i + 1)}
                >
                  {i + 1 > rating ? <Star /> : <StarFill style={{ color: 'gold' }} />}
                </span>
              ))}
            </div>

            <div className='col-12 col-lg-8'>
              <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                <Form.Label>Comment</Form.Label>
                <textarea
                  className='form-control'
                  id='exampleFormControlTextarea1'
                  rows='3'
                  name='comment'
                  placeholder='Write your comments here'
                  value={data?.['comment']}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <button className='btn btn-primary' type='submit'>
            {' '}
            {btnLoader ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
        </Form>
      )}
    </AppCard>
  ) : (
    <AppLoader />
  );
};

export default CommentTravel;
