const ordercontroller = require("../controls/order")
const router = require('express').Router();
const { verifyAndAuthorization, verifyVendor, verifyDriver, verifyAdmin }= require('../midlewares/verfiytoken');
router.post('/paleced',verifyAndAuthorization,ordercontroller.placedorder);
router.get('/get',verifyAndAuthorization,ordercontroller.getorder);
 module.exports = router;