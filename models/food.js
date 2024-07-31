const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    title: { type: String, required: true },
    time: { type: String, required: true },
    code: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    isAvailable: { type: Boolean, default: true },
    foodType: { type: Array, required: true },
    foodTags: { type: Array, required: true },
    rating: { type: Number, min: 1, max: 5, default: 3 },
    price: { type: Number, required: true },
    additives: { type: Array, default: [] },
	ratingCount: { type: String, default:"267"},
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;