import axios from "axios";

import { FOLLOW_USER, UNFOLLOW_USER } from "./type";
const url = "http://127.0.0.1:5000/api/user/follow";
export function follow(userId) {
  return dispatch =>
    axios.post(`${url}/${userId}`).then(response => {
      const { isFollowing } = response.data;
      dispatch({
        type: FOLLOW_USER,
        isFollowing
      });
    });
}
export function unfollow(userId) {
  return dispatch =>
    axios.delete(`${url}/${userId}`).then(response => {
      const { isFollowing } = response.data;
      dispatch({
        type: UNFOLLOW_USER,
        isFollowing
      });
    });
}
