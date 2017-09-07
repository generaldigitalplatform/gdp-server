var mongoose = require('mongoose'),
	User = mongoose.model('User');
var ObjectId = require('mongoose').Types.ObjectId;

exports.findAllFieldForce = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	User.find({},function(err,profile){
			if(err) return res.send(err);
			res.json(profile);
		});
	};
exports.updateUserById = function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var updateData = req.body;
    var options ={upsert:true,new: true};
    var query;

    query = {"employeeid":req.params.Id};
    
    User.findOneAndUpdate(query,{$set:updateData},options,function(err,profile){
        if (err) return res.send(err);;
        if(profile)
        {
            res.json(profile);
        }
    });
};
exports.deleteUserById = function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    query = {"employeeid":req.params.Id};

    User.findOneAndRemove(query,function(err,profile){
    if(err) return res.send(err);
    if(profile)
        {
            res.json(profile);
        }
    });
};
