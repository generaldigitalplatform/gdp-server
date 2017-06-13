var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerFeedbackSchema = new Schema({
	CustomerId:Object,
	Industry:[{
		Name:String,
		Company:[{
		Name:String,
			Products:[{
				Name:String,
				ProductFeedback:[{
					ProductsUsageDetails:[{

					}],
					ProductsInterestedDetails:[{
						
					}],
					ProductsNotInterestedDetails:[{
						
					}],
					ProductsInterestedCallbackDetails:[{
						
					}],
					ProductsNotInterestedCallbackDetails:[{
						
					}]

				}]
			}],
		}],	
	}],

	
},{	"strict":false});

module.exports = mongoose.model('CustomerFeedback',CustomerFeedbackSchema);
