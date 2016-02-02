var mongoose=require("mongoose");

/*No internet*/
mongoose.connect("mongodb://127.0.0.1:27017/contacts");

/*With internet connection
mongoose.connect("mongodb://localhost:27017/mystudents");
*/

module.exports=mongoose.connection;