const mongoose = require('../database');

const PatientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    petshop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Petshop',
        require: true,
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        require: true,
    }
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;