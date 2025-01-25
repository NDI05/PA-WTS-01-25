const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wopSchema = new Schema({
    idBom: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    idCompany: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Wop', wopSchema);