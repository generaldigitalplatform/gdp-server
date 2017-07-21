var express 	= require('express'),
	app 		= express(),	
	mongoose 	= require('mongoose'),
	bodyParser  = require('body-parser'),
	cors = require("cors"),
	compression = require('compression'),
	//databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gdp',
	databaseUri = 'mongodb://gdp-server:gdp-server@ds131512.mlab.com:31512/gdp-server?authMechanism=SCRAM-SHA-1',
	customerProfileModel = require('./api/models/customerProfileModel'),
	productUsageModel = require('./api/models/ProductUsageModel'),
	employeeProfileModel = require('./api/models/EmployeeProfileModel'),
	jobModel = require('./api/models/JobModel');
	employeeLocationModel = require('./api/models/EmployeeLocationModel');
	customerFeedbackModel = require('./api/models/CustomerFeedbackModel');
	fieldForceModel = require('./api/models/fieldforceModel'),
	deviceTokenModel = require('./api/models/DeviceTokenModel');
	pushMessageModel = require('./api/models/PushMessageModel');


app.options('*', cors()); 

var connectionOptions = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } }; 

mongoose.connect(databaseUri,connectionOptions);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(compression());

var customerProfileroutes = require('./api/routes/customerProfileRoute');
var	employeeProfileroutes= require('./api/routes/EmployeeProfileRoute');
var fieldForceRoutes = require('./api/routes/fieldforceRoutes');
var deviceTokenRoute = require('./api/routes/DeviceTokenRoute');
var pushMessageRoute = require('./api/routes/PushMessageRoute');


var routers = require('./api/routes');

app.use('/employee',employeeProfileroutes);
app.use('/customer',customerProfileroutes);

var port = 3000;
var httpServer = require('http').createServer(app);
httpServer.listen(process.env.PORT,process.env.IP, function() {
//httpServer.listen(port, function() {
    console.log('gdmp-server running on port ' + port + '.');
});

fieldForceRoutes(app);
deviceTokenRoute(app);
pushMessageRoute(app);

routers(app);
module.exports = app;