import { Favourite, Business, User } from '../models';

export default class Favourites {

  addToFavourite({ user, params }, res) {
    const userId = user.id;
    const { businessId } = params;

    Favourite
      .findOrCreate({ where: { userId, businessId } })
      .spread((addedBusiness, created) => {
        if (created) {
          return res.status(201).json({
            success: true,
            message: `Business with id: ${businessId} added to favourites!`,
            addedBusiness
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

  removeFromFavourites({ params, user }, res) {
    const { businessId } = params;
    const userId = user.id;
    Favorite
      .destroy({
        where: {
          $and: [
            { userId },
            { businessId }
          ]
        },
      })
      .then((status) => {
        if (status === 1) {
          res.status(200).json({
            success: true,
            message: `Business with ID: ${businessId} Removed from Favourites`
          });
        }
      })
      .catch((/* error */) => res.status(500).json({
        success: false,
        message: 'Error removing business from favourites'
      }));
    return this;
  }
  getFavBusinesses({ user }, res) {
    const userId = user.id;

    Favorite
      .findAll({
        where: { userId },
        attributes: ['businessId']
      })
      .then((favorites) => {
        if (favorites.length === 0) {
          return res.status(404).json({
            success: true,
            message: 'Nothing found!',
            business: []
          });
        }

        const ids = favorites.map(business => business.businessId);
        Business.findAll({
          where: { id: ids },
          include: [
            { model: User, attributes: ['fullname'] }
          ]
        }).then(businesses => res.status(200).json({
          success: true,
          message: 'Favorite Businesses found',
          businesses
        }));
      })
      .catch((/* error */) => res.status(500).json({
        success: false,
        message: 'Error fetching favorite recipes'
      }));

    return this;
  }

}