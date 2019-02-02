import axios from 'axios';
import {
NEW_NOTIFICATIONS,NOTIFICATION_DETAILS,ALL_NOTIFICATIONS
} from '../actions/type'
const url = 'http://127.0.0.1:5000/api/user/notifications'

export function fetchAllNewNotifications() {
    return dispatch => axios.get(`${url}`)
        .then((response) => {
            const {
                unreadNotifications,allNotificationsCount
            } = response.data;
            const unreadNotificationsPlusCount = {unreadNotifications,allNotificationsCount }
            dispatch({
                type: NEW_NOTIFICATIONS,
                unreadNotificationsPlusCount
            });
        });
}
export function fetchSingleNotification(notificationId) {
    return dispatch => axios.get(`${url}/${notificationId}`)
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
    return dispatch => axios.get(`${url}/all`)
        .then((response) => {
            const {
                allNotifications,newNotificationsCount
            } = response.data;
         const  allNotificationsPlusCount = {allNotifications, newNotificationsCount}
            dispatch({
                type: ALL_NOTIFICATIONS,
                allNotificationsPlusCount
            });
        });
}