const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema ({
    id: {
        type: String,
        required: true
    },
    pswd: {
        type: String,
        required: true
    },
    dob: {
        type: String,
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
    title: {
        type: String,
        required: true
    }
});

module.exports = Item = mongoose.model('employee', EmployeeSchema);