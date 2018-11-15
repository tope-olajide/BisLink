import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import setToken from '../utils/setToken';
/* import {
  SET_CURRENT_USER, SET_USER_PROFILE, PASSWORD_CHANGED
} from '../constants'; */

const url = 'http://localhost:4000/users/';

export function setCurrentUser(userData) {
  return {
    type: SET_CURRENT_USER,
    userData
  };
}

export function signUp(userData) {
    return dispatch => axios.post(`${url}signup`, userData)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        dispatch(setCurrentUser(jsonwebtoken
          .decode(localStorage.getItem('token'))));
      });
  }