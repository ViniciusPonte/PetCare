const mongoose = require('../database');

const FavoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    petshop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Petshop',
        require: true,
    }
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;