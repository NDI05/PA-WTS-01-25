const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailTransactionSchema = new Schema({
    idTransaction: {
        type: String,
        required: true
    },
    idMaterial: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('DetailTransaction', detailTransactionSchema);