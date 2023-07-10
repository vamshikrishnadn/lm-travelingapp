import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppCard from '../../layouts/AppCard';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  createTravel,
  editTravel,
  editTravelStatus,
  sendTravelRequest,
  singleTravel,
  userReviews,
} from '../../../store/actions/TravelActions';
import moment from 'moment';
import AppLoader from '../../layouts/AppLoader';
import { Star, StarFill } from 'react-bootstrap-icons';

const TravelDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const travelDetails = location?.state;
  console.log('🚀 ~ file: TravelDetails.js:19 ~ TravelDetails ~ travelDetails:', travelDetails);
  const navigate = useNavigate();

  // states
  const [travels, setTravels] = useState();
  const [requestedBy, setRequestedBy] = useState();
  const [travelOwnerInfo, setTravelOwnerInfo] = useState();
  const [data, setData] = useState({ role: 'employee' });
  const headers = ['Sl. No', 'Reviewed By', 'Reviewed On', 'Rating', 'Comment'];

  // selectors
  const { token } = useSelector(state => state.auth?.authDetails);
  const travel = useSelector(state => state?.travel?.singleTravel);
  const reviews = useSelector(state => state?.travel?.userReviews);

  useEffect(() => {
    dispatch(singleTravel(token, id));
  }, []);

  useEffect(() => {
    if (pathname.includes('travel/request/received')) {
      dispatch(userReviews(token, travelDetails?.requestedBy?._id));
    }
    if (pathname.includes('travel/request/requested')) {
      dispatch(userReviews(token, travelDetails?.requestedTo?._id));
    }

    if (
      (pathname.includes('travel/request/received') ||
        pathname.includes('travel/request/requested')) &&
      travelDetails
    ) {
      setRequestedBy({
        Name: travelDetails?.requestedBy?.name,
        'Requested on': moment(travelDetails?.requestedDate).format('lll'),
        Email: travelDetails?.requestedBy?.email,
        'phone number': travelDetails?.requestedBy?.phone,
        gender: travelDetails?.requestedBy?.gender,
        city: travelDetails?.requestedBy?.city,
        state: travelDetails?.requestedBy?.state,
        country: travelDetails?.requestedBy?.country,
        address: travelDetails?.requestedBy?.address,
        occupation: travelDetails?.requestedBy?.occupation,
      });
      setTravelOwnerInfo({
        Name: travelDetails?.requestedTo?.name,
        'Requested on': moment(travelDetails?.requestedDate).format('lll'),
        Email: travelDetails?.requestedTo?.email,
        'phone number': travelDetails?.requestedTo?.phone,
        gender: travelDetails?.requestedTo?.gender,
        city: travelDetails?.requestedTo?.city,
        state: travelDetails?.requestedTo?.state,
        country: travelDetails?.requestedTo?.country,
        address: travelDetails?.requestedTo?.address,
        occupation: travelDetails?.requestedTo?.occupation,
      });
    }
  }, [travelDetails]);

  useEffect(() => {
    if (travel) {
      setTravels({
        'Travel Id': travel?.travelId.toUpperCase(),
        'Vehicle Company': travel?.vehicleMade,
        'Vehicle Model': travel?.vehicleModel,
        'Vehicle Number': travel?.vehicleNumber,
        'License  Number': travel?.licenseNumber,
        Setter: travel?.setter,
        'Members To Travel': travel?.travelMembersCount,
        From: travel?.from,
        To: travel?.to,
        Via: travel?.via,
        'Travel Date': moment(travel?.travelDate).format('ll'),
        'Start Time': travel?.travelTime?.from,
        'End Time': travel?.travelTime?.to,
        'Fuel Type': travel?.fuelType,
      });
    }
  }, [travel]);

  const handleSendRequest = () => {
    dispatch(
      sendTravelRequest(
        token,
        {
          requestedTo: travel?.createdBy._id,
          travel: id,
        },
        navigate
      )
    );
  };

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdateStatus = status => {
    if (window.confirm(`Are you sure to ${status} this travel?`)) {
      dispatch(
        editTravelStatus(token, { status, comment: data?.comment }, travelDetails?._id, navigate)
      );
    }
  };

  return travel ? (
    <>
      <AppCard>
        <div className='d-flex justify-content-between align-items-center'>
          <h4 className='mb-4 text-primary'>Travel Details</h4>
          {location?.pathname.includes('/request/send/') && (
            <button className='btn btn-success my-auto' onClick={handleSendRequest}>
              Send Request
            </button>
          )}
          {pathname.includes('travel/request/received') && (
            <button className='btn btn-info my-auto' disabled>
              {travelDetails?.status}
            </button>
          )}
        </div>
        <div className='row'>
          {travels &&
            Object.keys(travels)?.map((key, i) => (
              <div key={i} className='col-12 col-md-6 mb-2'>
                <b>{key}: </b>
                {travels[key] ?? 'N/A'}
              </div>
            ))}

          {requestedBy && (
            <div className='my-4'>
              <hr />
              <h5 className='text-decoration-underline text-primary'>Requested User Info</h5>
              <div className='row'>
                {Object.keys(requestedBy)?.map((key, i) => (
                  <div key={i} className='col-12 col-md-6 mb-2'>
                    <b className='text-capitalize'>{key}: </b>
                    <span>{requestedBy[key] ?? 'N/A'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {travelOwnerInfo && (
            <div className='mb-4'>
              <hr />
              <h5 className='text-decoration-underline text-primary'>Travel Owner Info</h5>
              <div className='row'>
                {Object.keys(travelOwnerInfo)?.map((key, i) => (
                  <div key={i} className='col-12 col-md-6 mb-2'>
                    <b className='text-capitalize'>{key}: </b>
                    {travelOwnerInfo[key] ?? 'N/A'}
                  </div>
                ))}
              </div>
            </div>
          )}

          {travelDetails?.comment && (
            <div className='mb-4'>
              <hr />
              <b>Requested Comment: </b>
              <br />
              {travelDetails?.comment}
            </div>
          )}

          {pathname !== `/travel/view/${id}` && (
            <div>
              {reviews && reviews.length === 0 ? (
                <h5>No Reviews found for this user</h5>
              ) : (
                <div className='col-12'>
                  <hr />
                  <h5 className='text-primary text-decoration-underline'>User Reviews</h5>
                  <>
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
                              <td className='text-capitalize'>
                                {moment(review?.reviewedOn).format('ll')}
                              </td>
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
                  </>
                </div>
              )}
            </div>
          )}

          {pathname.includes('travel/request/received') && travelDetails?.status === 'Pending' && (
            <div className='mb-4'>
              <hr />
              <h5 className='text-primary text-decoration-underline'>Update status</h5>
              <div className='col-12 col-lg-8'>
                <Form.Group className='mb-3 ' controlId='formBasicEmail'>
                  <Form.Label>Comment</Form.Label>
                  <textarea
                    className='form-control'
                    id='exampleFormControlTextarea1'
                    rows='3'
                    name='comment'
                    value={data?.['comment']}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
              <button className='btn btn-success' onClick={() => handleUpdateStatus('Accept')}>
                Accept
              </button>
              <button className='btn btn-danger mx-2' onClick={() => handleUpdateStatus('Reject')}>
                Reject
              </button>
            </div>
          )}
        </div>
      </AppCard>
    </>
  ) : (
    <AppLoader />
  );
};

export default TravelDetails;
