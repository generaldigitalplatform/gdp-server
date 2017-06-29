var AuthenticationController = require('./controllers/authentication'), 
    express = require('express'),
    passportService = require('./config/passport'),
    passport = require('passport'),
    customerProfileController = require('./controllers/customerProfileController'),
    customerFeedbackController = require('./controllers/CustomerFeedbackController'),
    employeeProfileController = require('./controllers/EmployeeProfileController'),
    jobController = require('./controllers/jobController'),
    employeeLocationController = require('./controllers/EmployeeLocationController');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app){
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        customerProfileRoutes = express.Router(),
        customerProfileFeedbackRoutes = express.Router();
        employeeProfileRoutes = express.Router(),
        jobRoutes = express.Router();
        locationRoutes = express.Router();
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
 
    // Todo Routes
    apiRoutes.use('/customer', customerProfileRoutes);
 

    customerProfileRoutes.get('/profile', customerProfileController.findAllCustomerProfile);
    customerProfileRoutes.post('/profile', customerProfileController.createNewCustomerProfile);
    customerProfileRoutes.get('/profile/:Id', customerProfileController.findCustomerProfileById);
    customerProfileRoutes.delete('/profile', customerProfileController.deleteAllCustomerProfile);
    customerProfileRoutes.delete('/profile/:Id', customerProfileController.deleteCustomerProfileById);
    customerProfileRoutes.put('/profile/:Id',customerProfileController.updateCustomerProfileById);

    apiRoutes.use('/customer', customerProfileFeedbackRoutes);
 

    customerProfileFeedbackRoutes.get('/feedback', customerFeedbackController.findAllCustomerFeedback);
    customerProfileFeedbackRoutes.get('/feedback/:Id', customerFeedbackController.findCustomerFeedbackById);
    customerProfileFeedbackRoutes.post('/feedback', customerFeedbackController.createNewCustomerFeedback);
    customerProfileFeedbackRoutes.delete('/feedback', customerFeedbackController.deleteAllCustomerFeedback);
    customerProfileFeedbackRoutes.put('/feedback/:Id',customerFeedbackController.updateCustomerFeedbackById);


    apiRoutes.use('/employee', employeeProfileRoutes);
 

    employeeProfileRoutes.get('/profile', employeeProfileController.findAllEmployeeProfile);
    employeeProfileRoutes.post('/profile', employeeProfileController.createNewEmployeeProfile);
    employeeProfileRoutes.get('/profile/:Id', employeeProfileController.findEmployeeProfileById);
    employeeProfileRoutes.put('/profile/:Id', employeeProfileController.updateEmployeeProfileById);
    employeeProfileRoutes.delete('/profile/:Id', employeeProfileController.deleteEmployeeProfileById);
    employeeProfileRoutes.delete('/profile', employeeProfileController.deleteAllEmployeeProfile);

    apiRoutes.use('/employee', jobRoutes);
 

    jobRoutes.get('/job', jobController.findAllJobs);
    jobRoutes.post('/job', jobController.createNewJob);
    jobRoutes.get('/job/:Id', jobController.findJobById);
    jobRoutes.put('/job/:Id', jobController.updateJobById);
    jobRoutes.delete('/job/:Id', jobController.deleteJobById);
    jobRoutes.delete('/job', jobController.deleteAllJobs);

    apiRoutes.use('/employee', locationRoutes);

    locationRoutes.get('/location', employeeLocationController.findAllEmployeeLocation);
    locationRoutes.post('/location', employeeLocationController.createEmployeeLocation);
    locationRoutes.get('/location/:Id', employeeLocationController.findEmployeeLocationById);
    locationRoutes.put('/location/:Id', employeeLocationController.updateEmployeeLocationById);
    locationRoutes.delete('/location/:Id', employeeLocationController.deleteEmployeeLocationById);
    locationRoutes.delete('/location', employeeLocationController.deleteAllEmployeeLocations);

    // todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TodoController.getTodos);
 
    // Set up routes
    app.use('/api', apiRoutes);
 
}