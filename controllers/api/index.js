const router = require('express').Router();

// const userRoutes = require('./userRoutes');
// router.use('/userRoutes', userRoutes);


const commentRoutes = require('./commentRoutes');
router.use('/', commentRoutes);


module.exports = router;