var express 	= require('express'),
	app 		= express(),	
	mongoose 	= require('mongoose'),
	bodyParser  = require('body-parser'),
	//databaseUri = 'mongodb://manikandanmuthuv:gdmp.com12345@ds161021.mlab.com:61021/gdmp',//
	//databaseUri = 'mongodb://manikandan:gdmp.com123@cluster0-shard-00-00-tamev.mongodb.net:27017,cluster0-shard-00-01-tamev.mongodb.net:27017,cluster0-shard-00-02-tamev.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
	//mongo "mongodb://cluster0-shard-00-00-tamev.mongodb.net:27017,cluster0-shard-00-01-tamev.mongodb.net:27017,cluster0-shard-00-02-tamev.mongodb.net:27017/test?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl --username manikandan --password <PASSWORD>

	//databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/gdmp',
	// mongodb hosted on heroku
	databaseUri='mongodb://gdpserver:gdpserver@ds111882.mlab.com:11882/gdp-server?authMechanism=SCRAM-SHA-1',
	customerProfileModel = require('./api/models/customerProfileModel'),
	productUsageModel = require('./api/models/ProductUsageModel'),
	employeeProfileModel = require('./api/models/EmployeeProfileModel'),
	jobModel = require('./api/models/JobModel');


var Db = require('mongodb').Db,
    mongoose = require('mongoose'),
    Server = require('mongodb').Server;
    // ReplSetServers = require('mongodb').ReplSetServers,
    // ObjectID = require('mongodb').ObjectID,
    // Binary = require('mongodb').Binary,
    // GridStore = require('mongodb').GridStore,
    // Grid = require('mongodb').Grid,
    // Code = require('mongodb').Code,
    // BSON = require('mongodb').pure().BSON,
    var assert = require('assert');
	var cors = require("cors");

var db = new Db('gdp-server', new Server('ds111882.mlab.com', 11882));
// Establish connection to db
db.open(function(err, db) {

  // Use the admin database for the operation
  var adminDb = db.admin();


  // Add the new user to the admin database
  adminDb.addUser('gdpserver2', 'gdpserver2', function(err, result) {

    // Authenticate using the newly added user
    adminDb.authenticate('gdpserver2', 'gdpserver2', function(err, result) {
      //assert.ok(result);

      // Retrive the build information for the MongoDB instance
      adminDb.buildInfo(function(err, info) {
       // assert.ok(err == null);

        //adminDb.removeUser('admin3', function(err, result) {
        //  assert.ok(result);

         // db.close();
        //});
      });
    });
  });
});
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

var port = 3000;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('gdmp-server running on port ' + port + '.');
});

module.exports = app;