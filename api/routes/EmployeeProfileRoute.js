var express = require('express');
var router = express.Router();
var employeeProfileController = require('../controllers/EmployeeProfileController');


router.get('/profile', employeeProfileController.findAllEmployeeProfile);
router.post('/profile', employeeProfileController.createNewEmployeeProfile);
router.get('/profile/:Id', employeeProfileController.findEmployeeProfileById);
router.put('/profile/:Id', employeeProfileController.updateEmployeeProfileById);
router.delete('/profile/:Id', employeeProfileController.deleteEmployeeProfileById);
router.delete('/profile', employeeProfileController.deleteAllEmployeeProfile);

module.exports = router;
