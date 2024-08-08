const addresscontroller =require('../controls/address');
const router = require('express').Router();
const { verifyAndAuthorization, verifyVendor, verifyDriver, verifyAdmin }= require('../midlewares/verfiytoken');

router.post("/create",verifyAndAuthorization,addresscontroller.addAddress);
router.get("/all",verifyAndAuthorization,addresscontroller.getaddres)
router.delete('delete/:id',verifyAndAuthorization,addresscontroller.deleteaddress)
router.get('/default',verifyAndAuthorization,addresscontroller.getdefaultId);
router.patch('/default/:id',verifyAndAuthorization,addresscontroller.setdefaultaddress)
    





module.exports =router;