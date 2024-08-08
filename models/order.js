const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the OrderItem schema
const orderItemSchema = new Schema({
    foodId: {
        type: Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    additives: {
        type: [String],
        default: []
    },
    instruction: {
        type: String,
        default: ''
    }
});


const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [orderItemSchema],
    orderTotal: {
        type: Number,
        required: true
    },
    deliveryAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    deliveryFee: {
        type: Number,
        required: true
    },
    grandTotal: {
        type: Number,
        required: true
    },
    restaurantAddress: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Completed', 'Failed']
    },
	rating: { type: Number, min: 1, max: 5, default: 3 },
    orderStatus: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Processing', 'Completed', 'Cancelled']
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    restaurantCoords: {
        type: [Number]
    },
    deliveryId: {
        type: String,
        default: ''
    },
    receiptCoords: {
        type: [Number]
    },
    feedback: {
        type: String
    },
    discountAmount: {
        type: Number
    },
    note: {
        type: String
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;