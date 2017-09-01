var request = require('request'),
	db = require('../config/database');

//var serverkey = 'AAAAUGGsxGs:APA91bF1qVPPcbsSvYAbtcJzslTVFUEk3hpZOJWwbR_Rc8MBDZXpH8Bxf4Rn-SWXX4TxpMGF-3YWHDNC97i-wIxC4qPDq_htpsNr-eKTjOMKf7jftuKQD_nTOc_ZVIxNg7KscviAZUj8';  

exports.findGeoLocation = function(req,res){

    
	var lat = req.body.geo.lat; 
	var lng = req.body.geo.lng;
	var action = req.body.action;
	var startdatetime = req.body.startdatetime;
	var reachdatetime = req.body.reachdatetime;
	var canceldatetime = req.body.canceldatetime; //

	var objectId = req.body.objectId;
	var actionData;

	var options = {     
        uri:'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat + ',' + lng,
        method: 'POST'    
    }
    request(options,function(error, response, body){
    	if(error) return error;
    	var Data = JSON.parse(body);
    	if(Data.results.length > 0){

	    	var address = Data.results[0].formatted_address;

	    	if(action==='started'){
		        	actionData = {
		        		"StartedLocation" :{
							"DateTime": startdatetime,
							"Area": address,
							"Coordinates": [lat,lng]							
		        	}
		        }
		    } else if(action === 'reached'){
		    	actionData = {
		        		"ReachedLocation" :{
							"DateTime": reachdatetime,
							"Area": address,
							"Coordinates": [lat,lng]							
		        	}
		        }
		    }else if(action === 'cancelled'){
		    	actionData = {
		        		"CancelledLocation" :{
							"DateTime": canceldatetime,
							"Area": address,
							"Coordinates": [lat,lng]							
		        	}
		        }
		    }       
	    	var putStartJob = {     
	        uri:db.job + objectId,
	        method: 'PUT',
	        form:actionData,
	        headers: {'Content-Type': 'application/json',"Authorization": req.headers.authorization}   
	    	}  

	        request(putStartJob,function(error, response, body){
				if(error) return error;
				res.json(response);
	        });
	    }else{
	    	res.json({message:"No locations found for the given lat and lng"});
	    }   

    });
};
