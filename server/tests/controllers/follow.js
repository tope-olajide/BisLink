/* eslint-disable no-multi-spaces */
/* eslint-disable eol-last */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { User, Follower } from '../../models';

import app from './../../app';

import { insertFollowersData, insertUserData, user1token, user2token } from '../../testData/data';

chai.use(chaiHttp);

let token1, token2;
describe('Follow Controller', () => {
  before((done) => {
    User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    Follower.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    }).then(() => {
      insertUserData();
      token1 = user1token;
      token2 = user2token;
      done();
    });
  });
  describe('/GET Followers', () => {
    it(`should return 'Nothing found!' when fetching all 
    followers for userId 1 `, (done) => {
        chai.request(app)
          .get('/api/user/follower')
          .set('Accept', 'application/json')
          .set('authorization', token1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Nothing found!');
            done();
          });
      });
    it(`should return 'Nothing found!' when fetching all
      followees for userId 1 `, (done) => {
        chai.request(app)
          .get('/api/user/followee')
          .set('Accept', 'application/json')
          .set('authorization', token1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Nothing found!');
            done();
          });
      });
    it('should not unfollow user that is not a follower or does not exist', (done) => {
      chai.request(app)
        .delete('/api/user/follow/2')
        .set('Accept', 'application/json')
        .set('authorization', token1)
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('you are not followed by 2');
          done();
        });
    });
    it(`should return 'you are now following 2' when user
    with userId 1 follows user with userId 2
   `, (done) => {
        chai.request(app)
          .post('/api/user/follow/2')
          .set('Accept', 'application/json')
          .set('authorization', token1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('you are now following 2');
            expect(res.body.addedFollower.userId).to.equal(2);
            expect(res.body.isFollowing).to.equal(true);
            done();
          });
      });
    it(`should return 'You are already following 2' when user
      with userId 1 follows user with userId 2 AGAIN`, (done) => {
        chai.request(app)
          .post('/api/user/follow/2')
          .set('Accept', 'application/json')
          .set('authorization', token1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(409);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('You are already following 2!');
            done();
          });
      });
    it(`should return 'you are now following 1' when user
      with userId 2 follows user with userId 1
     `, (done) => {
        chai.request(app)
          .post('/api/user/follow/1')
          .set('Accept', 'application/json')
          .set('authorization', token2)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('you are now following 1');
            expect(res.body.addedFollower.userId).to.equal(1);
            expect(res.body.isFollowing).to.equal(true);
            done();
          });
      });
    it(`should return 'Followers found' when fetching all
      followers for userId 1 `, (done) => {
        chai.request(app)
          .get('/api/user/follower')
          .set('Accept', 'application/json')
          .set('authorization', token1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('Followers found');
            expect(res.body.userFollowers.length).to.equal(1);
            done();
          });
      });
    it(`should return 'followees found' when fetching all
      followee for userId 1 `, (done) => {
        chai.request(app)
          .get('/api/user/followee')
          .set('Accept', 'application/json')
          .set('authorization', token1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('followees found');
            expect(res.body.followees.length).to.equal(1);
            done();
          });
      });
    it('should unfollow user with  specified userId', (done) => {
      chai.request(app)
        .delete('/api/user/follow/2')
        .set('Accept', 'application/json')
        .set('authorization', token1)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('you have unfollowed 2');
          done();
        });
    });
  });
});