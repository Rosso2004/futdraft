const express = require('express');
const userRoutes= require('../controllers/userController.js');

const router =express.Router();

router.use('/user',userRoutes);

module.exports=router;