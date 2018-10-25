import { Business } from '../models';

/**
 * @description - Validate the username if taken
 *
 * @param {object} User - User model
 *
 * @param {string} username - User name
 *
 * @param {number} userId - User ID
 *
 * @returns {Promise} promise - Request status
 */
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

/**
 * @description - Validate if user has the right to manage recipe
 *
 * @param {string} recipeId - Recipe ID
 *
 * @param {string} userId - User ID
 *
 * @returns {Promise} promise - Status of request
 */
export const validateUserRight = (businessId, userId) => { 
// validateUserRight issa function that takes in recipeId and userId as parameters
// it search for the recipeId in the recipe table, then compare the Id of the user that added it with the userId in the parameter
// if the id is the same, then it returns recipe and all its object( containing userId,procedure,methods etc)
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
        resolve(recipeFound);
      });
  });
  return promise;
};
