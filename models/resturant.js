const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  time: { type: String, required: true },
  imageUrl: { type: String, required: true },
  owner: { type: String, required: true },
  logoUrl: { type: String, required: true },
  ratingCount: { type: String, default:"267"},
  code: { type: String, required: true },
  verification: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
    
  },
  verificationMessage: {
    type: String,
    default: 'Your restaurant is under review. We will notify you once it is verified.',
    
  },
  food: { type:Array, default:[]},
  isAvailability: { type: Boolean, default: true },
  delivery: { type: Boolean, default: true },
  pickup: { type: Boolean, default: true },
  rating: { type: Number, min: 1, max: 5, default: 3 },
  coords: {
    id: { type: String },
    address: { type: String, required: true },
    title: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitudeDelta: { type: Number, default: 0,  },
    latitudeDelta: { type: Number, default: 0,  }
  }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;