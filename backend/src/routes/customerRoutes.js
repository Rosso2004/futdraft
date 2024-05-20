
const express = require('express');
const customerRoutes= require('../controllers/customerController.js');

const router =express.Router();

router.use('/customer',customerRoutes);

module.exports=router;