const express = require('express').Router();

const userRoutes = require('./userRoutes');
express.use('/userRoutes', userRoutes);

const commentRoutes = require('./commentRoutes');
express.use('/', commentRoutes);


module.exports = express;