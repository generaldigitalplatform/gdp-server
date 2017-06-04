var mongoose = require('mongoose');
var Schema = mongoose.Schema,

var JobSchema = new Schema({
	JobId:Object,
	CustomerId:Object,
	EmployeeId:Object,
	EmployeeName:String ,
	Status:String,
	Remarks:String,
	JobDetails:[{
		StartLocation:{
			[
				lat:Double,
				lan:Double
			]
		},
		EndLocation:{
			[
				lat:Double,
				lan:Double
			]
		},
		CancelLocation:{
			[
				lat:Double,
				lan:Double
			]
		},
		PauseLocation:{
			[
				lat:Double,
				lan:Double
			]
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
