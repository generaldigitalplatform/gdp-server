var mongoose = require('mongoose'),
	customerProfileModel = mongoose.model('CustomerProfile');

exports.createNewCustomerProfile = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var customerProfile = new customerProfileModel(req.body);
	customerProfile.save(function(err, profile){
	if(err)
		res.send(err);
	res.json(profile);
	});
}; 
exports.findAllCustomerProfile = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	customerProfileModel.find({},function(err,profile){
			if(err)
				res.send(err);
			res.json(profile);
		});
	};
exports.findCustomerProfileById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	//var query = {_id:req.params.Id};
	var query = {"PrimaryPhone":req.params.Id};
	customerProfileModel.findOne(query,function(err,profile){
		if (err) res.send(err);;
		if(profile)
		{
			res.json(profile);
		}
	}).maxTime(1).exec();
};
exports.updateCustomerProfileById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var query = {"PrimaryPhone":req.params.Id};
	var updateData = req.body;
	var options = {upsert:true,new: true};
	
	customerProfileModel.findOneAndUpdate(query,{$set:updateData},options,function(err,profile){
		if (err) res.send(err);;
		if(profile)
		{
			res.json(profile);
		}
	});
};
exports.deleteAllCustomerProfile = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	customerProfileModel.remove({},function(err,profile){
			if(err)
				res.send(err);
			res.json(profile);
		});
	};
exports.deleteCustomerProfileById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	//var query = {_id:req.params.Id};
	var query = {"PrimaryPhone":req.params.Id};
	customerProfileModel.findOneAndRemove(query,function(err,profile){
		if (err) res.send(err);;
		if(profile)
		{
			res.json(profile);
		}
	});
};
