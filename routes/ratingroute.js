const ratingControler = require('../controls/Rating');
const router = require('express').Router();
const { verifyAndAuthorization, verifyVendor, verifyDriver, verifyAdmin }= require('../midlewares/verfiytoken');
router.post('/create',verifyAndAuthorization,ratingControler.addRating);
router.get('/getrate',verifyAndAuthorization,ratingControler.checkrating);
module.exports= router;