const express = require('express');
const dotenv =require('dotenv')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Restaurantroute =require('./routes/resturantroute')

const categoryRouter = require('./routes/catagoryroute');
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const port = process.env.PORT;
const dbUrl = process.env.DBurl;
app.use('/category', categoryRouter);
app.use('/resturant',Restaurantroute);

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