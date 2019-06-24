import axios from 'axios';

import {
FETCH_USERS_PROFILE
  } from './type';
  const url = 'http://127.0.0.1:5000/api/user/'

export function fetchUsersProfile() {
    return dispatch => axios.get(`${url}profile`)
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

