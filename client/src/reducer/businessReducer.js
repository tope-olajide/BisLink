import {
    ADD_BUSINESS,
    SET_CURRENT_BUSINESS,
    SET_MY_BUSINESSES,
    DELETE_BUSINESS,
    EDIT_BUSINESS
} from '../actions/type'

const initialState = {
    allBusinesses: {
        businesses: {}
    },
    myBusinesses: {
        businesses: {}
    },
    currentBusiness: {}
}
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUSINESS:
        return {...state, myBusinesses: action.businesses };
        case SET_MY_BUSINESSES:
        return { ...state, myBusinesses: action.businesses };
        case SET_CURRENT_BUSINESS:
        return { ...state, currentBusiness: action.business };
        case EDIT_BUSINESS:
        return { ...state, myBusinesses: action.businesses };
        default: return state;
    }
}