const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    note: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Notes', noteSchema);
