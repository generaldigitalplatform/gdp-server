var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;


var JobSchema = new Schema({
	JobId:Object,
	CustomerId:Object,
	EmployeeId:Object,
	EmployeeName:String ,
	Status:String,
	Remarks:String,
	JobDetails:[{
		StartLocation:{
			    Name: { type: String },
        		coordinates: []
			},
		EndLocation:{
			 	Name: { type: String },
        		coordinates: []
			},
		CancelLocation:{
 				Name: { type: String },
        		coordinates: []
			},	
		StartDateTime:Date,
		EndDateTime:Date,
		CancelDateTime:Date,
		PauseDateTime:Date,
		Reason:String,
		Remarks:String
	}]	
},{"strict":false});

module.exports = mongoose.model('Job',JobSchema);
