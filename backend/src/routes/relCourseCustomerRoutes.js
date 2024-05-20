const express = require('express');
const  RelCourseCustomer= require('../controllers/relCourseCustomerController');

const router = express.Router();
router.use('/relCourseCustomer', RelCourseCustomer);

module.exports = router;