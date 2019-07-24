

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { User, Business, Review } from '../../models';

import app from './../../app';

import {
  insertUserData, user1token, insertBusinessData, insertReviewData
} from '../../testData/data';

chai.use(chaiHttp);

let token;
const businessId = 1;


describe('Review Controller', () => {
  before((done) => {
    User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    Business.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    Review.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
      .then(() => {
        insertUserData();
        insertBusinessData();
        token = user1token;
        done();
      });
  });

  describe('/GET all Reviews on a Businness', () => {
    it('should return \'Nothing found!\' when no business is found', (done) => {
      chai.request(app)
        .get(`/api/business/${businessId}/reviews`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('No Review found!');
          done();
        });
    });
  });


  describe('/POST Review', () => {
    before(() => {
      insertReviewData();
    });
    it(`should return 'Review title must be atleast 4 characters!'
for "ok" `, (done) => {
        chai.request(app)
          .post(`/api/business/${businessId}/reviews`)
          .set('Accept', 'application/json')
          .send({
            token,
            content: 'hm'
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).deep.equal({
              success: false,
              message: 'Review title must be atleast 4 characters'
            });
            done();
          });
      });

    it(`should return \'Review message must be between 3 to 4000 characters!\'
for null review`,
      (done) => {
        chai.request(app)
          .post(`/api/business/${businessId}/reviews`)
          .set('Accept', 'application/json')
          .send({
            token,
            title: 'This is review title sample'
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).deep.equal({
              success: false,
              message: 'Review content must be atleast 10 characters'
            });
            done();
          });
      });

    it('should create and return a review on business', (done) => {
      chai.request(app)
        .post(`/api/business/${businessId}/reviews`)
        .set('Accept', 'application/json')
        .send({
          token,
          title: 'This is review title sample',
          content: '...and this is review content sample'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.reviews.title)
            .to.equal('This is review title sample');
          expect(res.body.reviews.content)
            .to.equal('...and this is review content sample');
          done();
        });
    });
  });

  describe('/GET all Reviews on a Businness', () => {
    it('should return an array of Reviews', (done) => {
      chai.request(app)
        .get(`/api/business/${businessId}/reviews`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.reviews.length).to.equal(5);
          done();
        });
    });
  });
});

