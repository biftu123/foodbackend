const express = require('express');
const dotenv =require('dotenv')
const mongoose = require('mongoose');

const categoryRouter = require('./routes/catagoryroute');
dotenv.config();
const app = express();

const port = process.env.PORT;
const dbUrl = process.env.DBurl;
app.use('/category', categoryRouter);

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