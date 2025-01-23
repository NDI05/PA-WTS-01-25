const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailMaterialSchema = new Schema({
    idMaterial: {
        type: String,
        required: true
    },
    statusDetail: {
        type: Boolean,
        required: true,
        default: true,
    },
})

module.exports = mongoose.model('DetailMaterial', detailMaterialSchema);