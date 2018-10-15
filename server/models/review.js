/** Define the Review database model/association
 * @exports Review
 * @param  {object} sequelize - sequelize
 * @param  {object} DataTypes - sequelize Datatypes
 * @return {object} The Review model
 */
export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    content: DataTypes.STRING,
    businessId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
    }
  });

  return Review;
};
