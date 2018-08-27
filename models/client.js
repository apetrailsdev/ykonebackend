const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        trim: true
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true
    },
    company: {
        type: String
    },
    zip: {
        type: Number,
        minlength: 6,
        maxlength: 6
    }
});


clientSchema.plugin(timestamps);
const Client = mongoose.model('Client', clientSchema);

module.exports = {Client}