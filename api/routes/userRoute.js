var express = require('express'),
    router = express.Router();

var userRoute = express.Router(),
    userController = require('../controllers/userController')

module.exports = function(app){

  router.use('/',userRoute);
  userRoute.get('/user',userController.findAllFieldForce);
  userRoute.put('/user/:Id',userController.updateUserById);
  userRoute.delete('/user/:Id',userController.deleteUserById);

  app.use('/api',router);
}

