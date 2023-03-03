const express = require("express");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User")
const router = express.Router();
const bcrypt = require('bcrypt')
var session = require('express-session')
