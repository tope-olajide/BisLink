import { Favourite, Business } from '../models';

/**
 * Class Definition for the Favourite Object
 *
 * @export
 * @class Favourite
 */
export default class Favourites {
  /**
   * Add a Business to user's favourite
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {object} Class instance
   * @memberof Favourite
   */
  addToFavourite({ user, params }, res) {
    const userId = user.id;
    const { businessId } = params;

    Favourite
      .findOrCreate({ where: { userId, businessId } })
      .spread((addedBusiness, created) => {
        if (created) {
          return res.status(201).json({
            success: true,
            message: `Business with id: ${businessId} added to favourites!`
          });
        }

        return res.status(409).json({
          success: false,
          message: `Business with id: ${businessId} Already added!`
        });
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Error Adding Business to Favourites'
      }));

    return this;
  }
}