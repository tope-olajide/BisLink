import {
  ADD_BUSINESS,
  SET_BUSINESS_DETAILS,
  FETCH_ALL_BUSINESSES,
  REMOVE_FROM_FAVOURITE,
  ADD_TO_FAVOURITE,
  UPVOTE_BUSINESS,
  DOWNVOTE_BUSINESS,
  MODIFY_BUSINESS,
  FOLLOW_USER,
  UNFOLLOW_USER
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
  fetchBusinessReviews: {

  },
  addBusinessReview: {

  }
}
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_BUSINESSES:
      return {
        ...state,
        allBusinesses: action.pagedBusiness
      };
    case SET_BUSINESS_DETAILS:
      return {
        ...state,
        businessDetails: action.businessDetails
      };
    case UPVOTE_BUSINESS:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          business: {
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
          ...state.businessDetails,
          business: {
            ...state.businessDetails.business,
            upvotes: action.business.upvotes,
            downvotes: action.business.downvotes
          }
        }
      };
    case FOLLOW_USER:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          infoCount: {
            ...state.businessDetails.infoCount,
            isFollowing: action.isFollowing,
            followersCount: state.businessDetails.infoCount.followersCount + 1
          }
        }
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          infoCount: {
            ...state.businessDetails.infoCount,
            isFollowing: action.isFollowing,
            followersCount: state.businessDetails.infoCount.followersCount - 1
          }
        }
      };
    case ADD_TO_FAVOURITE:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          infoCount: {
            ...state.businessDetails.infoCount,
            isUserFavourite: action.isFavourite
          }
        }
      }
      case REMOVE_FROM_FAVOURITE:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          infoCount: {
            ...state.businessDetails.infoCount,
            isUserFavourite: action.isFavourite
          }
        }
      }
    case ADD_BUSINESS:
      return {
        ...state,
        [action.business.id]: action.business
      };
    case MODIFY_BUSINESS:
      return {
        ...state,
        [action.business.id]: action.business
      };

    default:
      return state;
  }
}