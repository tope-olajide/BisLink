import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import setToken from '../utils/setToken';
 import {
  SET_CURRENT_USER
} from '../constants';

const url = '/';

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