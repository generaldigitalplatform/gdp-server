var mongoose = require('mongoose'),
	jobModel = mongoose.model('Job');

exports.findAllJobs = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	jobModel.find({},function(err,profile){
			if(err)
				res.send(err);
			res.json(profile);
		});
	};
exports.findJobById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var query = {"JobId":req.params.Id};
	jobModel.findOne(query,function(err,profile){
		if (err) res.send(err);;
		if(profile)
		{
			res.json(profile);
		}
	});
};
exports.createNewJob = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var newJob = new jobModel(req.body);
	newJob.save(function(err, profile){
	if(err)
		res.send(err);
	res.json(profile);
	});
}; 
exports.updateJobById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var query = {"JobId":req.params.Id};
	var updateData = req.body;
	var options = {upsert:true,new: true};
	
	jobModel.findOneAndUpdate(query,{$set:updateData},options,function(err,profile){
		if (err) res.send(err);;
		if(profile)
		{
			res.json(profile);
		}
	});
};
exports.deleteAllJobs = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	jobModel.remove({},function(err,profile){
			if(err)
				res.send(err);
			res.json(profile);
		});
	};
exports.deleteJobById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var query = {"JobId":req.params.Id};
	jobModel.findOneAndRemove(
		query,function(err,profile){
		if(err)
			res.send(err);
		res.json(profile);
	});
};