var mongoose = require('mongoose'),
	deviceTokenModel = mongoose.model('DeviceToken');
var ObjectId = require('mongoose').Types.ObjectId;

exports.createDeviceToken = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var deviceToken = new deviceTokenModel(req.body);
	deviceToken.save(function(err, profile){
	if(err)
		res.send(err);
	res.json(profile);
	});
}; 