import {
    NEW_NOTIFICATIONS,NOTIFICATION_DETAILS,ALL_NOTIFICATIONS,READ_NOTIFICATIONS
    } from '../actions/type'
    const initialState = {
        allNotifications: {
            notifications: {}
        },
        unreadNotification: {
            notifications: {}
        },
        readNotification: {
            notifications: {}
        },
        viewNotificationDetails:{
            notificationDetails:{}
        }
    }
    export default (state = initialState, action) => {
        switch (action.type) {
            case NEW_NOTIFICATIONS:
            return {...state, unreadNotification: action.unreadNotificationsPlusCount }
            case READ_NOTIFICATIONS:
            return {...state, readNotification: action.readNotificationsPlusCount }
            case NOTIFICATION_DETAILS:
            return { ...state, viewNotificationDetails: action.notificationsDetailsPlusCount };
            case ALL_NOTIFICATIONS:
            return { ...state, allNotifications: action.allNotificationsPlusCount };
            default: return state;
        }
    }