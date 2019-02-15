import { combineReducers } from 'redux';

import authReducer from './authReducer';
import businessReducer from './businessReducer';
import userReducer from './userReducer';
import notificationsReducer from './notificationsReducer';
import reviewReducer from './reviewReducer'
import galleryReducer from './galleryReducer'
export default combineReducers({
    authReducer, businessReducer,userReducer,notificationsReducer,reviewReducer,galleryReducer
});
