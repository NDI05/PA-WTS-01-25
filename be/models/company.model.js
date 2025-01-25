const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    nib:{
        type: String,
        required: true
    },
    nameCompany: {
        type: String,
        required: true
    },
    createdBy:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Company', companySchema);