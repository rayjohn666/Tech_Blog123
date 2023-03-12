const express = require('express').Router();
const apiRoutes = require('./api');
express.use('/api', apiRoutes);

const frontEnd = require('./homeRoutes');
express.use('/', frontEnd);


module.exports = express;