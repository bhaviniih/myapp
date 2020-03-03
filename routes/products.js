const express = require("express");
const app = express();
const routes = express.Router();
const connectToDatabase = require('../config/database');
const validate = require('express-validation')
const productValidate = require('../validation/productlist')
const productController = require('../controllers/productlist')
const bodyParser = require("body-parser");


/*app.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
	res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
});*/

routes.get("/lists", productController.productlists);
routes.post("/prodelete", productController.productdelete);
routes.post("/update", productController.productupdate);
routes.post("/save", productController.productsave);

// API start
routes.get("/", productController.list);
routes.post("/", validate(productValidate.post), productController.post);
routes.get("/:id", productController.get);
routes.put("/:id", validate(productValidate.put), productController.put);
routes.delete("/:id", productController.deleteproduct);

routes.get("/email/template", productController.email);
// API end

module.exports = routes;