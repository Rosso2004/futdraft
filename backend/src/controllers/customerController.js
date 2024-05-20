const express=require('express');
const Customer=require('../models/customerModel');
const authenticateToken = require("../middleware/authentication");
const jwt = require("jsonwebtoken");

const router=express.Router();

function generateAccessToken(email) {
    return jwt.sign({ email: email, type: 'access' }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

router.get('/checkToken', authenticateToken, (req, res) => {
    res.send({
        "status": 200,
        "message": "Verificato!"
    });
})

router.get('/getAllCustomer',authenticateToken, async(req,res)=>{
    const customer=await Customer.getAllCustomer();
    res.json(customer);
});

router.get('/getCustomer',authenticateToken, async(req,res)=>{
    const {fiscal_code} = req.body;
    const customer=await Customer.getCustomer();


    res.json(customer);
});

router.post('/createCustomer', async (req, res) => {
    const { fiscal_code, lastname,firstname,birthday,email,phone_number,password } = req.body;
    const newCustomer = await Customer.createCustomer(fiscal_code, lastname,firstname,birthday,email,phone_number,password);
    if (newCustomer.status === 200) {
        res.json(newCustomer);
    } else {
        res.status(newCustomer.status).json(newCustomer.message);
    }
});

router.put('/updateCustomer/:id', async (req, res) => {
    const { lastname,firstname,birthday,email,phone_number,password} = req.body;
    const updCustomer = await Customer.updateCustomer(req.params.id, lastname,firstname,birthday,email,phone_number,password );
    if (updCustomer.status === 200) {
        res.json(updCustomer);
    } else {
        res.status(updCustomer.status).json(updCustomer.message);
    }
});

router.post('/verifyCustomer', async (req, res) => {
    const { email,password } = req.body;
    const verCustomer = await Customer.verifyCustomer(email,password);
    if (verCustomer.status === 200) {
        res.cookie('token', generateAccessToken(email), { httpOnly:true });
        res.json(verCustomer);
    } else {
        res.status(verCustomer.status).json(verCustomer.message);
    }
});

router.put('/changeCustomerPassword/:id', async (req, res) => {
    const { old_password, new_password } = req.body;
    const chPwdUser = await Customer.changeCustomerPassword(req.params.id, old_password, new_password);
    if (chPwdUser.status === 200) {
        res.json(chPwdUser);
    } else {
        res.status(chPwdUser.status).json(chPwdUser.message);
    }
});

router.delete('/deleteCustomer/:id', async (req, res) => {
    const delCustomer = await Customer.deleteCustomer(req.params.id);
    if (delCustomer.status === 200) {
        res.json(delCustomer);
    } else {
        res.status(delCustomer.status).json(delCustomer.message);
    }
});

router.post('/viewSubscription', async(req,res) =>{
    const {fiscal_code}=req.body;
    const viewSubscription = await Customer.viewSubscription(fiscal_code);
    if (viewSubscription.status === 200) {
        res.json(viewSubscription);
    } else {
        res.status(viewSubscription.status).json(viewSubscription.message);
    }

});

module.exports=router;









