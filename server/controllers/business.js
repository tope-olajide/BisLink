import { Business, User, Favorite } from '../models';
import { validateBusiness } from '../middleware/validator';
import cloudinary, { uploadWithMulter } from '../services/uploadImage';
/**
 * @tagline - Check if business businessName is already picked
 *
 * @param {Number} userId - User's ID
 *
 * @param {string} businessName - Recipe businessName
 *
 * @returns {Promise} isPicked - Status of request
 */
const isNamePicked = (userId, businessName) => {
  const promise = new Promise((resolve) => {
    Business // in the Business table, find the userId in the userId column and businessName in the businessName column
      .findOne({
        where: {
          userId,
          businessName: { $iLike: businessName }
        }
      })
      .then((business) => {
        if (business) { // if business, then the user has already add the business with that businessName before
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
              message: 'Recipe businessName already picked!'
            });
          }

          Business // create a business with the following attribute
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
                message: 'New Recipe created',
                business
              });
            })
            .catch(() => res.status(500).json({
              success: false,
              message: 'Error creating business'
            }));
        });
    };
   uploadWithMulter(req, res).then(({ file, body, user }) => { // req.file is the image file
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

      const validatBusinessError =
        validateBusiness({ businessName, businessAddress1, businessDescription });// validateRecipeDetails is a function that check for valid businessName, businessAddress1 and businessAddress2

      if (validatBusinessError) { // validateRecipeDetails should return an empty array if everything checked out right
        return res.status(400).json({
          success: false,
          message: validatBusinessError // return the error saved into the array
        });
      }

      if (file) {
        cloudinary.upload_stream(({ error, secure_url, public_id }) => { //  cloudinary.upload_stream is used to write to the uploader as a stream
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
}
