export default (state = {}, action) => {
  switch (action.type) {
    case 'USER_DETAILS':
      return {
        ...state,
        authDetails: { ...action.payload },
      };
    case 'PROFILE_DETAILS':
      return {
        ...state,
        profile: { ...action.payload },
      };

    default:
      return state;
  }
};
