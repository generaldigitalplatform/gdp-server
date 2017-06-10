var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var EmployeeLocationSchema = new Schema({
	EmployeeId:Object,
	TrackDateTime:Date,
	Status:String,
	LocationName:String,
	geo: {
	    type: {
	      type: "String",
	      required: true,
	      enum: ['Point', 'LineString', 'Polygon'],
	      default: 'Point'
	    },
    coordinates: {
        type: [Number]
    }
}

},{"strict":false});

EmployeeLocationSchema.index({ 'geo': '2dsphere' });
module.exports = mongoose.model('EmployeeLocation',EmployeeLocationSchema);
