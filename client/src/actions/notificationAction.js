import axios from 'axios';
import {
NEW_NOTIFICATIONS,NOTIFICATION_DETAILS,ALL_NOTIFICATIONS
} from '../actions/type'
const url = 'http://127.0.0.1:5000/api/user/notifications'

const token = localStorage.getItem('token');
const setHeaderToken = {
    headers:{
        authorization:token
    }
}
export function fetchAllNewNotifications() {
    return dispatch => axios.get(`${url}`,setHeaderToken)
        .then((response) => {
            const {
                unreadNotification
            } = response.data;
            dispatch({
                type: NEW_NOTIFICATIONS,
                unreadNotification
            });
        });
}
export function fetchSingleNotification(notificationId) {
    return dispatch => axios.get(`${url}/${notificationId}`,setHeaderToken)
        .then((response) => {
            const {
                notification
            } = response.data;
            dispatch({
                type: NOTIFICATION_DETAILS,
                notification
            });
        });
}
export function fetchAllNotifications() {
    return dispatch => axios.get(`${url}/all`,setHeaderToken)
        .then((response) => {
            const {
                allNotifications
            } = response.data;
            dispatch({
                type: ALL_NOTIFICATIONS,
                allNotifications
            });
        });
}