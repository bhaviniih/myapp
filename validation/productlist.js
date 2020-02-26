let Joi = require('joi');


module.exports.post = {
	body: {
		name: Joi.string().required().label("Name is required."),
		price: Joi.number().min(3).max(5).required().label("Price is required."),
	}
};

module.exports.put = {
	body: {
		name: Joi.string().required().label("Name is required."),
		price: Joi.number().min(3).max(5).required().label("Price is required."),
	}
};