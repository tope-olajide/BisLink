/* eslint-disable class-methods-use-this */
/* eslint-disable require-jsdoc */
import { Business, User } from '../models';

export default class BusinessSearch {
  searchBusinessName({ query, res }) {
    const limit = Number(query.limit) || 9;
    const currentPage = Number(query.page) || 1;
    const offset = (currentPage - 1) * limit;
    const bizName = query.name.split(' ');
    const searchQuery = bizName.map(item => ({
      businessName: { $iLike: `%${item}%` }
    }));

    Business
      .findAndCountAll({
        where: { $or: searchQuery },
        include: [
          { model: User, attributes: ['fullname'] }
        ],
        limit,
        offset
      }).then((businesses) => {
        const totalPages = businesses.count;
        if (businesses.rows.length < 1) {
          return res.status(404).json({
            success: true,
            message: 'Nothing found!',
            businesses: []
          });
        }
        return res.status(200).json({
          success: true,
          message: 'business(es) found!',
          businesses: businesses.rows,
          totalPages
        });
      });
  }

  searchBusinessInLocation({ query }, res) {
    const limit = Number(query.limit) || 9;
    const currentPage = Number(query.page) || 1;
    const offset = (currentPage - 1) * limit;

    const bizName = query.name.split(' ');
    const bizLocation = query.location.split(' ');
    const businessNameQuery = bizName.map(item => ({
      businessName: { $iLike: `%${item}%` }
    }));
    const businessLocationQuery = bizLocation.map(item => ({
      businessAddress1: { $iLike: `%${item}%` }
    }));
    Business
      .findAndCountAll({
        where: { $or: businessNameQuery.concat(businessLocationQuery) },
        include: [
          { model: User, attributes: ['fullname'] }
        ],
        limit,
        offset
      }).then((businesses) => {
        const totalPages = businesses.count;
        if (businesses.rows.length < 1) {
          return res.status(404).json({
            success: true,
            message: 'Nothing found!',
            businesses: []
          });
        }
        return res.status(200).json({
          success: true,
          message: 'business(es) found!',
          businesses: businesses.rows,
          totalPages
        });
      });

  }
  searchAllLocation({ query }, res) {
    const limit = Number(query.limit) || 9;
    const currentPage = Number(query.page) || 1;
    const offset = (currentPage - 1) * limit;
    const bizLocation = query.location.split(' ');
    const businessLocationQuery = bizLocation.map(item => ({
      businessAddress1: { $iLike: `%${item}%` }
    }));
    Business
      .findAndCountAll({
        where: { $or: businessLocationQuery },
        include: [
          { model: User, attributes: ['fullname'] }
        ],
        limit,
        offset
      }).then((businesses) => {
        const totalPages = businesses.count;
        if (businesses.rows.length < 1) {
          return res.status(404).json({
            success: true,
            message: 'Nothing found!',
            businesses: []
          });
        }
        return res.status(200).json({
          success: true,
          message: 'business(es) found!',
          businesses: businesses.rows,
          totalPages
        });
      });
  }
  sortByMostRecent({ query }, res) {
    const limit = Number(query.limit) || 9;
    const currentPage = Number(query.page) || 1;
    const offset = (currentPage - 1) * limit;
    Business
      .findAndCountAll({
        include: [{
          model: User,
          attributes: ['fullname']
        }],
        order: [
          ['updatedAt', 'DESC']
        ],
        limit,
        offset
      })
      .then((businesses) => {
        const totalPages = businesses.count;
        if (businesses.rows.length < 1) {
          return res.status(404).json({
            success: true,
            message: 'Nothing found!',
            businesses: []
          });
        }

        return res.status(200).json({
          success: true,
          message: 'business(es) found!',
          businesses: businesses.rows,
          totalPages
        });
      })
      .catch(error => res.status(500).json({
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
        }], 
        order: [
          ['viewCount', 'DESC']
        ],
        limit,
        offset
      })
      .then((businesses) => {
        const totalPages = businesses.count;
        if (businesses.rows.length < 1) {
          return res.status(404).json({
            success: true,
            message: 'Nothing found!',
            businesses: []
          });
        }

        return res.status(200).json({
          success: true,
          message: 'business(es) found!',
          businesses: businesses.rows,
          totalPages
        });
      })
      .catch(error => res.status(500).json({
        success: false,
        message: 'Error fetching all businesses',
        error
      }));
    return this;
  }
}
