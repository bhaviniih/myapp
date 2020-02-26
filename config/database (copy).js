const mysql = require('mysql');
const Sequelize = require('sequelize')


const connectionmysql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'node_js'
});
connectionmysql.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});


module.exports = connectionmysql;



/*const Sequelize = require('sequelize')

const ProductModel = require('./models/product')

const connectionmysql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'node_js'
});
connectionmysql.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});


const Product = ProductModel(sequelize, Sequelize)

const Models = { Product }
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
}*/