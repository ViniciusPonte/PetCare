const mongoose = require('../database');

const AdoptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    age: {
        type: Date,
        require: true,
    },
    latitude: {
        type: String,
        require: true,
    },
    longitude: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true,
    },
    photo: {
        type: String,
        require: true,
    }
});

const Adoption = mongoose.model('Adoption', AdoptionSchema);

module.exports = Adoption;