const cartcontroller =require('../controls/cart');
const router = require('express').Router();
const { verifyAndAuthorization, verifyVendor, verifyDriver, verifyAdmin }= require('../midlewares/verfiytoken');
router.post('/create',verifyAndAuthorization,cartcontroller.addcarts);
router.delete('/delete/:id',verifyAndAuthorization,cartcontroller.removecart);
router.get('/getbyId',verifyAndAuthorization,cartcontroller.getcart);
router.get('/count',verifyAndAuthorization,cartcontroller.getcount)
router.get('/decrement/:id',verifyAndAuthorization,cartcontroller.decrementproductqunt)

module.exports =router;