const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    default: {
        type: Boolean,
        default: false
    },
    deliveryInstruction: {
        type: String,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    },
    latitude: {
        type: Number,
        required: false
    }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;