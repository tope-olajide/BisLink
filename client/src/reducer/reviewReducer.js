import { ADD_BUSINESS_REVIEW, FETCH_BUSINESS_REVIEWS } from "../actions/type";

const initialState = {
  reviews: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUSINESS_REVIEWS:
      return { ...state, reviews: action.reviews };
    case ADD_BUSINESS_REVIEW:
      return {
        ...state,
        reviews: [action.reviews, ...state.reviews]
      };
    default:
      return state;
  }
};
