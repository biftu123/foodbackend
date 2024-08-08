const authcontroller = require('../controls/authcontroler');
const router = require('express').Router();
router.post('/create',authcontroller.createuser);
router.post('/login',authcontroller.login)
module.exports =router;