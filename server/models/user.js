const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    status: { type: String, default: "active" },
    cart: [{
        productId: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }]
});

module.exports = mongoose.model('User', userSchema);
