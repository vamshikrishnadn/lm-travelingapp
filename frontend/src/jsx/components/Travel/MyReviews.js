import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppCard from '../../layouts/AppCard';
import { Link, useNavigate } from 'react-router-dom';
import { myReviews } from '../../../store/actions/TravelActions';
import AppLoader from '../../layouts/AppLoader';
import moment from 'moment';
import { Star, StarFill } from 'react-bootstrap-icons';

const MyReviews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // constants
  const headers = ['Sl. No', 'Reviewed By', 'Reviewed On', 'Rating', 'Comment'];

  // selectors
  const { token } = useSelector(state => state.auth?.authDetails);
  const reviews = useSelector(state => state.travel?.myReviews);
  console.log('🚀 ~ file: Dashboard.js:27 ~ Dashboard ~ otherTravels:', reviews);

  useEffect(() => {
    dispatch(myReviews(token));
  }, []);

  return reviews ? (
    <>
      <AppCard>
        <h4 className='mb-4 text-primary'>My Travels Reviews</h4>

        <div className='table-responsive'>
          <table className='table table-striped table-hover'>
            <thead className='bg-success'>
              <tr className='bg-primary'>
                {headers?.map((header, i) => (
                  <th scope='col' key={i}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reviews?.length === 0 ? (
                <h6 className='text-danger'>No reviews found</h6>
              ) : (
                reviews?.map((review, i) => (
                  <tr key={i}>
                    <th scope='row'>{i + 1}</th>
                    <td className='text-capitalize'>{review?.reviewedBy?.name}</td>
                    <td className='text-capitalize'>{moment(review?.reviewedOn).format('ll')}</td>
                    <td>
                      {[...Array(5)].map((star, i) => (
                        <span key={i} className='mx-1 cursor-pointer'>
                          {i + 1 > review?.rating ? (
                            <Star />
                          ) : (
                            <StarFill style={{ color: 'gold' }} />
                          )}
                        </span>
                      ))}
                    </td>
                    <td className=''>{review?.comment}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AppCard>
    </>
  ) : (
    <AppLoader />
  );
};

export default MyReviews;
