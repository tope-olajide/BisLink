/** Define the User database model/association
 * @exports User
 * @param  {object} sequelize - sequelize
 * @param  {object} DataTypes - sequelize Datatypes
 * @return {object} The User model
 */
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    usersImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Business, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Favorite, {
      foreignKey: 'userId'
    });
  };
  return User;
};
