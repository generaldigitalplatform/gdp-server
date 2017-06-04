var mongoose = require('mongoose'),
	employeeProfileModel = mongoose.model('EmployeeProfile');
	ObjectId = mongoose.Types.ObjectId;

exports.findAllEmployeeProfile = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	employeeProfileModel.find({},function(err,profile){
			if(err)
				res.send(err);
			res.json(profile);
		});
	};
exports.findEmployeeProfileById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var query = {"PrimaryPhone":req.params.Id};
	employeeProfileModel.findOne(query,function(err,profile){
		if (err) res.send(err);;
		if (err) res.send(err);;
		if(profile)
		{
			res.json(profile);
		}
	});
};
exports.createNewEmployeeProfile = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var newEmployeeProfile = new employeeProfileModel(req.body);
	newEmployeeProfile.save(function(err, profile){
	if(err)
		res.send(err);
	res.json(profile);
	});
}; 
exports.updateEmployeeProfileById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var query = {"PrimaryPhone":req.params.Id};
	var updateData = req.body;
	var options = {upsert:true,new: true};
	
	employeeProfileModel.findOneAndUpdate(query,{$set:updateData},options,function(err,profile){
		if (err) res.send(err);;
		if(profile)
		{
			res.json(profile);
		}
	});
};
exports.deleteAllEmployeeProfile = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	employeeProfileModel.remove({},function(err,profile){
			if(err)
				res.send(err);
			res.json(profile);
		});
	};
exports.deleteEmployeeProfileById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var query = {"PrimaryPhone":req.params.Id};
	employeeProfileModel.findOneAndRemove(
		query,function(err,profile){
		if(err)
			res.send(err);
		res.json(profile);
	});
};