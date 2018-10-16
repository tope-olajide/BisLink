import { validateUser, validateEmail } from '../middleware/validator';
import User from '../models/user';

const verifyUserName = (username) => {
  const promise = new Promise((resolve, reject) => {
    User
      .findOne({ username })
      .then((userFound) => {
        if (userFound) {
          resolve(userFound);
        }
        reject(`${userFound} not found`);
      })
      .catch(() => {
        reject('Unable to verify username!');
      });
  });
  return promise;
};
const verifyEmail = (email) => {
  const promise = new Promise((resolve, reject) => {
    User
      .findOne({ email })
      .then((emailFound) => {
        if (emailFound) {
          resolve(emailFound);
        }
        reject(`${emailFound} not found`);
      })
      .catch(() => {
        reject('Unable to verify Email Address!');
      });
  });
  return promise;
};
/**
 * Class Definition for the User Object
 *
 * @export
 * @class User
 */
export default class Users {
  /**
   * Sign Up user (Create new user)
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {object} Class instance
   * @memberof User
   */
  signupUser(req, res) {
    const {
      email, username, fullname, password
    } = req.body;
    if (!email || !username || !fullname || !password) {
      return res.status(400).json({
        success: false,
        message: 'kindly fill all this fields: email, username, fullname, password to signup'
      });
    }
    if (!(validateEmail(email))) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email Address'
      });
    }
    const signUpError = validateUser(fullname, username, password);
    if (signUpError) {
      return res.status(400).json({
        success: false,
        message: signUpError
      });
    }
    verifyUserName(username)
      .then((userFound) => {
        if (userFound) {
          return res.status(400).json({
            success: false,
            message: `${username}has been taken`
          });
        }
      }).catch(error => res.status(400).json({
        success: false,
        message: error
      }));

    verifyEmail(email)
      .then((emailFound) => {
        if (emailFound) {
          return res.status(400).json({
            success: false,
            message: `${email}has been taken!`
          });
        }
      }).catch(error => res.status(400).json({
        success: false,
        message: error
      }));
    User
      .create({
        name,
        username,
        email,
        password,
      })
      .then((createdUser) => {
        res.status(201).json({
          success: true,
          message: 'New user created',
          user: createdUser
        });
      });

    return this;
  }
}
