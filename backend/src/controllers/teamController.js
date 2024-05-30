const express=require('express');
const Team =require('../models/teamModel');
const authenticateToken = require("../middleware/authentication");
const jwt = require("jsonwebtoken");

const router=express.Router();


router.get('/getTeam',authenticateToken, async(req,res)=>{
    const { id } = req.data;
    const teams = await Team.getTeam(id);
    res.json(teams);
});

router.post('/createTeam', authenticateToken, async (req, res) => {
    const { name,team,price } = req.body;
    const { id } = req.data;
    const newTeam = await Team.createTeam(id,name,team,price);
    if (newTeam.status === 200) {
        res.json(newTeam);
    } else {
        res.status(newTeam.status).json(newTeam.message);
    }
});

router.put('/updateTeam/:id', authenticateToken, async (req, res) => {
    const { team,price } = req.body;
    const newTeam = await Team.updateTeam(req.params.id,team,price);
    if (newTeam.status === 200) {
        res.json(newTeam);
    } else {
        res.status(newTeam.status).json(newTeam.message);
    }
});

router.delete('/deleteTeam/:id', authenticateToken, async (req, res) => {
    const delTeam = await Team.deleteTeam(req.params.id);
    if (delTeam.status === 200) {
        res.json(delTeam);
    } else {
        res.status(delTeam.status).json(delTeam.message);
    }
});


module.exports=router;









