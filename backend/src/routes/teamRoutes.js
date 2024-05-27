const express = require('express');
const teamRoutes= require('../controllers/teamController.js');

const router =express.Router();

router.use('/team',teamRoutes);

module.exports=router;