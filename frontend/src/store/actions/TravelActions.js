import { toast } from 'react-toastify';
import {
  createTravelService,
  getOtherTravels,
  getMyTravels,
  deleteMyTravels,
  editMyTravels,
  getSingleTravels,
  postSendTravelRequest,
  getRequestedTravels,
  editMyTravelStatus,
  getSentTravels,
  getReviewUsers,
  addMyUserReview,
  getMyReviews,
  getUserReviews,
  getUsersInTravel,
  getFilterTravels,
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

export const filterTravels = (data, token) => dispatch => {
  getFilterTravels(data, token)
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

export const addUserReview = (token, values, navigate) => dispatch => {
  dispatch(buttonLoader(true));
  addMyUserReview(token, values)
    .then(res => {
      dispatch(buttonLoader(false));
      toast.success('Successfully added.');
      navigate('/dashboard');
      return;
    })
    .catch(error => {
      dispatch(buttonLoader(false));
      toast.error(error?.response?.data?.message);
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

export const usersInTravel = (token, id) => dispatch => {
  getUsersInTravel(token, id)
    .then(res => {
      dispatch({
        type: 'TRAVEL_USERS',
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

export const sendTravelRequest = (token, values, navigate) => dispatch => {
  postSendTravelRequest(token, values)
    .then(res => {
      toast.success('Request sent successfully.');
      navigate('/dashboard');
      return;
    })
    .catch(error => {
      console.error(error);
      toast.error(error?.response?.data?.message);
      console.log(error);
      return;
    });
};

export const requestedTravels = token => dispatch => {
  getRequestedTravels(token)
    .then(res => {
      dispatch({
        type: 'REQUESTED_TRAVELS',
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

export const sentTravels = token => dispatch => {
  getSentTravels(token)
    .then(res => {
      dispatch({
        type: 'SENT_TRAVELS',
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

export const reviewUsers = token => dispatch => {
  getReviewUsers(token)
    .then(res => {
      dispatch({
        type: 'REVIEW_USERS',
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

export const myReviews = token => dispatch => {
  getMyReviews(token)
    .then(res => {
      dispatch({
        type: 'REVIEWS_MY',
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

export const userReviews = (token, id) => dispatch => {
  getUserReviews(token, id)
    .then(res => {
      dispatch({
        type: 'REVIEWS_USERS',
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

export const editTravelStatus = (token, values, id, navigate) => dispatch => {
  dispatch(buttonLoader(true));
  editMyTravelStatus(token, values, id)
    .then(res => {
      dispatch(buttonLoader(false));
      toast.success('Successfully updated.');
      navigate('/travel/requests');
      return;
    })
    .catch(error => {
      dispatch(buttonLoader(false));
      console.error(error);
      toast.error(error?.response?.data?.message);
      console.log(error);
      return;
    });
};
