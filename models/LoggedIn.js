const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoggedInSchema = new Schema ({
    id: {
        type: String,
        required: true
    },
    loginToken: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        expires: '120m'
    }
});

module.exports = Item = mongoose.model('loggedin', LoggedInSchema);