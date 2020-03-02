let Joi = require('joi');


module.exports.register = {
	body: {
		name: Joi.string().required().label("Name is required."),
		email: Joi.string().required().label("Email is required."),
		password: Joi.string().required().label("Password is required."),
	}
};

module.exports.logincheck = {
	body: {
		email: Joi.string().required().label("Email is required."),
		password: Joi.string().required().label("Password is required."),
	}
};

module.exports.put = {
	body: {
		name: Joi.string().required().label("Name is required."),
		email: Joi.string().required().label("Email is required."),
	}
};