const express = require('express');
const router = express.Router();
const resturantController =require('../controls/resturant');
router.post('/create',resturantController.addresturant);
router.get('/:id',resturantController.gerreturantbyId);
router.get('/random/:code',resturantController.getallrandomresturant);
router.get('/all/:code',resturantController.getallrandomresturant);






module.exports=router;