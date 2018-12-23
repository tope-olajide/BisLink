import {Review, Business, User } from '../models';
import { validateReview } from '../middleware/validator';

export default class Reviews {
    postReview({
        user,
        params,
        body
    }, res) {
        const userId = user.id;
        const {
            businessId
        } = params;
        const title = body.title;
        const content = body.content
        const validateReviewError = validateReview({
            title,
            content
        });
        if (validateReviewError) {
            return res.status(400).json({
                success: false,
                message: validateReviewError
            });
        }
        Review
            .create({
                title,
                content,
                userId,
                businessId
            })
            .then((createdReview) => {
              Business
              .findOne({
                where: { id: businessId }
              }).then((business) =>{         
    const notificationAlert = {
      receiverId:business.userId,
      title:`${user.username} has reviewed one of your businesses`,
      message: `${user.username} has added a review to one of your business titled: '${business.businessName}'`
    };
    Notification
              .create({
                userId:notificationAlert.receiverId,
                title:notificationAlert.title,
                message:notificationAlert.message,
              })
              })
                const {id, title, content, createdAt } = createdReview;
                const review = { id,title, content, createdAt }
                return res.status(201).json({
                    success: true,
                    message: 'New review created',
                    review,
                    reviewer: user.username
                  }).catch((error) => res.status(500).json({
                    success: false,
                    message: 'Error posting review',
                    error
                  }));
            })
    }
    getBusinessReviews({ params }, res) {
        const businessId = params.businessId;
        Review
          .findAll({
            where: { businessId },
            include: [
              { model: User, attributes: ['fullname'] }
            ],
            order: [
              ['id', 'DESC']
            ]
          })
          .then((reviews) => {
            if (reviews.length === 0) {
              return res.status(404).json({
                success: true,
                message: 'Nothing found!',
                reviews: []
              });
            }
            return res.status(200).json({
              success: true,
              message: 'Review(s) found',
              reviews
            });
          })
          .catch((error) => res.status(500).json({
            success: false,
            message: 'Error fetching reviews',
            error
          }));
    
        return this;
      }
}