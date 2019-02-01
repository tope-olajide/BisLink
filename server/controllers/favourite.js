import { Favourite, Business, User, Notification } from '../models';

export default class Favourites {

  addToFavourite({ user, params }, res) {
    const userId = user.id;
    const { businessId } = params;

    Favourite
      .findOrCreate({ where: { userId, businessId } })
      .spread((addedBusiness, created) => {
        if (created) {
          Business
          .findOne({
            where: { id: businessId }
          }).then((business) =>{         
const notificationAlert = {
  receiverId:business.userId,
  title:`${user.username} has added one of your business to his/her favourite`,
  message: `${user.username} has added your business named: ${business.businessName}  to his/her favourite business collection`
};
Notification
          .create({
            userId:notificationAlert.receiverId,
            title:notificationAlert.title,
            message:notificationAlert.message,
          })
          })
        
          return res.status(201).json({
            success: true,
            message: `Business with id: ${businessId} added to favourites!`,
            addedBusiness,
            isFavourite: true
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
    Favourite
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
            message: `Business with ID: ${businessId} Removed from Favourites`,
            isFavourite: false
          });
        }
      })
      .catch(( error) => res.status(500).json({
        success: false,
        message: 'Error removing business from favourites'
      }));
    return this;
  }

  getFavBusiness({ params, user: { id } }, res) {
    const { businessId } = params;
    const userId = id;

    Favourite
      .findOne({
        where: { userId, businessId },
        attributes: ['businessId']
      })
      .then((business) => {
        if (!business) {
          return res.status(404).json({
            success: true,
            message: 'Nothing found!',
            business: {}
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Favourite business found',
          business
        });
      })
      .catch((/* error */) => res.status(500).json({
        success: false,
        message: 'Error fetching Favourite business'
      }));

    return this;
  }

  getFavBusinesses({ user }, res) {
    const userId = user.id;

    Favourite
      .findAll({
        where: { userId },
        attributes: ['businessId']
      })
      .then((Favourites) => {
        if (Favourites.length === 0) {
          return res.status(404).json({
            success: true,
            message: 'Nothing found!',
            business: []
          });
        }

        const ids = Favourites.map(business => business.businessId);
        Business.findAll({
          where: { id: ids },
          include: [
            { model: User, attributes: ['fullname'] }
          ]
        }).then(businesses => res.status(200).json({
          success: true,
          message: 'Favourite Businesses found',
          businesses
        }));
      })
      .catch((/* error */) => res.status(500).json({
        success: false,
        message: 'Error fetching Favourite business'
      }));

    return this;
  }

}