const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bomSchema = new Schema({
    idBom: {
        type: String,
        required: true
    },
    bomName: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    },
    idCompany: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Bom', bomSchema);