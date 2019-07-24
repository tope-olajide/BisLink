/* import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from './../../app';
import { Downvote, Upvote, User, Business } from '../../models';
import {
  insertUserData, user1token, insertBusinessData
} from '../../testData/data';

chai.use(chaiHttp);

let token;
const businessId = 1;

describe('Vote Controller', () => {
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
    Downvote.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    Upvote.destroy({
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

  describe('/GET Upvotes/Downvotes on Business', () => {
    it('should return \'Nothing found\' for upvotes', (done) => {
      chai.request(app)
        .get(`/api/business/${businessId}/upvotes`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.votes.length).to.equal(0);
          done();
        });
    });

    it('should return \'Nothing found\' for downvotes', (done) => {
      chai.request(app)
        .get(`/api/business/${businessId}/downvotes`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.votes.length).to.equal(0);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Nothing found!');
          done();
        });
    });
  });

  describe('/POST upvote  Business', () => {
    it(`should return 'Business upvoted' for id ${businessId}`, (done) => {
      chai.request(app)
        .post(`/api/business/${businessId}/upvotes`)
        .set('Accept', 'application/json')
        .send({
          token
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).deep.equal({
            success: true,
            message: `Business with id: ${businessId} Upvoted!`,
            business: {
              upvotes: 1,
              downvotes: 0
            }
          });
          done();
        });
      }); 

    it(`should return \'Business already upvoted\' 
  for an already upvoted Business`, (done) => {
        chai.request(app)
          .post(`/api/business/${businessId}/upvotes`)
          .set('Accept', 'application/json')
          .send({
            token
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(409);
            expect(res.body).deep.equal({
              success: false,
              message: 'Business already Upvoted!'
            });
            done();
          });
      });
  });
 
  describe('/GET Upvotes/Downvotes on Business', () => {
    it('should return an array of upvotes', (done) => {
      chai.request(app)
        .get(`/api/business/${businessId}/upvotes`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.votes.length).to.equal(1);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('User upvotes found');
          done();
        });
    });

    it('should return \'Nothing found\'', (done) => {
      chai.request(app)
        .get(`/api/business/${businessId}/downvotes`)
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

  describe('/POST downvote Business', () => {
    it(`should return \'Business downvoted\' for id: ${businessId}`, (done) => {
      chai.request(app)
        .post(`/api/business/${businessId}/downvotes`)
        .set('Accept', 'application/json')
        .send({
          token
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).deep.equal({
            success: true,
            business: {
              downvotes: 1,
              upvotes: 0
            },
            message: `Business with id: ${businessId} Downvoted!`
          });
          done();
        });
    });

   it(`should return \'Business Already downvoted\'
  for an already downvoted Business`, (done) => {
        chai.request(app)
          .post(`/api/business/${businessId}/downvotes`)
          .set('Accept', 'application/json')
          .send({
            token
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(409);
            expect(res.body).deep.equal({
              success: false,
              message: 'Business already Downvoted!'
            });
            done();
          });
      });

    it('should return \'Business downvoted\'', (done) => {
      chai.request(app)
        .post(`/api/business/${businessId + 1}/downvotes`)
        .set('Accept', 'application/json')
        .send({
          token
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).deep.equal({
            success: true,
            business: {
              downvotes: 1,
              upvotes: 0
            },
            message: `Business with id: ${businessId + 1} Downvoted!`
          });
          done();
        });
    });
  });

  describe('/GET Downvotes on Business', () => {
    it('should return an array of downvotes', (done) => {
      chai.request(app)
        .get(`/api/business/${businessId}/downvotes`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.votes.length).to.equal(1);
          done();
        });
    });
  });

  describe('/POST upvote Business', () => {
    it('should return \'Business upvoted\'', (done) => {
      chai.request(app)
        .post(`/api/business/${businessId}/upvotes`)
        .set('Accept', 'application/json')
        .send({
          token
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).deep.equal({
            success: true,
            business: {
              downvotes: 0,
              upvotes: 1
            },
            message: `Business with id: ${businessId} Upvoted!`
          });
          done();
        });
    });
  });
 
  describe('/GET Upvotes/Downvotes on Business', () => {
    it('should return an array of upvotes', (done) => {
      chai.request(app)
        .get(`/api/business/${businessId}/upvotes`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.votes.length).to.equal(1);
          done();
        });
    });

    it('should return \'Nothing found\' for' +
      'downvotes when none is found', (done) => {
      chai.request(app)
        .get(`/api/business/${businessId}/downvotes`)
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