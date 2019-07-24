/*  import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { User, Notification } from '../../models';

import app from './../../app';

chai.use(chaiHttp);

let token, token2, notificationId;

describe('Notification Controller', () => {
  before((done) => {
    User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
    Notification.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
      .then(() => {
        done();
      });
  });
  describe('/GET Notifications', () => {
    it(`should create a new user and a return new notification titled:
    'Welcome Tope Olajide'`, (done) => {
        chai.request(app)
          .post('/api/user/signup')
          .set('Accept', 'application/json')
          .send({
            fullname: 'Temi Tope',
            username: 'topeo',
            email: 'topeo@ymail.co.uk',
            password: 'topeo'
          })
          .end((err, res) => {
            token = res.body.token;
            notificationId = res.body.notifications.id;
            expect(res.statusCode).to.equal(201);
            expect(res.body.success).to.equal(true);
            expect(res.body.notifications.title).to.equal('Welcome Temi Tope');
            done();
          });
      });
    it(`should return 1 notification when fetching all
     notifications in the App`, (done) => {
        chai.request(app)
          .get('/api/user/notifications/all')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('Notification(s) found');
            expect(res.body.allNotifications.length).to.equal(1);
            expect(res.body.newNotificationsCount).to.equal(1);
            expect(res.body.readNotificationsCount).to.equal(0);
            done();
          });
      });
    it(`should return 1 unread Notification when fetching all
     unread notifications in the App`, (done) => {
        chai.request(app)
          .get('/api/user/notifications')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('New notification(s) found');
            expect(res.body.allNotificationsCount).to.equal(1);
            expect(res.body.unreadNotifications.length).to.equal(1);
            expect(res.body.readNotificationsCount).to.equal(0);
            done();
          });
      });
    it(`should return "You currently do not have any viewed notifications" when fetching all
      seen notifications in the App`, (done) => {
        chai.request(app)
          .get('/api/user/notifications/seen')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('No viewed notifications found');
            expect(res.body.readNotifications.length).to.equal(0);
            done();
          });
      });
    it('should get a notification with specified "id" and change it status from unread to read ', (done) => {
      chai.request(app)
        .get(`/api/user/notifications/${notificationId}`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Notification(s) found');
          expect(res.body.readNotificationsCount).to.equal(1);
          expect(res.body.allNotificationsCount).to.equal(1);
          expect(res.body.unreadNotificationsCount).to.equal(0);
          done();
        });
    });
    it(`should return 'Nothing found!' when fetching unread notifications 
  but none is found in the database`, (done) => {
        chai.request(app)
          .get('/api/user/notifications')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('You currently do not have any unread notification(s)');
            expect(res.body.unreadNotifications.length).to.equal(0);
            expect(res.body.allNotificationsCount).to.equal(1);
            expect(res.body.readNotificationsCount).to.equal(1);
            done();
          });
      });
    it('It should return all read Notifications when fetching for read notification in DB', (done) => {
      chai.request(app)
        .get('/api/user/notifications/seen')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('read notification(s) found');
          expect(res.body.readNotifications.length).to.equal(1);
          expect(res.body.allNotificationsCount).to.equal(1);
          expect(res.body.unreadNotificationsCount).to.equal(0);
          done();
        });
    });
    it('should get all user\'s notifications ', (done) => {
      chai.request(app)
        .get('/api/user/notifications/all')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Notification(s) found');
          expect(res.body.allNotifications.length).to.equal(1);
          expect(res.body.newNotificationsCount).to.equal(0);
          expect(res.body.readNotificationsCount).to.equal(1);
          done();
        });
    });
    it(`should create another new user and a return new notification titled:
    'Welcome Another User'`, (done) => {
        chai.request(app)
          .post('/api/user/signup')
          .set('Accept', 'application/json')
          .send({
            fullname: 'Another User',
            username: 'user2',
            email: 'user2@ymail.co.uk',
            password: 'user2'
          })
          .end((err, res) => {
            token2 = res.body.token;
            expect(res.statusCode).to.equal(201);
            expect(res.body.success).to.equal(true);
            expect(res.body.notifications.title).to.equal('Welcome Another User');
            done();
          });
      });
    it('should not allow Another User to view a notification that does not belong to him/her', (done) => {
      chai.request(app)
        .get(`/api/user/notifications/${notificationId}`)
        .set('Accept', 'application/json')
        .set('authorization', token2)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('You cannot view or delete a notification that is not yours');
          done();
        });
    });
    it('should not allow Another User to delete a notification that does not belongs to him/her', (done) => {
      chai.request(app)
        .delete(`/api/user/notifications/${notificationId}`)
        .set('Accept', 'application/json')
        .set('authorization', token2)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('You cannot view or delete a notification that is not yours');
          done();
        });
    });
    it('should delete a notification with the specified "notificationId"', (done) => {
      chai.request(app)
        .delete(`/api/user/notifications/${notificationId}`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          done();
        });
    });
    it('It should mark all unread notifications as read', (done) => {
      chai.request(app)
        .put('/api/user/notifications')
        .set('Accept', 'application/json')
        .set('authorization', token2)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('All unread notifications marked as read');
          done();
        });
    });
    it(`should return 'Nothing found!' when fetching unread notifications 
    but none is found in the database`, (done) => {
        chai.request(app)
          .get('/api/user/notifications')
          .set('Accept', 'application/json')
          .set('authorization', token2)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('You currently do not have any unread notification(s)');
            expect(res.body.unreadNotifications.length).to.equal(0);
            expect(res.body.allNotificationsCount).to.equal(1);
            expect(res.body.readNotificationsCount).to.equal(1);
            done();
          });
      });
  });
});

  */