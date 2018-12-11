import express from 'express';
import User from '../../controllers/users';

const user = express.Router();

const newUser = new User();

user.post('/signup', newUser.signupUser);
user.post('/signin', newUser.signIn);


/* user.route('/business/:businessId')
.post(newFavourite.addToFavourites)
.delete(newFavorite.removeFromFavorites);
 */
export default user;
