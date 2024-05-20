const express = require('express');
const courseRouter = require('../controllers/courseController');

const router = express.Router();

router.use('/course', courseRouter);

module.exports = router;
