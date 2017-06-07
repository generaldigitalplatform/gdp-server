var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmployeeLocationSchema = new Schema({
	EmployeeId:Number,
	TrackDateTime:Date,
	Status:String,
	CurrentLocation:[{	
	  			Name: { type: String },		  
				coordinates:[Number]				
			}]	
},{"strict":false});

EmployeeLocationSchema.index({ "Location": "2dsphere" });

module.exports = mongoose.model('EmployeeLocation',EmployeeLocationSchema);
