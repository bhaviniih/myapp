/*'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Products', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};*/

module.exports = (sequelize, type) => {
  return sequelize.define('Products', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING,
      reqired: true,
    },
    price: {
      type: type.FLOAT,
      reqired: true,
    }
  })
}