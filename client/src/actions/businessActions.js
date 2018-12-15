import axios from 'axios';
import {
    ADD_BUSINESS,
    SET_CURRENT_BUSINESS,
    SET_MY_BUSINESSES,
    DELETE_BUSINESS,
    EDIT_BUSINESS
} from '../actions/type'
const url = 'http://127.0.0.1:5000/api/business/'

export function addBusiness(businessData) {
    return dispatch => axios.post(`${url}`, businessData)
        .then((response) => {
            const {
                business
            } = response.data;
            dispatch({
                type: ADD_BUSINESS,
                business
            });
        });
}

export function fetchBusinessDetails(businessId) {
    return dispatch =>
        axios.get(`${url}/${businessId}`)
        .then((response) => {
            const {
                data: {
                    business
                }
            } = response;
            dispatch({
                type: SET_CURRENT_BUSINESS,
                business
            });
        });
}
export function fetchMyBusinesses() {
    return dispatch =>
        axios
        .get(`http://127.0.0.1:5000/api/v1/users/myBusinesses`)
        .then((response) => {
            const {
                business
            } = response.data;
            dispatch({
                type: SET_MY_BUSINESSES,
                business
            });
        });
}
export function deleteBusiness(businessId) {
    return dispatch => axios.delete(`${url}/${businessId}`)
        .then(() => {
            dispatch({
                type: DELETE_BUSINESS,
                id: businessId
            });
        });
}
export function editBusines(businessId, businessData) {
    return dispatch => axios.put(`${url}/${businessId}`, businessData)
        .then((response) => {
            const {
                business
            } = response.data;
            dispatch({
                type: EDIT_BUSINESS,
                business
            });
        });
}