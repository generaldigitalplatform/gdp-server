var mongoose = require('mongoose'),
	jobModel = mongoose.model('Job'),
	customerProfileModel = mongoose.model('CustomerProfile'),
	ObjectId = require('mongoose').Types.ObjectId;
	var extend = require('util')._extend;
	var moment= require('moment');

exports.findAllJobs = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var query = {};
	var lteQuery;
	var gteQuery;
	var fromDate;
	var toDate;
	var startTime = "T00:00:00.000Z";
	var toTime = "T23:59:00.000Z";;
	//var todayQuery = {"createdAt" : new ISODate(req.Today)};
	
	// else if(req.param('JobDates') === '1'){
	// 	fromDate = moment(Date()).format("YYYY-MM-DD");
	// 	toDate = moment(Date()).format("YYYY-MM-DD");
	// }
	// else if(req.param('JobDates') === '2'){
	// 	fromDate = moment(Date()).format("YYYY-MM-DD");
	// 	toDate = moment(Date()).format("YYYY-MM-DD");
	// }
	// else if(req.param('JobDates') === '3'){
	// 	fromDate = moment(Date()).format("YYYY-MM-DD");
	// 	toDate = moment(Date()).format("YYYY-MM-DD");
	// }
	// else if(req.param('JobDates') === '4'){
	// 	fromDate = moment(Date()).format("YYYY-MM-DD");
	// 	toDate = moment(Date()).format("YYYY-MM-DD");
	// }

	// gteQuery = new Date(req.body.fromDate).toISOString();
	// if(req.body.fromDate == req.body.toDate){
	// 	lteQuery = new Date(req.body.toDate).toISOString();
	// }
	// else{
	// 	lteQuery = new Date(req.body.toDate).toISOString();
	// }

	var jobDates = req.param('JobDates');
	var jobStatus = req.param('JobStatus');
	var fieldForce = req.param('FieldForce');
	var customer = req.param('Customer');
	var phone = req.param('Phone');
	// var jobTitle = req.param('JobTitle');
	// var jobDescription = req.param('JobDescription');

	if(jobDates ===  '0' && jobStatus === '0' && fieldForce === '0' && !customer && !phone){
		gteQuery = moment(Date()).format("YYYY-MM-DD")+startTime;
		lteQuery = moment(Date()).format("YYYY-MM-DD")+toTime;
		query["createdAt"] = {$gte:gteQuery,$lte:lteQuery}
	}
	else{
		if(jobDates.length !== 0 && jobDates === '0') {
			gteQuery = moment(Date()).format("YYYY-MM-DD")+startTime;
			lteQuery = moment(Date()).format("YYYY-MM-DD")+toTime;
			query["createdAt"] = {$gte:gteQuery,$lte:lteQuery}
		}
		else if(jobDates.length !== 0 && jobDates === '1') {
		
			var today = new Date();
			var yesterday = new Date(today);
			yesterday.setDate(today.getDate()-1);

			gteQuery = moment(yesterday).format("YYYY-MM-DD")+startTime;
			lteQuery = moment(yesterday).format("YYYY-MM-DD")+toTime;

			query["createdAt"] = {$gte:gteQuery,$lte:lteQuery}
		}
		else if(jobDates.length !== 0 && jobDates === '2') {
		
			var today = new Date();
			var lastweek = new Date(today);
			lastweek.setDate(today.getDate()-7);

			lteQuery = moment(today).format("YYYY-MM-DD")+startTime;
			gteQuery = moment(lastweek).format("YYYY-MM-DD")+toTime;

			query["createdAt"] = {$gte:gteQuery,$lte:lteQuery}
		}
		else if(jobDates.length !== 0 && jobDates === '3') {
		
			var today = new Date();
			var lastweek = new Date(today);
			lastweek.setDate(today.getDate()-30);

			lteQuery = moment(today).format("YYYY-MM-DD")+startTime;
			gteQuery = moment(lastweek).format("YYYY-MM-DD")+toTime;

			query["createdAt"] = {$gte:gteQuery,$lte:lteQuery}
		}
		else if(jobDates.length !== 0 && jobDates === '4') {
		
			var today = new Date();
			var lastweek = new Date(today);
			lastweek.setDate(today.getDate()-365);

			lteQuery = moment(today).format("YYYY-MM-DD")+startTime;
			gteQuery = moment(lastweek).format("YYYY-MM-DD")+toTime;

			query["createdAt"] = {$gte:gteQuery,$lte:lteQuery}
		}
		if(jobStatus.length !== 0 && jobStatus !== '0') query["JobStatus"] = Number(jobStatus);
		if(customer.length !== 0 && customer !== '0')  query["CustomerDetails.FirstName"] = customer;
		if(fieldForce.length !== 0 && fieldForce !== '0') query["EmployeeDetails.EmployeeId"] = fieldForce;
		if(phone.length !== 0 && phone !== '0') query["CustomerDetails.PrimaryPhone"] = Number(phone);
	}
	
	// if(req.param('fromDate') && req.param('toDate')){

	// 	var fromDate = req.param('fromDate');
	// 	var toDate = req.param('toDate');
		
	// 	gteQuery = new Date(fromDate).toISOString();
	// 	if(fromDate == toDate){
	// 		lteQuery = new Date(toDate).toISOString();
	// 	}
	// 	else{
	// 		lteQuery = new Date(toDate).toISOString();
	// 	}
	   
	// 	query = {"createdAt":{$gte:gteQuery,$lte:lteQuery}}		
	// }
	// else if(req.param('JobStatus')){
	// 	var jobStatusCode;
	// 	if(req.param('JobStatus') === 'NotCompleted'){
	// 		jobStatusCode = 4;
	// 		query = { "JobStatus": { $not: { $eq: jobStatusCode } } }; // completed job status is 4
	// 	}
	// 	else if(req.param('JobStatus') === '6'){
	// 		jobStatusCode = 6;
	// 		query = { "JobStatus": { $eq: jobStatusCode } } ;
	// 	}
	// 	else if(req.param('JobStatus') === '5'){
	// 		jobStatusCode = 5;
	// 		query = { "JobStatus": { $eq: jobStatusCode } } ;
	// 	}
	// 	else if(req.param('JobStatus') === '4'){
	// 		jobStatusCode = 4;
	// 		query = { "JobStatus": { $eq: jobStatusCode } } ;
	// 	}
	// 	else if(req.param('JobStatus') === '3'){
	// 		jobStatusCode = 3;
	// 		query = { "JobStatus": { $eq: jobStatusCode } } ;
	// 	}
	// 	else if(req.param('JobStatus') === '2'){
	// 		jobStatusCode = 2;
	// 		query = { "JobStatus": { $eq: jobStatusCode } } ;
	// 	}
	// 	else if(req.param('JobStatus') === '1'){
	// 		jobStatusCode = 1;
	// 		query = { "JobStatus": { $eq: jobStatusCode } } ;
	// 	}
	// 	else if(req.param('JobStatus') === '0'){
	// 		jobStatusCode = 0;
	// 		query = { "JobStatus": { $eq: jobStatusCode } } ;
	// 	}	
		
	// }
	// else if(req.param('FieldForce')){
	// 	query = {"EmployeeDetails.EmployeeId":req.param('FieldForce')}
	// }
	// else if(req.param('JobLocation')){
	// 	query = {"CustomerDetails.Location":req.param('JobLocation')}
	// }	
	// else{
	// 	query = {}
	// }
	jobModel.find(query,function(err,profile){
			if(err) return res.send(err);
			res.send(profile);		
	});
};
exports.findJobsBy = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var lteQuery;
	var gteQuery;
	gteQuery = new Date(req.body.fromDate).toISOString();
	if(req.body.fromDate == req.body.toDate){
		lteQuery = new Date(req.body.toDate).toISOString();
	}
	else{
		lteQuery = new Date(req.body.toDate).toISOString();
	}
   
	query = {"createdAt":{$gte:gteQuery,$lte:lteQuery}}

