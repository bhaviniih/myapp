const mysql = require('mysql2');
const Sequelize = require('sequelize')

const UserModel = require('../models/user')
const ProductModel = require('../models/product')



const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_Port
  }
);

sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err) => {
            console.log('Unable to connect to the database:', err);
        });


const UserList = UserModel(sequelize, Sequelize)
const ProductList = ProductModel(sequelize, Sequelize)

const Models = { UserList, ProductList }
const connection = {}

module.exports = async () => {
  if (connection.isConnected) {
    console.log('=> Using existing connection.')
    return Models
  }

  await sequelize.sync()
  await sequelize.authenticate()
  connection.isConnected = true
  console.log('=> Created a new connection.')
  return Models
}