import { combineReducers } from 'redux';

import authReducer from './authReducer';
import businessReducer from './businessReducer';
import userReducer from './userReducer';

export default combineReducers({
    authReducer, businessReducer,userReducer
});