//	var query = { "JobStatus": { $not: { $eq: 4 } } }; // completed job status is 4
	
	jobModel.find(query,function(err,profile){
			if(err) return res.send(err);
			res.send(profile);		
	});
};
exports.findJobById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
	var jobStatus,empId;
	var query = {};
	if(req.query.hasOwnProperty('JobStatus')){
		if(req.query.JobStatus.match("NotCompleted") && req.query.JobStatus.match("NotCancelled")){
			query = {$and: [{"JobStatus":{$ne: 4 }},{"JobStatus":{ $ne: 5 }}]};
		}		
	}
	query["EmployeeDetails.EmployeeId"] = req.params.Id;
	//if(req.query.hasOwnProperty('EmpId')) query["EmployeeDetails.EmployeeId"] = req.query.EmpId;    	
     	
	// var jobObjId;
	// if(req.params.Id.length > 12){
	// 	jobObjId = new ObjectId(req.params.Id);
	// 	query = {"_id":jobObjId};
	// }
	// else{
	// 	query = {$or:[{"EmployeeDetails.EmployeeId":req.params.Id},{"JobId":req.params.Id}]};
	// }
	
	jobModel.find(query,function(err,profile){
		if (err) return res.send(err);
		if(profile)
		{			
			res.json(profile);
		}
	});
};
exports.searchJobById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
var query =[	
	{$match:{
		$and:[
	 // {"CustomerDetails.Location":req.body.location},
	 // {"CustomerDetails.FirstName":req.body.firstname},
	 // {"CustomerDetails.PrimaryPhone":Number(req.body.primaryphone)},
	 // {"JobId":Number(req.body.jobid)},
	 // {"JobScheduledTime":req.body.scheduledtime}
	]}}];

