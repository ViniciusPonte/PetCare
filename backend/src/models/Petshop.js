const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const PetshopSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    cnpj: {
        type: String,
        require: true,
    },
    companyName: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    pet_categories: {
        type: [String],
        require: true,
    },
    services_categories: {
        type: [String],
        require: true,
    },
    photoUri: {
        type: String,
        require: false
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    phone: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    latitude: {
        type: String,
        require: true,
    },
    longitude: {
        type: String,
        require: true
    },
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    availableHours: {
        type: [Object],
        require: true,
        select: false,
    },
    qtdDayHours: {
        type: Number,
        require: true,
        select: false,
    },
    initialTime: {
        type: String,
        require: true,
        select: false,
    },
    finalTime: {
        type: String,
        require: true,
        select: false,
    },
    days: {
        type: [Number],
        require: true,
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

PetshopSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

const Petshop = mongoose.model('Petshop', PetshopSchema);

module.exports = Petshop;