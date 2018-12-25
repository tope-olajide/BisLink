import { Business, Notification } from '../models';

export const verifyUserNameAndEmail = (username, email) => {
  const promise = new Promise((resolve, reject) => {
    User
      .findOne({
        attributes: ['email', 'username'],
        where: {
          $or: [
            {
              username: {
                $iLike: username
              }
            }, {
              email: {
                $iLike: email
              }
            }
          ]
        }
      })
      .then((userFound) => {
        if (userFound) {
          let field;
          if (userFound.username.toUpperCase() === username.toUpperCase()) {
            field = 'Username';
          } else {
            field = 'Email';
          }

          reject(`${field} already taken!`);
        }

        resolve();
      });
  });
  return promise;
};



export const validateUserName = (User, username, userId) => {
  const promise = new Promise((resolve, reject) => {
    User
      .findOne({
        where: {
          username: {
            $iLike: (username)
          },
          id: {
            $ne: Number(userId)
          }
        },
        attributes: ['id']
      })
      .then((userFound) => {
        if (!userFound) {
          resolve();
        } else {
          reject({
            status: 409,
            message: 'Username already taken'
          });
        }
      });
  });
  return promise;
};


export const validateUserRight = (businessId, userId) => { 
  const promise = new Promise((resolve, reject) => {
    Business
      .findById(businessId)
      .then((businessFound) => {
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
            message: 'You cannot view or modify a notification that is not yours'
          });
        }
        resolve(notification);
      });
  });
  return promise;
};
