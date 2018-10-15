/** Define the Favorite database model/association
 * @exports Favorite
 * @param  {object} sequelize - sequelize
 * @param  {object} DataTypes - sequelize Datatypes
 * @return {object} The Favorite model
 */
export default (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    businessId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
    }
  });

  return Favorite;
};
