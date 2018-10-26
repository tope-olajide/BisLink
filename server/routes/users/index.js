import express from 'express';
import User from '../../controllers/users';

const user = express.Router();

const newUser = new User();

user.post('/signup', newUser.signupUser);
user.post('/signin', newUser.signIn);




export default user;
