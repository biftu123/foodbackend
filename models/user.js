const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        default: 'none'
    },
    phone: {
        type: String,
        default: '0987644322'
    },
    phoneVerification: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        required: true,
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profile: {
        type: String,
        default: 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg'
    },
    verification: {
        type: Boolean,
        default: false
    },
	address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
		required:false
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;