if(req.body.employeeid){
	query[0].$match.$and.push({"EmployeeDetails.EmployeeId":req.body.employeeid});
}
if(req.body.location){
	query[0].$match.$and.push({"CustomerDetails.Location":req.body.location});
}
if(req.body.firstname){
	query[0].$match.$and.push({"CustomerDetails.FirstName":req.body.firstname});
}
if(req.body.primaryphone){
	query[0].$match.$and.push({"CustomerDetails.PrimaryPhone":Number(req.body.primaryphone)});
}
if(req.body.jobid){
	query[0].$match.$and.push({"JobId":Number(req.body.jobid)});
}
// if(req.body.scheduledtime){
// 	query[0].$match.$and.push({"JobScheduledTime":new Date(req.body.scheduledtime).toISOString()});
// }

	jobModel.aggregate(query, function(err,profile){
		if (err) return res.send(err);
		if(profile)
		{			
			res.json(profile);
		}
	});
};
exports.findJobStatusById = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	//var jobObjId = new ObjectId((req.params.Id.length < 12) ? "123456789012" : req.params.Id);
	
	var totalJobsCount;
	var completedJobsCount;
	var rescheduledJobsCount;
	var pendingJobsCount;
	var cancelledJobsCount;
	var allocatedJobsCount;
	var lteQuery;
	var gteQuery;
	//var todayQuery = {"createdAt" : new ISODate(req.Today)};
	gteQuery = new Date(req.body.fromDate).toISOString();
	if(req.body.fromDate == req.body.toDate){
		lteQuery = new Date(req.body.toDate).toISOString();
	}
	else{
		lteQuery = new Date(req.body.toDate).toISOString();
	}

	// "JobStatus":4 // completed
	// "JobStatus":3 // pending   
 //    "JobStatus":6 // rescheduled
 //    "JobStatus":2 // Assigned
   
   
	jobModel.count(({"EmployeeDetails.EmployeeId":req.body.employeeid,"JobStatus":4,"createdAt":{$gte:gteQuery,$lte:lteQuery}}),function(err,count){
	if (err) return res.send(err);	
	completedJobsCount = count;

		jobModel.count(({"EmployeeDetails.EmployeeId":req.body.employeeid,"JobStatus":3,"createdAt":{$gte:gteQuery,$lte:lteQuery}}),function(err,count){
			if (err) return res.send(err);			
			pendingJobsCount = count;			

			jobModel.count(({"EmployeeDetails.EmployeeId":req.body.employeeid,"JobStatus":2,"createdAt":{$gte:gteQuery,$lte:lteQuery}}),function(err,count){
				if (err) return res.send(err);			
				pendingJobsCount += count;

			jobModel.count(({"EmployeeDetails.EmployeeId":req.body.employeeid,"JobStatus":6,"createdAt":{$gte:gteQuery,$lte:lteQuery}}),function(err,count){
				if (err) return res.send(err);			
				rescheduledJobsCount = count;

				jobModel.count(({"EmployeeDetails.EmployeeId":req.body.employeeid,"JobStatus":5,"createdAt":{$gte:gteQuery,$lte:lteQuery}}),function(err,count){
				if (err) return res.send(err);			
				cancelledJobsCount = count;
			
					jobModel.count(({"EmployeeDetails.EmployeeId":req.body.employeeid,"createdAt":{$gte:gteQuery,$lte:lteQuery}}),function(err,count){
						if (err) return res.send(err);				
						totalJobsCount = count;
					
					 res.send({
							"totalJobs":totalJobsCount,
							"completedJobs":completedJobsCount,
							"pendingJobs":pendingJobsCount,
							"rescheduledJobs":rescheduledJobsCount,
							"cancelledJobs":cancelledJobsCount
							});
						});
					});
				});
			});
		});
	});	
};
exports.createNewJob = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var newJob = new jobModel(req.body);

