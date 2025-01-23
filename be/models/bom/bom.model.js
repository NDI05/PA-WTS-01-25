const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bomSchema = new Schema({
    bomName: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Bom', bomSchema);