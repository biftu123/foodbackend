const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    additive: {
        type: Array,
        default: []
    },
    quantity: {
        type: Number,
        required: true
    },
    
    totalPrice: {
        type: Number,
        required: true
    },
    
}, {timestamp: true}
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;