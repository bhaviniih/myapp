const express = require("express");
const router = express.Router();
const connectionmysql = require('../config/database');
// const connectionmysql = require('../database');

const Product = require("../models/product");


// get list all
router.get("/", (req, res, next) => {
  console.log(req);
  var results = [];
   connectionmysql.query('select * from products', function (error, r, fields) {
    if (error) throw error;
    // res.end(JSON.stringify(results));
    // results = r // modifiy results
    res.json(results);
  });
    // res.json(results);
});

// create
router.post('/', function (req, res, next) {
  var postData  = req.body;
  console.log(postData);
  connectionmysql.query('INSERT INTO products SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});


// get single
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  connectionmysql.query('select * from products where id=?', [id], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });  
});


// update
router.patch('/:productId', function (req, res, next) {
   const id = req.params.productId;
   connectionmysql.query('UPDATE `products` SET `name`=?,`price`=? where `id`=?', [req.body.name,req.body.price,id], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});


//  delete
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  
  connectionmysql.query('DELETE FROM products WHERE id = ?', [id], (err, rows, fields) => {
  if (!err)
    res.send('Product Record deleted successfully.');
    else
    console.log(err);
  })

});


module.exports = router;