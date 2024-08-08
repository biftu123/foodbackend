const foodcontroller =require('../controls/food');
const router = require('express').Router();
const  { verifyAndAuthorization, verifyVendor, verifyDriver, verifyAdmin }= require('../midlewares/verfiytoken');
router.post('/create',verifyVendor,foodcontroller.addfood);
router.get('/getbyid/:id',foodcontroller.foodgetbyId);
router.get('/recomdation/:code',foodcontroller.getrandomfood);
router.get('/resturant/:id',foodcontroller.getfoodbyresturant);
router.get('/all/:catagory/:code',foodcontroller.getfoodbycatagoryandcode);
router.get('/random/:catagory/:code',foodcontroller.getfoodrandombycatagoryandcode);
router.get('/search/:key',foodcontroller.search);

module.exports= router;