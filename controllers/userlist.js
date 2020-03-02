const connectToDatabase = require('../config/database');

// passport start
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
// import passport and passport-jwt modules
const passport = require("passport");
const passportJWT = require("passport-jwt");
// passport end

// get lists
module.exports.list = list = async (req, res) => {
  const { UserList } = await connectToDatabase()
  UserList.findAll({attributes:['id','name','email','password']}) 
  .then(userlists => {
    res.json({
          'status':true,
          userlists
      })
  })
  .catch(err => {
    res.json({
        'status':false,
        'message':'SOMETHING_WRONG',
        err
      })
  })
}

// user edit
module.exports.get = get = async (req, res) => {
  let id = req.params.id;
  const { UserList } = await connectToDatabase()
  UserList.findAll({attributes:['id','name','email'], where:{'id' : id}})
  .then(result => {
    res.json({
          'status':true,
          result
      })
  })
  .catch(err => {
    res.json({
        'status':false,
        'message':'SOMETHING_WRONG',
        err
      })
  })
}

// user update
module.exports.put = put = async (req, res) => {
  let id    = req.params.id;
  let name  = req.body.name;
  let email = req.body.email;
  const { UserList } = await connectToDatabase()

  UserList.findByPk(id)
  .then(data => {
    if(data){
      UserList.update(
        { name: name, email: email }, { where: { id: id }
      })
      .then( result => {
        res.json({
          'status':true,
          'message':'UPDATE_SUCCESS',
          data,
          id
        });
      })
      .catch(err => {
        res.json({
          'status':false,
          'message':'SOMETHING_WRONG',
          err
        })
      });
    }else{
      res.json({
        'status':false,
        'message':'SOMETHING_WRONG',
      })
    }
  })
}

// user delete
module.exports.deleteuser = deleteuser = async (req, res) => {
  let id = req.params.id;
  const { UserList } = await connectToDatabase()

  UserList.destroy({
    where: {
      id: id
    }
  })
  .then( (result) => {
    res.json({
        'status':true,
      'message':'DELETED_SUCCESS'
    })
  })
  .catch(err => {
    res.json({
        'status':false,
        'message':'SOMETHING_WRONG',
    })
  })
}

// user register
module.exports.register = register = async (req, res) => {
  let name  = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let status = req.body.status;
  const { UserList } = await connectToDatabase()

  UserList.findAll({attributes:['id', 'name', 'email', 'password', 'status'] , where:{name: name, email: email, password: password, status: status}})
  .then(data => {
    res.mailer.send('register-email', {
      to: email,
      subject: 'User register',
      otherProperty: 'Other Property'
    }, function (err, message) {
      if (err) {
        console.log(err);
        res.send('There was an error rendering the email');
        return;
      }
      res.header('Content-Type', 'text/plain');
      // res.send(message);
      res.send('Email sent successfully.');
    });

    if(!data.length){
      UserList.create({
        name : name,
        email : email,
        password : password,
        status : status
      })
      .then( result => {
        res.json({
          'status':true,
          'message':'REGISTER_SUCCESS',
          result
        });
        })
      .catch(err => {
        res.json({
            'status':false,
            'message':'SOMETHING_WRONG',
            err
          })
      });
    }
  })
}

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "wowwow";



// lets create our strategy for web token
/*let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log("payload received", jwt_payload);
  let user = getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

app.use(passport.initialize());*/

// user login check
module.exports.logincheck = logincheck = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  const { UserList } = await connectToDatabase()

  UserList.findAll({where:{'email' : email}})
    .then(user => {

    	let originalPassword = user[0].dataValues.password;
    	let originalId = user[0].dataValues.id;

    	if (email && password) {
		    if (user == '') {
		      res.status(401).json({ msg: "No such user found"+ user });
		    }
		    if (password === originalPassword) {
		      let payload = { id: originalId };
		      let token = jwt.sign(payload, jwtOptions.secretOrKey);
		      res.json({
		      		msg: "Login successfully.",
		      		token: token
		      	});
		    } else {
		      res.status(401).json({ msg: "Password is incorrect" });
		    }
		  }
    })
    .catch(err => {
      res.json({
          'status':false,
          'message':'SOMETHING_WRONG No such user found catch',
          err
        })
    })
}

// user logout
module.exports.logout = logout = async (req, res) => {
  let id = req.params.id;
  const { UserList } = await connectToDatabase()

  req.logout();

  res.redirect('/');

  res.json({
    'status':true,
    'message':'User logout successfully.',
  });
}