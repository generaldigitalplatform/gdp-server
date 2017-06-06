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
		StartLocation:[{
			    location:String,
				type:[Number],
				index:'2d',
			}],
		EndLocation:[{
				location:String,
				type:[Number],
				index:'2d',
			}],
		CancelLocation:[{
				location:String,
				type:[Number],
				index:'2d',
			}],	
		StartDateTime:Date,
		EndDateTime:Date,
		CancelDateTime:Date,
		PauseDateTime:Date,
		Reason:String,
		Remarks:String
	}]	
},{"strict":false});

module.exports = mongoose.model('Job',JobSchema);
