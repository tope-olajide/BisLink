import {
  Follower,
  Business,
  User,
  Notification
} from '../models';

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
        where: {
          userId
        }
      })
      .then((allNotifications) => {
        if (allNotifications.length < 1) {
          return res.status(404).json({
            success: true,
            message: 'No notifications found!',
            allNotifications: []
          });
        }
        return res.status(200).json({
          success: true,
          message: 'notifications found',
          allNotifications
        });
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
      .findOne({
        where: {
          id: userId,
          notificationState: 'unseen'
        }
      }).then((unreadNotifications) => {
        if (unreadNotifications) {
          res.status(200).json({
            success: true,
            message: 'unread notification found',
            unreadNotifications
          })
        }
        return res.status(404).json({
          success: true,
          message: 'You currently do not have any unread notifications',
          unreadNotification: []
        });
      }).catch(( /* error */ ) => res.status(500).json({
        success: false,
        message: 'Error fetching unread notification'
      }));
  }
}