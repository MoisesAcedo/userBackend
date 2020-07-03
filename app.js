'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const fileUpload = require('express-fileupload');

//import routes
var user_routes = require('./routes/user');

//body parser return a JSON 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//For upload files
app.use(express.static(__dirname));
app.set('view engine', 'ejs');
app.use(fileUpload());


//All routes have a base route /api/

app.use('/api', user_routes);


//Module export
module.exports = app;

