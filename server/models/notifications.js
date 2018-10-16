/** Define the Notification database model/association
 * @exports Notification
 * @param  {object} sequelize - sequelize
 * @param  {object} Sequelize - sequelize Sequelize
 * @return {object} The Notification model
 */
module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define('Review', {
    content: Sequelize.STRING,
    NotificationId: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    },
    senderId: {
      type: Sequelize.INTEGER
    },
    message: {
      type: Sequelize.STRING
    },
    Notificationtate: {
      type: Sequelize.BOOLEAN
    }
  });
  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Notification;
};
