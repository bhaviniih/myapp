'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Products', [
      {
        name: 'Product 1',
        price: 10.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product 2',
        price: 8.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product 3',
        price: 12.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product 4',
        price: 15.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product 5',
        price: 17.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product 6',
        price: 20.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
