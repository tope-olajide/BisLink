/* eslint-disable require-jsdoc */
import jsonwebtoken from 'jsonwebtoken';
import {
  validateUser,
  validateModifiedUser
} from '../middleware/validator';
import {
  User,
  Notification,
  Business,
  Favourite,
  Follower
} from '../models';
import Encryption from '../middleware/encryption';

const newEncryption = new Encryption();

const verifyUserNameAndEmail = (username, email) => {
  const promise = new Promise((resolve, reject) => {
    User
      .findOne({
        attributes: ['email', 'username'],
        where: {
          $or: [{
            username: {
              $iLike: username
            }
          }, {
            email: {
              $iLike: email
            }
          }]
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

export default class Users {
  signupUser(req, res) {
    const {
      fullname,
      username,
      password,
      email
    } = req.body;

    const signUpError = validateUser({
      fullname,
      username,
      password,
      email
    });
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
          const notificationAlert = {
            title: `Welcome ${result.fullname}`,
            message: 'You are welcome to my Bislink web app.'
          };
          Notification
            .create({
              userId: result.id,
              title: notificationAlert.title,
              message: notificationAlert.message,
            });
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

  signIn(req, res) {
    const authName = req.body.usernameOrEmail;
    User
      .findOne({
        attributes: ['id', 'fullname', 'username', 'email', 'password'],
        where: {
          $or: [{
            username: {
              $iLike: authName
            }
          }, {
            email: {
              $iLike: authName
            }
          }]
        }
      })
      .then((userFound) => {
        if (!userFound) {
          return res.status(401).json({
            success: false,
            message: 'Invalid login Details!'
          });
        }

        if (newEncryption.verifyHash(req.body.password, userFound.password)) {
          const {
            id,
            username
          } = userFound;
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
          message: 'Invalid login Details!'
        });
      })
      .catch((/* error */) => res.status(500).json({
        success: false,
        message: 'An error occured'
      }));

    return this;
  }

  modifyUser({
    body,
    user
  }, res) {
    const userId = user.id;
    const username = user.username;
    const {
      fullname,
      email,
      phoneNumber,
      location,
      about,
      ImageUrl,
      ImageId
    } = body;
    const validateUserDetails = validateModifiedUser({
      fullname,
      email
    });
    if (validateUserDetails) {
      return res.status(400).json({
        success: false,
        message: validateUserDetails
      });
    }
    User.findOne({
      where: {
        id: userId
      },
    })
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }

        /*         if (imageId !== foundUser.imageId) {
          cloudinary.destroy(foundUser.imageId, () => {});
        } */
        User.findOne({
          where: {
            email
          },
        }).then((userFound) => {
          if (userFound) {
            if (userFound.id !== userId) {
              return res.status(409).json({
                success: false,
                message: 'Email already taken'
              });
            }
          }
          foundUser.updateAttributes({
            fullname,
            email,
            phoneNumber,
            location,
            about,
            ImageUrl,
            ImageId
          })
            .then((updatedUser) => {
              const {
                id
              } = updatedUser;
              const token = jsonwebtoken.sign({
                id,
                username,
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
              }, 'process.env.JWT_SECRET');

              return res.status(200).json({
                success: true,
                message: 'User record updated',
                user: {
                  fullname,
                  email,
                  phoneNumber,
                  location,
                  about,
                  imageUrl: updatedUser.imageUrl,
                  token
                }
              });
            });
        });
      }).catch((/* error */) => res.status(500).json({
        success: false,
        message: "Error Updating user's profile"
      }));
    return this;
  }

  changePassword({
    body,
    user
  }, res) {
    const id = user.id;
    const {
      oldPassword,
      newPassword
    } = body;


    if (newPassword.trim().length === 0 || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters!'
      });
    }

    const password = newEncryption.generateHash(newPassword);
    User
      .findOne({
        attributes: ['id', 'password'],
        where: {
          id
        }
      })
      .then((userFound) => {
        if (!userFound) {
          return res.status(404).json({
            success: false,
            message: 'User does not exist!'
          });
        }

        if (!newEncryption.verifyHash(oldPassword, userFound.password)) {
          return res.status(401).json({
            success: false,
            message: 'Incorrect Password'
          });
        }

        userFound.updateAttributes({
          password
        }).then(() => res.status(200).json({
          success: true,
          message: 'Password Changed Successfully'
        }));
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'An error occured'
      }));

    return this;
  }
  // eslint-disable-next-line class-methods-use-this
  getUser({
    user
  }, res) {
    const userId = user.id;
    User.findOne({
      attributes: ['id', 'fullname', 'about', 'location', 'phoneNumber', 'username', 'email', 'ImageUrl'],
      where: {
        id: userId
      }
    })
      .then((userFound) => {
        if (!userFound) {
          return res.status(404).json({
            success: false,
            message: 'User not found!'
          });
        }
        const {
          id,
          fullname,
          about,
          location,
          username,
          email,
          ImageUrl,
          phoneNumber
        } = userFound;

        const userInfo = {
          userId: id,
          fullname,
          about,
          location,
          username,
          email,
          ImageUrl,
          phoneNumber,
          myBusinesses: '',
          myBusinessCount: '',
          myFavourites: '',
          myFollowers: '',
          myFollowersCount: '',
          myFollowees: '',
          myFolloweesCount: ''
        };
        Business.findAndCountAll({
          where: {
            userId
          }
        }).then((businesses) => {
          userInfo.myBusinesses = businesses.rows;
          userInfo.myBusinessCount = businesses.count;
          Favourite.findAll({
            where: {
              userId
            },
          })
            .then((favourites) => {
              const favouriteBusinessIds = favourites.map(favourite => favourite.businessId);
              Business.findAll({
                where: { id: favouriteBusinessIds },
              }).then((favouriteBusinesses) => {
                userInfo.myFavourites = favouriteBusinesses;

                Follower.findAndCountAll({
                  where: {
                    followerId: userId
                  },
                }).then((followers) => {
                  userInfo.myFollowers = followers.rows;
                  userInfo.myFollowersCount = followers.count;
                  Follower.findAndCountAll({
                    where: {
                      userId
                    }
                  }).then((followees) => {
                    userInfo.myFollowees = followees.rows;
                    userInfo.myFolloweesCount = followees.count;
                    return res.status(200).json({
                      success: true,
                      message: 'User found!',
                      user: userInfo
                    });
                  });
                });
              });
            });
        }).catch((/* error */) => res.status(500).json({
          success: false,
          message: "Error fetching user's profile"
        }));
      }).catch((/* error */) => res.status(500).json({
        success: false,
        message: 'Error fetching user'
      }));
  }
}
