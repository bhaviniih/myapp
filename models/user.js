module.exports = (sequelize, type) => {
  return sequelize.define('Users', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING,
      reqired: true,
    },
    email: {
      type: type.STRING,
      reqired: true,
    },
    password: {
      type: type.STRING,
      reqired: true,
    },
    status: {
      type: type.INTEGER,
    }
  })
}