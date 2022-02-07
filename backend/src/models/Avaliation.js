const mongoose = require('../database');

const AvaliationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    petshopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Petshop',
        require: true,
    },
    rate: {
        type: Number,
        require: true,
    },
    comment: {
        type: String
    },
    date: {
        type: Date,
        require: true
    }
});

const Avaliation = mongoose.model('Avaliation', AvaliationSchema);

module.exports = Avaliation;