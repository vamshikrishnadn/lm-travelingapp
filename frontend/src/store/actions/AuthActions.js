import { toast } from 'react-toastify';
import {
  signupService,
  signinService,
  updateUserPassword,
  getUserDetails,
  updateUserProfile,
} from '../services/AuthServices';
import { buttonLoader } from './AppActions';

export const registerUser = (formValues, navigate) => dispatch => {
  dispatch(buttonLoader(true));
  signupService(formValues)
    .then(res => {
      dispatch(buttonLoader(false));
      dispatch({
        type: 'USER_DETAILS',
        payload: res.data.payload,
      });
      navigate('/dashboard');
      return toast.success('Account created successfully.');
    })
    .catch(error => {
      dispatch(buttonLoader(false));
      console.error(error);
      console.log(error);
      return toast.error(error?.response?.data?.message);
    });
};

export const loginUser = (formValues, navigate) => dispatch => {
  dispatch(buttonLoader(true));
  signinService(formValues)
    .then(res => {
      dispatch(buttonLoader(false));
      dispatch({
        type: 'USER_DETAILS',
        payload: res.data.payload,
      });
      navigate('/dashboard');

      return toast.success('Logged in successfully.');
    })
    .catch(error => {
      console.error(error);
      console.log(error);
      dispatch(buttonLoader(false));
      return toast.error(error?.response?.data?.message);
    });
};

export const handleLogout = navigate => dispatch => {
  dispatch({
    type: 'USER_DETAILS',
    payload: null,
  });
  navigate('/');
  return toast.success('Logged out successfully');
};

export const updatePassword = (formValues, token, navigate) => dispatch => {
  dispatch(buttonLoader(true));
  updateUserPassword(formValues, token)
    .then(res => {
      dispatch(buttonLoader(false));

      navigate('/dashboard');

      return toast.success('Successfully updated.');
    })
    .catch(error => {
      console.error(error);
      console.log(error);
      dispatch(buttonLoader(false));
      return toast.error(error?.response?.data?.message);
    });
};

export const updateProfile = (formValues, token, navigate) => dispatch => {
  dispatch(buttonLoader(true));
  updateUserProfile(formValues, token)
    .then(res => {
      dispatch(buttonLoader(false));

      navigate('/dashboard');
      dispatch(userDetails(token));
      return toast.success('Successfully updated.');
    })
    .catch(error => {
      console.error(error);
      console.log(error);
      dispatch(buttonLoader(false));
      return toast.error(error?.response?.data?.message);
    });
};

export const userDetails = token => dispatch => {
  getUserDetails(token)
    .then(res => {
      return dispatch({
        type: 'PROFILE_DETAILS',
        payload: res.data.payload,
      });
    })
    .catch(error => {
      console.error(error);
      console.log(error);
      return;
    });
};
