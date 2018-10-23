import { validateBusiness } from '../middleware/validator';

/**
 * @description - Class Definition for the Business Object
 *
 * @export
 *
 * @class Business
 */
export default class Business {
  /**
   * @description - Creates a new business record
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
     * @description - Adds new business
     *
     * @param {object} businessData - Business details
     *
     * @return {void} Nothing
     */
    const { businessName,
      tagline,
      businessAddress1,
      businessAddress2,
      phoneNumber1,
      phoneNumber2,
      website,
      category,
      businessImageUrl,
      businessDescription } = req.body;
    const createBusinessError = validateBusiness(businessName, businessDescription);
    if (createBusinessError) {
      return res.status(400).json({
        success: false,
        message: createBusinessError
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
        businessImageUrl,
        businessDescription
      })
      .then((business) => {
        res.status(201).json({
          success: true,
          message: 'New Business created successfully',
          business
        });
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Error creating business'
      }));
    return this;
  }
}
