var mongoose = require('mongoose'),
	customerFeedbackModel = mongoose.model('CustomerFeedback');
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
}; 
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
// exports.findCustomerFeedbackById = function(req,res){
// 	res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

// 	var customerObjId = new ObjectId(req.params.Id);
// 	var query = {$or:[{"_id":customerObjId},{"PrimaryPhone":req.params.Id},{"SecondaryPhone":req.params.Id},{'ContactAddress.Pincode':req.params.Id},{'ContactAddress.City':req.params.Id},{'ContactAddress.Zone':req.params.Id},{'ContactAddress.State':req.params.Id},{'ContactAddress.Area':req.params.Id}]};
	
// 	customerFeedbackModel.findOne(query,function(err,feedback){
// 		if (err) res.send(err);;
// 		if(feedback)
// 		{
// 			res.json(feedback);
// 		}
// 	}).maxTime(1).exec();
// };
// exports.updateCustomerFeedbackById = function(req,res){
// 	res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
// 	var updateData = req.body;
// 	var options = {upsert:true,new: true};
	
// 	var customerObjId = new ObjectId(req.params.Id);
// 	var query = {$or:[{"_id":customerObjId},{"PrimaryPhone":req.params.Id},{"SecondaryPhone":req.params.Id},{'ContactAddress.Pincode':req.params.Id},{'ContactAddress.City':req.params.Id},{'ContactAddress.Zone':req.params.Id},{'ContactAddress.State':req.params.Id},{'ContactAddress.Area':req.params.Id}]};
	
// 	customerFeedbackModel.findOneAndUpdate(query,{$set:updateData},options,function(err,feedback){
// 		if (err) res.send(err);;
// 		if(feedback)
// 		{
// 			res.json(feedback);
// 		}
// 	});
// };
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
// exports.deleteCustomerProfileById = function(req,res){
// 	res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	//var query = {_id:req.params.Id};
// 	var query = {"PrimaryPhone":req.params.Id};
// 	customerFeedbackModel.findOneAndRemove(query,function(err,feedback){
// 		if (err) res.send(err);;
// 		if(feedback)
// 		{
// 			res.json(feedback);
// 		}
// 	});
// };
