var mongoose 		 = require('mongoose'),
 	FCM 			 = require('fcm-push'),
	pushMessageModel = mongoose.model('PushMessage'),
	ObjectId 		 = require('mongoose').Types.ObjectId,
	deviceTokenModel = mongoose.model('DeviceToken');



exports.pushMessageToUser = function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var query = {"UserId":req.body.UserId}

	deviceTokenModel.findOne(query,function(err, response){
	if(err){
		res.send(err);
	}
	
	var serverkey = 'AAAAUGGsxGs:APA91bF1qVPPcbsSvYAbtcJzslTVFUEk3hpZOJWwbR_Rc8MBDZXpH8Bxf4Rn-SWXX4TxpMGF-3YWHDNC97i-wIxC4qPDq_htpsNr-eKTjOMKf7jftuKQD_nTOc_ZVIxNg7KscviAZUj8';  
	var fcm = new FCM(serverkey);

	var message = {  
	to : response.DeviceToken, //'<insert-device-token>',
	collapse_key : req.body.CollapseKey,//'<insert-collapse-key>',
	// data : {
	//     <random-data-key1> : '<random-data-value1>',
	//     <random-data-key2> : '<random-data-value2>'
	// },
	data:req.body.MessageData,
	notification : {
	    title : req.body.NotificationTitle,//'Title of the notification',
	    body : req.body.NotificationBody //'Body of the notification'
	}
	};
	fcm.send(message, function(err,response){  
	    if(err) {
	        console.log("Something has gone wrong !");
	    } else {
	        console.log("Successfully sent with resposne :",response);
	    	}
		});

	});

}; 