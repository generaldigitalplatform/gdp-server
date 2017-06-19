var express 	= require('express'),
	app 		= express(),	
	mongoose 	= require('mongoose'),
	bodyParser  = require('body-parser'),
	cors = require("cors"),
	databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://192.168.2.66:27017/gdmp',
	//databaseUri = 'mongodb://gdpserver:gdpserver@ds111882.mlab.com:11882/heroku_fw10lrf3?authMechanism=SCRAM-SHA-1',
	customerProfileModel = require('./api/models/customerProfileModel'),
	productUsageModel = require('./api/models/ProductUsageModel'),
	employeeProfileModel = require('./api/models/EmployeeProfileModel'),
	jobModel = require('./api/models/JobModel');
	employeeLocationModel = require('./api/models/EmployeeLocationModel');
	customerFeedbackModel = require('./api/models/CustomerFeedbackModel');

app.options('*', cors()); 

var connectionOptions = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } }; 

mongoose.connect(databaseUri,connectionOptions);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var customerProfileroutes = require('./api/routes/customerProfileRoute');
var	employeeProfileroutes= require('./api/routes/EmployeeProfileRoute');

app.use('/employee',employeeProfileroutes);
app.use('/customer',customerProfileroutes);

var port = 3000;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('gdmp-server running on port ' + port + '.');
});

module.exports = app;