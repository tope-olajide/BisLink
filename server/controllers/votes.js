import {
  Upvote,
  Downvote,
  Business,
  User
} from '../models';


export default class Vote {
  upvoteBusiness({
    user,
    params
  }, res) {
    const userId = user.id;
    const {
      businessId
    } = params;
    Downvote
      .destroy({
        where: {
          $and: [{
              userId
            },
            {
              businessId
            }
          ]
        }
      }).then((response) => {
        if (response === 1) {
          Business
            .findOne({
              where: {
                id: businessId
              }
            }).then((businessModel) => {
              businessModel.decrement('downvotes');
            });
        }
      })
      .catch((error) => res.status(500).json({
        success: false,
        message: 'An error occured',
        error
      }))
    Upvote
      .findOrCreate({
        where: {
          userId,
          businessId
        }
      })
      .spread((createdVote, created) => {
        if (created) {
          Business
            .findOne({
              where: {
                id: businessId
              }
            }).then((businessModel) => {
              businessModel.increment('upvotes')
                .then(businessModel => businessModel.reload())
                .then((business) => {
                  const {
                    businessName,
                    userId,
                    upvotes,
                    downvotes
                  } = business;
                  const notificationAlert = {
                    title:`One of your business has been upvoted `,
                    message: `One of your business named: ${businessName} has been upvoted by ${user.id} `
                  }
                  Notification
                  .create({
                    userId,
                    title:notificationAlert.title,
                    message:notificationAlert.message,
                  })
                  return res.status(201).json({
                    success: true,
                    message: `Business with id: ${businessId} Upvoted!`,
                    business: {
                      upvotes,
                      downvotes
                    }
                  });
                });
            });
        } else {
          return res.status(409).json({
            success: false,
            message: 'Business already Upvoted!'
          });
        }
      })
      .catch((error) => res.status(500).json({
        success: false,
        message: 'An error occured',
        error
      }));

    return this;
  }
  downvoteBusiness({
    user,
    params
  }, res) {
    const userId = user.id;
    const {
      businessId
    } = params;

    Upvote
      .destroy({
        where: {
          $and: [{
              userId
            },
            {
              businessId
            }
          ]
        }
      })
      .then((response) => {
        if (response === 1) {
          Business
            .findOne({
              where: {
                id: businessId
              }
            }).then((businessModel) => {
              businessModel.decrement('upvotes');
            });
        }
      })
      .catch((error) => res.status(500).json({
        success: false,
        message: 'An error occured',
        error
      }));

    Downvote
      .findOrCreate({
        where: {
          userId,
          businessId
        }
      })
      .spread((createdVote, created) => {
        if (created) {
          Business
            .findOne({
              where: {
                id: businessId
              }
            }).then((businessModel) => {
              businessModel.increment('downvotes')
                .then(businessModel => businessModel.reload())
                .then((business) => {
                  const {
                    businessName,
                    userId,
                    upvotes,
                    downvotes
                  } = business;
                  const notificationAlert = {
                    title:`One of your businesses has been Downvoted `,
                    message: `One of your businesses named: ${businessName} has been Downvoted by ${user.id} `
                  }
                  Notification
                  .create({ 
                    userId,
                    title:notificationAlert.title,
                    message:notificationAlert.message,
                  })
                  return res.status(201).json({
                    success: true,
                    message: `Business with id: ${businessId} Downvoted!`,
                    business: {
                      upvotes,
                      downvotes
                    }
                  });
                });
            });
        } else {
          return res.status(409).json({
            success: false,
            message: 'Business already Downvoted!'
          });
        }
      })
      .catch((error) => res.status(500).json({
        success: false,
        message: 'An error occured',
        error
      }));

    return this;
  }
  getBusinessUpvotes({
    params
  }, res) {
    const {
      businessId
    } = params;

    Upvote
      .findAll({
        attributes: ['businessId'],
        where: {
          businessId
        },
        include: [{
          model: User,
          attributes: ['fullname', 'id']
        }]
      })
      .then((votes) => {
        if (votes.length === 0) {
          return res.status(404).json({
            success: true,
            message: 'Nothing found!',
            votes: []
          });
        }
        return res.status(200).json({
          success: true,
          message: 'User upvotes found',
          votes
        });
      })
      .catch((error) => res.status(500).json({
        success: false,
        message: 'Error fetching upvotes',
        error
      }));

    return this;
  }
  getBusinessDownvotes({
    params
  }, res) {
    const {
      businessId
    } = params;

    Downvote
      .findAll({
        attributes: ['businessId'],
        where: {
          businessId
        },
        include: [{
          model: User,
          attributes: ['fullname', 'id']
        }]
      })
      .then((votes) => {
        if (votes.length === 0) {
          return res.status(404).json({
            success: true,
            message: 'Nothing found!',
            votes: []
          });
        }

        return res.status(200).json({
          success: true,
          message: 'User donwvotes found',
          votes
        });
      })
      .catch(( /* error */ ) => res.status(500).json({
        success: false,
        message: 'Error fetching downvotes'
      }));

    return this;
  }










}