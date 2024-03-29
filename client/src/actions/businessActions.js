import axios from "axios";
import {
  ADD_BUSINESS,
  SET_BUSINESS_DETAILS,
  SET_MY_BUSINESSES,
  DELETE_BUSINESS,
  EDIT_BUSINESS,
  FETCH_ALL_BUSINESSES,
  ADD_BUSINESS_REVIEW,
  FETCH_BUSINESS_REVIEWS,
  MODIFY_BUSINESS
} from "../actions/type";
const url = "http://127.0.0.1:5000/api/business";

export function fetchBusinesses(page, limit) {
  return dispatch =>
    axios.get(`${url}?page=${page}&limit=${limit}`).then(response => {
      const { businesses, totalPages } = response.data;
      const pagedBusiness = { businesses, totalPages };
      dispatch({
        type: FETCH_ALL_BUSINESSES,
        pagedBusiness
      });
    });
}

export function businessSearch(name, location, page, limit) {
  return dispatch =>
    axios
      .get(
        `${url}/search?name=${name}&location=${location}&page=${page}&limit=${limit}`
      )
      .then(response => {
        const { businesses, totalPages } = response.data;
        const pagedBusiness = { businesses, totalPages };
        dispatch({
          type: FETCH_ALL_BUSINESSES,
          pagedBusiness
        });
      });
}
export function sortBusinessBy(sort, page, limit) {
  return dispatch =>
    axios
      .get(`${url}/search?sort=${sort}&page=${page}&limit=${limit}`)
      .then(response => {
        const { businesses, totalPages } = response.data;
        const pagedBusiness = { businesses, totalPages };
        dispatch({
          type: FETCH_ALL_BUSINESSES,
          pagedBusiness
        });
      });
}
export function fetchBusinessDetails(businessId) {
  return dispatch =>
    axios.get(`${url}/${businessId}`).then(response => {
      const { business, infoCount } = response.data;
      const businessDetails = { business, infoCount };
      dispatch({
        type: SET_BUSINESS_DETAILS,
        businessDetails
      });
    });
}

export function fetchBusinessReviews(businessId) {
  return dispatch =>
    axios.get(`${url}/${businessId}/reviews`).then(response => {
      const { reviews } = response.data;
      dispatch({
        type: FETCH_BUSINESS_REVIEWS,
        reviews
      });
    });
}

export function addBusinessReviews(businessId, userReview) {
  return dispatch =>
    axios.post(`${url}/${businessId}/reviews`, userReview).then(response => {
      const { reviews } = response.data;
      dispatch({
        type: ADD_BUSINESS_REVIEW,
        reviews
      });
    });
}

export function addBusiness(businessData) {
  return dispatch =>
    axios.post(`${url}`, businessData).then(response => {
      const { business } = response.data;
      dispatch({
        type: ADD_BUSINESS,
        business
      });
    });
}
export function modifyBusiness(businessData, businessId) {
  return dispatch =>
    axios.put(`${url}/${businessId}`, businessData).then(response => {
      const { business } = response.data;
      dispatch({
        type: MODIFY_BUSINESS,
        business
      });
    });
}

export function fetchMyBusinesses() {
  return dispatch =>
    axios
      .get(`http://127.0.0.1:5000/api/v1/users/myBusinesses`)
      .then(response => {
        const { business } = response.data;
        dispatch({
          type: SET_MY_BUSINESSES,
          business
        });
      });
}
export function deleteBusiness(businessId) {
  return dispatch =>
    axios.delete(`${url}/${businessId}`).then(() => {
      dispatch({
        type: DELETE_BUSINESS,
        id: businessId
      });
    });
}
export function editBusines(businessId, businessData) {
  return dispatch =>
    axios.put(`${url}/${businessId}`, businessData).then(response => {
      const { business } = response.data;
      dispatch({
        type: EDIT_BUSINESS,
        business
      });
    });
}
