const express=require('express');
const Player=require('../models/playerModel');
const authenticateToken = require("../middleware/authentication");

const router=express.Router();

router.get('/getAllPlayer', authenticateToken, async (req, res) => {
    const players = await Player.getAllPlayer();
    res.json(players);
});

module.exports=router;









