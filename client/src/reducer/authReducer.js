import  {SET_CURRENT_USER, FETCH_USERS_PROFILE } from './../actions/type';

const initialState = {
  user: {},
  usersProfile: {}
};
export default (state = initialState, action = {}) => {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state, user: action.userData
        };
        case FETCH_USERS_PROFILE:
        return {
          ...state, usersProfile: action.user
        };
      default: return state;
    }
  };