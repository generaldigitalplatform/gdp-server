var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;


var JobSchema = new Schema({
	JobId:Object,
	CustomerId:Object,
	EmployeeId:Object,
	EmployeeName:String,	
	JobDetails:[{
		JobTitle:String,
		JobDescription:String,
		JobDateTime:Date,
		JobLocation:String,
		JobStatus:String,
		Feedback:String,
		StartedJob: [{
	    type: {
	      type: "String",
	      required: true,
	      enum: ['Point', 'LineString', 'Polygon'],
	      default: 'Point'
	    },
	    Coordinates:{
	        type: [Number]
	    },
	    Area:String,
	    DateTime:Date
		}],
		ReachedLocation: [{
		    type: {
		      type: "String",
		      required: true,
		      enum: ['Point', 'LineString', 'Polygon'],
		      default: 'Point'
		    },
		    Coordinates:{
		        type: [Number]
		    },
		    Area:String,
		    DateTime:Date	
		}],
		DoneJob: [{
			DateTime:Date	    
   			 }]
		}]	
},{"strict":false});
JobSchema.index({ 'StartedJob': '2dsphere','ReachedLocation': '2dsphere' });
module.exports = mongoose.model('Job',JobSchema);
