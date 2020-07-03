'use strict'
//importing  JWT dependency
const jwt = require('jwt-simple');
//importing moment dependency
const moment = require('moment');
//We can use any default key
const secret = 'secret_user_key';
exports.ensureAuth = function (req, res, next) {
	if (!req.headers.authorization) {
		return res.status(403).send({
			message: 'Header missing'
		});
	}
	var token = req.headers.authorization.replace(/['"]+/g, '');
	try {
		var payload = jwt.decode(token, secret);
		if (payload.exp <= moment().unix()) {
			return res.status(404).send({ message: 'Token expired' });
		}
	} catch (ex) {
		//console.log(ex);
		return res.status(404).send({ message: 'Invalid token' });
	}
	req.user = payload;
	next();
};
