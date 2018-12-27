import {
  Business,
  User
} from '../models';
import {
  validateBusiness
} from '../middleware/validator';
/* import cloudinary, { uploadWithMulter } from '../services/uploadImage'; */
import {
  validateUserRight
} from '../middleware/userValidation';

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
      businessAddress2,
      phoneNumber1,
      phoneNumber2,
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
            businessAddress2,
            phoneNumber1,
            phoneNumber2,
            website,
            category,
            businessDescription,
            businessImageUrl,
            businessImageId,
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
      businessName,
      tagline,
      businessAddress1,
      businessAddress2,
      phoneNumber1,
      phoneNumber2,
      website,
      category,
      businessDescription,
      businessImageUrl,
      businessImageId,
      foundBusiness
    }) => {
      foundBusiness.updateAttributes({
          businessName,
          tagline,
          businessAddress1,
          businessAddress2,
          phoneNumber1,
          phoneNumber2,
          website,
          category,
          businessDescription,
          businessImageUrl,
          businessImageId
        })
        .then((business) =>{
          Favourite
          .findAll({
            where: { businessId: business.Id },
            attributes: ['userId']
          }).then ((userIds)=>  {
            const notificationAlert = {
              title:`${user.username} has modified one of your favourite business`,
              message: `one of your favourite business named: ${business.businessName} has been modified by its owner`
            };   
const bizFavouriteUserIds = userIds.map((eachUser) => 
{
  return {
  receiverId: eachUser,
  title: notificationAlert.title,
  message: notificationAlert.message
}
});
Notification.bulkCreate(bizFavouriteUserIds)
          }).then((notifiedUsers) => {
          res.status(200).json({
            success: true,
            message: 'Business record updated successfully',
            business,
            notifiedUsers
          })
          })
        })
        .catch(( /* error */ ) => res.status(500).json({
          success: false,
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
      businessAddress2,
      phoneNumber1,
      phoneNumber2,
      website,
      category,
      businessDescription,
      businessImageUrl,
      businessImageId
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
          businessName,
          tagline,
          businessAddress1,
          businessAddress2,
          phoneNumber1,
          phoneNumber2,
          website,
          category,
          businessDescription,
          businessImageUrl,
          businessImageId,
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
              businessName,
              tagline,
              businessAddress1,
              businessAddress2,
              phoneNumber1,
              phoneNumber2,
              website,
              category,
              businessDescription,
              businessImageUrl,
              businessImageId,
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
  getUserBusiness({user,}, res) {
    const userId = user.id;
     Business
      .findAll({
        where: {
          userId
        },
        include: [{
          model: User,
          attributes: ['fullname', 'username','updatedAt']
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
    Business
    .findAll({
      include: [
        { model: User, attributes: ['fullname'] }
      ]
    })
    .then((businesses) => {
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
        businesses
      });
    })
    .catch((error) => res.status(500).json({
      success: false,
      message: 'Error fetching all businesses',
      error
    }));

  return this;
  }
  getBusiness({ params }, res) {
    const { businessId } = params;

    Business
      .findOne({
        where: { id: businessId },
        include: [
          { model: User, attributes: ['fullname'] }
        ]
      })
      .then(businessFound => businessFound.increment('viewCount'))
      .then(business => res.status(200).json({
        success: true,
        message: 'business found',
        business
      }))
      .catch((/* error */) => res.status(500).json({
        success: false,
        message: 'Error fetching business'
      }));

    return this;
  }

}