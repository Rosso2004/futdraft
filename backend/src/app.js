const customerRoutes=require('./routes/userRoutes');
const playerRoutes=require('./routes/playerRoutes');
const teamRoutes=require('./routes/teamRoutes');
const express=require('express');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app=express();

app.use(cors({credentials: true, origin: process.env.DOMAIN}));
app.use(cookieParser());
app.use(express.json());

app.use('/api',customerRoutes, playerRoutes, teamRoutes);

const port=5000;
app.listen(port, () => {
    console.log("Server is running on port ", port);
});