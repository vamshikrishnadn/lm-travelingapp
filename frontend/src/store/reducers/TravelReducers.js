export default (state = {}, action) => {
  switch (action.type) {
    case 'OTHER_TRAVELS':
      return {
        ...state,
        otherTravels: [...action.payload],
      };
    case 'MY_TRAVELS':
      return {
        ...state,
        myTravels: [...action.payload],
      };
    case 'SINGLE_TRAVEL':
      return {
        ...state,
        singleTravel: { ...action.payload },
      };
    case 'REQUESTED_TRAVELS':
      return {
        ...state,
        requestedTravels: [...action.payload],
      };
    case 'SENT_TRAVELS':
      return {
        ...state,
        sentTravels: [...action.payload],
      };
    case 'REVIEW_USERS':
      return {
        ...state,
        reviewUsers: [...action.payload],
      };
    case 'REVIEWS_MY':
      return {
        ...state,
        myReviews: [...action.payload],
      };
    case 'REVIEWS_USERS':
      return {
        ...state,
        userReviews: [...action.payload],
      };
    case 'TRAVEL_USERS':
      return {
        ...state,
        travelUsers: [...action.payload],
      };

    default:
      return state;
  }
};
