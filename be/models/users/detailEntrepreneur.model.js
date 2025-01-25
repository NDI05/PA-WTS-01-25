const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailEntrepreneurSchema = new Schema({
    idUser: {
        type: String,
        required: true
    },
    idCompany: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('DetailEntrepreneur', detailEntrepreneurSchema);