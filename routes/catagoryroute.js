const route =require('express').Router();
const catagory =require('../controls/catagory')
route.post('/create',catagory.createCategory);
route.get('/getcatagory',catagory.getcatagory);
route.get('/getrandomcatagory',catagory.getrandomcatagories);
module.exports=route;