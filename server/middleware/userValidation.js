import { Business, Notification } from '../models';


export const validateUserRight = (businessId, userId) => { 
  const promise = new Promise((resolve, reject) => {
    Business
      .findById(businessId)
      .then((businessFound) => {
        if (!businessFound) {
          reject({
            status: 404,
            message: 'Business does not exist!'
          });
        }
        if (Number(businessFound.userId) !== Number(userId)) {
          reject({
            status: 401,
            message: 'You cannot modify a business not created by You!'
          });
        }
        resolve(businessFound);
      });
  });
  return promise;
};

export const validateNotificationOwner = (notificationId, userId) => { 
  const promise = new Promise((resolve, reject) => {
    Notification
      .findById(notificationId)
      .then((notification) => {
        if (Number(notification.userId) !== Number(userId)) {
          reject({
            status: 401,
            message: 'You cannot view or delete a notification that is not yours'
          });
        }
        resolve(notification);
      });
  });
  return promise;
};
