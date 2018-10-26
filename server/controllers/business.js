import { Business, User, Favorite } from '../models';
import { validateBusiness } from '../middleware/validator';
import cloudinary, { uploadWithMulter } from '../services/uploadImage';
import { validateUserRight } from '../middleware/userValidation';
/**
 *
 * @param {Number} userId - User's ID
 *
 * @param {string} businessName - Business businessName
 *
 * @returns {Promise} isPicked - Status of request
 */
const isNamePicked = (userId, businessName) => {
  const promise = new Promise((resolve) => {
    Business 
      .findOne({
        where: {
          userId,
          businessName: { $iLike: businessName }
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
/**
 * @tagline - Class Definition for the Business Object
 *
 * @export
 *
 * @class Businesses
 */
export default class Businesses {
  /**
   * @tagline - Creates a new business record
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {object} this - Class instance
   *
   * @memberof Business
   */
  createBusiness(req, res) {
    /**
     * @tagline - Adds new business
     *
     * @param {object} Business - Business details
     *
     * @return {void} Nothing
     */
    const addBusiness = ({
      businessName,
      tagline,
      businessAddress1,
      businessAddress2,
      phoneNumber1,
      phoneNumber2,
      website,
      category,
      businessDescription,
      imageUrl,
      userId,
      res,
      imageId
    }) => {
      isNamePicked(userId, businessName)
        .then((isPicked) => {
          if (isPicked) {
            return res.status(409).json({
              success: false,
              message: 'Business Name already picked!'
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
              imageUrl,
              userId,
              imageId
            })
            .then((business) => {
              res.status(201).json({
                success: true,
                message: 'New Business created',
                business
              });
            })
            .catch(() => res.status(500).json({
              success: false,
              message: 'Error creating business'
            }));
        });
    };
    uploadWithMulter(req, res).then(({ file, body, user }) => { 
      let imageUrl = '';
      const businessName = body.businessName;
      const tagline = body.tagline;
      const businessAddress1 = body.businessAddress1;
      const businessAddress2 = body.businessAddress2;
      const phoneNumber1 = body.phoneNumber1;
      const phoneNumber2 = body.phoneNumber2;
      const website = body.website;
      const category = body.category;
      const businessDescription = body.businessDescription;
      const userId = user.id;

      const validateBusinessError =
        validateBusiness({ businessName, businessAddress1, businessDescription });

      if (validateBusinessError) { 
        return res.status(400).json({
          success: false,
          message: validateBusinessError
        });
      }

      if (file) {
        cloudinary.upload_stream(({ error, secure_url, public_id }) => { 
          if (!error) {
            imageUrl = secure_url; //eslint-disable-line
            addBusiness({
              businessName,
              tagline,
              businessAddress1,
              businessAddress2,
              phoneNumber1,
              phoneNumber2,
              website,
              category,
              businessDescription,
              imageUrl,
              userId,
              res,
              imageId: public_id
            });
          } else {
            res.status(503).json({
              success: false,
              message: 'Error uploading image, check your network connection'
            });
          }
        }).end(file.buffer);
      } else {
        addBusiness({
          businessName,
          tagline,
          businessAddress1,
          businessAddress2,
          phoneNumber1,
          phoneNumber2,
          website,
          category,
          businessDescription,
          imageUrl,
          userId,
          res,
          imageId: ''
        });
      }
    }).catch(({ message }) => {
      res.status(400).json({
        success: false,
        message
      });
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
  modifyBusiness(req, res) {
    /**
     * @description - Updates data in the database
     *
     * @param {object} businessData - Business details
     *
     * @returns {void} Nothing
     */
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
      imageUrl,
      imageId,
      res,
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
        imageUrl,
        imageId
      })
        .then(business =>
          res.status(200).json({
            success: true,
            message: 'Business record updated successfully',
            business
          })
        )
        .catch((/* error */) => res.status(500).json({
          success: false,
          message: 'Error updating business'
        }));
    };

    /**
    * @description - Check if business name is already picked
    *
    * @param {Number} userId - User's ID
    *
    * @param {string} businessName - Business name
    *
    * @returns {Promise} isPicked - Status of request
    */
    const verifyNameChange = ({
      businessName,
      tagline,
      businessAddress1,
      businessAddress2,
      phoneNumber1,
      phoneNumber2,
      website,
      category,
      businessDescription,
      imageUrl,
      imageId,
      res,
      foundBusiness
    }) => {
      if (foundBusiness.name.toLowerCase() === name.toLowerCase()) {
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
          imageUrl,
          imageId,
          res,
          foundBusiness
        });
      } else {
        isNamePicked(foundBusiness.userId, name)
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
              imageUrl,
              imageId,
              res,
              foundBusiness
            });
          });
      }
    };

    uploadWithMulter(req, res).then(({ file, body, user, params }) => { 
      const { businessId } = params || 0;
      const userId = user.id;
      const businessName = body.businessName;
      const tagline = body.tagline;
      const businessAddress1 = body.businessAddress1;
      const businessAddress2 = body.businessAddress2;
      const phoneNumber1 = body.phoneNumber1;
      const phoneNumber2 = body.phoneNumber2;
      const website = body.website;
      const category = body.category;
      const businessDescription = body.businessDescription;
      

      const validateBusinessError =
        validateBusiness({ businessName, businessAddress1, businessDescription });
      if (validateBusinessError) { 
        return res.status(400).json({
          success: false,
          message: validateBusinessError
        });
      }

      validateUserRight(businessId, userId).then((foundBusiness) => {
        if (file) {
          cloudinary.upload_stream(({ error, secure_url, public_id }) => {
            if (!error) {
              cloudinary.destroy(foundBusiness.imageId, () => {
              });
              verifyNameChange({
                businessName,
                tagline,
                businessAddress1,
                businessAddress2,
                phoneNumber1,
                phoneNumber2,
                website,
                category,
                businessDescription,
                imageId: public_id,
                imageUrl: secure_url,
                res,
                foundBusiness
              });
            } else {
              res.status(503).json({
                success: false,
                message: 'Error uploading image, check your network connection'
              });
            }
          }).end(file.buffer);
        } else {
          const { imageUrl, imageId } = foundBusiness;
          verifyNameChange({
            businessName,
            tagline,
            businessAddress1,
            businessAddress2,
            phoneNumber1,
            phoneNumber2,
            website,
            category,
            businessDescription,
            imageUrl,
            imageId,
            res,
            foundBusiness
          });
        }
      })
        .catch(({ status, message }) => {
          res.status(status).json({
            success: false,
            message
          });
        });
    })
      .catch(({ message }) => {
        res.status(400).json({
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
  deleteBusiness({ params, user }, res) {
    const { businessId } = params;
    validateUserRight(businessId, user.id).then(() => {
      Business.findOne({
        where: {
          id: businessId
        }
      })
        .then((business) => {
          business.destroy()
            .then(() => {
              cloudinary.destroy(business.imageId);

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
    }).catch(({ status, message }) => {
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
  getUserBusiness({ user }, res) {
    const userId = user.id;

    Business
      .findAll({
        where: { userId },
        include: [
          { model: User, attributes: ['name', 'updatedAt'] }
        ]
      })
      .then((business) => {
        if (!business) {
          return res.status(404).json({
            success: true,
            message: 'No Business found',
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
}