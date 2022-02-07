const mongoose = require('../database');

const PetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    name: {
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
    breed: {
        type: String,
        require: true,
    },
    color: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    photoUri: {
        type: String,
        require: false
    },
    RGA: {
        type: String,
        require: false,
    },
    microchip: {
        type: String,
        require: false,
    },
    port: {
        type: String,
        require: true,
    },
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;