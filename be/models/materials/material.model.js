const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema({
    idBomSchema: {
        type: String,
        required: true
    },
    materialName: {
        type: String,
        required: true
    },
    materialStock: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Material', materialSchema);