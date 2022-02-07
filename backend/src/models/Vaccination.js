const mongoose = require('../database');

const VaccinationSchema = new mongoose.Schema({
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },
    revaccination: {
        type: Date,
        require: true,
    }
});

const Vaccination = mongoose.model('Vaccination', VaccinationSchema);

module.exports = Vaccination;