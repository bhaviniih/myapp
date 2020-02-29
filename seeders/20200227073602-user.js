'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Bhavin iih',
        email: 'bhaviniih@yopmail.com',
        password: '123123',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hem iih',
        email: 'hemiih@yopmail.com',
        password: '123123',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
