/** Define the Notification database model/association
 * @exports Notification
 * @param  {object} sequelize - sequelize
 * @param  {object} DataTypes - sequelize Datatypes
 * @return {object} The Notification model
 */
module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Review', {
    content: DataTypes.STRING,
    notificationsId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    senderId: {
      type: DataTypes.INTEGER
    },
    message: {
      type: DataTypes.INTEGER
    },
    notificationState: {
      type: DataTypes.BOOLEAN
    }
  });

  return Notifications;
};