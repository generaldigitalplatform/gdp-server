var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;


var JobSchema = new Schema({	
	CustomerId:Object,
	EmployeeId:Object,
	EmployeeName:String,
	JobDetails:{
		JobId:Object,
		JobTitle:String,
		JobDescription:String,
		JobDateTime:Date,
		JobLocation:String,
		JobStatus:String,
		JobCreatedTime:Date,
		JobCreatedBy:String
	},	
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

},{"strict":false});
JobSchema.index({ 'StartedJob': '2dsphere','ReachedLocation': '2dsphere' });
module.exports = mongoose.model('Job',JobSchema);
