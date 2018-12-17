import express from 'express';
import User from '../../controllers/users';
import Businesses from '../../controllers/business';
import Auth from '../../middleware/auth';
import Favourites from '../../controllers/favourite';
const user = express.Router();
const newBusiness = new Businesses();
const newUser = new User();
const newAuth = new Auth();
const newFavourite = new Favourites();

user.post('/signup', newUser.signupUser);
user.post('/signin', newUser.signIn);

user.use('*', newAuth.verify);
user.get('/businesses', newBusiness.getUserBusiness);

user.route('/business/:businessId')
.post(newFavourite.addToFavourite)
.delete(newFavourite.removeFromFavourites)
.get(newFavourite.getFavBusinesses);


export default user;

