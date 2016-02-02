var controllers={};

controllers.getContactList=function(req, res){
			console.log('get methiod');
	models.Contact.find(function(err, contacts) {
		if(contacts){
		    res.locals.contacts=contacts;	
		}
		res.render('index',{title:"Contacts"});
	});
}

controllers.getContactsByNumber=function(req, res){
	var queryString=req.query.query;
		console.log(queryString);

	models.Contact.findOne({'mobile_number': queryString},function(err, contacts){
		if(err){
			console.log(err);
		}
		console.log(contacts);
		res.send(contacts);
	});
}

controllers.getContacts=function(req, res){
	var queryString=req.query.query;
		console.log("get contacts");

	models.Contact.find({'first_name': queryString},function(err, contacts){
		if(err){
			console.log(err);
		}
		console.log(contacts);
		res.send(contacts);
	});
}


controllers.postContactList=function(req, res){
	 var Contact=new models.Contact({
    	first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		address: req.body.address,
		mobile_number:req.body.mobile_number,
		home_number:req.body.home_number
    });

    Contact.save(function(err){
		if(err){
			console.log('Error');
			var error= 'Something went wrong! Pls try again.'
			if(err.code===11000){
				error= 'That contact number is already taken, try another';
			}
			res.render('/', {error: error});
		}else{
			//req.session.successMsg="Succefull saved contact";
			console.log('saved data');
			res.redirect('/');
		}
	});
}

	
module.exports=controllers;