var express 	= require('express'),
	app 		= express(),	
	mongoose 	= require('mongoose'),
	bodyParser  = require('body-parser'),
	//databaseUri = 'mongodb://manikandanmuthuv:gdmp.com12345@ds161021.mlab.com:61021/gdmp',//
	//databaseUri = 'mongodb://manikandan:gdmp.com123@cluster0-shard-00-00-tamev.mongodb.net:27017,cluster0-shard-00-01-tamev.mongodb.net:27017,cluster0-shard-00-02-tamev.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
	//mongo "mongodb://cluster0-shard-00-00-tamev.mongodb.net:27017,cluster0-shard-00-01-tamev.mongodb.net:27017,cluster0-shard-00-02-tamev.mongodb.net:27017/test?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl --username manikandan --password <PASSWORD>

	//databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/gdmp',
	// mongodb hosted on heroku
	databaseUri='mongodb://heroku_9rqt1jt6:gdp-server.com@123@ds113282.mlab.com:13282/heroku_9rqt1jt6z'
	customerProfileModel = require('./api/models/customerProfileModel');
	productUsageModel = require('./api/models/ProductUsageModel');
	employeeProfileModel = require('./api/models/EmployeeProfileModel');
	jobModel = require('./api/models/jobModel');

	var cors = require("cors");
	
	app.options('*', cors()); 

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } }; 

mongoose.connect(databaseUri,options);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var customerProfileroutes = require('./api/routes/customerProfileRoute');
var	productUsageFeedbackRoutes= require('./api/routes/productUsageFeedbackRoute');
var	employeeProfileroutes= require('./api/routes/EmployeeProfileRoute');

app.use('/employee',employeeProfileroutes);
app.use('/customer',customerProfileroutes);
app.use('/product',productUsageFeedbackRoutes);


var port = process.env.PORT || 3000;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('gdmp-server running on port ' + port + '.');
});

module.exports = app;