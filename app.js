const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var mailer = require('express-mailer'); // mail


app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: false}));





 
mailer.extend(app, {
  from: 'iihglobal.zoom@gmail.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'iihglobal.zoom@gmail.com',
    pass: 'iih@1234'
  }
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');



const productRoutes = require('./routes/products');
const orderRoutes 	= require('./routes/orders');


app.use('/products', productRoutes);




module.exports = app;