
module.exports=function(){
	var express=require('express'),
		app=express(),
		path=require('path'),
		db=require('./db'),
		dust = require('dustjs-linkedin'),
		cons = require('consolidate'),
		bodyParser = require('body-parser'),
		routes=require('./routes');
		models=require('./schemas');

	app.set('port', process.env.PORT || 3000);
	app.use(express.static(path.join(__dirname, 'public')));

	app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true, defer: true }));
	
	/*login routs*/
	app.get('/getContactList', routes.getContactList);
	app.post('/addContact', routes.addContact);
	app.post('/updateContact', routes.updateContact);
	
	return app;
}