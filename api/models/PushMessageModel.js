var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PushMessageSchema = new Schema({
	DeviceToken:String,
	UserId:String
},{timestamps:true},{"strict":false});

module.exports = mongoose.model("PushMessage",PushMessageSchema);
