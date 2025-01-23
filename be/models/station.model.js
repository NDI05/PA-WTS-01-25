const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    stationName: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Station', stationSchema);