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
  usersInTravel,
} from '../../../store/actions/TravelActions';
import moment from 'moment';
import AppLoader from '../../layouts/AppLoader';
import { Star, StarFill } from 'react-bootstrap-icons';
import AppModal from '../../layouts/AppModal';
import { toast } from 'react-toastify';

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
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('');
  const [data, setData] = useState({ role: 'employee' });
  const headers = ['Sl. No', 'Reviewed By', 'Reviewed On', 'Rating', 'Comment'];
  const headers1 = ['Sl. No', 'Traveler Name', 'Email', 'Contact no.'];

  // selectors
  const { token } = useSelector(state => state.auth?.authDetails);
  const travel = useSelector(state => state?.travel?.singleTravel);
  const reviews = useSelector(state => state?.travel?.userReviews);
  const travelUsers = useSelector(state => state?.travel?.travelUsers);

  const profilePic = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginLeft: '10px',
  };

  useEffect(() => {
    dispatch(singleTravel(token, id));
    dispatch(usersInTravel(token, id));
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
      if (pathname.includes('/travel/request/send')) {
        dispatch(userReviews(token, travel?.createdBy?._id));
      }
      setTravels({
        'Travel Id': travel?.travelId.toUpperCase(),
        Price: `${travel?.price} ₹`,
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
    if (travel?.travelMembersCount <= travel?.occupiedSeats) {
      return toast.error('Sorry seats are fulled.');
    }

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
        editTravelStatus(
          token,
          { status, comment: data?.comment, travel: travelDetails?.travel?._id },
          travelDetails?._id,
          navigate
        )
      );
    }
  };

  const handleSubmit = () => {
    return dispatch(editTravel(token, { status }, id, navigate));
  };

  const renderPriceDetails = () => {
    return (
      <div className='my-2'>
        <h5 className='text-primary'>Price Breakup</h5>
        <div className='d-flex col-7 justify-content-between'>
          <b>Total Travel price:</b>
          <span>{travel?.price} ₹</span>
        </div>
        <div className='d-flex col-7 justify-content-between'>
          <b>No. of persons traveled:</b>
          <span>{travel?.occupiedSeats}</span>
        </div>
        <div className='d-flex col-7 justify-content-between'>
          <b>Cost on each person:</b>
          <span>{travel?.price / travel?.occupiedSeats} ₹</span>
        </div>
      </div>
    );
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
          {pathname.includes('/travel/view') && (
            <button
              className='btn btn-warning my-auto'
              disabled={travel?.status === 'Completed'}
              onClick={() => setShowModal(true)}
            >
              Update status
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

          {travel?.file?.filename && (
            <div className='col-12 col-lg-6 my-3'>
              <img
                className='img-fluid w-100'
                src={`http://localhost:5000/${travel?.file?.filename}`}
              />
            </div>
          )}

          {travel?.status === 'Completed' && (
            <div className='col-12 col-lg-7'>{renderPriceDetails()}</div>
          )}

          {requestedBy && (
            <div className='my-4'>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5 className='text-decoration-underline text-primary'>Requested User Info</h5>

                <img
                  src={
                    travelDetails?.requestedBy?.file?.filename
                      ? `http://localhost:5000/${travelDetails?.requestedBy?.file?.filename}`
                      : 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'
                  }
                  style={profilePic}
                />
              </div>
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
              <div className='d-flex justify-content-between'>
                <h5 className='text-decoration-underline text-primary'>Travel Owner Info</h5>
                <img
                  src={
                    travelDetails?.requestedTo?.file?.filename
                      ? `http://localhost:5000/${travelDetails?.requestedTo?.file?.filename}`
                      : 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'
                  }
                  style={profilePic}
                />
              </div>
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

          {travelUsers && travelUsers.length === 0 ? (
            <h5>No travelers found</h5>
          ) : (
            <div>
              <hr />
              <h5 className='text-primary text-decoration-underline'>Travelers Details</h5>
              <table className='table table-striped table-hover'>
                <thead className='bg-success'>
                  <tr className='bg-primary'>
                    {headers1?.map((header, i) => (
                      <th scope='col' key={i}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {travelUsers?.map((traveler, i) => (
                    <tr key={i}>
                      <th scope='row'>{i + 1}</th>
                      <td className='text-capitalize'>
                        <img
                          src={
                            traveler?.requestedBy?.file?.filename
                              ? `http://localhost:5000/${traveler?.requestedBy?.file?.filename}`
                              : 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'
                          }
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            marginLeft: '10px',
                          }}
                        />
                        {traveler?.requestedBy?.name}
                      </td>
                      <td>{traveler?.requestedBy?.email}</td>

                      <td className=''>{traveler?.requestedBy?.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
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
                              <td className='text-capitalize'>
                                <img
                                  src={
                                    review?.reviewedBy?.file?.filename
                                      ? `http://localhost:5000/${review?.reviewedBy?.file?.filename}`
                                      : 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'
                                  }
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    marginLeft: '10px',
                                  }}
                                />
                                {review?.reviewedBy?.name}
                              </td>
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

      <AppModal title='Update travel status' showModal={showModal} setShowModal={setShowModal}>
        <div className='mx-auto'>
          <Form.Label className='text-capitalize'>
            Update status<span className='text-danger'>*</span>
          </Form.Label>
          <Form.Select
            name='endMode'
            onChange={e => {
              setStatus(e.target.value);
            }}
            required
          >
            <option>Select </option>
            {['Active', 'Deactivate', 'On Raid', 'Completed', 'Ride is full']?.map((status, i) => (
              <option key={i} value={status}>
                {status}
              </option>
            ))}
          </Form.Select>

          {status === 'Completed' && renderPriceDetails()}

          <div className='mt-3 text-center'>
            <button className='btn btn-danger' onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button className='btn btn-primary mx-3' disabled={!status} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </AppModal>
    </>
  ) : (
    <AppLoader />
  );
};

export default TravelDetails;
