const route =require('express').Router();
const catagory =require('../controls/catagory')
route.post('/create',catagory.createCategory);
module.exports=route;