var express 	= require('express'),
	app 		= express(),	
	mongoose 	= require('mongoose'),
	bodyParser  = require('body-parser'),
	cors = require("cors"),
	compression = require('compression'),
	//databaseUri = 'mongodb://127.0.0.1:27017/gdp', //process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gdp',
	databaseUri = 'mongodb://gdp-server:gdp-server@ds131512.mlab.com:31512/gdp-server?authMechanism=SCRAM-SHA-1';
	// customerProfileModel = require('./api/models/customerProfileModel'),
	// productUsageModel = require('./api/models/ProductUsageModel'),
	// employeeProfileModel = require('./api/models/EmployeeProfileModel'),
	//jobModel = require('./api/models/JobModel');
	// employeeLocationModel = require('./api/models/EmployeeLocationModel');
	// customerFeedbackModel = require('./api/models/CustomerFeedbackModel');
	// fieldForceModel = require('./api/models/fieldforceModel'),
	// deviceTokenModel = require('./api/models/DeviceTokenModel');
	// pushMessageModel = require('./api/models/PushMessageModel');
	// userModel = require('./api/models/User');
	// employeeModel = require('./api/models/Employee');



app.options('*', cors()); 

var connectionOptions = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } }; 

mongoose.connect(databaseUri,connectionOptions);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(compression());

// var customerProfileroutes = require('./api/routes/customerProfileRoute');
// var	employeeProfileroutes= require('./api/routes/EmployeeProfileRoute');
// var deviceTokenRoute = require('./api/routes/DeviceTokenRoute');
// var userRoute = require('./api/routes/userRoute');

var employerRoute = require('./api/routes/employerRoute');
var employeeRoute = require('./api/routes/employeeRoute');
var productOwnerRoute = require('./api/routes/productOwnerRoute');
var jobRoute = require('./api/routes/jobRoute');
var pushMessageRoute = require('./api/routes/PushMessageRoute');
var googleMapsRoute = require('./api/routes/googleMaps');


//var routers = require('./api/routes');

// app.use('/employee',employeeProfileroutes);
// app.use('/customer',customerProfileroutes);

var port = 3000;
var httpServer = require('http').createServer(app);
httpServer.listen(process.env.PORT,process.env.IP, function() {
//httpServer.listen(port, function() {
    console.log('gdmp-server running on port ' + port + '.');
});

productOwnerRoute(app);
employerRoute(app);
employeeRoute(app);
jobRoute(app);
pushMessageRoute(app);
googleMapsRoute(app);

//deviceTokenRoute(app);
//userRoute(app);




//routers(app);
module.exports = app;