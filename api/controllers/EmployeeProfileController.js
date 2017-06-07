var mongoose = require('mongoose'),
	employeeProfileModel = mongoose.model('EmployeeProfile');
var ObjectId = require('mongoose').Types.ObjectId;

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
	var employeeObjId = new ObjectId(req.params.Id);
	var query = {$or:[{"_id":employeeObjId},{"EmployeeId":req.params.Id},{"PrimaryPhone":req.params.Id},{"SecondaryPhone":req.params.Id},{'ContactAddress.Pincode':req.params.Id},{'ContactAddress.City':req.params.Id},{'ContactAddress.Zone':req.params.Id},{'ContactAddress.State':req.params.Id},{'ContactAddress.Area':req.params.Id}]};
	
	employeeProfileModel.findOne(query,function(err,profile){
		if (err) res.send(err);
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