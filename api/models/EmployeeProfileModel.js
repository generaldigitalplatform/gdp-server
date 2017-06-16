var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmployeeProfileSchema = new Schema({
	FirstName:String,
	LastName:String,
	PrimaryPhone:String,
	SecondaryPhone:String,
	EmployeeId:String,
	ContactAddress:[{
		DoorNumber:String,
		BuildingNumber:String,
		BuildingName:String,
		Street:String,
		Area:String,
		City:String,
		Taluk:String,
		District:String,
		Zone:String,
		State:String,
		Pincode:String,
		Landmark:String
	}],
	PermanentAddress:[{
		DoorNumber:String,
		BuildingNumber:String,
		BuildingName:String,
		Street:String,
		Area:String,
		City:String,
		Taluk:String,
		District:String,
		Zone:String,
		State:String,
		Pincode:String,
		Landmark:String
	}],
	SocialCommunication:[{
		Email:String,
		WhatsApp:String,
		Facebook:String,
		Twitter:String		
	}],	
	EducationDetails:[{
		Degree:String,
		College:String,
		University:String,
		Year:String			
	}],	
	WorkArea:[{
			Name:String,
			Pincode:[

			]
		}],
	WorkInfo:[{
		Company:String,
		Designation:String,
		Role:String,
		Name:String,
		Pincode:[

			],
		WorkArea:[{
			Name:String,
			Pincode:[{

			}]
		}],		
		JoingDate:Date,
		LeftDate:Date,
		Remarks:String			
	}]
},{"strict":false});

module.exports = mongoose.model('EmployeeProfile',EmployeeProfileSchema);
