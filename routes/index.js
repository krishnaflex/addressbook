var controllers={};

controllers.getContactList=function(req, res){
	console.log("Got get request");
	models.Contact.find(function(err, contacts) {
		if(contacts){
		    res.json(contacts);	
		}
		if(err){
			res.send(err);
		}
	});
}

controllers.updateContact= function(req, res){
	//update({condition},{update},{options},callback)
	models.Contact.update({_id: req.body._id},{
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		address: req.body.address,
		mobile_number:req.body.mobile_number,
		home_number:req.body.home_number
	},function(err, dbmodel){
		if(err){
			console.log("Update error");
			console.log(err);
		}else{
			console.log("Updated Succefully");
			console.log(dbmodel);
			res.json(dbmodel);
		}
	});
}

controllers.addContact=function(req, res){
	console.log("Post Method")
	 var Contact=new models.Contact({
    	first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		address: req.body.address,
		mobile_number:req.body.mobile_number,
		home_number:req.body.home_number
    });

    Contact.save(function(err, contact){
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
			res.json(contact);
		}
	});
}

	
module.exports=controllers;