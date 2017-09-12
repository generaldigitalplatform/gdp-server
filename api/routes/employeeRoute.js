var AuthenticationController = require('../controllers/EmployeeAuthenticationController'), 
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport'),
    employeeController =require('../controllers/employeeController');
 
var requireAuth = passport.authenticate('jwt-employee', {session: false});
var requireLogin = passport.authenticate('local-employee', {session: false});
 
module.exports = function(app){
 
    var router = express.Router(),
        authRoutes = express.Router(),
        employeeRoutes = express.Router(),
        jobRoutes = express.Router();

    // Auth Routes
    router.use('/auth', authRoutes);
 
    authRoutes.post('/employee/register', AuthenticationController.employeeregister);
    authRoutes.post('/employee/login', requireLogin, AuthenticationController.employeelogin);
 
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });

    router.use('/employee', employeeRoutes);

    employeeRoutes.get('/find/:Id',employeeController.findEmployeeById);
    employeeRoutes.put('/update/:Id',employeeController.updateEmployeeById);
    employeeRoutes.put('/reset',employeeController.resetEmployeePassword);
    employeeRoutes.delete('/delete/:Id',employeeController.deleteEmployeeById);

    app.use('/api', router);

}

