const express = require('express');
const Course = require('../models/courseModel');
const authenticateToken = require("../middleware/authentication");

const router = express.Router();

router.get('/getAllCourse', authenticateToken,async (req, res) => {
    const course = await Course.getAllCourse();
    res.json(course);
});

module.exports = router;