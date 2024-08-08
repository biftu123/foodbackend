const express = require('express');
const dotenv =require('dotenv')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Restaurantroute =require('./routes/resturantroute')
const Foodrouter =require('./routes/Foodroute');
const Ratingroute =require('./routes/ratingroute');
const addressroute =require('./routes/addressroute')
const categoryRouter = require('./routes/catagoryroute');
const authroute =require('./routes/authroute');
const  cartroute = require('./routes/cartroute');
const orderroute =require('./routes/orderroute');
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


const port = process.env.PORT;
const dbUrl = process.env.DBurl;
app.use('/category', categoryRouter);
app.use('/resturant',Restaurantroute);
app.use('/food',Foodrouter);
app.use('/Rating',Ratingroute);
app.use('/address',addressroute)
app.use('/auth',authroute)
app.use('/cart',cartroute)
app.use('/order',orderroute)
mongoose.connect(dbUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});