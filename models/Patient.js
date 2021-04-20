const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PatientSchema = new Schema ({
    id: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    knownDisease: {
        type: String,
        required: false
    },
    complaints: {
        type: String,
        required: true
    },
    diseasesEvaluated: {
        type: String,
        required: false
    },
    referralDetails: {
        type: String,
        required: false
    }
});

module.exports = Item = mongoose.model('patient', PatientSchema);