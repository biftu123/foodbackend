const express = require('express');
const mongoose = require('mongoose');
const app = express();
port= 3001;
mongoose.connect('mongodb://localhost:27017/food')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});