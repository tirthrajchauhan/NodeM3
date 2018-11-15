

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var Patient = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    dob: {
        type: String
    },
    address: {
        type: String
    },
    department: {
        type: String
    },
    doctor: {
        type: String
    }
},{
    collection: 'patients'
});

module.exports = mongoose.model('Patient', Patient);