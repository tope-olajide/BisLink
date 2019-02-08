import express from 'express';

import Business from '../../controllers/business';
import Auth from '../../middleware/auth';
import Reviews from '../../controllers/reviews';
import Votes from '../../controllers/votes';

const newVote = new Votes();
const newAuth = new Auth();
const newReview = new Reviews();
const user = express.Router();
const newBusiness = new Business();

user.use('*', newAuth.verify);

user.route('/')
  .post(newBusiness.createBusiness)
  .get(newBusiness.getAllBusinesses)

user.route('/search')
  .get(newBusiness.searchForBusinesses)

user.route('/:businessId')
  .put(newBusiness.modifyBusiness)
  .delete(newBusiness.deleteBusiness)
  .get(newBusiness.getBusinessDetails);

user.route('/:businessId/galleries')
.put(newBusiness.setDefaultBusinessImage)
.delete(newBusiness.deleteBusinessImage)
.get(newBusiness.fetchBusinessPictures)

user.route('/:businessId/upvotes')
  .post(newVote.upvoteBusiness)
  .get(newVote.getBusinessUpvotes);

user.route('/:businessId/downvotes')
  .post(newVote.downvoteBusiness)
  .get(newVote.getBusinessDownvotes);

user.route('/:businessId/reviews')
  .post(newReview.postReview)
  .get(newReview.getBusinessReviews);


  
  export default user;