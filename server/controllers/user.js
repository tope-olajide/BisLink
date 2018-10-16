import { validateUser, validateEmail } from '../middleware/validator';
import User from '../models/user';
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
    return this;
  }
}
