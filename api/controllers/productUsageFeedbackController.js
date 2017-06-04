var mongoose = require('mongoose'),
	aboutProductUsageModel = mongoose.model('AboutProductUsage');

exports.findProductUsageFeedbackByCustomerId = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var query = {Industry:req.params.feedbackId};
	aboutProductUsageModel.findOne(query,function(err,profile){
		if (err) res.send(err);;
		if(profile)
		{
			res.json(profile);
		}
	});
};
exports.findProductUsageFeedbacks = function(req,res){
res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");	
	aboutProductUsageModel.find(function(err,profile){
		if (err) res.send(err);;
		if(profile)
		{
			res.json(profile);
		}
	});
};
exports.createProductUsageFeedback = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var productUsageFeedback = new aboutProductUsageModel(req.body);
	productUsageFeedback.save(function(err, profile){
	if(err)
		res.send(err);
	res.json(profile);
	});
}; 
// this.addAddress = function (req, res) {
//     var newAddress = {
//            nickname: req.body.nickname,
//            streetAddress: req.body.streetAddress,
//            streetAddress2: req.body.streetAddress2,
//            state: req.body.state,
//            zip: req.body.zip
//     }
//     User.update({username: req.session.user}, { $push : {
//             address: newAddress
//         }}, {upsert: true}, function ( err ) {
//                 if(err){
//                         console.log(err);
//                 }else{
//                         console.log("Successfully added");
//                 }

	/*(req.params.customerprofileId){
	customerProfileModel.findById({ $where : "PrimaryPhone == '8248198568' " },function(err,profile){
			if(err)
				res.send(err);
			res.json(profile);
		});
	};
}*/


