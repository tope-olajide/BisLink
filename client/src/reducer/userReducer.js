import { FETCH_USERS_PROFILE } from "./../actions/type";

const initialState = {
  usersProfile: {}
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_USERS_PROFILE:
      return {
        ...state,
        usersProfile: action.user
      };
    default:
      return state;
  }
};
