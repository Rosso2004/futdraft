const courseRoutes=require("./routes/courseRoutes");
const customerRoutes=require('./routes/customerRoutes');
const relCourseCustomerRoutes=require('./routes/relCourseCustomerRoutes');
const express=require('express');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app=express();

app.use(cors({credentials: true, origin: process.env.DOMAIN}));
app.use(cookieParser());
app.use(express.json());

app.use('/api',courseRoutes,customerRoutes,relCourseCustomerRoutes);
const port=5000;
app.listen(port, () => {
    console.log("Server is running on port ${port}");

});