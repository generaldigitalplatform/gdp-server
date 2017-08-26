var mongoose = require('mongoose'),
	userModel = mongoose.model('User');
var ObjectId = require('mongoose').Types.ObjectId;

exports.findAllFieldForce = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	userModel.find({},function(err,profile){
			if(err) return res.send(err);
			res.json(profile);
		});
	};
