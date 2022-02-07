const mongoose = require('../database');

const ScheduleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
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
    },
    date: {
        type: Date,
        require:true,
    },
    time: {
        type: String,
        require: true,
    }
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;