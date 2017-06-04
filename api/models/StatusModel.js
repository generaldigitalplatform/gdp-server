var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatusSchema = new Schema({
	Title:String	
},{"strict":false});

module.exports = mongoose.model('Status',StatusSchema);
