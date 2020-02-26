const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: false}));


const productRoutes = require('./routes/products');
const orderRoutes 	= require('./routes/orders');


app.use('/products', productRoutes);


module.exports = app;