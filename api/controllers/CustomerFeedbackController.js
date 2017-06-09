var mongoose = require('mongoose'),
	customerFeedbackModel = mongoose.model('CustomerFeedback'),
	customerProfileModel = mongoose.model('CustomerProfile');
var ObjectId = require('mongoose').Types.ObjectId;

exports.createNewCustomerFeedback = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
	var customerFeedback = new customerFeedbackModel(req.body);	
	customerFeedback.save(function(err, feedback){
	if(err)
		res.send(err);
	res.json(feedback);
	});
}
exports.findAllCustomerFeedback = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	customerFeedbackModel.find({},function(err,feedback){
			if(err)	res.send(err);
			if(feedback)
			{
				res.json(feedback);
			}
		});
	};
exports.findCustomerFeedbackById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	var customerFeedbackObjId = new ObjectId(req.params.Id);
	var query = {$or:[{"CustomerId":req.params.Id},{"_id":customerFeedbackObjId},{"PrimaryPhone":req.params.Id},{"SecondaryPhone":req.params.Id},{'ContactAddress.Pincode':req.params.Id},{'ContactAddress.City':req.params.Id},{'ContactAddress.Zone':req.params.Id},{'ContactAddress.State':req.params.Id},{'ContactAddress.Area':req.params.Id}]};
	
	customerFeedbackModel.findOne(query,function(err,feedback){
		if (err) res.send(err);;
		if(feedback)
		{
			res.json(feedback);
		}
	}).maxTime(1).exec();
};
exports.updateCustomerFeedbackById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
	var updateData = req.body;
	var options = {upsert:true,new: false};
	
	var customerFeedbackObjId = new ObjectId(req.params.Id);
	var query = {$or:[{"_id":req.params.Id},{"PrimaryPhone":req.params.Id},{"SecondaryPhone":req.params.Id},{'ContactAddress.Pincode':req.params.Id},{'ContactAddress.City':req.params.Id},{'ContactAddress.Zone':req.params.Id},{'ContactAddress.State':req.params.Id},{'ContactAddress.Area':req.params.Id}]};
	
	customerFeedbackModel.findOneAndUpdate(query,{$add:updateData},options,function(err,feedback){
		if (err) res.send(err);;
		if(feedback)
		{
			res.json(feedback);
		}
	});
};
exports.deleteAllCustomerFeedback = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	customerFeedbackModel.remove({},function(err,feedback){
			if(err) res.send(err);
			if(feedback)
			{
				res.json(feedback);
			}
		});
	};
exports.deleteCustomerFeedbackById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var updateData = req.body;
	var options = {upsert:true,new: false};
	
	var customerFeedbackObjId = new ObjectId((req.params.Id.length < 12) ? "123456789012" : req.params.Id);
	var query = {$or:[{"_id":customerFeedbackObjId},{"PrimaryPhone":req.params.Id},{"SecondaryPhone":req.params.Id},{'ContactAddress.Pincode':req.params.Id},{'ContactAddress.City':req.params.Id},{'ContactAddress.Zone':req.params.Id},{'ContactAddress.State':req.params.Id},{'ContactAddress.Area':req.params.Id}]};	

	customerFeedbackModel.findOneAndRemove(query,function(err,feedback){
		if (err) res.send(err);;
		if(feedback)
		{
			res.json(feedback);
		}
	});
};
