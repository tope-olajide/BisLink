import axios from "axios";

import { ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE } from "./type";
const url = "http://127.0.0.1:5000/api/user/favourite";
const token = localStorage.getItem("token");
axios.defaults.headers.common["authorization"] = token;

export function addToFavourite(businessId) {
  return dispatch =>
    axios.post(`${url}/${businessId}`).then(response => {
      const { isFavourite } = response.data;
      dispatch({
        type: ADD_TO_FAVOURITE,
        isFavourite
      });
    });
}
export function removeFromFavourite(businessId) {
  return dispatch =>
    axios.delete(`${url}/${businessId}`).then(response => {
      const { isFavourite } = response.data;
      dispatch({
        type: REMOVE_FROM_FAVOURITE,
        isFavourite
      });
    });
}
