const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailWopSchema = new Schema({
    idWop: {
        type: String,
        required: true
    },
    nameDetailWop: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    documentation: {
        type: String,
        default: 'none'
    },
})

module.exports = mongoose.model('DetailWop', detailWopSchema);