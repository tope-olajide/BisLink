import { Business, User } from '../models';
export default class BusinessSearch {
    searchByBusinessName ({ query }) {
        const limit = Number(query.limit) || 9;
        const currentPage = Number(query.page) || 1;
        const offset = (currentPage - 1) * limit;
    
        const {name} = query;
        const searchQuery = {
            businessName: { $iLike: `%${name}%` }}
            Business
            .findAndCountAll({
              where: {searchQuery},
              include: [
                { model: User, attributes: ['fullname'] }
              ],
              limit,
              offset
            }).then((businesses)=>{
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
    }

    searchInLocation ({ query }) {
        const limit = Number(query.limit) || 9;
        const currentPage = Number(query.page) || 1;
        const offset = (currentPage - 1) * limit;

        const { name } = query;
        const {location} = query;
        const searchQuery = {
            businessName: { $iLike: `%${name}%` }, 
            location:  { $iLike: `%${location}%` }
        }
        Business
        .findAndCountAll({
          where: {searchQuery},
          include: [
            { model: User, attributes: ['fullname'] }
          ],
          limit,
          offset
        }).then((businesses)=>{
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

}
searchAllLocation ({ query }) {
    const limit = Number(query.limit) || 9;
    const currentPage = Number(query.page) || 1;
    const offset = (currentPage - 1) * limit;

    const {location} = query;
    const searchQuery = {
        location:  { $iLike: `%${location}%` }}
        Business
        .findAndCountAll({
          where: {searchQuery},
          include: [
            { model: User, attributes: ['fullname'] }
          ],
          limit,
          offset
        }).then((businesses)=>{
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
    }
    sortByMostRecent({ query }, res) {
        const limit = Number(req.query.limit) || 9;
        const currentPage = Number(req.query.page) || 1;
        const offset = (currentPage - 1) * limit;
        Business
          .findAndCountAll({
            include: [{
              model: User,
              attributes: ['fullname']
            }],order: [
                ['updatedAt', 'DESC']
              ],
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
          }));
    
        return this;
      }
      sortByMostPopular(req, res) {
        const limit = Number(req.query.limit) || 9;
        const currentPage = Number(req.query.page) || 1;
        const offset = (currentPage - 1) * limit;
        Business
          .findAndCountAll({
            include: [{
              model: User,
              attributes: ['fullname']
            }],order: [
                ['viewCount', 'DESC']
              ],
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
          }));
    
        return this;
      }

}