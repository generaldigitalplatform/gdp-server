var express = require('express');
var router = express.Router();
var productUsageFeedbackController = require('../controllers/productUsageFeedbackController');


router.get('/feedback', productUsageFeedbackController.findProductUsageFeedbacks);
router.get('/feedback/:feedbackId', productUsageFeedbackController.findProductUsageFeedbackByCustomerId);
router.post('/feedback', productUsageFeedbackController.createProductUsageFeedback);

module.exports = router;
