var AuthenticationController = require('../controllers/EmployerAuthenticationController'), 
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');
    employerController = require('../controllers/employerController');
 
var requireAuth = passport.authenticate('jwt-employer', {session: false});
var requireLogin = passport.authenticate('local-employer', {session: false});
 
module.exports = function(app){
 
    var router = express.Router(),
        authRoutes = express.Router(),
        jobRoutes = express.Router();

    // Auth Routes
    router.use('/auth', authRoutes);
 
    authRoutes.post('/employer/register', AuthenticationController.employerregister);
    authRoutes.post('/employer/login', requireLogin, AuthenticationController.employerlogin);
    authRoutes.put('/employer/reset', employerController.resetEmployerPassword);
 
    authRoutes.get('/protected', function(req, res){
        res.send({ content: 'Success'});
    });

    app.use('/api', router);

}

