const router = require('express').Router();

const userRoutes = require('./userRoutes');
router.use('/user', userRoutes);


const commentRoutes = require('./commentRoutes');
router.use('/comments', commentRoutes);


module.exports = router;