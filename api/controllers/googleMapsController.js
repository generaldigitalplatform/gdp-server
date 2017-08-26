var request = require('request'),
	googleMapsClient = require('@google/maps').createClient({
	key:'AIzaSyBh-Su_ZydI-kofZ0incHVCHPECZytqEK0'
});

//var serverkey = 'AAAAUGGsxGs:APA91bF1qVPPcbsSvYAbtcJzslTVFUEk3hpZOJWwbR_Rc8MBDZXpH8Bxf4Rn-SWXX4TxpMGF-3YWHDNC97i-wIxC4qPDq_htpsNr-eKTjOMKf7jftuKQD_nTOc_ZVIxNg7KscviAZUj8';  

exports.findGeoLocation = function(req,res){
	// googleMapsClient.geocode({"Address":"1600 Amphitheatre Parkway, Mountain View, CA"},function(err, response){
	// 	if(err) console.log(err);
	// 	console.log(response.json.results);
	// });
	latlang = '11.4118144,76.7125018';
	var options = {     
        uri:'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latlang,
        method: 'POST'    
    }
    request(options,function(error, response, body){
    	if(error) return error;
    	var Data = JSON.parse(body);
    	var address = Data.results[0].formatted_address;
    });
};
