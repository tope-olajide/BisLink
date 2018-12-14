import jsonwebtoken from 'jsonwebtoken';
import { validateUser } from '../middleware/validator';
import { User } from '../models';
import Encryption from '../middleware/encryption';

const newEncryption = new Encryption();

const verifyUserNameAndEmail = (username, email) => {
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
     fullname, username, password, email
    } = req.body;

    const signUpError = validateUser({fullname, username, password, email} );
    if (signUpError) {
      return res.status(400).json({
        success: false,
        message: signUpError
      });
    }
    verifyUserNameAndEmail(username, email).then(() => {
      User
        .create({
          fullname,
          username,
          email,
          password: newEncryption.generateHash(password)
        })
        .then((result) => {
          const token = jsonwebtoken.sign({
            id: result.id,
            username: result.username,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
          }, 'process.env.JWT_SECRET');
          return res.status(201).json({
            success: true,
            message: 'New user created/token generated!',
            token
          });
        })
        .catch(error => res.status(500).json({
          success: false,
          message: `Error creating user ${error.message}`
        }));
    }).catch(error =>
      res.status(409).json({
        success: false,
        message: error
      }));
    return this;
  }
    /**
   * @description - Sign In a user (Search for user)
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {object} this - Class instance
   *
   * @memberof Users
   */
  signIn(req, res) {
    const authName = req.body.usernameOrEmail;
    User
      .findOne({
        attributes: ['id', 'fullname', 'username', 'email', 'password'],
        where: {
          $or: [
            {
              username: {
                $iLike: authName
              }
            }, {
              email: {
                $iLike: authName
              }
            }
          ]
        }
      })
      .then((userFound) => {
        if (!userFound) {
          return res.status(401).json({
            success: false,
            message: 'user not found'
          });
        }

        if (newEncryption.verifyHash(req.body.password, userFound.password)) {
          const { id, username } = userFound;
          const token = jsonwebtoken.sign({
            id,
            username,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
          }, 'process.env.JWT_SECRET');

          return res.status(200).json({
            success: true,
            message: 'User Signed In/token generated!',
            token
          });
        }
        res.status(401).json({
          success: false,
          message: 'Invalid pasword!'
        });
      })
      .catch((/* error */) => res.status(500).json({
        success: false,
        message: 'An error occured'
      }));

    return this;
  }
}
