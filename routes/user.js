'use strict'
//Use Express controller and routes
const express = require('express');
const UserController = require('../controllers/user');
const api = express.Router();

//Using this middleware for token authetication JWT
const md_auth = require('../middlewares/authenticated');

//ROUTES
//Save user
api.post('/register', UserController.saveUser);
//login
api.post('/login', UserController.loginUser);
//update user
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
//upload user images
api.post('/upload-image-user/:id', [md_auth.ensureAuth], 
UserController.uploadImage);module.exports = api;

