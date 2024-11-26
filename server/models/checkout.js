const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    name: String,
    address: String,
    contactNumber: String,
    prescription: {
        filename: String,
        originalname: String,
        path: String,
    },
    status: {
        type: String,
        default: 'Pending',
    },
    confirmedByPharmacist: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Checkout', checkoutSchema);
