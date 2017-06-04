var express = require('express');
var router = express.Router();
var customerProfileController = require('../controllers/customerProfileController');


router.get('/profile', customerProfileController.findAllCustomerProfile);
router.post('/profile', customerProfileController.createNewCustomerProfile);
router.get('/profile/:Id', customerProfileController.findCustomerProfileById);
router.delete('/profile', customerProfileController.deleteAllCustomerProfile);
router.delete('/profile/:Id', customerProfileController.deleteCustomerProfileById);
router.put('/profile/:Id',customerProfileController.updateCustomerProfileById);

module.exports = router;

