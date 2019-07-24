/* import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { Business } from '../../models';

import app from '../../app';

import { insertUserData, user1token, user2token } from '../../testData/data';

chai.use(chaiHttp);

let token, token2, businessId, businessId2;

describe('Business Controller', () => {
  before((done) => {
    Business.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
      .then(() => {
        insertUserData();
        token = user1token;
        token2 = user2token;
        done();
      });
  });

  describe('/GET all Businesses', () => {
    it(`should return 'Nothing found!' when fetching all businesses 
but none found in the database`, (done) => {
        chai.request(app)
          .get('/api/business/')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('Nothing found!');
            done();
          });
      });

    it(`should return 'Nothing found!' when fetching businesses by most popular
but none is found in the database`, (done) => {
        chai.request(app)
          .get('/api/business?sort=popular')
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
  describe('/POST Create Business', () => {
    it(`should return 'Business name must be more than 5 characters!' 
for "tpw"`, (done) => {
        chai.request(app)
          .post('/api/business')
          .set('Accept', 'application/json')
          .send({
            token,
            businessName: 'tpw',
            businessAddress1: '20, Ibadan street, off Shyllon, Ilupeju.',
            businessDescription: 'TPweb is the number one software development company in West-Africa'
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).deep.equal({
              success: false,
              message: 'Business name must be more than 5 characters!'
            });
            done();
          });
      });

    it('should return \'Business Address must be atleast 5 characters long!\' for "Yaba"', (done) => {
      chai.request(app)
        .post('/api/business')
        .set('Accept', 'application/json')
        .send({
          token,
          businessName: 'TPweb Inc.',
          businessAddress1: 'Yaba',
          businessDescription: 'TPweb is the number one software development company in West-Africa'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).deep.equal({
            success: false,
            message: 'Business Address must be atleast 5 characters long!'
          });
          done();
        });
    });

    it('should return \'Business Description must be atleast 10 characters long!\' for "number 1"',
      (done) => {
        chai.request(app)
          .post('/api/business')
          .set('Accept', 'application/json')
          .send({
            token,
            businessName: 'TPweb Inc.',
            businessAddress1: '20, Ibadan street, off Shyllon, Ilupeju.',
            phoneNumber1: '2348176844356'
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).deep.equal({
              success: false,
              message: 'Business Description must be atleast 10 characters long!'
            });
            done();
          });
      });
    it('should return \'Business Description must be atleast 10 characters long!\' for "number 1"',
      (done) => {
        chai.request(app)
          .post('/api/business')
          .set('Accept', 'application/json')
          .send({
            token,
            businessName: 'TPweb Inc.',
            businessAddress1: '20, Ibadan street, off Shyllon, Ilupeju.',
            businessDescription: 'TPweb is the number one software development company in West-Africa'
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).deep.equal({
              success: false,
              message: 'Business phone-number must be more than 5 characters!'
            });
            done();
          });
      });
    it('should create and return a business named:"TPweb Inc."', (done) => {
      chai.request(app)
        .post('/api/business')
        .set('Accept', 'application/json')
        .send({
          token,
          businessName: 'TPweb Inc.',
          businessAddress1: '20, Ibadan street, off Shyllon, Ilupeju Lagos.',
          phoneNumber1: '2348176844356',
          businessDescription: 'TPweb is the number one software development company in West-Africa'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.success).to.equal(true);
          businessId = res.body.business.id;
          expect(res.body.business.businessName).to.equal('TPweb Inc.');
          expect(res.body.business.businessAddress1).to
            .equal('20, Ibadan street, off Shyllon, Ilupeju Lagos.');
          expect(res.body.business.businessDescription).to
            .equal('TPweb is the number one software development company in West-Africa');
          done();
        });
    });
    it('should create another business and return a business named:"Halleluyah Restaurant"', (done) => {
      chai.request(app)
        .post('/api/business')
        .set('Accept', 'application/json')
        .send({
          token,
          businessName: 'Halleluyah Restaurant',
          businessAddress1: '52 Ishaga road, Surulere, Lagos.',
          phoneNumber1: '2348176844356',
          businessDescription: 'TPweb is the number one software development company in West-Africa'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.business.businessName).to.equal('Halleluyah Restaurant');
          expect(res.body.business.businessAddress1).to
            .equal('52 Ishaga road, Surulere, Lagos.');
          expect(res.body.business.businessDescription).to
            .equal('TPweb is the number one software development company in West-Africa');
          done();
        });
    });
    it('should create and return another business named:"Conoil Oil", created by another user with "userId=2"', (done) => {
      chai.request(app)
        .post('/api/business')
        .set('Accept', 'application/json')
        .send({
          token: token2,
          businessName: 'Conoil Oil',
          businessAddress1: '50, Obianuju street, Porthacourt, Rivers.',
          phoneNumber1: '234817683456',
          businessDescription: 'Conoil oil is the best crude oil refiner in Nigeria. With 3 refineries in PC city, we are...'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.success).to.equal(true);
          businessId2 = res.body.business.id;
          expect(res.body.business.businessName).to.equal('Conoil Oil');
          expect(res.body.business.businessAddress1).to
            .equal('50, Obianuju street, Porthacourt, Rivers.');
          expect(res.body.business.businessDescription).to
            .equal('Conoil oil is the best crude oil refiner in Nigeria. With 3 refineries in PC city, we are...');
          done();
        });
    });
    it('should return 1 business when searching for \'TPweb Inc.\'(Business name only)', (done) => {
      chai.request(app)
        .get('/api/business/search?name=TPweb+Inc')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.businesses.length).to.equal(1);
          done();
        });
    });
    it('should return 1 business when searching for \'Halleluyah Restaurant in Lagos \'  (Busniness name and Location)', (done) => {
      chai.request(app)
        .get('/api/business/search?name=halleluyah+Restaurant&location=Lagos')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.businesses.length).to.equal(2);
          done();
        });
    });
    it('should return 2 businesses when searching for businesses in \'Lagos\'  (Location only)', (done) => {
      chai.request(app)
        .get('/api/business/search?location=Lagos')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.businesses.length).to.equal(2);
          done();
        });
    });
    it('should return \'Nothing found!\' when name = \'Microsoft\'', (done) => {
      chai.request(app)
        .get('/api/business/search?name=Microsoft')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.success).to.equal(true);
          done();
        });
    });
    it('should return \'Nothing found!\' when location = \'Abuja\'', (done) => {
      chai.request(app)
        .get('/api/business/search?location=Abuja')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });
  describe('/GET all Businesses by User with userId =1', () => {
    it('should return an array of Businesses', (done) => {
      chai.request(app)
        .get('/api/user/businesses')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.business.length).to.equal(2);
          done();
        });
    });
  });
  describe('/GET Sort Business', () => {
    it('should sort business by most popular', (done) => {
      chai.request(app)
        .get('/api/business/search?sort=popular')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          done();
        });
    });

    it('should Sort Business by Most Recent', (done) => {
      chai.request(app)
        .get('/api/business/search?sort=recent')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });
  describe('/PUT User Businesses', () => {
    it('should modify and return a business', (done) => {
      chai.request(app)
        .put(`/api/business/${businessId}`)
        .set('Accept', 'application/json')
        .send({
          token,
          businessName: 'TPweb Inc. Modified',
          businessAddress1: '20, Ibadan street, off Shyllon, Ilupeju.',
          businessDescription: 'TPweb is the number one software development company in West-Africa',
          phoneNumber1: '2349546694595'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          done();
        });
    });

    it('should return \'You cannot modify a business not created by You!\'',
      (done) => {
        chai.request(app)
          .put(`/api/business/${businessId2}`)
          .set('Accept', 'application/json')
          .send({
            token: `${token}eiowie`,
            businessName: 'TPweb Inc.',
            businessAddress1: '20, Ibadan street, off Shyllon, Ilupeju.',
            businessDescription: 'TPweb is the number one software development company in West-Africa'
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body.success).to.equal(false);
            done();
          });
      });

    it('should return \'Business does not exist!\' for id: 100',
      (done) => {
        chai.request(app)
          .get('/api/business/100')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body).deep.equal({
              success: true,
              message: 'Business does not exist!'
            });
            done();
          });
      });
    it('should return \'Invalid business ID\' for id: \'abcd\'', (done) => {
      chai.request(app)
        .get('/api/business/abcd')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body).deep.equal({
            success: false,
            message: 'Invalid Business ID'
          });
          done();
        });
    });
  });
  describe('/DELETE User Businesses', () => {
    it(`should delete a business with id ${businessId}`, (done) => {
      chai.request(app)
        .delete(`/api/business/${businessId}`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it(`should return 'Failed to authenticate token.' for invalid user token: 
${businessId + 2}`,
    (done) => {
      chai.request(app)
        .delete(`/api/business/${businessId2}`)
        .set('Accept', 'application/json')
        .set('authorization', `${token}qwerty`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).deep.equal({
            success: false,
            message: 'Failed to authenticate token.'
          });
          done();
        });
    });

    it('should return \'Business does not exist!\' for id: 900', (done) => {
      chai.request(app)
        .delete('/api/business/900')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).deep.equal({
            success: false,
            message: 'Business does not exist!'
          });
          done();
        });
    });
  });
  describe('/GET all Businesses', () => {
    it('should return two Businesses', (done) => {
      chai.request(app)
        .get('/api/business')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.businesses.length).to.equal(2);
          done();
        });
    });
  });
});
 */