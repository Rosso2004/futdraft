const express=require('express');
const RelCourseCustomer=require('../models/relCourseCustomerModel');

const router=express.Router();

router.post('/bookCourse', async (req, res) => {
    const { fiscal_code,id_course } = req.body;
    const bookCourse = await RelCourseCustomer.bookCourse(fiscal_code,id_course);
    if (bookCourse.status === 200) {
        res.json(bookCourse);
    } else {
        res.status(bookCourse.status).json(bookCourse.message);
    }
});

module.exports=router;