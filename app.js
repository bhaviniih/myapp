require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mailer = require('express-mailer'); // mail

const exphbs  = require('express-handlebars'); // view engine
const path = require('path'); // path





app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: false}));


// mail
mailer.extend(app, {
  from: process.env.MAIL_FROM_ADDRESS,
  host: process.env.MAIL_HOST, // hostname
  secureConnection: true, // use SSL
  port: process.env.MAIL_PORT, // port for secure SMTP
  transportMethod: process.env.MAIL_DRIVER, // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');



const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes 	= require('./routes/orders');


app.use('/products', productRoutes);
app.use('/users', userRoutes);


// view engine start

// app.use('/public/css', express.static(path.join(__dirname, 'assets')))
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
app.get('/dashboard', function (req, res) {
    res.render('dashboard');
});


module.exports = app;