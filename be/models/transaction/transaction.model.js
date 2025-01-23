const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    dateTransaction: {
        type: Date,
        required: true
    },
    regionTransaction: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Transaction', transactionSchema);