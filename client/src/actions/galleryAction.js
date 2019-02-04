import axios from 'axios';

import {
FETCH_GALLERIES, DEFAULT_BUSINESS_IMAGE, DELETE_PICTURE
  } from './type';
  const url = 'http://127.0.0.1:5000/api/business'

export function setDefaultImage(businessId,businessImageUrl) {
    return dispatch =>
        axios.put(`${url}/${businessId}/galleries?businessImageUrl=${businessImageUrl}`)
        .then((response) => {
            const  {defaultBusinessImage} = response.data;
            dispatch({
                type: DEFAULT_BUSINESS_IMAGE,
                defaultBusinessImage
            });
        });
}
export function fetchPictures(businessId) {
    return dispatch =>
    axios.get(`${url}/${businessId}/galleries`)
        .then((response) => {
            const  {businessPictures} = response.data;
            dispatch({
                type: FETCH_GALLERIES,
                businessPictures
            });
        });
}
export function deletePicture(businessId,businessImageId) {
    return dispatch =>
    axios.delete(`${url}/${businessId}/galleries?businessImageId=${businessImageId}`)
        .then((response) => {
            const  {businessPictures} = response.data;
            dispatch({
                type: DELETE_PICTURE,
                businessPictures
            });
        });
}