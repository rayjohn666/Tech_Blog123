const express = require("express");
const User = require("../models/User")
const router = express.Router();
const bcrypt = require('bcrypt')
var session = require('express-session')


router.get('/', (req, res) =>{
    res.render('login')
})