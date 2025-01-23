const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailProductSchema = new Schema({
    idProduct: {
        type: String,
        required: true
    },
    idDetailMaterial: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('DetailProduct', detailProductSchema);