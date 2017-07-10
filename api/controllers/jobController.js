var mongoose = require('mongoose'),
	jobModel = mongoose.model('Job'),
	customerProfileModel = mongoose.model('CustomerProfile'),
	ObjectId = require('mongoose').Types.ObjectId;
	var extend = require('util')._extend;

exports.findAllJobs = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var Jobs;
	var query=[];
	jobModel.find({},function(err,profile){
			if(err) return res.send(err);
			res.send(profile);		
	});
};
exports.findJobById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var CustomerDetailsJson = {CustomerDetails:{ContactAddress:[]}};
	var jobObjId;
	var query;
	if(req.params.Id.length > 12){
		jobObjId = new ObjectId(req.params.Id);
		query = {"_id":jobObjId};
	}
	else{
		query = {$or:[{"EmployeeDetails.EmployeeId":req.params.Id},{"JobId":req.params.Id}]};
	}

	jobModel.find(query,function(err,profile){
		if (err) return res.send(err);
		if(profile)
		{			
			res.json(profile);
		}
	});
};
exports.findCustomerAndJobById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var jobObjId = new ObjectId((req.params.Id.length < 12) ? "123456789012" : req.params.Id);
	var query = {$or:[{"_id":jobObjId},{"EmployeeDetails.EmployeeId":req.params.Id},{"JobId":req.params.Id}]};	

	jobModel.findOne(query,function(err,profile){
		if (err) return res.send(err);
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
	return res.send(err);
	res.json(profile);
	});
}; 
exports.updateJobById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	var updateData = req.body;
	var options = {upsert:true,new: true};
	var jobObjId;
	var query;
	if(req.params.Id.length > 12){
		jobObjId = new ObjectId(req.params.Id);
		query = {"_id":jobObjId};
	}
	else{
		query = {"JobId":req.params.Id};
	}
	jobModel.findOneAndUpdate(query,{$set:updateData},options,function(err,profile){
		if (err) return res.send(err);
		if(profile)
		{
			res.json(profile);
		}
	});
};

// 	Model.findOneAndUpdate({ "_id": bookId }, { "$set": { "name": name, "genre": genre, "author": author, "similar": similar}}).exec(function(err, book){
//    if(err) {
//        console.log(err);
//        res.status(500).send(err);
//    } else {
//             res.status(200).send(book);
//    }
// });


exports.deleteAllJobs = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	jobModel.remove({},function(err,profile){
			if(err)
				return res.send(err);
			res.json(profile);
		});
	};
exports.deleteJobById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
	var jobObjId = new ObjectId((req.params.Id.length < 12) ? "123456789012" : req.params.Id);
	var query = {$or:[{"_id":jobObjId},{"JobId":req.params.Id},{"PrimaryPhone":req.params.Id},{"SecondaryPhone":req.params.Id},{'ContactAddress.Pincode':req.params.Id},{'ContactAddress.City':req.params.Id},{'ContactAddress.Zone':req.params.Id},{'ContactAddress.State':req.params.Id},{'ContactAddress.Area':req.params.Id}]};	

		jobModel.findOneAndRemove(
		query,function(err,profile){
		if(err)
			return res.send(err);
		res.json(profile);
	});
};