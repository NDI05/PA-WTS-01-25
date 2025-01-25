const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailDescriptionWopSchema = new Schema({
    idDetailWop: {
        type: String,
        required: true
    },
    idDetailBom: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    pcsOf:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('DetailDescriptionWop', detailDescriptionWopSchema);