// 	 var arr = req.body;// array of objects;
//      res = [];

//     for(var i=0; i< Object.keys(arr).length;i++){
//     	var newJob = new jobModel(arr[i]);
//     	newJob.save(function (err) {
// 	        res.push(err);
// 	        if (res.length === Object.keys(arr).length)
// 	        {
// 	            // Done
// 	        }
//     });
// }
	// arr.forEach(function (item) {
	//     newJob.save(function (err) {
	//         res.push(err);
	//         if (res.length === arr.length)
	//         {
	//             // Done
	//         }
	//     });
	// });

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
	var options ={upsert:true,new: true};
	var jobObjId;
	var query;
	if(req.params.Id.length > 12){
		jobObjId = new ObjectId(req.params.Id);
		query = {"_id":jobObjId};
	}
	else{
		query = {"JobId":Number(req.params.Id)};
	}
	jobModel.findOneAndUpdate(query,{$set:updateData},options,function(err,profile){
		if (err) return res.send(err);;
		if(profile)
		{
			res.json(profile);
		}
	});
};

exports.editJobById = function(req,res){
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
		query = {"JobId":Number(req.params.Id)};
	}
	jobModel.findOneAndUpdate(query,{$set:{"JobTitle":updateData.JobTitle,"JobDescription":updateData.JobDescription,"JobScheduledTime":updateData.JobScheduledTime,
	"JobStatus":updateData.JobStatus,"CustomerDetails.Location":updateData.CustomerDetails.Location,"CustomerDetails.FirstName":updateData.CustomerDetails.FirstName,
"CustomerDetails.Address":updateData.CustomerDetails.Address,"CustomerDetails.PrimaryPhone":updateData.CustomerDetails.PrimaryPhone
,"EmployeeDetails.EmployeeId":updateData.EmployeeDetails.EmployeeId,"EmployeeDetails.Email":updateData.EmployeeDetails.Email,
"EmployeeDetails.FirstName":updateData.EmployeeDetails.FirstName,"EmployeeDetails.LastName":updateData.EmployeeDetails.LastName,
"EmployeeDetails.PrimaryPhone":updateData.EmployeeDetails.PrimaryPhone,"EmployeeDetails.SecondaryPhone":updateData.EmployeeDetails.SecondaryPhone}},options,function(err,profile){
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
	var query = {$or:[{"_id":jobObjId},{"EmployeeDetails.EmployeeId":req.params.Id},{"JobId":req.params.Id},{"PrimaryPhone":req.params.Id},{"SecondaryPhone":req.params.Id},{'ContactAddress.Pincode':req.params.Id},{'ContactAddress.City':req.params.Id},{'ContactAddress.Zone':req.params.Id},{'ContactAddress.State':req.params.Id},{'ContactAddress.Area':req.params.Id}]};	

		jobModel.findOneAndRemove(
		query,function(err,profile){
		if(err)
			return res.send(err);
		res.json(profile);
	});
};