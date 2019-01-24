import {
    ADD_BUSINESS,
    SET_BUSINESS_DETAILS,
    SET_MY_BUSINESSES,
    FETCH_ALL_BUSINESSES,
    EDIT_BUSINESS,
    FETCH_BUSINESS_REVIEWS,
    ADD_BUSINESS_REVIEW,
    UPVOTE_BUSINESS,
    DOWNVOTE_BUSINESS
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
        return {...state, myBusinesses: action.businesses };
        case SET_MY_BUSINESSES:
        return { ...state, myBusinesses: action.businesses };
        case EDIT_BUSINESS:
        return { ...state, myBusinesses: action.businesses };
        default: return state;
    }
}