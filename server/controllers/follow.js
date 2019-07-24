/* eslint-disable require-jsdoc */
import { Follower, Business, User, Notification } from '../models';

export default class Favourites {
  followUser({ user, params }, res) {
    const followerId = user.id;
    const followerUsername = user.username;
    const { userId } = params;

    const notificationAlert = {
      title: `${followerUsername} follows you`,
      message: `you are now being followed by ${followerUsername}`
    };
    Follower
      .findOrCreate({ where: { followerId, userId } })
      .spread((addedFollower, created) => {
        if (created) {
          Notification
            .create({
              userId,
              title: notificationAlert.title,
              message: notificationAlert.message,
            })
            .then(createdNotificatons => res.status(201).json({
              success: true,
              message: `you are now following ${userId}`,
              addedFollower,
              isFollowing: true,
              notification: createdNotificatons
            }))
            .catch(error => res.status(500).json({
              success: false,
              message: 'Error creating Notifications',
              error
            }));
        } else {
          return res.status(409).json({
            success: false,
            message: `You are already following ${userId}!`
          });
        }
      })
      .catch(error => res.status(500).json({
        success: false,
        message: 'Error following user',
        error
      }));

    return this;
  }

  unFollowUser({ params, user }, res) {
    const followerId = user.id;
    const followerUsername = user.username;
    const { userId } = params;
    const notificationAlert = {
      title: `${followerUsername} has unfollowed you`,
      message: `${followerUsername} has unfollowed you`
    };
    Follower
      .destroy({
        where: {
          $and: [
            { followerId },
            { userId }
          ]
        },
      })
      .then((status) => {
        if (status === 1) {
          Notification
            .create({
              userId,
              title: notificationAlert.title,
              message: notificationAlert.message,
            })

            .catch(() => res.status(500).json({
              success: false,
              message: 'Error creating Notifications',
              error
            }));

          res.status(200).json({
            success: true,
            message: `you have unfollowed ${userId}`,
            isFollowing: false
          });
        } else {
          res.status(409).json({
            success: false,
            message: `you are not followed by ${userId}`,
            isFollowing: false
          });
        }
      })
      .catch(error => res.status(500).json({
        success: false,
        message: 'Error unfollowing user',
        error
      }));
    return this;
  }

  fetchAllFollowers({ user }, res) {
    const userId = user.id;
    Follower
      .findAll({
        where: { userId },
        attributes: ['userId']
      })
      .then((followers) => {
        if (followers.length < 1) {
          return res.status(404).json({
            success: false,
            message: 'Nothing found!',
            followers: []
          });
        }
        const ids = followers.map(follower => follower.userId);

        User.findAll({ attributes: ['fullname'],
          where: { id: ids }

        }).then(userFollowers => res.status(200).json({
          success: true,
          message: 'Followers found',
          userFollowers
        }));
      })
      .catch((/* error */) => res.status(500).json({
        success: false,
        message: 'Error fetching Followers'
      }));

    return this;
  }

  fetchAllFollowees({ user }, res) {
    const userId = user.id;

    Follower
      .findAll({
        where: { followerId: userId },
        attributes: ['userId']
      })
      .then((followees) => {
        if (followees.length === 0) {
          return res.status(404).json({
            success: false,
            message: 'Nothing found!',
            followees: []
          });
        }

        const ids = followees.map(followee => followee.userId);
        Business.findAll({
          where: { id: ids },
          include: [
            { model: User, attributes: ['fullname'] }
          ]
        }).then(followee => res.status(200).json({
          success: true,
          message: 'followees found',
          followees: followees
        }));
      })
      .catch((/* error */) => res.status(500).json({
        success: false,
        message: 'Error fetching followees'
      }));

    return this;
  }
}
