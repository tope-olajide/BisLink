import axios from 'axios';

import {
FETCH_USERS_PROFILE
  } from './type';
  const url = 'http://127.0.0.1:5000/api/user/'
  const token = localStorage.getItem('token');
const setHeaderToken = {
    headers:{
        authorization:token
    }
}

export function fetchUsersProfile(userId) {
    return dispatch => axios.get(`${url}profile/${userId}`, setHeaderToken)
      .then((response) => {
        const {
          user
        } = response.data;
        dispatch({
          type: FETCH_USERS_PROFILE,
          user
      });
       
      });
  }

