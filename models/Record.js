const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var Record = new Schema({
    patient_id:{
        type: mongoose.Schema.Types.ObjectId
    },
    blood_pressure: {
        type: String
    },
    heart_rate: {
        type: String
    },
    respiratory_rate: {
        type: String
    },
    blood_oxygen: {
        type: String
    }
},{
    collection: 'records'
});

module.exports = mongoose.model('Record', Record);