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

    default:
      return state;
  }
};
