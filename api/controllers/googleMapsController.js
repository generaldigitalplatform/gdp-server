var request = require('request'),
	reqprom = require('request-promise'),
	db = require('../config/database');

exports.findGeoLocation = function(req,res){
    
	var lat = req.body.geo.lat; 
	var lng = req.body.geo.lng;
	var action = req.body.action;
	var startdatetime = req.body.startdatetime;
	var reachdatetime = req.body.reachdatetime;
	var canceldatetime = req.body.canceldatetime; 

	var objectId = req.body.objectId;
	var actionData;

	var putStartJob = {};

	var options = {     
        uri:db.googlemapsapi + lat + ',' + lng,
        method: 'POST',
        json:true    
    };
    reqprom(options)
    	.then(function(response){

			if(response.results.length > 0){

	    	var address = response.results[0].formatted_address;

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
		        json:true,
		        headers: {'Content-Type': 'application/json',"Authorization": req.headers.authorization}   
	    	}
	    	reqprom(putStartJob)
	    		.then(function(response){	    			
	    			res.json(response);
	    		})
	    		.catch(function(error){
					res.json(error);
				})
	   		}
	   		else{
	     		res.json({message:"No locations found for the given lat and lng"});
	    	}
    		
    	})    	
    	.catch(function(error){
    		res.json(error);
    	})
};
