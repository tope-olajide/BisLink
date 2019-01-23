import axios from 'axios';

import {
  UPVOTE, DOWNVOTE
} from '../constants';
const url = 'http://127.0.0.1:5000/api/business/'
  const token = localStorage.getItem('token');
const setHeaderToken = {
    headers:{
        authorization:token
    }
}

export function upvote(businessId) {
    return dispatch => axios.post(`${url}/${businessId}/upvotes`)
      .then((response) => {
        const { business } = response.data;
        dispatch({
          type: UPVOTE,
          business
        });
      });
  }
  export function downvote(businessId) {
    return dispatch => axios.post(`${url}/${businessId}/downvotes`)
      .then((response) => {
        const { business } = response.data;
        dispatch({
          type: DOWNVOTE,
          business

        });
      });
  }
  