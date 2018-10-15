/** Define the Business database model/association
 * @exports Business
 * @param  {object} sequelize - sequelize
 * @param  {object} DataTypes - sequelize Datatypes
 * @return {object} The Business model
 */
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tagline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessAddress1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    businessAddress2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phoneNumber2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  return Business;
};
