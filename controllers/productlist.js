const connectToDatabase = require('../config/database');

// ============ API end ============

// get lists
module.exports.list = list = async (req, res) => {
  const { ProductList } = await connectToDatabase()
  ProductList.findAll({attributes:['id','name','price']}) // ProductList.findAll({})
    .then(productlists => {
      res.json({
            'status':true,
            productlists
        })
    })
    .catch(err => {
      res.json({
          'status':false,
          'message':'SOMETHING_WRONG',
          err
        })
    })

    /*let productlists1 = ProductList.findAll({attributes:['id','name','price']}) // ProductList.findAll({})
  let productlists2 = ProductList.findAll({attributes:['id','name','price']})

  let data_all = await Promise.all([productlists1, productlists2])

    res.json({
          'status':true,
          'data1':data_all,
          
      })*/
}

// save single
module.exports.post = post = async (req, res) => {
  let name  = req.body.name;
  let price = req.body.price;
  const { ProductList } = await connectToDatabase()

  ProductList.findAll({attributes:['id', 'name', 'price'] , where:{name: name, price: price}})
  .then(data => {
    if(!data.length){
      ProductList.create({
        name : name,
        price : price
      })
      .then( result => {
        res.json({
          'status':true,
          'message':'INSERT_SUCCESS',
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

// get single
module.exports.get = get = async (req, res) => {
  let id = req.params.id;
  const { ProductList } = await connectToDatabase()
  ProductList.findAll({attributes:['id','name','price'], where:{'id' : id}})
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

// update
module.exports.put = put = async (req, res) => {
  let id   = req.params.id;
  let name = req.body.name;
  let price = req.body.price;
    const { ProductList } = await connectToDatabase()

    ProductList.findByPk(id)
    .then(data => {
      if(data){
      ProductList.update(
        { name: name, price: price }, { where: { id: id } 
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

// delete single
module.exports.deleteproduct = deleteproduct = async (req, res) => {
  let id = req.params.id;
  const { ProductList } = await connectToDatabase()

  ProductList.destroy({
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


// sent mail
module.exports.email = email = async (req, res) => {
  res.mailer.send('email', {
    // to: 'bhavin.iihglobal@gmail.com',
    to: 'bhaviniih@yopmail.com',
    subject: 'Test Email Node Js',
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
}


// ============ API end ============


// ============ Simple CRUD Start ============

// product lists
module.exports.productlists = productlists = async (req, res) => {
  const { ProductList } = await connectToDatabase()
  ProductList.findAll({attributes:['id','name','price'], raw: true}) // ProductList.findAll({})
  .then(productlists => {
    res.render('products/product', {
      results: productlists
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

// product save
module.exports.productsave = productsave = async (req, res) => {
  console.log(req.body);
  let name  = req.body.product_name;
  let price = req.body.product_price;
  const { ProductList } = await connectToDatabase()

  ProductList.findAll({attributes:['id', 'name', 'price'] , where:{name: name, price: price}})
  .then(data => {
    if(!data.length){
      ProductList.create({
        name : name,
        price : price
      })
      .then( result => {
        return res.redirect('lists');
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

// product update
module.exports.productupdate = productupdate = async (req, res) => {
  let id   = req.body.id;
  let name = req.body.product_name;
  let price = req.body.product_price;
  const { ProductList } = await connectToDatabase()

  ProductList.findByPk(id)
  .then(data => {
    if(data){
      ProductList.update(
        { name: name, price: price }, { where: { id: id } 
      })
      .then( result => {
        return res.redirect('lists');
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


// product delete
module.exports.productdelete = productdelete = async (req, res) => {
  let id = req.body.product_id;

  const { ProductList } = await connectToDatabase()
  ProductList.destroy({
    where: {
      id: id
    },
    raw: true
  })
  .then( (result) => {
    return res.redirect('lists');
  })
  .catch(err => {
    res.json({
      'status':false,
      'message':'SOMETHING_WRONG',
    })
  })
}


// ============ Simple CRUD End ============
