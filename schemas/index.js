var mongoose=require("mongoose");
	
//Schema({..}, options);
var contact=new mongoose.Schema({
		first_name:{type:String, required:true, trim: true},
		last_name:{type:String, required:true, trim: true},
		email:{type:String, required: true, trim: true},
		address:{type:String, required: true, trim: true},
		mobile_number:{type:Number,required: true},
		home_number:{type:Number,required: true}
	},
		{versionKey: false}
	);

var models={
	Contact : mongoose.model("Contacts", contact),
}

module.exports=models;
