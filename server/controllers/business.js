import {
  Business,
  User,
  Follower,Upvote,Downvote, Favourite,Notification
} from '../models';
import {
  validateBusiness
} from '../middleware/validator';
/* import cloudinary, { uploadWithMulter } from '../services/uploadImage'; */
import {
  validateUserRight
} from '../middleware/userValidation';
import searchBusiness from './searchBusiness'
const isNamePicked = (userId, businessName) => {
  const promise = new Promise((resolve) => {
    Business
      .findOne({
        where: {
          userId,
          businessName: {
            $iLike: businessName
          }
        }
      })
      .then((business) => {
        if (business) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => {
        resolve(false);
      });
  });
  return promise;
};


export default class Businesses {
  createBusiness({
    user,
    body
  }, res) {
    const userId = user.id;
    const {
      businessName,
      tagline,
      businessAddress1,
      phoneNumber1,
      website,
      category,
      businessDescription,
      businessImageUrl,
      businessImageId
    } = body

    isNamePicked(userId, businessName)
      .then((isPicked) => {
        if (isPicked) {
          return res.status(409).json({
            success: false,
            message: 'This business exist already'
          });
        }
     const parsedbusinessImageUrl = JSON.parse(businessImageUrl)
        const validateBusinessError =
          validateBusiness({
            businessName,
            businessAddress1,
            businessDescription
          });
        if (validateBusinessError) {
          return res.status(400).json({
            success: false,
            message: validateBusinessError
          });
        }
        Business
          .create({
            businessName,
            tagline,
            businessAddress1,
            phoneNumber1,
            website,
            category,
            businessDescription,
            businessImageUrl,
            businessImageId:parsedbusinessImageUrl[0],
            userId,
          })
          .then((business) => {
            res.status(201).json({
              success: true,
              message: 'New Business created',
              business,
              userId
            });
          })
          .catch((error) => res.status(500).json({
            success: false,
            message: 'Error creating business',
            error
          }));

      });
    return this;
  }
  /**
   * @description - Modify a business record
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {object} this - Class instance
   *
   * @memberof Businesses
   */
  modifyBusiness({
    params,
    user,
    body
  }, res) {
    const updateBusiness = ({
      businessId,
      businessName,
      tagline,
      businessAddress1,
      phoneNumber1,
      website,
      category,
      businessDescription,
      businessImageUrl,
      foundBusiness
    }) => {
      if(businessImageUrl){
          const uploadedImage = JSON.parse(businessImageUrl)
          const oldImageGallery = JSON.parse(foundBusiness.businessImageUrl)
          const newImageGallery = [...oldImageGallery, uploadedImage]
          const updatedImageGallery = JSON.stringify(newImageGallery)
          if(!foundBusiness.businessImageId){
            foundBusiness.updateAttributes({
              businessImageUrl:updatedImageGallery,
              businessImageId:uploadedImage[0]
            })
            .catch(() => res.status(500).json({
              success: false,
              message: 'unable to save business images'
            }));
          }else{
            foundBusiness.updateAttributes({
              businessImageUrl:updatedImageGallery
            })
            .catch(() => res.status(500).json({
              success: false,
              message: 'unable to save business images'
            }));           
          }           


      }

      foundBusiness.updateAttributes({
          businessName,
          tagline,
          businessAddress1,
          phoneNumber1,
          website,
          category,
          businessDescription,
        })
        .then((business) => {
          Favourite
            .findAll({
              where: {
                businessId
              },
              attributes: ['userId']
            }).then((userIds) => {
              const notificationAlert = {
                title: `${user.username} has modified your favourite business`,
                message: `one of your favourite businesses named: ${business.businessName} has been modified by its owner`
              };
              const bizFavouriteUserIds = userIds.map((eachUser) => {
                return {
                  receiverId: eachUser,
                  title: notificationAlert.title,
                  message: notificationAlert.message
                }
              });
              Notification.bulkCreate(bizFavouriteUserIds).then(() => {
                res.status(200).json({
                  success: true,
                  message: 'Business record updated successfully',
                  business,
                  userIds
                  
                })
              })
            })       

        })
                    .catch(( error  ) => res.status(500).json({
          success: false,
          error,
          message: 'Error updating business'
        }));

    };
    const userId = user.id;
    const {
      businessId
    } = params
    const {
      businessName,
      tagline,
      businessAddress1,
      phoneNumber1,
      website,
      category,
      businessDescription,
      businessImageUrl
    } = body

    validateUserRight(businessId, userId).then((foundBusiness) => {
      const validateBusinessError =
        validateBusiness({
          businessName,
          businessAddress1,
          businessDescription
        });
      if (validateBusinessError) {
        return res.status(400).json({
          success: false,
          message: validateBusinessError
        });
      }
      if (foundBusiness.businessName.toLowerCase() === businessName.toLowerCase()) {
        updateBusiness({
          businessId,
          businessName,
          tagline,
          businessAddress1,
          phoneNumber1,
          website,
          category,
          businessDescription,
          businessImageUrl,
          foundBusiness
        });
      } else {
        isNamePicked(foundBusiness.userId, businessName)
          .then((isPicked) => {
            if (isPicked) {
              return res.status(409).json({
                success: false,
                message: 'Business name already picked!'
              });
            }
            updateBusiness({
              businessId,
              businessName,
              tagline,
              businessAddress1,
              phoneNumber1,
              website,
              category,
              businessDescription,
              businessImageUrl,
              foundBusiness
            });
          });
      }
    }).catch(({
      status,
      message
    }) => {
      res.status(status).json({
        success: false,
        message
      });
    });
    return this;
  }

  /**
   * @description - Delete a Business record
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {object} this - Class instance
   *
   * @memberof Businesses
   */
  deleteBusiness({
    params,
    user
  }, res) {
    const {
      businessId
    } = params;
    validateUserRight(businessId, user.id).then(() => {
      Business.findOne({
          where: {
            id: businessId
          }
        })
        .then((business) => {
          business.destroy()
            .then(() => {
              /* cloudinary.destroy(business.imageId); */

              res.status(200).json({
                success: true,
                message: 'Business Deleted!'
              });
            });
        })
        .catch(() => {
          res.status(200).json({
            success: false,
            message: 'Error deleting business'
          });
        });
    }).catch(({
      status,
      message
    }) => {
      res.status(status).json({
        success: false,
        message
      });
    });
    return this;
  }
  /**
   * @description - Fetch a list user owned businesses
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {object} this - Class instance
   *
   * @memberof Businesses
   */
  getUserBusiness({
    user,
  }, res) {
    const userId = user.id;
    Business
      .findAll({
        where: {
          userId
        },
        include: [{
          model: User,
          attributes: ['fullname', 'username', 'updatedAt']
        }]
      })
      .then((business) => {
        if (business.length < 1) {
          return res.status(404).json({
            success: true,
            message: 'You currently do not have any business',
          });
        }

        return res.status(201).json({
          success: true,
          message: 'Operation Successful',
          business
        });
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Unable to get user business'
      }));

    return this;
  }
  getAllBusinesses(req, res) {
    const newSearchBusiness = new searchBusiness()

    const limit = Number(req.query.limit) || 9;
    const currentPage = Number(req.query.page) || 1;
    const offset = (currentPage - 1) * limit;

/*     if (req.query.sort === 'popular') {
      newSearchBusiness.sortByMostPopular(req, res);
    }
    else if (req.query.sort === 'recent') {
      newSearchBusiness.sortByMostRecent(req, res);
    }
    else if (req.query.name === 'undefined'){
      newSearchBusiness.searchAllLocation(req, res)
    }
    else if (req.query.location === 'undefined'){
      newSearchBusiness.searchBusinessName(req, res)
    }
/*   else if ((req.query.name !== 'undefined') || (req.query.location !== 'undefined')){
    newSearchBusiness.searchBusinessInLocation(req, res)
  } 
    else{ }*/
    Business
      .findAndCountAll({
        include: [{
          model: User,
          attributes: ['fullname']
        }],
        limit,
        offset
      })
      .then((businesses) => {
        /* const totalPages = Math.ceil(businesses.count / limit) */
        const totalPages = businesses.count
        if (businesses.length < 1) {
          return res.status(404).json({
            success: true,
            message: 'Nothing found!',
            businesses: []
          });
        }

        return res.status(200).json({
          success: true,
          message: 'business(es) found!',
          businesses:businesses.rows,
          totalPages
        });
      })
      .catch((error) => res.status(500).json({
        success: false,
        message: 'Error fetching all businesses',
        error
      }))

    return this;
  }
  getBusinessDetails({
    params,user
  }, res) {
    const userId = user.id;
    const {
      businessId
    } = params;
    const infoCount = {}
    Business
      .findOne({
        where: {
          id: businessId
        },
        include: [{
          model: User,
          attributes: ['id', 'username', 'location', 'ImageUrl', 'about']
        }]
      })
      .then(businessFound => businessFound.increment('viewCount'))
      .then((business) => {
        if(userId == business.User.id){
          infoCount.isBusinessOwner = true
        }
        else{
          infoCount.isBusinessOwner = false
        }
        Business.count({
          where: {
            userId: business.User.id
          }
        }).then((businessCount) => {
          infoCount.businessCount = businessCount
          Follower.count({
            where: {
              userId: business.User.id
            }
          }).then((followersCount) => {
            infoCount.followersCount = followersCount
            Follower.count({
              where: {
                followerId: business.User.id
              }
            }).then((followingCount) => {
              infoCount.followingCount = followingCount
              Favourite
              .findOne({
                where: { userId, businessId }
              }).then((favourites)=>{
                if (favourites){
                  infoCount.isUserFavourite = true
                }
                else {
                  infoCount.isUserFavourite = false;
                }
                Follower
                .findOne({
                  where: { userId:business.User.id, followerId:userId }
                }).then((isFollowing)=>{
                  if (isFollowing){
                    infoCount.isFollowing = true;
                  }
                  else{
                    infoCount.isFollowing = false;
                  }
                res.status(200).json({
                success: true,
                message: 'business found',
                business,
                infoCount
                })}) })
            })
          })
        })
      })
      .catch(( /* error */ ) => res.status(500).json({
        success: false,
        message: 'Error fetching business'
      }));

    return this;
  }
  fetchBusinessPictures ({ params, user }, res) {
    const { businessId } = params;
    validateUserRight(businessId, user.id).then((foundBusiness) => {
if(foundBusiness.businessImageUrl){
  const businessPictures = JSON.parse(foundBusiness.businessImageUrl)
  res.status(200).json({
    success: true,
    message: 'Business Pictures Found',
    businessPictures
  })
}
else{
  res.status(404).json({
    success: true,
    message: 'No Business Picture Found',
    businessPictures:[]
  })
}
    })
    .catch(({ status, message }) => {
    res.status(status).json({
      success: false,
      message
    });
  });
  }


  deleteBusinessImage({
    params,user
  }, res) {
    const {
      businessImageId
    } = params;
  const {
    businessId
  } = params;
  validateUserRight(businessId, user.id).then(() => {
    Business.findOne({
      where:{businessId}
    }).then ((businessFound)=> {
      const parsedImageArray = JSON.parse(businessFound.businessImageUrl)
      const newImageGallery = parsedImageArray.filter((image)=>image.imageId !== businessImageId);
      /* Cloudinary delete pictures online */
      const modifiedImageGallery = JSON.stringify(newImageGallery)
      businessFound.updateAttributes({
        businessImageUrl:modifiedImageGallery
      }).then(() => res.status(200).json({
        success: true,
        message: 'Password Changed Successfully',
        businessImageUrl: modifiedImageGallery
      }));
    }).catch(( ) => res.status(500).json({
      success: false,
      message: 'An error occured'
    }));
  }).catch(({ status, message }) => {
    res.status(status).json({
      success: false,
      message
    });
  });

  }
  setDefaultBusinessImage ({ params }, res) {
  const { businessImageUrl } = params;
  const { businessId } = params;
  Business.findOne({
    where:{businessId}
  }).then ((businessFound)=> {
    businessFound.updateAttributes({
      businessImageId:businessImageUrl
    }).then(() => res.status(200).json({
      success: true,
      message: 'default business image set successfully'
    }));
  }).catch(( ) => res.status(500).json({
    success: false,
    message: 'An error occured'
  }));
}

}