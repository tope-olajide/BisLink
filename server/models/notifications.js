/** Define the Notification database model/association
 * @exports Notification
 * @param  {object} sequelize - sequelize
 * @param  {object} Sequelize - sequelize Sequelize
 * @return {object} The Notification model
 */
module.exports = (sequelize, Sequelize) => {
  const Notifications = sequelize.define('Review', {
    content: Sequelize.STRING,
    notificationsId: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.STRING
    },
    senderId: {
      type: Sequelize.STRING
    },
    message: {
      type: Sequelize.STRING
    },
    notificationState: {
      type: Sequelize.BOOLEAN
    }
  });

  return Notifications;
};