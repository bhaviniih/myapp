const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var mailer = require('express-mailer'); // mail


app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: false}));



// passport start

// const express = require(‘express’);
// const bodyParser = require(‘body-parser’);
// const jwt = require('jsonwebtoken');
// // import passport and passport-jwt modules
// const passport = require("passport");
// const passportJWT = require("passport-jwt");
// // ExtractJwt to help extract the token
// let ExtractJwt = passportJWT.ExtractJwt;
// // JwtStrategy which is the strategy for the authentication
// let JwtStrategy = passportJWT.Strategy;
// let jwtOptions = {};
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// jwtOptions.secretOrKey = "wowwow";



// // lets create our strategy for web token
// let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
//   console.log("payload received", jwt_payload);
//   let user = getUser({ id: jwt_payload.id });
//   if (user) {
//     next(null, user);
//   } else {
//     next(null, false);
//   }
// });
// // use the strategy
// passport.use(strategy);


// app.use(passport.initialize());

// passport end



// mail
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



const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes 	= require('./routes/orders');


app.use('/products', productRoutes);
app.use('/users', userRoutes);




module.exports = app;