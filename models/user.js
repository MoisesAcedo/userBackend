'use strict'
//We need to use a schema for modeling our user collection
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({

	name: String,
	surname: String,
	email: String,
	password: String,
	role: String,
	image: String

});

module.exports = mongoose.model('User', UserSchema)
