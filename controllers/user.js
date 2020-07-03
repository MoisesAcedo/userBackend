'use strict'
//dependencies
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const jwt = require('../services/jwt');
const fs = require('fs');
const path = require('path');

//saveUser is call by save user route:
function saveUser(req, res) {
	var user = new User();
	var params = req.body;
	console.log(params);
	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.role = 'ROLE_ADMIN';
	user.image = 'null';
	if (params.password) {
		//Password encrypt
		bcrypt.hash(params.password, null, null, function (err, hash) {
			user.password = hash;
			if (user.name != null && user.surname != null && user.email != null) {
				//save user
				user.save((err, userStored) => {
					if (err) {
						res.status(500).send({ message: "Server error on save user" });
					} else {
						if (!userStored) {
							res.status(404).send({ message: "Client error on save user" });
						} else {
							res.status(200).send({ user: userStored });
						}
					}
				});
			} else {
				res.status(200).send({ message: "All inputs must be filled" });
			}
		});
	} else {
		//
		res.status(200).send({ message: "Insert password" });
	}
}

//login function call by login route
function loginUser(req, res) {
	var params = req.body;
	var email = params.email;
	var password = params.password;
	User.findOne({ email: email.toLowerCase() }, (err, user) => {
		if (err) {
			res.status(500).send({ message: 'Server error on login' });
		} else {
			if (!user) {
				res.status(404).send({ message: 'User doesnt exist' });
			} else {
				//check password
				bcrypt.compare(password, user.password, function (err, check) {
					if (check) {
						//giving user data back
						if (params.gethash) {
							//Giving token back
							res.status(200).send({
								token: jwt.createToken(user)
							});
						} else {
							res.status(200).send({ user, message: 'OK' });
						}
					} else {
						res.status(404).send({ message: 'Wrong password' });

					}
				});
			}
		}
	})
}

//login function call by updateUser route
function updateUser(req, res) {
	var userId = req.params.id;
	var update = req.body;
	User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
		if (err) {
			res.status(500).send({ message: 'Server error on user update' });
		} else {
			if (!userUpdated) {
				res.status(404).send({ message: 'Client error on user update' });
			} else {
				res.status(200).send({ user: userUpdated });
			}
		}
	});
}

//login function call by uploadImage route
function uploadImage (req, res) {

	//Check request is not empty, so there's a req on navigator
	if (req.files) {
		//It'll give you the name of the file no path only name of file
		console.log(req);
		
		var fileName = req.files.image.name;
		console.log('fileName: ' +fileName);

		//to get file extension we'd split fileName so we'll get and array [file,extension] 
		var fileExt = fileName.split('.')[1];
		console.log('fileExt: ' + fileExt);
		//params are sent by us on navigator or postman in this case id is the name of our params in 
		//this route .../api/upload-image/:id
		var userId = req.params.id;
		//console.log(userId);
		//we'll need a final name that contains id and extension 
		var fileNameDef = userId + '.' + fileExt;
		//we'll move with mv method image to uploads directory
		req.files.image.mv(path.resolve(__dirname, '../uploads/users', fileNameDef),
			function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("uploaded");
				}
			});
			

		//we'll test extension is for a image   
		if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
			//this is mongo query
			User.findByIdAndUpdate(userId, { image: fileNameDef },{ new: true }, (err, userUpdated) => {
				if (err) return res.status(500).send({ message: 'La imagen no se ha subido' });
				if (!userUpdated) return res.status(404).send({ message: 'El proyecto no existe y no se ha asignado la imagen' });
				return res.status(200).send({
					messaje: 'image actualizada en el JSON',
					//project (or any property) asignated to projectUploaded returns correct query
					user: userUpdated
				});
			});
			//fs.unlink delete temporaly path when error occurs
		} else {
			fs.unlink(fileName, (err) => {
				return res.status(200).send({ message: 'La extensión no es válida' });
			});
		}
	} else {
		return res.status(200).send({
			message: fileName

		});

	}
}

module.exports = {
	saveUser,
	loginUser,
	updateUser,
	uploadImage
};
