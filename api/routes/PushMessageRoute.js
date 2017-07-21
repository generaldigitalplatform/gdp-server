var express = require('express'),
    router = express.Router();

var pushMessageRoute = express.Router(),
    pushMessageController = require('../controllers/PushMessageController');

module.exports = function(app){

  router.use('/push',pushMessageRoute);
  pushMessageRoute.post('/message',pushMessageController.pushMessageToUser);

  app.use('/api',router);
}
