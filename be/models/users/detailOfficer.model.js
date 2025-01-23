const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailOfficerSchema = new Schema({
    idUser: {
        type: String,
        required: true
    },
    departement: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('DetailOfficer', detailOfficerSchema);