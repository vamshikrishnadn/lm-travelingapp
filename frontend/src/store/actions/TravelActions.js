import { toast } from 'react-toastify';
import {
  createTravelService,
  getOtherTravels,
  getMyTravels,
  deleteMyTravels,
  editMyTravels,
  getSingleTravels,
} from '../services/TravelServices';
import { buttonLoader } from './AppActions';

export const createTravel = (token, values, navigate) => dispatch => {
  dispatch(buttonLoader(true));
  createTravelService(token, values)
    .then(res => {
      dispatch(buttonLoader(false));

      toast.success('Travel created successfully.');
      navigate('/travel/my');
      return;
    })
    .catch(error => {
      dispatch(buttonLoader(false));
      console.error(error);
      console.log(error);
      toast.error(error?.response?.data?.message);
      return;
    });
};

export const otherTravels = token => dispatch => {
  getOtherTravels(token)
    .then(res => {
      dispatch({
        type: 'OTHER_TRAVELS',
        payload: res.data.payload,
      });
      return;
    })
    .catch(error => {
      console.error(error);
      console.log(error);
      return;
    });
};

export const myTravels = token => dispatch => {
  getMyTravels(token)
    .then(res => {
      dispatch({
        type: 'MY_TRAVELS',
        payload: res.data.payload,
      });
      return;
    })
    .catch(error => {
      console.error(error);
      console.log(error);
      return;
    });
};

export const deleteTravel = (token, id) => dispatch => {
  deleteMyTravels(token, id)
    .then(res => {
      toast.success('Successfully deleted.');
      dispatch(myTravels(token));
      return;
    })
    .catch(error => {
      console.error(error);
      console.log(error);
      return;
    });
};

export const editTravel = (token, values, id, navigate) => dispatch => {
  dispatch(buttonLoader(true));
  editMyTravels(token, values, id)
    .then(res => {
      dispatch(buttonLoader(false));
      toast.success('Successfully edited.');
      navigate('/travel/my');
      return;
    })
    .catch(error => {
      dispatch(buttonLoader(false));
      console.error(error);
      console.log(error);
      return;
    });
};

export const singleTravel = (token, id) => dispatch => {
  getSingleTravels(token, id)
    .then(res => {
      dispatch({
        type: 'SINGLE_TRAVEL',
        payload: res.data?.payload,
      });
      return;
    })
    .catch(error => {
      console.error(error);
      console.log(error);
      return;
    });
};
