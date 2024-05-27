const express=require('express');
const Team =require('../models/teamModel');
const authenticateToken = require("../middleware/authentication");
const jwt = require("jsonwebtoken");

const router=express.Router();


// router.get('/getTeam',authenticateToken, async(req,res)=>{
//     const { id, email, firstname, lastname } = req.data;
//     res.json({ id: id, lastname: lastname, firstname: firstname, email: email });
// });

router.post('/createTeam', authenticateToken, async (req, res) => {
    const { name,team } = req.body;
    const { id } = req.data;
    const newTeam = await Team.createTeam(id,name,team);
    if (newTeam.status === 200) {
        res.json(newTeam);
    } else {
        res.status(newTeam.status).json(newTeam.message);
    }
});


module.exports=router;









