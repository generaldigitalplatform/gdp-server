var express = require('express');
var router = express.Router();
var employeeProfileController = require('../controllers/EmployeeProfileController');
var jobController = require('../controllers/jobController');


router.get('/profile', employeeProfileController.findAllEmployeeProfile);
router.post('/profile', employeeProfileController.createNewEmployeeProfile);
router.get('/profile/:Id', employeeProfileController.findEmployeeProfileById);
router.put('/profile/:Id', employeeProfileController.updateEmployeeProfileById);
router.delete('/profile/:Id', employeeProfileController.deleteEmployeeProfileById);
router.delete('/profile', employeeProfileController.deleteAllEmployeeProfile);

router.get('/job', jobController.findAllJobs);
router.post('/job', jobController.createNewJob);
router.get('/job/:Id', jobController.findJobById);
router.put('/job/:Id', jobController.updateJobById);
router.delete('/job/:Id', jobController.deleteJobById);
router.delete('/job', jobController.deleteAllJobs);

module.exports = router;
