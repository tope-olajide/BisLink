import {
    ADD_BUSINESS,
    SET_BUSINESS_DETAILS,
    FETCH_ALL_BUSINESSES,
    FETCH_BUSINESS_REVIEWS,
    ADD_BUSINESS_REVIEW,
    UPVOTE_BUSINESS,
    DOWNVOTE_BUSINESS,
    MODIFY_BUSINESS
} from '../actions/type'

const initialState = {
    allBusinesses: {
        businesses: {}
    },
    myBusinesses: {
        businesses: {}
    },
    businessDetails: {
        
    },
    fetchBusinessReviews:{
       
    },
    addBusinessReview:{
        
    }
}
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_BUSINESSES:
        return {...state, allBusinesses: action.pagedBusiness }
        case SET_BUSINESS_DETAILS:
        return { ...state, businessDetails: action.businessDetails };
        case FETCH_BUSINESS_REVIEWS:
        return { ...state, fetchBusinessReviews: action.reviews };
        case ADD_BUSINESS_REVIEW:
        return { ...state, businessDetails: action.addBusinessReview };
        case UPVOTE_BUSINESS:
        return {
          ...state,
          businessDetails: {
              business:{
                  ...state.businessDetails.business,
                  upvotes: action.business.upvotes,
                  downvotes: action.business.downvotes                 
              }
          }
        };
        case DOWNVOTE_BUSINESS:
        return {
          ...state,
          businessDetails: {
              business:{
                  ...state.businessDetails.business,
                  upvotes: action.business.upvotes,
                  downvotes: action.business.downvotes                 
              }
          }
        };
        case ADD_BUSINESS:
        return {...state, [action.business.id]: action.business };
        case MODIFY_BUSINESS:
        return {...state, [action.business.id]: action.business };

        default: return state;
    }
}