const express = require('express');
const playerRoutes= require('../controllers/playerController.js');

const router =express.Router();

router.use('/player',playerRoutes);

module.exports=router;