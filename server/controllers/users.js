import { validateUser, validateEmail } from '../middleware/validator';
import { User } from '../models';

const verifyUserNameOrEmail = (username, email) => {
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
          if (userFound.username.toUpperCase === username.toUpperCase) {
            field = 'Username';
          } else if (userFound.email === email) {
            field = 'Email';
          }
          reject(`${field} already taken!`);
        }

        resolve();
      })
      .catch(() => {
        reject('An error occured!');
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
    verifyUserNameOrEmail(username, email).then(() => {
      User
        .create({
          name: fullname,
          username,
          email,
          password,
        })
        .then(result => res.status(201).json({
          success: true,
          message: 'New user created',
          user: result
        })).catch(() => res.status(500).json({
          success: false,
          message: 'Error Creating user'
        }));
    }).catch(error =>
      res.status(409).json({
        success: false,
        message: error
      }));
    return this;
  }
}
