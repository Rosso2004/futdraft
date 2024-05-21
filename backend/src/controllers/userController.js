const express=require('express');
const User=require('../models/userModel');
const authenticateToken = require("../middleware/authentication");
const jwt = require("jsonwebtoken");

const router=express.Router();

function generateAccessToken(id, lastname, firstname, email) {
    return jwt.sign({ id: id, lastname: lastname, firstname: firstname, email: email, type: 'access' }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

router.get('/checkToken', authenticateToken, (req, res) => {
    res.send({
        "status": 200,
        "message": "Verificato!"
    });
})

router.get('/getUser',authenticateToken, async(req,res)=>{
    const { id, email, firstname, lastname } = req.data;
    res.json({ id: id, lastname: lastname, firstname: firstname, email: email });
});

router.post('/createUser', async (req, res) => {
    const { lastname,firstname,email,password } = req.body;
    const newCustomer = await User.createUser(lastname,firstname,email,password);
    if (newCustomer.status === 200) {
        res.json(newCustomer);
    } else {
        res.status(newCustomer.status).json(newCustomer.message);
    }
});

router.put('/updateUser/:id', authenticateToken, async (req, res) => {
    const { lastname,firstname,email,password} = req.body;
    const updCustomer = await User.updateUser(req.params.id, lastname,firstname,email,password );
    if (updCustomer.status === 200) {
        res.cookie('token', generateAccessToken(updCustomer.data.id, updCustomer.data.lastname, updCustomer.data.firstname, updCustomer.data.email), { httpOnly:true });
        res.json(updCustomer);
    } else {
        res.status(updCustomer.status).json(updCustomer.message);
    }
});

router.post('/verifyUser', async (req, res) => {
    const { email,password } = req.body;
    const verCustomer = await User.verifyUser(email,password);
    if (verCustomer.status === 200) {
        res.cookie('token', generateAccessToken(verCustomer.data.id, verCustomer.data.lastname, verCustomer.data.firstname, verCustomer.data.email), { httpOnly:true });
        res.json(verCustomer);
    } else {
        res.status(verCustomer.status).json(verCustomer.message);
    }
});

router.put('/changeUserPassword/:id', async (req, res) => {
    const { old_password, new_password } = req.body;
    const chPwdUser = await User.changeUserPassword(req.params.id, old_password, new_password);
    if (chPwdUser.status === 200) {
        res.json(chPwdUser);
    } else {
        res.status(chPwdUser.status).json(chPwdUser.message);
    }
});

module.exports=router;









