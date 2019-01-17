import {

  Notification
} from '../models';
      var sequelize= require('../models');
import {
  validateNotificationOwner
} from '../middleware/userValidation';
export default class Notifications {
  getAllNotifications({
    user
  }, res) {
    const userId = user.id;
    Notification
      .findAll({
        attributes:['id', 'title','message','createdAt'],
        where: {
          userId
        }
      })
      .then((allNotifications) => {
        Notification.count({
          where: {
            userId,
            notificationState: 'unseen'
          }
        }).then((newNotificationsCount) =>{
        if (allNotifications.length < 1) {
          return res.status(200).json({
            success: true,
            message: 'No notifications found!',
            allNotifications: [],
            newNotificationsCount
          });
        }
        return res.status(200).json({
          success: true,
          message: 'notifications found',
          allNotifications,
          newNotificationsCount
        });
        })

      })
      .catch(( /* error */ ) => res.status(500).json({
        success: false,
        message: 'Error fetching notifications'
      }));

  }

  viewNotification({ params, user }, res ) {
    const { notificationId } = params;
    const userId = user.id;
    Notification
      .findOne({
        where: {
          id: notificationId
        }
      })
      validateNotificationOwner(notificationId, userId).then((notificationFound) => {
        notificationFound.updateAttributes({
          notificationState: 'seen'
        }).then(notification => res.status(200).json({
          success: true,
          message: 'notification found',
          notification
        }))
      })
      .catch(( /* error */ ) => res.status(500).json({
        success: false,
        message: 'Error fetching notification'
      }));

    return this;
  }
  DeleteNotification({ params, user}, res) {
    const {
      notificationId
    } = params;
    const userId = user.id
    validateNotificationOwner(notificationId, userId).then(() => {   
    Notification
      .destory({
        where: {
          id: notificationId
        }
      })
      .then(() => res.status(200).json({
        success: true,
        message: 'notification deleted successfully',
      }))
      .catch(() => res.status(500).json({
        success: false,
        message: 'Error Deleting notification'
      }))
})
    return this;
  }
  getUnreadNotifications({
    user
  }, res) {
    const userId = user.id;
    Notification
      .findAll({
        attributes:['id', 'title','message','createdAt'],
        where: {
          userId,
          notificationState: 'unseen'
        }
      }).then((unreadNotifications) => {
        Notification.count({
          where: {
            userId
          }
        }).then((allNotificationsCount) =>{
       if (unreadNotifications) {
          res.status(200).json({
            success: true,
            message: 'unread notification found',
            unreadNotifications,
            allNotificationsCount
          })
        }
        return res.status(200).json({
          success: true,
          message: 'You currently do not have any unread notifications',
          unreadNotifications: [],
          allNotificationsCount
        });
        })
      }).catch(( /* error */ ) => res.status(500).json({
        success: false,
        message: 'Error fetching unread notification'
      }));
  }
}