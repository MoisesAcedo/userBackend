'use strict'

//This const is ddbb connection
const mongoose = require('mongoose');
//use this for avoid deprecated warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
//express const
const app = require('./app');

//port
const port = process.env.PORT || 3000;

//Default mongo port is 27017 ddbb name is users
mongoose.connect('mongodb://localhost:27017/users' ,(err, res) => {
if(err){

	throw err;
	
	
}else{

	console.log("Mongo connection successfully stablish");
	app.listen(port, function(){
		console.log("Listen at: http://localhost:" +port);
	});

}
});




