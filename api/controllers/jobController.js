var mongoose = require('mongoose'),
	jobModel = mongoose.model('Job'),
	customerProfileModel = mongoose.model('CustomerProfile'),
	ObjectId = require('mongoose').Types.ObjectId;
	var extend = require('util')._extend;

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
	var CustomerDetailsJson = {CustomerDetails:[]};
	var jobDetails;
	var DoorNumber,BuildingNumber,BuildingName,Street,Area,City,Taluk,District,State,Pincode,Landmark;

	var jobObjId = new ObjectId((req.params.Id.length < 12) ? "123456789012" : req.params.Id);
	var query = {$or:[{"_id":jobObjId},{"EmployeeId":req.params.Id},{"JobDetails.JobId":req.params.Id}]};	

	jobModel.findOne(query,function(err,profile){
		if (err) res.send(err);;
		if(profile)
		{
			jobDetails = JSON.stringify(profile);
			var jobModel = JSON.parse(jobDetails);
			customerProfileModel.findOne({"_id":jobModel.CustomerId},function(err,customerProfile){
			var customerProfileStringify = JSON.stringify(customerProfile);
			var customer = JSON.parse(customerProfileStringify);
			var doorNo,buildingNumber,buildingName,street,area,city,taluk,district,zone,state,pincode,landmark;
			if("FirstName" in customer) FirstName={"FirstName":customer.FirstName}
			if("PrimaryPhone" in customer) PrimaryPhone={"PrimaryPhone":customer.PrimaryPhone}
			if("ContactAddress" in customer) {
		  	  if("DoorNumber" in customer.ContactAddress) doorNo={"DoorNumber":customer.ContactAddress.DoorNumber}
		  	  if("BuildingNumber" in customer.ContactAddress) buildingNumber={"BuildingNumber":customer.ContactAddress.BuildingNumber}
		  	  if("BuildingName" in customer.ContactAddress) buildingName={"BuildingName":customer.ContactAddress.BuildingName}
		  	  if("Street" in customer.ContactAddress) street={"Street":customer.ContactAddress.Street}
		  	  if("Area" in customer.ContactAddress) area={"Area":customer.ContactAddress.Area}
		  	  if("City" in customer.ContactAddress) city={"City":customer.ContactAddress.City}
		  	  if("Taluk" in customer.ContactAddress) taluk={"Taluk":customer.ContactAddress.Taluk}
		  	  if("District" in customer.ContactAddress) district={"District":customer.ContactAddress.District}
		  	  if("State" in customer.ContactAddress) state={"State":customer.ContactAddress.State}
		  	  if("Pincode" in customer.ContactAddress) pincode={"Pincode":customer.ContactAddress.Pincode}
		  	  if("Landmark" in customer.ContactAddress) landmark={"Landmark":customer.ContactAddress.Landmark}
			 }
			if("PermanentAddress" in customer) {
		  	  if("DoorNumber" in customer.ContactAddress) DoorNumber={"DoorNumber":customer.ContactAddress.DoorNumber}
		  	  if("BuildingNumber" in customer.ContactAddress) BuildingNumber={"BuildingNumber":customer.ContactAddress.BuildingNumber}
		  	  if("BuildingName" in customer.ContactAddress) BuildingName={"BuildingName":customer.ContactAddress.BuildingName}
		  	  if("Street" in customer.ContactAddress) Street={"Street":customer.ContactAddress.Street}
		  	  if("Area" in customer.ContactAddress) Area={"Area":customer.ContactAddress.Area}
		  	  if("City" in customer.ContactAddress) City={"City":customer.ContactAddress.City}
		  	  if("Taluk" in customer.ContactAddress) Taluk={"Taluk":customer.ContactAddress.Taluk}
		  	  if("District" in customer.ContactAddress) District={"District":customer.ContactAddress.District}
		  	  if("State" in customer.ContactAddress) State={"State":customer.ContactAddress.State}
		  	  if("Pincode" in customer.ContactAddress) Pincode={"Pincode":customer.ContactAddress.Pincode}
		  	  if("Landmark" in customer.ContactAddress) Landmark={"Landmark":customer.ContactAddress.Landmark}
			 }
				// CustomerDetailsJson.CustomerDetails = {
				// 	FirstName,
				// 	PrimaryPhone,
				// 	ContactAddress:{		
				// 		doorNo,
				// 		buildingNumber,
				// 		buildingName,
				// 		street,
				// 		area,
				// 		city,
				// 		taluk,
				// 		district,
				// 		state,
				// 		pincode,
				// 		landmark
				// 	},
				// }
				CustomerDetailsJson.CustomerDetails = $.extend(doorNo,buildingNumber,buildingName,street,area,city,taluk,district,state,pincode,landmark);
				var customerProfile = $.extend(jobModel,CustomerDetailsJson);
				res.json(customerProfile);
			});
		}
	});
};
exports.findCustomerAndJobById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var query = {"JobId":req.params.Id};
	
	var jobObjId = new ObjectId((req.params.Id.length < 12) ? "123456789012" : req.params.Id);
	var query = {$or:[{"_id":jobObjId},{"EmployeeId":req.params.Id},{"JobId":req.params.Id}]};	

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

	var updateData = req.body;
	var options = {upsert:true,new: true};
	
	var jobObjId = new ObjectId((req.params.Id.length < 12) ? "123456789012" : req.params.Id);
	var query = {$or:[{"_id":jobObjId},{"EmployeeId":req.params.Id},{"JobId":req.params.Id}]};	

	jobModel.findOneAndUpdate(query,{$set:updateData},options,function(err,profile){
		if (err) res.send(err);;
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
				res.send(err);
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
			res.send(err);
		res.json(profile);
	});
};