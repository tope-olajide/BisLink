/* eslint-disable class-methods-use-this */
/* eslint-disable require-jsdoc */
import {

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
        attributes: ['id', 'title', 'message', 'createdAt'],
        where: {
          userId
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })
      .then((allNotifications) => {
        Notification.count({
          where: {
            userId,
            notificationState: 'unseen'
          }
        }).then((newNotificationsCount) => {
          Notification.count({
            where: {
              userId,
              notificationState: 'seen'
            }
          }).then((readNotificationsCount) => {
            if (allNotifications.length === 0) {
              return res.status(404).json({
                success: true,
                message: 'No notifications found!',
                allNotifications: [],
                newNotificationsCount,
                readNotificationsCount
              });
            }
            return res.status(200).json({
              success: true,
              message: 'Notification(s) found',
              allNotifications,
              newNotificationsCount,
              readNotificationsCount,
              userId
            });
          });
        });
      })
      .catch((/* error */) => res.status(500).json({
        success: false,
        message: 'Error fetching notifications'
      }));
  }

  viewNotification({ params, user }, res) {
    const { notificationId } = params;
    const userId = user.id;
    Notification
      .findOne({
        where: {
          id: notificationId
        }
      });
    validateNotificationOwner(notificationId, userId).then((notificationFound) => {
      notificationFound.updateAttributes({
        notificationState: 'seen'
      }).then((notification) => {
        Notification.count({
          where: {
            userId,
            notificationState: 'seen'
          }
        }).then((readNotificationsCount) => {
          Notification.count({
            where: {
              userId,
              notificationState: 'unseen'
            }
          }).then((unreadNotificationsCount) => {
            Notification.count({
              where: {
                userId,
              }
            }).then((allNotificationsCount) => {
              res.status(200).json({
                success: true,
                message: 'Notification(s) found',
                notification: notification.message,
                readNotificationsCount,
                allNotificationsCount,
                unreadNotificationsCount
              });
            });
          });
        });
      })
        .catch((/* error */) => res.status(500).json({
          success: false,
          message: 'Error fetching notification'
        }));
    }).catch(({
      status,
      message
    }) => {
      res.status(status).json({
        success: false,
        message
      });
    });


    return this;
  }
  deleteNotification({ params, user }, res) {
    const {
      notificationId
    } = params;
    const userId = user.id;
    validateNotificationOwner(notificationId, userId).then(() => {
      Notification
        .destroy({
          where: {
            id: notificationId
          }
        })
        .then(() => res.status(200).json({
          success: true,
          message: 'notification deleted successfully',
        })).catch(() => res.status(500).json({
          success: false,
          message: 'Error Deleting notification'
        }));
    }).catch(({
      status,
      message
    }) => {
      res.status(status).json({
        success: false,
        message
      });
    });
    return this;
  }
  getUnreadNotifications({
    user
  }, res) {
    const userId = user.id;

    Notification
      .findAll({
        attributes: ['id', 'title', 'message', 'createdAt'],
        where: {
          userId,
          notificationState: 'unseen'
        },
        order: [
          ['createdAt', 'DESC']
        ]
      }).then((unreadNotifications) => {
        Notification.count({
          where: {
            userId
          }
        }).then((allNotificationsCount) => {
          Notification.count({
            where: {
              userId,
              notificationState: 'seen'
            }
          }).then((readNotificationsCount) => {
            if (unreadNotifications.length) {
              res.status(200).json({
                success: true,
                message: 'New notification(s) found',
                unreadNotifications,
                allNotificationsCount,
                readNotificationsCount
              });
            }
            return res.status(404).json({
              success: false,
              message: 'You currently do not have any unread notification(s)',
              unreadNotifications: [],
              allNotificationsCount,
              readNotificationsCount
            });
          });
        });
      }).catch((/* error */) => res.status(500).json({
        success: false,
        message: 'Error fetching unread notification'
      }));
  }
  getReadNotifications({
    user
  }, res) {
    const userId = user.id;

    Notification
      .findAll({
        attributes: ['id', 'title', 'message', 'createdAt'],
        where: {
          userId,
          notificationState: 'seen'
        }
      }).then((readNotifications) => {
        Notification.count({
          where: {
            userId
          }
        }).then((allNotificationsCount) => {
          Notification.count({
            where: {
              userId,
              notificationState: 'unseen'
            }
          }).then((unreadNotificationsCount) => {
            if (readNotifications.length) {
              res.status(200).json({
                success: true,
                message: 'read notification(s) found',
                readNotifications,
                allNotificationsCount,
                unreadNotificationsCount
              });
            }
            return res.status(404).json({
              success: true,
              message: 'No viewed notifications found',
              readNotifications: [],
              allNotificationsCount
            });
          })
          ;
        });
      }).catch((/* error */) => res.status(500).json({
        success: false,
        message: 'Error fetching unread notification'
      }));
  }
  markAllUnreadNotificationsAsRead({ user }, res) {
    const userId = user.id;
    Notification
      .findAll({
        where: {
          userId,
          notificationState: 'unseen'
        }
      }).then((unSeenNotifications) => {
        const markAsRead = unSeenNotifications.map(eachNotification => eachNotification.updateAttributes({
          notificationState: 'seen'
        }));
        return Promise.all(markAsRead);
      }).then(notification => res.status(200).json({
        success: true,
        message: 'All unread notifications marked as read',
        notification
      }))
      .catch(error => res.status(500).json({
        success: false,
        message: 'Error fetching notification',
        error
      }))
  }
}
