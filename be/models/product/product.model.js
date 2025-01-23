const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    idBom: {
        type: String,
        required: true
    },
    idStation: {
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
    }
})

module.exports = mongoose.model('Product', productSchema);