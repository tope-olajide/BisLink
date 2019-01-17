import {
    NEW_NOTIFICATIONS,NOTIFICATION_DETAILS,ALL_NOTIFICATIONS
    } from '../actions/type'
    const initialState = {
        allNotifications: {
            notifications: {}
        },
        unreadNotification: {
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
            case NOTIFICATION_DETAILS:
            return { ...state, viewNotificationDetails: action.notification };
            case ALL_NOTIFICATIONS:
            return { ...state, allNotifications: action.allNotificationsPlusCount };
            default: return state;
        }
    }