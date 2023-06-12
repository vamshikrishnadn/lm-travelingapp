import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppCard from '../../layouts/AppCard';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  createTravel,
  editTravel,
  sendTravelRequest,
  singleTravel,
} from '../../../store/actions/TravelActions';
import moment from 'moment';
import AppLoader from '../../layouts/AppLoader';

const TravelDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // states
  const [travels, setTravels] = useState();

  // selectors
  const { token } = useSelector(state => state.auth?.authDetails);
  const travel = useSelector(state => state?.travel?.singleTravel);

  useEffect(() => {
    dispatch(singleTravel(token, id));
  }, []);

  useEffect(() => {
    if (travel) {
      setTravels({
        'Travel Id': travel?.travelId,
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

  return travel ? (
    <>
      <AppCard>
        <div className='d-flex justify-content-between'>
          <h4 className='mb-4 text-primary'>Travel Details</h4>
          {location?.pathname.includes('/request/') && (
            <button className='btn btn-success my-auto' onClick={handleSendRequest}>
              Send request
            </button>
          )}
        </div>
        <div className='row'>
          {travels &&
            Object.keys(travels)?.map((key, i) => (
              <div key={i} className='col-12 col-md-6 mb-2'>
                <b>{key}: </b>
                {travels[key]}
              </div>
            ))}
        </div>
      </AppCard>
    </>
  ) : (
    <AppLoader />
  );
};

export default TravelDetails;
