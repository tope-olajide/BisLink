
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jsonwebtoken from 'jsonwebtoken';
import { User } from '../../models';

import app from './../../app';

import { validUser } from '../../testData/data';

chai.use(chaiHttp);

let token, userId;

describe('User Controller', () => {
  before((done) => {
    User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    User.create(validUser)
      .then(() => {
        done();
      });
  });
  describe('/POST User Sign Up', () => {
    describe('Validation', () => {
      describe('Password validation', () => {
        it(`should return 'Password must be at least 5 characters!'
  for invalid password`, (done) => {
            chai.request(app)
              .post('/api/user/signup')
              .set('Accept', 'application/json')
              .send({
                fullname: 'Don Jazzy',
                username: 'donjazzy',
                email: 'donjazzy@ymail.co.uk',
                password: 'don'
              })
              .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).deep.equal({
                  success: false,
                  message: 'Password must be at least 5 characters!'
                });
                done();
              });
          });
      });
    });
    describe('Fullname validation', () => {
      it('should return \' Fullname must contain atleast 4 minimum characters\'',
        (done) => {
          chai.request(app)
            .post('/api/user/signup')
            .set('Accept', 'application/json')
            .send({
              username: 'donjazzy',
              email: 'donjazzy@ymail.co.uk',
              password: 'donjazzy'
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).deep.equal({
                success: false,
                message: 'Fullname must contain atleast 4 minimum characters'
              });
              done();
            });
        });
    });
    describe('Fullname validation', () => {
      it('should return \' Your firstname and lastname must be separated by whitespace\'',
        (done) => {
          chai.request(app)
            .post('/api/user/signup')
            .set('Accept', 'application/json')
            .send({
              fullname: 'donjazzy',
              username: 'donjazzy',
              email: 'donjazzy@ymail.co.uk',
              password: 'donjazzy'
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).deep.equal({
                success: false,
                message: 'Your firstname and lastname must be separated by whitespace'
              });
              done();
            });
        });
    });
    describe('Fullname validation', () => {
      it('should return \'Your fullname must not contains numeric characters\'',
        (done) => {
          chai.request(app)
            .post('/api/user/signup')
            .set('Accept', 'application/json')
            .send({
              fullname: 'don123 jazzy',
              username: 'donjazzy',
              email: 'donjazzy@ymail.co.uk',
              password: 'donjazzy'
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).deep.equal({
                success: false,
                message: 'Your fullname must not contains numeric characters'
              });
              done();
            });
        });
    });
  });
  describe('Username validation', () => {
    it(`should return 'Username must contain at least 3 alphabet characters with no whitespace!'
for null`, (done) => {
        chai.request(app)
          .post('/api/user/signup')
          .set('Accept', 'application/json')
          .send({
            fullname: 'don jazzy',
            email: 'donjazzy@gmail.com',
            password: 'donjazzy'
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).deep.equal({
              success: false,
              message: 'Username must contain at least 3 alphabet characters with no whitespace!'
            });
            done();
          });
      });
  });

  describe('Email validation', () => {
    it('should return \'please enter a valid email address\'',
      (done) => {
        chai.request(app)
          .post('/api/user/signup')
          .set('Accept', 'application/json')
          .send({
            fullname: 'don jazzy',
            email: 'donjazzy@gmail',
            username: 'donjazzy',
            password: 'donjazzy'
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).deep.equal({
              success: false,
              message: 'please enter a valid email address'
            });
            done();
          });
      });
    it('should create a new user and return token', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          fullname: 'Don Jazzy',
          username: 'donjazzy',
          email: 'donjazzy@ymail.co.uk',
          password: 'donjazzy'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.all.deep.keys(
            'success', 'message', 'token', 'notifications');
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to
            .equal('New user created/token generated!');
          done();
        });
    });
    it('should return \'Username already taken\' for \'donjazzy\'',
      (done) => {
        chai.request(app)
          .post('/api/user/signup')
          .set('Accept', 'application/json')
          .send({
            fullname: 'Don Jazzy',
            username: 'donjazzy',
            email: 'donjazzy@yahoo.com',
            password: 'donjazzy',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(409);
            expect(res.body).deep.equal({
              success: false,
              message: 'Username already taken!'
            });
            done();
          });
      });
    it('should return \'Email already taken\' for \'donjazzy@ymail.co.uk\'',
      (done) => {
        chai.request(app)
          .post('/api/user/signup')
          .set('Accept', 'application/json')
          .send({
            fullname: 'Don Jazzy',
            username: 'donjazz',
            email: 'donjazzy@ymail.co.uk',
            password: 'donjazzy',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(409);
            expect(res.body).deep.equal({
              success: false,
              message: 'Email already taken!'
            });
            done();
          });
      });
  });
  describe('/POST User Sign In', () => {
    it('should sign in user (with username)', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .set('Accept', 'application/json')
        .send({
          usernameOrEmail: 'donjazzy',
          password: 'donjazzy'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal(
            'User Signed In/token generated!');
          done();
        });
    });

    it(`should return 'Invalid login Details!' 
for invalid entries`, (done) => {
        chai.request(app)
          .post('/api/user/signin')
          .set('Accept', 'application/json')
          .send({
            usernameOrEmail: 'don@ymail.com',
            password: 'donjazzy',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body).deep.equal({
              success: false,
              message: 'Invalid login Details!'
            });
            done();
          });
      });

    describe('Case insensitive usernameOrEmail', () => {
      it('should sign in \'DONJAZZY@ymail.co.uk', (done) => {
        chai.request(app)
          .post('/api/user/signin')
          .set('Accept', 'application/json')
          .send({
            usernameOrEmail: 'donjazzy@ymail.co.uk'.toUpperCase(),
            password: 'donjazzy'
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.all.deep.keys(
              'success', 'message', 'token');
            done();
          });
      });

      it('should sign in \'donJAZZY\'', (done) => {
        chai.request(app)
          .post('/api/user/signin')
          .set('Accept', 'application/json')
          .send({
            usernameOrEmail: 'donJAZZY',
            password: 'donjazzy'
          })
          .end((err, res) => {
            token = res.body.token;
            userId = jsonwebtoken.decode(token).id;
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            done();
          });
      });
    });
  });
  describe('/GET User profile', () => {
    it('should return a user', (done) => {
      chai.request(app)
        .get('/api/user/profile')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.user).to.have.all.deep.keys(
            'userId', 'fullname',
            'location', 'about',
            'username', 'email',
            'ImageUrl', 'phoneNumber',
            'myBusinesses', 'myBusinessCount',
            'myFavourites', 'myFollowers',
            'myFollowersCount', 'myFollowees',
            'myFolloweesCount');
          expect(res.body.user.fullname).to.equal('Don Jazzy');
          expect(res.body.user.username).to.equal('donjazzy');
          expect(res.body.user.email).to.equal('donjazzy@ymail.co.uk');
          done();
        });
    });
  });
  describe('/PUT Update user profile', () => {
    it('should update user details', (done) => {
      chai.request(app)
        .put('/api/user/profile')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          fullname: 'Don Jazzy Jackson',
          email: 'donjazzy@gmail.com',
          phoneNumber: '08123499564',
          location: 'Lagos',
          about: 'I\'m a Nigerian based artiste and music producer'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.user).to.have.all.deep.keys(
            'fullname',
            'email',
            'phoneNumber',
            'location',
            'about',
            'token'
          );
          expect(res.body.user.fullname).to.equal('Don Jazzy Jackson');
          expect(res.body.user.email).to.equal('donjazzy@gmail.com');
          expect(res.body.user.phoneNumber).to.equal('08123499564');
          expect(res.body.user.location).to.equal('Lagos');
          done();
        });
    });

    it('should return \'Email already taken\' for \'userone@ymail.co.uk\'',
      (done) => {
        chai.request(app)
          .put('/api/user/profile')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .send({
            fullname: 'Don Jazzy',
            email: 'userone@ymail.co.uk',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(409);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Email already taken');
            done();
          });
      });
  });
  describe('/PUT Change password', () => {
    it('should return \'Password must be at least 5 characters!\' ',
      (done) => {
        chai.request(app)
          .put('/api/user/change-password')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .send({
            oldPassword: 'donjazzy',
            newPassword: 'don',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.message)
              .to.equal('Password must be at least 5 characters!');
            done();
          });
      });

    it('should return \'Failed to authenticate token.\' for invalid token',
      (done) => {
        chai.request(app)
          .put('/api/user/change-password')
          .set('Accept', 'application/json')
          .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ' +
          '6NDY4LCJlbWFpbCI6ImpvaG5kb2VAY29tcGFueS5jb20iLCJ1c2VybmFtZSI6Impv' +
          '5kb2UiLCJpYXQiOjE1MTA1OTI3Nzd9.Oa9wuSqolP2oM5-uKWN0ZukagWx2ZC1kN2' +
          'XGZoM-s')
          .send({
            oldPassword: 'donjazzy',
            newPassword: 'alphabetachalie',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body.message).to.equal('Failed to authenticate token.');
            done();
          });
      });

    it('should return \'Incorrect Password\'',
      (done) => {
        chai.request(app)
          .put('/api/user/change-password')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .send({
            oldPassword: 'donjaz',
            newPassword: 'alphabetachalie',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body.message).to.equal('Incorrect Password');
            done();
          });
      });

    it('should return \'Password Changed Successfully\'',
      (done) => {
        chai.request(app)
          .put('/api/user/change-password')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .send({
            oldPassword: 'donjazzy',
            newPassword: 'alphabetachalie',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.message).to.equal('Password Changed Successfully');
            done();
          });
      });
  });
});  