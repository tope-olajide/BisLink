import {
    ADD_TO_FAVOURITE,REMOVE_FROM_FAVOURITE
} from '../actions/type'

const initialState = {
    myFavourites: {
        
    }
}
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_FAVOURITE:
        return { ...state, myFavourites: action.isFavourite };
        case REMOVE_FROM_FAVOURITE:
        return { ...state, myFavourites: action.isFavourite };
        default: return state;
    }
}