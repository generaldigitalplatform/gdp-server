var mongoose = require('mongoose'),
	employeeLocationModel = mongoose.model('EmployeeLocation');
var ObjectId = require('mongoose').Types.ObjectId;

exports.findAllEmployeeLocation = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	employeeLocationModel.find({},function(err,profile){
			if(err)
				res.send(err);
			res.json(profile);
		});
	};
exports.findEmployeeLocationById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var query = {"EmployeeId":req.params.Id};
	employeeLocationModel.findOne(query,function(err,profile){		
		if (err) res.send(err);
		if(profile)
		{
			res.json(profile);
		}
	});
};
exports.createEmployeeLocation = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var newEmployeeLocation = new employeeLocationModel(req.body);
	newEmployeeLocation.save(function(err, profile){
	if(err)
		res.send(err);
	res.json(profile);
	});
}; 
exports.updateEmployeeLocationById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	//var query = {"EmployeeId":req.params.Id};
	var updateData = req.body;
	var options = {upsert:true,new: true};

	var employeeLocationObjId = new ObjectId( (req.params.Id.length < 12) ? "123456789012" : req.params.Id );

	//var employeeLocationObjId = new ObjectId(req.params.Id);
	var query = {$or:[{"_id":employeeLocationObjId},{"EmployeeId":req.params.Id}]};


	employeeLocationModel.findOneAndUpdate(query,{$set:updateData},options,function(err,profile){
		if (err) res.send(err);;
		if(profile)
		{
			res.json(profile);
		}
	});
};
exports.deleteAllEmployeeLocations = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	employeeLocationModel.remove({},function(err,profile){
			if(err)
				res.send(err);
			res.json(profile);
		});
	};
exports.deleteEmployeeLocationById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var query = {"EmployeeId":req.params.Id};
	employeeLocationModel.findOneAndRemove(
		query,function(err,profile){
		if(err)
			res.send(err);
		res.json(profile);
	});
};