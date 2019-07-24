/* import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { Favourite } from '../../models';
import app from './../../app';
import {
  insertFollowersData, user1token, insertBusinessData
} from '../../testData/data';

chai.use(chaiHttp);

let token;
const businessId = 1;

describe('Favourite Controller', () => {
  before((done) => {
    Favourite.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
      .then(() => {
        insertFollowersData();
        insertBusinessData();
        token = user1token;
        done();
      });
  });

  describe('/GET user Favourite\'s Businesses', () => {
    it(`should return 'Nothing found!' for user id: ${businessId}`, (done) => {
      chai.request(app)
        .get(`/api/user/favourite/${businessId}/`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('Nothing found!');
          done();
        });
    });
  });

  describe('/GET Validate if business is a favourite', () => {
    it(`should return "Nothing found" of Businesses for user id: ${businessId}`,
      (done) => {
        chai.request(app)
          .get(`/api/user/favourite/${businessId}`)
          .set('Accept', 'application/json')
          .set('authorization', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('Nothing found!');
            done();
          });
      });
  });

  describe('/POST Add business to favourites', () => {
    it(`should return 'Failed to authenticate token.' 
for invalid user token`, (done) => {
        chai.request(app)
          .post(`/api/user/favourite/${businessId}`)
          .set('Accept', 'application/json')
          .send({
            token: 'eyJNiJ9.c2Rz.H9g9SB2Uvbhj.hl50q3fbZQk' +
              '4yJfLBEJRzrcfeX2nqKl-8yIuI',
            name: 'Ewedu soup',
            ingredients: 'Water;;Ewedu leaves;;Salt',
            procedure: 'Light stove and just start cooking'
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body).deep.equal({
              success: false,
              message: 'Failed to authenticate token.'
            });
            done();
          });
      });
  
    it(`should add business id: ${businessId} to user favourites`, (done) => {
      chai.request(app)
        .post(`/api/user/favourite/${businessId}`)
        .set('Accept', 'application/json')
        .send({
          token
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Business with id: 1 added to favourites!');
          done();
        });
    });
  
    it(`should return 'Business with id: ${businessId} Already added!'`, (done) => {
      chai.request(app)
        .post(`/api/user/favourite/${businessId}`)
        .set('Accept', 'application/json')
        .send({
          token
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Business with id: 1 Already added!');
          done();
        });
    });
  });

  describe('/GET user Favourite\'s Businesses', () => {
    it(`should return an array of Business for user id: ${businessId}`, (done) => {
      chai.request(app)
        .get(`/api/user/favourite/${businessId}/`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Favourite business(es) found');
          done();
        });
    });

    it('should return \'Invalid Invalid Business ID for business id: \'abc\'', (done) => {
      chai.request(app)
        .get('/api/user/favourite/abc')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Invalid Business ID');
          done();
        });
    });
  });

  describe('/GET Validate if business is a favourite', () => {
    it(`should return an array of Businesses for user id: ${businessId}`, (done) => {
      chai.request(app)
        .get(`/api/user/favourite/${businessId}`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Favourite business(es) found');
          done();
        });
    });
  });

 describe('/POST Remove business from favourites', () => {
    it(`should remove business id: ${businessId} from favourites`, (done) => {
      chai.request(app)
        .delete(`/api/user/favourite/${businessId}`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to
            .equal(`Business with ID: ${businessId} Removed from Favourites`);
          done();
        });
    });
  });

 
  describe('/GET User favourite recipes', () => {
    it(`should return an array of Businesses for user id: ${businessId}`, (done) => {
      chai.request(app)
        .get(`/api/user/favourite/${businessId}/`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Nothing found!');
          done();
        });
    }); 
  });
});
 */