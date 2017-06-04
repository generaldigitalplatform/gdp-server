var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var EmployeeLocationSchema = new Schema({
	EmployeeId:ObjectId,
	TrackDateTime:Date,
	Status:String,
	Location:{
		[
			lat:Double,
			lan:Double
		]
	}
},{"strict":false});

module.exports = mongoose.model('EmployeeLocation',EmployeeLocationSchema);
