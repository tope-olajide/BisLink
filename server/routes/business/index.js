import express from 'express';

import Business from '../../controllers/business';
import Auth from '../../middleware/auth';

const newAuth = new Auth();
const user = express.Router();
const newBusiness = new Business();

user.use('*', newAuth.verify);

user.route('/')
  .post(newBusiness.createBusiness);
user.route('/:recipeId')
  .put(newBusiness.modifyBusiness);

