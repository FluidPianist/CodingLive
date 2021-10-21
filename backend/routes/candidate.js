var express = require('express');
var passport=require('passport');
var sendEmail=require('../mailer');
var authenticate=require('../authenticate');
var cors = require('./cors');
var router = express.Router();
router.use(express.json()); 

module.exports = router;