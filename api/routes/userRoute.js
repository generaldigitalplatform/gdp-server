var express = require('express'),
    router = express.Router();

var userRoute = express.Router(),
    userController = require('../controllers/userController')

module.exports = function(app){

  router.use('/',userRoute);
  userRoute.get('/user',userController.findAllFieldForce);

  app.use('/api',router);
}

