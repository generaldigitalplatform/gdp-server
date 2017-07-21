var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var DeviceTokenSchema = new Schema({
	DeviceToken:String,
	UserId:String
},{timestamps:true},{"strict":false});

module.exports = mongoose.model("DeviceToken",DeviceTokenSchema);
