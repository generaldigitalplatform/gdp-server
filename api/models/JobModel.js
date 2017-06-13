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
		StartJob: [{
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
	    DateTime:Date,
	    Status:String
	}],
		EndJob: [{
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
	   	DateTime:Date,
	   	Status:String
	}],
		Feedback:String
	}]	
},{"strict":false});

JobSchema.index({ 'StartJob': '2dsphere','EndJob': '2dsphere' });
module.exports = mongoose.model('Job',JobSchema);
