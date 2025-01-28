const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailBomSchema = new Schema({
    idBomSchema: {
        type: String,
        required: true
    },
    materialName:{
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

module.exports = mongoose.model('DetailBom', detailBomSchema);