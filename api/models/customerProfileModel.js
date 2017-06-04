var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerProfileSchema = new Schema({
	FirstName:String,
	LastName:String,
	PrimaryPhone:String,
	SecondaryPhone:String,
	ContactAddress:{
		DoorNumber:String,
		BuildingNumber:String,
		BuildingName:String,
		Street:String,
		Area:String,
		City:String,
		Taluk:String,
		District:String,
		Zone:String,
		State:String,
		Pincode:String,
		Landmark:String
	},
	PermanentAddress:{
		DoorNumber:String,
		BuildingNumber:String,
		BuildingName:String,
		Street:String,
		Area:String,
		City:String,
		Taluk:String,
		District:String,
		Zone:String,
		State:String,
		Pincode:String,
		Landmark:String
	},
	SocialCommunication:{
		Email:String,
		WhatsApp:String,
		Facebook:String,
		Twitter:String		
	},		
	Occupation:String
},{	"strict":false});

module.exports = mongoose.model('CustomerProfile',CustomerProfileSchema);
