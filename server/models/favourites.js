/** Define the Favorite database model/association
 * @exports Favorite
 * @param  {object} sequelize - sequelize
 * @param  {object} DataTypes - sequelize Datatypes
 * @return {object} The Favorite model
 */
export default (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    businessId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    }
  });

  return Favorite;
};
