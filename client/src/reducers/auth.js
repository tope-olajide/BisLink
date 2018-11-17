import { SET_CURRENT_USER, SET_USER_PROFILE } from '../constants';

const initialState = {
  user: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state, user: action.userData
      };
    default: return state;
  }
};

