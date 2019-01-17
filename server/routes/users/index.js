import express from 'express';
import User from '../../controllers/users';
import Businesses from '../../controllers/business';
import Auth from '../../middleware/auth';
import Favourites from '../../controllers/favourite';
import Followers from '../../controllers/follower';
import Notifications from '../../controllers/notification'

const user = express.Router();
const newBusiness = new Businesses();
const newUser = new User();
const newAuth = new Auth();
const newFavourite = new Favourites();
const newFollower = new Followers()
const newNotification = new Notifications ()
user.post('/signup', newUser.signupUser);
user.post('/signin', newUser.signIn);




user.use('*', newAuth.verify);

user.put('/profile', newUser.modifyUser);
user.put('/change-password', newUser.changePassword);
user.get('/profile', newUser.getUser);
user.get('/businesses', newBusiness.getUserBusiness);

user.route('/business/favourite/:businessId')
.post(newFavourite.addToFavourite)
.delete(newFavourite.removeFromFavourites)
.get(newFavourite.getFavBusiness);

user.route('/followee')
.get(newFollower.fetchAllFollowees);

user.route('/follower')
.get(newFollower.fetchAllFollowers);

user.get('/favourite/:userId', newFavourite.getFavBusinesses);

user.route('/follow/:userId')
  .post(newFollower.followUser)
  .delete(newFollower.unFollowUser);
  
  user.route('/notifications/all')
  .get(newNotification.getAllNotifications);
  user.route('/notifications/:notificationId')
  .get(newNotification.viewNotification);

  user.route('/notifications')
   .get(newNotification.getUnreadNotifications);


  

  

export default user;

