const mongoose = require('../database');

const ServiceSchema = new mongoose.Schema({
    petshopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Petshop',
        require: true,
    },
    name: {
        type: String,
        require:true,
    },
    type: {
        type: String,
        require:true,
    },
    price: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true
    }
});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;