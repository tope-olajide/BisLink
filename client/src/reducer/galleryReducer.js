import {
  FETCH_GALLERIES,
  DELETE_PICTURE,
  DEFAULT_BUSINESS_IMAGE
} from "../actions/type";

const initialState = {
  businessPictures: [],
  defaultBusinessImage: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GALLERIES:
      return { ...state, businessPictures: action.businessPictures };
    case DELETE_PICTURE:
      return { ...state, businessPictures: action.businessPictures };
    case DEFAULT_BUSINESS_IMAGE:
      return { ...state };

    default:
      return state;
  }
};
